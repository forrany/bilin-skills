import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function requiredEnvironment(environment, key) {
  const value = environment[key];
  if (typeof value !== "string" || !value.trim()) throw new Error(`${key} is required`);
  return value.trim();
}

function uploadFile(form, field, filename, contentType) {
  form.append(field, new Blob([fs.readFileSync(filename)], { type: contentType }), path.basename(filename));
}

export async function publishRelease(outputDirectory, environment = process.env, fetchImplementation = fetch) {
  const baseUrl = requiredEnvironment(environment, "BILIN_CONTENT_UPDATE_URL");
  const token = requiredEnvironment(environment, "BILIN_CONTENT_PUBLISH_TOKEN");
  let endpoint;
  try {
    const parsed = new URL(baseUrl);
    if (parsed.protocol !== "https:") throw new Error("not HTTPS");
    parsed.pathname = `${parsed.pathname.replace(/\/$/, "")}/v1/publisher/releases`;
    parsed.search = "";
    parsed.hash = "";
    endpoint = parsed.toString();
  } catch (error) {
    throw new Error("BILIN_CONTENT_UPDATE_URL must be a valid HTTPS URL", { cause: error });
  }

  const manifestPath = path.join(outputDirectory, "stable.json");
  const manifestSignaturePath = path.join(outputDirectory, "stable.json.sig");
  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  } catch (error) {
    throw new Error("stable.json is invalid", { cause: error });
  }
  const artifactPath = path.join(outputDirectory, manifest.artifact.filename);
  const artifactSignaturePath = `${artifactPath}.sig`;
  const form = new FormData();
  uploadFile(form, "manifest", manifestPath, "application/json");
  uploadFile(form, "manifestSignature", manifestSignaturePath, "text/plain");
  uploadFile(form, "artifact", artifactPath, "application/zip");
  uploadFile(form, "artifactSignature", artifactSignaturePath, "text/plain");

  const response = await fetchImplementation(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  if (!response.ok) throw new Error(`Content publication failed with HTTP ${response.status}`);
  let result;
  try {
    result = await response.json();
  } catch (error) {
    throw new Error("Content publication returned invalid JSON", { cause: error });
  }
  if (
    !result
    || result.artifactId !== manifest.artifact.id
    || result.plugin !== manifest.plugin
    || result.version !== manifest.version
    || result.channel !== manifest.channel
  ) {
    throw new Error("Content publication returned an unexpected release identity");
  }
  return { artifactId: result.artifactId, plugin: result.plugin, version: result.version, channel: result.channel };
}

function outputArgument(argv) {
  const index = argv.indexOf("--output");
  if (index < 0 || !argv[index + 1]) return "dist";
  return argv[index + 1];
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const result = await publishRelease(path.resolve(root, outputArgument(process.argv.slice(2))));
  process.stdout.write(`Published ${result.plugin} ${result.version} to ${result.channel}.\n`);
}
