import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/clemvuk6d0bvu01t826s979bp/master";

const QUERY = `
  query Posts {
    posts(orderBy: publishedOn_DESC) {
      title
      publishedOn
      slug
      author {
        name
      }
      content {
        html
      }
      coverPhoto {
        url
      }
      categories {
        category
      }
    }
  }
`;

const BLOG_DIR = path.join("src", "blog");
const IMAGE_DIR = path.join("src", "assets", "images", "blog");

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function firstParagraph(html) {
  const match = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  const text = stripHtml(match ? match[1] : html);
  if (text.length <= 180) return text;

  const cut = text.lastIndexOf(" ", 180);
  return `${text.slice(0, cut > 0 ? cut : 180).trim()}…`;
}

function extensionFor(url, contentType) {
  const fromUrl = path.extname(new URL(url).pathname).replace(".", "");
  if (fromUrl) return fromUrl;
  if (contentType?.includes("png")) return "png";
  if (contentType?.includes("webp")) return "webp";
  if (contentType?.includes("avif")) return "avif";
  return "jpg";
}

function frontmatter(fields) {
  const lines = Object.entries(fields)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.length
          ? `${key}:\n${value.map((v) => `  - ${JSON.stringify(v)}`).join("\n")}`
          : null;
      }
      return `${key}: ${JSON.stringify(value)}`;
    })
    .filter(Boolean);

  return `---\n${lines.join("\n")}\n---\n`;
}

async function main() {
  console.log(`[blog] querying ${ENDPOINT}`);

  let posts = [];
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY }),
    });
    const json = await response.json();
    if (json.errors) throw new Error(JSON.stringify(json.errors));
    posts = json?.data?.posts ?? [];
  } catch (error) {
    console.error(`[blog] could not reach HyGraph: ${error.message}`);
    console.error("[blog] nothing migrated — src/blog/ left untouched.");
    process.exitCode = 0;
    return;
  }

  if (posts.length === 0) {
    console.log("[blog] no published posts found — nothing to migrate.");
    return;
  }

  await mkdir(BLOG_DIR, { recursive: true });
  await mkdir(IMAGE_DIR, { recursive: true });

  let migrated = 0;

  for (const post of posts) {
    const slug = post.slug;
    let cover = "";

    if (post.coverPhoto?.url) {
      try {
        const imageResponse = await fetch(post.coverPhoto.url);
        if (!imageResponse.ok) throw new Error(`HTTP ${imageResponse.status}`);
        const buffer = Buffer.from(await imageResponse.arrayBuffer());
        const extension = extensionFor(
          post.coverPhoto.url,
          imageResponse.headers.get("content-type")
        );
        const filename = `${slug}.${extension}`;
        await writeFile(path.join(IMAGE_DIR, filename), buffer);
        cover = `/assets/images/blog/${filename}`;
      } catch (error) {
        console.warn(`[blog] ${slug}: cover download failed (${error.message})`);
      }
    }

    const html = post.content?.html ?? "";
    const tags = (post.categories ?? []).map((entry) => entry.category).filter(Boolean);

    const document = `${frontmatter({
      title: post.title,
      description: firstParagraph(html),
      date: post.publishedOn,
      tags,
      cover,
      author: post.author?.name,
    })}
${html.trim()}
`;

    await writeFile(path.join(BLOG_DIR, `${slug}.md`), document, "utf8");
    console.log(`[blog] wrote src/blog/${slug}.md`);
    migrated += 1;
  }

  console.log(`[blog] done — ${migrated} post(s) migrated.`);
}

await main();
