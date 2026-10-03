# manusrao — portfolio

Static personal portfolio, built with [Eleventy](https://www.11ty.dev/) and
Tailwind CSS. No client-side framework, no CMS, no runtime dependencies — the
build output in `_site/` is plain HTML, CSS and a few KB of vanilla JS.

Content (bio, experience, projects, tech stack) is derived from the résumé
(`src/assets/resume.pdf`), which is the single source of truth.

## Stack

| | |
|---|---|
| Generator | Eleventy 3 (Nunjucks templates) |
| Styling | Tailwind CSS v4 (`@theme` tokens, class-based dark mode) |
| Fonts | Geist + Geist Mono via Google Fonts |
| Icons | Self-hosted SVGs; social icons inlined as SVG so they inherit colour |
| Blog | Markdown collection, migrated off HyGraph |
| Hosting | Any static host — Netlify / Cloudflare Pages / Vercel |

## Getting started

```bash
npm install
npm run dev          # http://localhost:8080
```

`npm run dev` runs Tailwind in watch mode and Eleventy's dev server together.

```bash
npm run build        # -> _site/
npm run clean        # remove _site, the fetch cache and the generated CSS
```

## Site URL

`site.url` drives the canonical tags, the Open Graph URLs, `sitemap.xml` and
`robots.txt`. It is read at build time in
[`src/_data/site.js`](./src/_data/site.js), in this order:

1. `SITE_URL` — set this on any host other than Netlify, or to force a custom domain.
2. `URL` — set automatically by Netlify to the site's primary domain.
3. `http://localhost:8080` — local development.

## Project structure

```
src/
├── _data/                 # all content lives here, in render order
│   ├── site.js            # url (from env), title, description, nav, flags
│   ├── profile.json       # name, role, bio, location, email
│   ├── socials.json       # GitHub, LinkedIn, X, Email
│   ├── techstack.json     # flat skill list — logo only, name on hover
│   ├── experience.json    # roles, bullets — resume order
│   ├── education.json
│   ├── projects.json      # resume order
│   └── contributions.js   # GitHub heatmap data (fetched + cached 1 day)
├── _includes/
│   ├── layouts/           # base, home, page, post
│   ├── components/        # nav, hero, sections, cards, footer
│   └── macros/            # icon + tag macros
├── assets/
│   ├── css/tailwind.css   # design tokens — `main.css` is generated, gitignored
│   ├── js/                # theme toggle, header, clock, contact form
│   ├── icons/tech/        # self-hosted tech logos
│   ├── images/
│   └── resume.pdf         # served at /assets/resume.pdf
├── blog/                  # markdown posts
├── index.njk              # the one-page portfolio
├── projects.njk           # /projects/
├── blog.njk               # /blog/
├── 404.njk                # /404.html
├── robots.njk             # -> /robots.txt
└── sitemap.njk            # -> /sitemap.xml
```

### Home page order

Hero → Tech Stack → Experience (then Education) → Projects → GitHub → Contact.

Items inside **Experience** and **Projects** render in the exact order they
appear in the resume. Nothing is sorted by date.

## Editing content

All content is JSON in `src/_data/` — no templates need touching:

- **New role** → prepend an object to `experience.json`.
- **New project** → append to `projects.json`. `featured: true` shows it on the
  home page; everything shows on `/projects/`. `live`, `github` and `image` are
  optional — omit them or use `""`.
- **New post** → drop a `.md` file in `src/blog/` with frontmatter:

  ```yaml
  ---
  title: "Post title"
  description: "One-line summary"
  date: 2026-01-31
  tags: ["backend"]
  cover: "/assets/images/blog/my-cover.png"   # optional
  ---
  ```

The Blog link only appears in the nav when at least one post exists.

Code blocks are syntax highlighted, but only for fenced blocks that declare a
language (```` ```js ````). The four posts migrated from the old CMS store their
code as raw HTML with no language class, so those render as plain monospace
blocks. Re-fence them with a language if you want them tokenised.

### Contact

There is no backend. The contact section has profile cards, an orange badge
sitting on top of the LinkedIn/X cards that downloads the résumé
(`src/assets/resume.pdf`, also reachable at `/resume`), and a message form
that opens the visitor's mail app with the subject and body pre-filled
(`mailto:`). To update the résumé, replace `src/assets/resume.pdf`.

## Optional maintenance scripts

```bash
npm run icons         # re-download tech logos from Simple Icons
npm run migrate:blog  # re-pull posts from the old HyGraph CMS (one-off)
```

`npm run icons` pulls from Simple Icons, falling back to Devicon for the two
brands Simple Icons no longer ships: the Java coffee cup and the AWS wordmark.
Any brand colour too dark to read on the dark theme is re-fetched in a neutral
grey.

Because the tech stack is logo-only, every entry in `techstack.json` needs an
`icon`. Amazon Redshift was dropped for exactly this reason — no AWS/Redshift
logo is redistributable. Add an SVG to `src/assets/icons/tech/` if you want it
back.

## Social preview image

`src/assets/images/og-image.png` is the 1200×630 card used for link previews.
It is a committed asset — replace the file to change it (keep the filename and
roughly those dimensions).

## Deploying

`netlify.toml` is included: build `npm run build`, publish `_site`.
On Cloudflare Pages use the same values. Node 20+.

## Notes

- The GitHub contributions section fetches public data from
  `github-contributions-api.jogruber.de` at build time and caches it for a day.
  If the request fails the section is skipped — the build never breaks.
  Set `showContributions: false` in `site.js` to hide it entirely.
  Because the data is fetched at build time, `.github/workflows/daily-rebuild.yml`
  pings a Netlify build hook every morning. Create a build hook in Netlify
  (Site configuration → Build & deploy → Build hooks) and save its URL as the
  `NETLIFY_BUILD_HOOK` repository secret; without it the workflow is a no-op.
- The site's only external request at runtime is Google Fonts.
- Asset filenames are not hashed, so `netlify.toml` deliberately avoids
  `immutable` caching; CSS, JS and the résumé revalidate on every visit.
- Old Next.js URLs (`/blogs`, `/blogs/<slug>`) 301-redirect to `/blog/…`.
- The pre-rewrite Next.js version is preserved on the `legacy-nextjs` branch.
