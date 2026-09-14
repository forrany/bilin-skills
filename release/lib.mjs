import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";

import yazl from "yazl";

const PLUGIN_NAME = "bilin-education";
const CHANNEL = "stable";
const FIXED_MTIME = new Date("1980-01-01T00:00:00.000Z");
const DEFAULT_MIN_APP_VERSION = "1.4.6";
const RUNTIME_DIRECTORIES = new Set(["references", "assets", "scripts", "templates"]);
const FORBIDDEN_SEGMENTS = new Set(["reports", "evals", "docs", "archive"]);
const SEMVER = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*))*))?$/;
const SKILL_NAME = /^[a-z0-9][a-z0-9-]{0,127}$/;

function readJson(filename, label) {
  let payload;
  try {
    payload = JSON.parse(fs.readFileSync(filename, "utf8"));
  } catch (error) {
    throw new Error(`${label} must be valid JSON`, { cause: error });
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error(`${label} must be a JSON object`);
  }
  return payload;
}

function requireStrictSemver(value, label) {
  if (typeof value !== "string" || !SEMVER.test(value)) {
    throw new Error(`${label} must be strict SemVer without build metadata`);
  }
  return value;
}

function frontmatterScalar(source, key) {
  if (!source.startsWith("---\n")) return undefined;
  const end = source.indexOf("\n---", 4);
  if (end < 0) return undefined;
  const match = source.slice(4, end).match(new RegExp(`^${key}:\\s*(.+?)\\s*$`, "m"));
  if (!match) return undefined;
  const raw = match[1].trim();
  if ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'"))) {
    return raw.slice(1, -1);
  }
  return raw;
}

function loadRuntimeConfig(root) {
  const config = readJson(path.join(root, "release", "runtime-files.json"), "runtime-files.json");
  if (config.schemaVersion !== 1 || !config.skills || typeof config.skills !== "object" || Array.isArray(config.skills)) {
    throw new Error("runtime-files.json has an unsupported schema");
  }
  for (const [skill, entry] of Object.entries(config.skills)) {
    if (!SKILL_NAME.test(skill) || !entry || typeof entry !== "object" || Array.isArray(entry)) {
      throw new Error("runtime-files.json contains an invalid Skill entry");
    }
    for (const field of ["include", "executables"]) {
      if (!Array.isArray(entry[field]) || !entry[field].every((value) => typeof value === "string")) {
        throw new Error(`runtime-files.json ${skill}.${field} must be a string array`);
      }
    }
  }
  return config;
}

function validateExplicitPath(value, label) {
  if (!value || value.includes("\\") || path.posix.isAbsolute(value)) {
    throw new Error(`${label} must be a relative POSIX path`);
  }
  const segments = value.split("/");
  if (segments.some((part) => !part || part === "." || part === ".." || part.startsWith("."))) {
    throw new Error(`${label} contains an unsafe path segment`);
  }
  if (segments.some((part) => FORBIDDEN_SEGMENTS.has(part.toLowerCase()))) {
    throw new Error(`${label} may not include non-runtime content`);
  }
  return segments.join("/");
}

function visibleEntries(directory) {
  return fs.readdirSync(directory, { withFileTypes: true })
    .filter((entry) => !entry.name.startsWith("."))
    .sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));
}

function assertNoSymlinkSegments(root, relativePath) {
  let current = root;
  for (const segment of relativePath.split("/")) {
    current = path.join(current, segment);
    if (fs.lstatSync(current).isSymbolicLink()) {
      throw new Error(`runtime content may not contain a symlink: ${relativePath}`);
    }
  }
}

function walkRuntimeTree(root, relativeRoot, files) {
  const absoluteRoot = path.join(root, ...relativeRoot.split("/"));
  assertNoSymlinkSegments(root, relativeRoot);
  const rootStat = fs.lstatSync(absoluteRoot);
  if (rootStat.isSymbolicLink()) {
    throw new Error(`runtime content may not contain a symlink: ${relativeRoot}`);
  }
  if (rootStat.isFile()) {
    files.add(relativeRoot);
    return;
  }
  if (!rootStat.isDirectory()) {
    throw new Error(`runtime content must be a regular file or directory: ${relativeRoot}`);
  }
  for (const entry of visibleEntries(absoluteRoot)) {
    const relative = `${relativeRoot}/${entry.name}`;
    const entryStat = fs.lstatSync(path.join(absoluteRoot, entry.name));
    if (entryStat.isSymbolicLink()) {
      throw new Error(`runtime content may not contain a symlink: ${relative}`);
    }
    if (entryStat.isDirectory()) {
      walkRuntimeTree(root, relative, files);
    } else if (entryStat.isFile()) {
      files.add(relative);
    } else {
      throw new Error(`runtime content must contain regular files only: ${relative}`);
    }
  }
}

function collisionKey(value) {
  return value.normalize("NFKC").toLowerCase();
}

export function validateRepository(root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")) {
  const plugin = readJson(path.join(root, ".claude-plugin", "plugin.json"), ".claude-plugin/plugin.json");
  if (plugin.name !== PLUGIN_NAME) throw new Error(`Plugin name must be ${PLUGIN_NAME}`);
  const version = requireStrictSemver(plugin.version, "Plugin version");
  if (plugin.distribution !== "bilin" || plugin.preset !== true || plugin.removable !== false) {
    throw new Error("Plugin must be a preset, non-removable Bilin distribution");
  }
  if (!Array.isArray(plugin.skills) || !plugin.skills.every((value) => typeof value === "string")) {
    throw new Error("Plugin skills must be an array of names");
  }

  const skillsRoot = path.join(root, "skills");
  const skillDirectories = visibleEntries(skillsRoot).filter((entry) => entry.isDirectory());
  const skills = [];
  const skillMetadata = new Map();
  for (const entry of skillDirectories) {
    if (!SKILL_NAME.test(entry.name)) throw new Error(`Invalid Skill directory name: ${entry.name}`);
    const skillFile = path.join(skillsRoot, entry.name, "SKILL.md");
    if (!fs.existsSync(skillFile)) throw new Error(`Skill ${entry.name} is missing SKILL.md`);
    const stat = fs.lstatSync(skillFile);
    if (!stat.isFile() || stat.isSymbolicLink()) {
      throw new Error(`Skill ${entry.name} SKILL.md must be a regular file`);
    }
    const source = fs.readFileSync(skillFile, "utf8");
    const name = frontmatterScalar(source, "name");
    const description = frontmatterScalar(source, "description");
    if (name !== entry.name) throw new Error(`Skill ${entry.name} frontmatter name must match its directory`);
    if (!description) throw new Error(`Skill ${entry.name} must have a frontmatter description`);
    skills.push(entry.name);
    skillMetadata.set(entry.name, { description });
  }
  skills.sort();
  if (new Set(plugin.skills).size !== plugin.skills.length || JSON.stringify(plugin.skills) !== JSON.stringify(skills)) {
    throw new Error("Plugin skills must exactly match the sorted Skill directories");
  }

  const runtime = loadRuntimeConfig(root);
  for (const configuredSkill of Object.keys(runtime.skills)) {
    if (!skillMetadata.has(configuredSkill)) {
      throw new Error(`runtime-files.json references unknown Skill ${configuredSkill}`);
    }
  }

  const minAppVersion = requireStrictSemver(plugin.minAppVersion ?? DEFAULT_MIN_APP_VERSION, "minAppVersion");
  const publishedAtValue = plugin.publishedAt ?? "1980-01-01T00:00:00Z";
  const publishedAtDate = new Date(publishedAtValue);
  if (typeof publishedAtValue !== "string" || Number.isNaN(publishedAtDate.getTime()) || !/[zZ]|[+-]\d\d:\d\d$/.test(publishedAtValue)) {
    throw new Error("publishedAt must be a timezone-aware ISO timestamp");
  }
  const releaseNotes = plugin.releaseNotes ?? plugin.description;
  if (typeof releaseNotes !== "string" || !releaseNotes.trim() || releaseNotes.length > 20_000) {
    throw new Error("releaseNotes must be a non-empty string of at most 20000 characters");
  }
  return {
    root,
    plugin,
    version,
    skills,
    skillMetadata,
    runtime,
    minAppVersion,
    publishedAt: publishedAtDate.toISOString(),
    releaseNotes: releaseNotes.trim(),
  };
}

export function collectReleaseFiles(root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")) {
  const repository = validateRepository(root);
  const files = [];
  const archivePaths = new Map();
  const addFile = (sourceRelative, archivePath, mode = 0o644) => {
    const key = collisionKey(archivePath);
    const existing = archivePaths.get(key);
    if (existing) throw new Error(`case-insensitive path collision: ${existing} and ${archivePath}`);
    archivePaths.set(key, archivePath);
    const absolute = path.join(root, ...sourceRelative.split("/"));
    assertNoSymlinkSegments(root, sourceRelative);
    const stat = fs.lstatSync(absolute);
    if (stat.isSymbolicLink()) throw new Error(`runtime content may not contain a symlink: ${sourceRelative}`);
    if (!stat.isFile()) throw new Error(`runtime content must be a regular file: ${sourceRelative}`);
    files.push({ sourceRelative, archivePath, mode, data: fs.readFileSync(absolute) });
  };

  addFile(".claude-plugin/plugin.json", `${PLUGIN_NAME}/.claude-plugin/plugin.json`);
  for (const skill of repository.skills) {
    const relativeFiles = new Set([`skills/${skill}/SKILL.md`]);
    const skillRoot = path.join(root, "skills", skill);
    for (const directory of RUNTIME_DIRECTORIES) {
      const relative = `skills/${skill}/${directory}`;
      if (fs.existsSync(path.join(skillRoot, directory))) walkRuntimeTree(root, relative, relativeFiles);
    }
    const config = repository.runtime.skills[skill] ?? { include: [], executables: [] };
    const includes = config.include.map((value) => validateExplicitPath(value, `${skill}.include`));
    const executables = new Set(config.executables.map((value) => validateExplicitPath(value, `${skill}.executables`)));
    for (const explicit of includes) {
      const relative = `skills/${skill}/${explicit}`;
      if (!fs.existsSync(path.join(root, ...relative.split("/")))) {
        throw new Error(`explicit runtime path does not exist: ${skill}/${explicit}`);
      }
      walkRuntimeTree(root, relative, relativeFiles);
    }
    for (const executable of executables) {
      const relative = `skills/${skill}/${executable}`;
      if (!relativeFiles.has(relative)) throw new Error(`executable must also be included: ${skill}/${executable}`);
      if (!executable.startsWith("scripts/")) throw new Error(`executable must be under scripts/: ${skill}/${executable}`);
    }
    for (const sourceRelative of [...relativeFiles].sort()) {
      const withinSkill = sourceRelative.slice(`skills/${skill}/`.length);
      addFile(sourceRelative, `${PLUGIN_NAME}/skills/${skill}/${withinSkill}`, executables.has(withinSkill) ? 0o755 : 0o644);
    }
  }
  return files.sort((left, right) => (
    left.archivePath < right.archivePath ? -1 : left.archivePath > right.archivePath ? 1 : 0
  ));
}

function skillDigest(files, skill) {
  const prefix = `${PLUGIN_NAME}/skills/${skill}/`;
  const digest = crypto.createHash("sha256");
  for (const file of files) {
    if (!file.archivePath.startsWith(prefix)) continue;
    const relative = file.archivePath.slice(prefix.length);
    const fileHash = crypto.createHash("sha256").update(file.data).digest("hex");
    digest.update(`${relative}\0${file.mode.toString(8)}\0${file.data.length}\0${fileHash}\n`);
  }
  return digest.digest("hex");
}

function sha256(payload) {
  return crypto.createHash("sha256").update(payload).digest("hex");
}

async function writeZip(files, filename) {
  const temporary = `${filename}.${process.pid}.tmp`;
  const zip = new yazl.ZipFile();
  for (const file of files) {
    zip.addBuffer(file.data, file.archivePath, {
      mtime: FIXED_MTIME,
      mode: 0o100000 | file.mode,
      compressionLevel: 9,
    });
  }
  zip.end();
  try {
    await pipeline(zip.outputStream, fs.createWriteStream(temporary, { flags: "wx", mode: 0o600 }));
    fs.renameSync(temporary, filename);
  } catch (error) {
    fs.rmSync(temporary, { force: true });
    throw error;
  }
}

export async function packageRelease(
  root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."),
  outputDirectory = path.join(root, "dist"),
) {
  const repository = validateRepository(root);
  const files = collectReleaseFiles(root);
  fs.mkdirSync(outputDirectory, { recursive: true });
  const artifactFilename = `${PLUGIN_NAME}-${repository.version}.zip`;
  const artifactPath = path.join(outputDirectory, artifactFilename);
  await writeZip(files, artifactPath);
  const artifact = fs.readFileSync(artifactPath);
  const artifactSha256 = sha256(artifact);
  const manifest = {
    schemaVersion: 1,
    plugin: PLUGIN_NAME,
    version: repository.version,
    channel: CHANNEL,
    minAppVersion: repository.minAppVersion,
    publishedAt: repository.publishedAt,
    releaseNotes: repository.releaseNotes,
    artifact: {
      id: `${PLUGIN_NAME}:${repository.version}`,
      filename: artifactFilename,
      sha256: artifactSha256,
      size: artifact.length,
    },
    skills: repository.skills.map((name) => ({ name, sha256: skillDigest(files, name) })),
  };
  const manifestPath = path.join(outputDirectory, "stable.json");
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, { encoding: "utf8", mode: 0o600 });
  return { artifactPath, manifestPath, artifactSha256, manifest, files };
}
