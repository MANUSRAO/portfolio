import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SIMPLE = [
  "javascript",
  "spring",
  "nodedotjs",
  "express",
  "react",
  "android",
  "apachekafka",
  "redis",
  "git",
  "mysql",
  "postgresql",
];

const DEVICON = {
  java: "java/java-original",
  amazonwebservices: "amazonwebservices/amazonwebservices-plain-wordmark",
};

const NEUTRAL = "9ca3af";

function fillOf(svg) {
  const match = svg.match(/fill="(#[0-9a-fA-F]{3,8})"/);
  return match ? match[1] : null;
}

function luminance(hex) {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean.slice(0, 6);

  const channels = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
  const [r, g, b] = channels.map((c) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

async function fetchIcon(slug, color) {
  const url = color
    ? `https://cdn.simpleicons.org/${slug}/${color}`
    : `https://cdn.simpleicons.org/${slug}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.text();
}

async function fetchDevicon(iconPath) {
  const url = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconPath}.svg`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.text();
}

async function main() {
  const techDir = path.join("src", "assets", "icons", "tech");
  await mkdir(techDir, { recursive: true });

  const failed = [];

  for (const slug of SIMPLE) {
    try {
      let svg = await fetchIcon(slug);
      const fill = fillOf(svg);

      if (fill && luminance(fill) < 0.15) {
        svg = await fetchIcon(slug, NEUTRAL);
        console.log(`[icons] ${slug}.svg (neutralised ${fill})`);
      } else {
        console.log(`[icons] ${slug}.svg`);
      }

      await writeFile(path.join(techDir, `${slug}.svg`), svg, "utf8");
    } catch (error) {
      failed.push(slug);
      console.warn(`[icons] ${slug} FAILED (${error.message})`);
    }
  }

  for (const [slug, iconPath] of Object.entries(DEVICON)) {
    try {
      const svg = await fetchDevicon(iconPath);
      await writeFile(path.join(techDir, `${slug}.svg`), svg, "utf8");
      console.log(`[icons] ${slug}.svg (devicon)`);
    } catch (error) {
      failed.push(slug);
      console.warn(`[icons] ${slug} FAILED (${error.message})`);
    }
  }

  if (failed.length) {
    console.warn(
      `\n[icons] ${failed.length} failed: ${failed.join(", ")}\n` +
        "Remove those entries from src/_data/techstack.json, or drop a hand-made SVG into src/assets/icons/tech/."
    );
  }
}

await main();
