import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.ico": "favicon.ico" });

  eleventyConfig.addFilter("readableDate", (value) => {
    if (!value) return "";
    return new Date(value).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
  });

  eleventyConfig.addFilter("isoDate", (value) =>
    new Date(value).toISOString().slice(0, 10)
  );

  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  eleventyConfig.addFilter("absoluteUrl", (path, base) => {
    try {
      return new URL(path, base).toString();
    } catch {
      return path;
    }
  });

  eleventyConfig.addFilter("externalHost", (url) => {
    try {
      return new URL(url).host.replace(/^www\./, "");
    } catch {
      return url;
    }
  });

  eleventyConfig.addFilter("jsonString", (value) => JSON.stringify(value ?? ""));

  eleventyConfig.addFilter("jsonArray", (arr, key) =>
    JSON.stringify(arr.map((item) => (key ? item[key] : item)))
  );

  eleventyConfig.addFilter("techNames", (items) =>
    items.map((item) => item.name)
  );

  eleventyConfig.addFilter("featured", (items) => items.filter((item) => item.featured));

  eleventyConfig.addFilter("profileUrls", (items) => items.map((item) => item.url));

  eleventyConfig.addFilter("istTime", () =>
    new Intl.DateTimeFormat("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
      hour12: true,
    }).format(new Date()) + " IST"
  );

  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/blog/*.md").sort((a, b) => b.date - a.date)
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html", "txt"],
  };
}
