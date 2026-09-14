import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function assertTagVersion(ref, version) {
  const expected = `refs/tags/bilin-education-v${version}`;
  if (ref !== expected) throw new Error(`Release tag ${ref} does not match Plugin version ${version}`);
}

function writeSignature(filename, signature) {
  const temporary = `${filename}.${process.pid}.tmp`;
  fs.writeFileSync(temporary, `${signature.toString("base64")}\n`, { encoding: "utf8", mode: 0o600, flag: "wx" });
  fs.renameSync(temporary, filename);
}

export function signRelease(outputDirectory, environment = process.env) {
  const privateKeyPem = environment.CONTENT_SIGNING_PRIVATE_KEY_PEM;
  if (!privateKeyPem) throw new Error("CONTENT_SIGNING_PRIVATE_KEY_PEM is required");
  let privateKey;
  try {
    privateKey = crypto.createPrivateKey(privateKeyPem);
  } catch (error) {
    throw new Error("CONTENT_SIGNING_PRIVATE_KEY_PEM is invalid", { cause: error });
  }
  if (privateKey.asymmetricKeyType !== "ed25519") {
    throw new Error("CONTENT_SIGNING_PRIVATE_KEY_PEM must contain an Ed25519 private key");
  }
  const manifestPath = path.join(outputDirectory, "stable.json");
  const manifestBytes = fs.readFileSync(manifestPath);
  let manifest;
  try {
    manifest = JSON.parse(manifestBytes);
  } catch (error) {
    throw new Error("stable.json is invalid", { cause: error });
  }
  if (environment.GITHUB_REF) assertTagVersion(environment.GITHUB_REF, manifest.version);
  if (environment.RELEASE_TAG) assertTagVersion(environment.RELEASE_TAG, manifest.version);
  const artifactPath = path.join(outputDirectory, manifest.artifact.filename);
  const artifactBytes = fs.readFileSync(artifactPath);
  const manifestSignaturePath = path.join(outputDirectory, "stable.json.sig");
  const artifactSignaturePath = `${artifactPath}.sig`;
  writeSignature(manifestSignaturePath, crypto.sign(null, manifestBytes, privateKey));
  writeSignature(artifactSignaturePath, crypto.sign(null, artifactBytes, privateKey));
  return { manifestSignaturePath, artifactSignaturePath, manifest, artifactPath };
}

function outputArgument(argv) {
  const index = argv.indexOf("--output");
  if (index < 0 || !argv[index + 1]) return "dist";
  return argv[index + 1];
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const result = signRelease(path.resolve(root, outputArgument(process.argv.slice(2))));
  process.stdout.write(`Signed ${result.manifest.plugin} ${result.manifest.version} with Ed25519.\n`);
}
