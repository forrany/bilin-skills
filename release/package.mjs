import path from "node:path";
import { fileURLToPath } from "node:url";

import { packageRelease } from "./lib.mjs";

function outputArgument(argv) {
  const index = argv.indexOf("--output");
  if (index < 0 || !argv[index + 1]) return "dist";
  return argv[index + 1];
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.resolve(root, outputArgument(process.argv.slice(2)));
const result = await packageRelease(root, output);
process.stdout.write(`Packaged ${result.manifest.artifact.filename} (${result.manifest.artifact.size} bytes, sha256 ${result.artifactSha256}).\n`);
