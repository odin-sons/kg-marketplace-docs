# Contributing

This repo is plain Markdown files (`configs/`, `guides/`, `concepts/`, `npc/`, `setup/`, `reference/`, `api/`, `assets/`, `tooling/`, and `README.md`) plus a small [Eleventy](https://www.11ty.dev/) setup that turns them into a website. **Only the Markdown files need editing** — everything else here is site plumbing you shouldn't need to touch.

## Found a mistake but don't want to fix it yourself?

[Open an issue](https://github.com/odin-sons/kg-marketplace-docs/issues/new/choose) — pick "Documentation correction" for something wrong/outdated/unclear on an existing page, or "Missing documentation" for something not covered at all. On the built site, you can also select any text on a page and click **Suggest a correction** in the popup that appears — it opens a new issue with the page and the exact text already filled in.

## Editing the docs

1. Edit the relevant `.md` file(s) directly. No special syntax is needed beyond normal Markdown — headings become the page title and section anchors automatically, links between `.md` files (like `[Quests](../configs/quests.md)`) work both on GitHub and on the built site, and any image — a `https://i.imgur.com/...` link or a local file — is automatically compressed and converted to modern formats on the built site, with no visible quality loss.
2. Commit and push.

If you have push access, push straight to `main` — that's it, no PR needed. Pushing to `main` automatically rebuilds and republishes the site on both mirrors, no local build step required. If you don't have push access, fork the repo, push your commit to the fork, and open a pull request against `main` instead — the PR template has a short checklist covering the same points as this file.

## Previewing your changes locally (optional, recommended for bigger edits)

One-time setup:

1. Install [Node.js](https://nodejs.org/) (version 22 or newer).
2. In this folder, run:
   ```
   npm install
   ```

Every time you want to preview:

```
npm start
```

This opens a local preview of the site at `http://localhost:8080` that live-reloads as you edit and save `.md` files. Press `Ctrl+C` to stop it.

To just build the site once without a live preview:

```
npm run build
```

The built site is written to a `_site/` folder, which is not committed — it's regenerated on every build and every push. The first build (or the first one after adding a new image) is slower than usual, since every image referenced anywhere in the docs gets downloaded and re-encoded once; a `.cache/` folder keeps that fast on later builds and is also not committed.

## What not to touch (unless you know why)

- Don't add anything to the top of a `.md` file that looks like `---\nkey: value\n---` (front matter) — these files are read as plain Markdown elsewhere too, and must stay that way.
- `eleventy.config.js`, `_includes/`, `_data/`, `styles/`, and `scripts/` are the site's templating/build config. If you need a new page to show up in the sidebar, add it to `_data/nav.js`. Site-only images (like the logo) live in `images/`.

## How publishing works

A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds the site once on every push to `main`, then publishes the exact same build to two mirrors:

- **GitHub Pages** — works everywhere, including for readers in regions where Cloudflare is blocked.
- **Cloudflare Pages** — faster, nicer domain.

### One-time setup for a new fork/mirror (not needed on the existing repo)

- GitHub repo → Settings → Pages → set "Source" to **GitHub Actions**.
- Create a Cloudflare Pages project once via the [Cloudflare dashboard](https://dash.cloudflare.com/) (Workers & Pages → Create → Pages), matching the `--project-name` used in the workflow.
- Create a Cloudflare API token (Account → Cloudflare Pages → Edit permission) and find your Account ID, then add them as repo secrets: Settings → Secrets and variables → Actions →
  - `CLOUDFLARE_API_TOKEN`
  - `CLOUDFLARE_ACCOUNT_ID`
