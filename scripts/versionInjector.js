// this file is used to nject the version/build timestamp for Termivolt at build time
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const timestamp = new Date().valueOf();

const dir = fileURLToPath(import.meta.url);
const currentDir = path.dirname(dir);
const parentDir = path.dirname(currentDir);

const data = await readFile(`${parentDir}/package.json`);
const json = JSON.parse(data.toString());

console.log(`[VERSIONINJECTOR] Injecting data (version: ${json.version}, timestamp: ${timestamp})`);

const distFile = await readFile(`${parentDir}/dist/index.cjs`);
const newDistFile = distFile.toString().replace("REPLACE_WITH_VERSION", `${json.version}`).replace("REPLACE_WITH_TIMESTAMP", `${timestamp}`);

await writeFile(`${parentDir}/dist/index.cjs`, newDistFile);
