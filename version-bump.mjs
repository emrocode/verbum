import { readFileSync, writeFileSync } from "fs";
import pkg from "./package.json" with { type: "json" };

// Read minAppVersion from manifest.json and bump version to target version
let manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
const { minAppVersion } = manifest;
const entries = Object.entries(manifest);
const newManifest = {};

// Insert version at position 3
for (let i = 0; i < entries.length; i++) {
  if (i === 2) newManifest.version = pkg.version;
  if (entries[i][0] !== "version") newManifest[entries[i][0]] = entries[i][1];
}

manifest = newManifest;
writeFileSync("manifest.json", JSON.stringify(manifest, null, 2));

// Update versions.json with target version and minAppVersion from manifest.json
let versions = JSON.parse(readFileSync("versions.json", "utf8"));
versions[pkg.version] = minAppVersion;
writeFileSync("versions.json", JSON.stringify(versions, null, 2));
