# Contributing to the Robotics Club IITJ Website

Welcome, and thank you for your interest in contributing! This document explains the contribution workflow and guidelines for each type of contribution.

---

## Ground Rules

- **Never push directly to `main`.** All changes must come in through a Pull Request (PR).
- If you are **not a collaborator**, fork the repository first, make your changes on a branch in your fork, and open a PR from there.
- If you are a **collaborator**, still create a feature branch and open a PR — do not commit directly to `main`.
- Keep PRs focused and small. One PR should ideally address one thing.

---

## Types of Contributions

### 1. Content Contributions ✍️

Content contributions are the most common and easiest type of contribution. These are **highly encouraged** and will be reviewed and merged quickly as long as the content is accurate and follows the formatting rules below.

Content contributions include:

| What | Where in the repo |
|---|---|
| New blog posts | `content/blogs/<slug>.md` |
| Inline blog images | `public/blogs/<image-file>` |
| Blog thumbnail images | `public/blogs/<thumbnail-file>` |
| Project descriptions | `src/lib/data.ts` → `projects` array |
| Team / member info | `src/lib/data.ts` → `coreTeam`, `mentors`, `coordinators` arrays |
| Alumni info | `src/lib/data.ts` → `alumni` array |

---

#### Writing a Blog Post

1. Create a new file at `content/blogs/<your-slug>.md`.  
   The slug becomes the URL: `content/blogs/ros-basics.md` → `/blogs/ros-basics`

2. Add a **frontmatter block** at the very top of the file:

```yaml
---
title: "Your Blog Title Here"
date: 2026-11-08
author: "Your Name"
tags: [ros2, robotics, tutorial]
excerpt: "A short one-line summary shown on the blog listing card."
thumbnail: "/blogs/your-thumbnail.png"   # optional — omit if you have no image
---

Your markdown content starts here...
```

| Field | Required | Description |
|---|---|---|
| `title` | Yes | Displayed as the page heading and card title |
| `date` | Yes | Format: `YYYY-MM-DD`. Used for sorting (newest first) |
| `author` | Yes | Your name, shown on the card and post header |
| `tags` | recommended | Shown as small pill badges on the card |
| `excerpt` | recommended | One-sentence summary on the listing card |
| `thumbnail` | optional | Card cover image. See asset rules below |

3. Write your content in standard Markdown. GitHub Flavored Markdown (tables, task lists, etc.) is fully supported.

4. YouTube links are auto-embedded — just paste a bare YouTube URL as the link `href` and display text, and it renders as an inline video player.

---

#### Uploading Assets (Images)

All blog-related images (thumbnails and inline images) must be placed inside **`public/blogs/`**.

**Naming convention:**
- Use lowercase, hyphen-separated filenames.
- Include a descriptive name: `slam-architecture.png`, `docker-logo.png`, `ros2-graph.jpeg`.
- Avoid spaces, capital letters, and special characters.

**Supported formats:** `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.svg`

**How to reference in your blog post:**

```markdown
<!-- Inline image inside blog content -->
![Alt text describing the image](/blogs/your-image.png)

<!-- Thumbnail in frontmatter -->
thumbnail: "/blogs/your-thumbnail.png"
```

> The path always starts with `/blogs/` (not `public/blogs/`) because `public/` is the root for static assets.

**Keep image file sizes reasonable.** Prefer compressed PNGs or JPEGs. Avoid uploading raw photos over ~1–2 MB.

---

### 2. Code Contributions

Code contributions — changes to the Next.js source code, components, styling, page logic, or infrastructure — are welcome in principle, but are subject to a **stricter review process**.

> **Important:** Unsolicited code PRs will very likely not be merged. Please always raise an issue first.

**The required workflow for code contributions:**

1. **Open an Issue first.**  
   Describe what you want to change and why. The maintainers will review the proposal, ask questions, and confirm whether the change is desirable before any code is written.

2. **Wait for approval.**  
   Only proceed to write code after a maintainer has explicitly confirmed the issue is worth addressing.

3. **Then fork and open a PR.**  
   Reference the issue number in your PR description (e.g., `Closes #12`). The PR will then go through a thorough code review before being considered for merging.

This process exists to protect the site's design consistency and performance, and to avoid wasted effort on changes that may not align with the club's direction.

---

## Pull Request Checklist

Before opening a PR, make sure:

- [ ] Your branch is up-to-date with `main`
- [ ] The site builds without errors: `npm run build`
- [ ] TypeScript type-checks pass: `npx tsc --noEmit`
- [ ] No unused imports, dead code, or console logs are left in
- [ ] Image files are placed in `public/blogs/` with a sensible name
- [ ] Blog frontmatter is complete and correctly formatted
- [ ] The PR description clearly explains what was changed and why

---

## Getting Help

If you have questions about the contribution process or the codebase, reach out via:

- **Email:** [robotics@iitj.ac.in](mailto:robotics@iitj.ac.in)
- **GitHub Issues:** Open an issue on this repository

---

*Thank you for helping make the Robotics Club IITJ website better!*
