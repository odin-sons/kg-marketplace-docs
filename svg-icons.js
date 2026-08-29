import fs from "node:fs";
import path from "node:path";
import { optimize } from "svgo";
import { AssetCache } from "@11ty/eleventy-fetch";

const SOURCE_DIR = "icons-src";
const CACHE_DIR = ".cache/svgo";

/** @type {import("svgo").Config} */
const SVGO_CONFIG = {
  plugins: ["preset-default", "removeDimensions"],
};

export async function loadIcon(filename) {
  const raw = fs.readFileSync(path.join(SOURCE_DIR, filename), "utf8");

  const asset = new AssetCache(raw, CACHE_DIR);
  if (asset.isCacheValid("*")) return asset.getCachedValue();

  const { data } = optimize(raw, SVGO_CONFIG);
  await asset.save(data, "text");
  return data;
}
