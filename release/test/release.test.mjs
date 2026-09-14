import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import yauzl from "yauzl";

import {
  collectReleaseFiles,
  packageRelease,
  validateRepository,
} from "../lib.mjs";
import { assertTagVersion, signRelease } from "../sign.mjs";
import { publishRelease } from "../publish.mjs";

// Ephemeral per-run signing key. The tests only round-trip sign/verify, so no
// private key is ever committed to (or required from) the repository.
const TEST_KEY = crypto
  .generateKeyPairSync("ed25519")
  .privateKey.export({ type: "pkcs8", format: "pem" });

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "bilin-release-"));
  fs.mkdirSync(path.join(root, ".claude-plugin"), { recursive: true });
  fs.mkdirSync(path.join(root, "skills", "alpha", "references"), { recursive: true });
  fs.mkdirSync(path.join(root, "skills", "alpha", "reports"), { recursive: true });
  fs.mkdirSync(path.join(root, "release"), { recursive: true });
  fs.writeFileSync(path.join(root, "skills", "alpha", "SKILL.md"), "---\nname: alpha\ndescription: Alpha skill\n---\nBody\n");
  fs.writeFileSync(path.join(root, "skills", "alpha", "references", "guide.md"), "guide\n");
  fs.writeFileSync(path.join(root, "skills", "alpha", "reports", "private.md"), "private\n");
  fs.writeFileSync(path.join(root, "skills", "alpha", ".hidden"), "ignored\n");
  fs.writeFileSync(path.join(root, ".claude-plugin", "plugin.json"), `${JSON.stringify({
    name: "bilin-education",
    version: "1.2.0",
    description: "Fixture",
    author: { name: "Bilin" },
    license: "Proprietary",
    distribution: "bilin",
    skills: ["alpha"],
    preset: true,
    removable: false,
  }, null, 2)}\n`);
  fs.writeFileSync(path.join(root, "release", "runtime-files.json"), '{"schemaVersion":1,"skills":{}}\n');
  return root;
}

function zipEntries(filename) {
  return new Promise((resolve, reject) => {
    yauzl.open(filename, { lazyEntries: true }, (error, zip) => {
      if (error) return reject(error);
      const entries = [];
      zip.readEntry();
      zip.on("entry", (entry) => {
        entries.push({
          name: entry.fileName,
          mode: (entry.externalFileAttributes >>> 16) & 0xffff,
          timestamp: entry.getLastModDate().toISOString(),
        });
        zip.readEntry();
      });
      zip.on("end", () => resolve(entries));
      zip.on("error", reject);
    });
  });
}

test("discovers one sorted Plugin Skill list and rejects broken identity", () => {
  const root = fixture();
  assert.deepEqual(validateRepository(root).skills, ["alpha"]);

  fs.mkdirSync(path.join(root, "skills", "missing"));
  assert.throws(() => validateRepository(root), /missing SKILL\.md/);
  fs.rmSync(path.join(root, "skills", "missing"), { recursive: true });

  fs.writeFileSync(path.join(root, "skills", "alpha", "SKILL.md"), "---\nname: other\ndescription: Wrong\n---\n");
  assert.throws(() => validateRepository(root), /must match its directory/);
});

test("uses an allowlist, includes explicit runtime files, and rejects symlinks/collisions", () => {
  const root = fixture();
  fs.mkdirSync(path.join(root, "skills", "alpha", "agents"));
  fs.writeFileSync(path.join(root, "skills", "alpha", "agents", "interface.yaml"), "name: alpha\n");
  fs.writeFileSync(path.join(root, "release", "runtime-files.json"), JSON.stringify({
    schemaVersion: 1,
    skills: { alpha: { include: ["agents/interface.yaml"], executables: [] } },
  }));
  const paths = collectReleaseFiles(root).map((file) => file.archivePath);
  assert(paths.some((value) => value.endsWith("agents/interface.yaml")));
  assert(paths.some((value) => value.endsWith("references/guide.md")));
  assert(!paths.some((value) => value.includes("reports") || value.includes(".hidden")));

  fs.symlinkSync("guide.md", path.join(root, "skills", "alpha", "references", "linked.md"));
  assert.throws(() => collectReleaseFiles(root), /symlink/);
  fs.unlinkSync(path.join(root, "skills", "alpha", "references", "linked.md"));

  fs.writeFileSync(path.join(root, "skills", "alpha", "references", "GUIDE.md"), "collision\n");
  fs.writeFileSync(path.join(root, "release", "runtime-files.json"), JSON.stringify({
    schemaVersion: 1,
    skills: { alpha: { include: ["agents/interface.yaml", "references/GUIDE.md"], executables: [] } },
  }));
  assert.throws(() => collectReleaseFiles(root), /case-insensitive path collision/);
});

test("packages stable order, modes, timestamps, canonical manifest, and reproducible bytes", async () => {
  const root = fixture();
  const one = path.join(root, "dist-one");
  const two = path.join(root, "dist-two");
  const first = await packageRelease(root, one);
  const second = await packageRelease(root, two);
  assert.equal(first.artifactSha256, second.artifactSha256);
  assert.deepEqual(fs.readFileSync(first.artifactPath), fs.readFileSync(second.artifactPath));
  assert.deepEqual(fs.readFileSync(first.manifestPath), fs.readFileSync(second.manifestPath));

  const manifest = JSON.parse(fs.readFileSync(first.manifestPath, "utf8"));
  assert.equal(manifest.artifact.sha256, first.artifactSha256);
  assert.equal(manifest.artifact.size, fs.statSync(first.artifactPath).size);
  assert.deepEqual(manifest.skills.map((skill) => skill.name), ["alpha"]);

  const entries = await zipEntries(first.artifactPath);
  assert.deepEqual(entries.map((entry) => entry.name), [...entries.map((entry) => entry.name)].sort());
  assert(entries.every((entry) => entry.timestamp === "1980-01-01T00:00:00.000Z"));
  assert(entries.every((entry) => (entry.mode & 0o777) === 0o644));
});

test("signs exact bytes with Ed25519 and enforces tag/version identity", async () => {
  const root = fixture();
  const dist = path.join(root, "dist");
  const packaged = await packageRelease(root, dist);
  const signed = signRelease(dist, { CONTENT_SIGNING_PRIVATE_KEY_PEM: TEST_KEY });
  const publicKey = crypto.createPublicKey(TEST_KEY);
  assert(crypto.verify(null, fs.readFileSync(packaged.manifestPath), publicKey, Buffer.from(fs.readFileSync(signed.manifestSignaturePath, "utf8").trim(), "base64")));
  assert(crypto.verify(null, fs.readFileSync(packaged.artifactPath), publicKey, Buffer.from(fs.readFileSync(signed.artifactSignaturePath, "utf8").trim(), "base64")));
  assertTagVersion("refs/tags/bilin-education-v1.2.0", "1.2.0");
  assert.throws(() => assertTagVersion("bilin-education-v1.3.0", "1.2.0"), /does not match/);
  assert.throws(() => signRelease(dist, {}), /CONTENT_SIGNING_PRIVATE_KEY_PEM/);
  const rsa = crypto.generateKeyPairSync("rsa", { modulusLength: 2048 }).privateKey.export({ type: "pkcs8", format: "pem" });
  assert.throws(() => signRelease(dist, { CONTENT_SIGNING_PRIVATE_KEY_PEM: rsa }), /Ed25519/);
});

test("publishes the four exact multipart fields without leaking bearer material", async () => {
  const root = fixture();
  const dist = path.join(root, "dist");
  await packageRelease(root, dist);
  signRelease(dist, { CONTENT_SIGNING_PRIVATE_KEY_PEM: TEST_KEY });
  const secret = "publisher-secret-value";
  let inspected = false;
  const result = await publishRelease(dist, {
    BILIN_CONTENT_UPDATE_URL: "https://skills.example.test",
    BILIN_CONTENT_PUBLISH_TOKEN: secret,
  }, async (url, options) => {
    assert.equal(url, "https://skills.example.test/v1/publisher/releases");
    assert.equal(options.headers.Authorization, `Bearer ${secret}`);
    assert.deepEqual([...options.body.keys()].sort(), ["artifact", "artifactSignature", "manifest", "manifestSignature"]);
    inspected = true;
    return new Response(JSON.stringify({ artifactId: "bilin-education:1.2.0", plugin: "bilin-education", version: "1.2.0", channel: "stable" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  });
  assert(inspected);
  assert.equal(result.artifactId, "bilin-education:1.2.0");
  assert(!JSON.stringify(result).includes(secret));
});
