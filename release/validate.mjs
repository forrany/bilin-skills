import path from "node:path";
import { fileURLToPath } from "node:url";

import { collectReleaseFiles, validateRepository } from "./lib.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repository = validateRepository(root);
const files = collectReleaseFiles(root);
process.stdout.write(`Validated ${repository.plugin.name} ${repository.version}: ${repository.skills.length} Skills, ${files.length} runtime files.\n`);
