# Physical AI: Concepts, Techniques, and Challenges

The companion website for the forthcoming monograph by the **Physical Intelligence Team, Shanghai AI Laboratory**.

[Website](https://internrobotics.github.io/PhysicalAI/)

## About the book

The monograph develops a unified view of Physical AI: artificial systems that perceive, model, and act upon the physical world through continuous feedback under real-world constraints. It connects foundations in physics, control, cognition, learning, and reasoning with perception, data, world models, embodied foundation models, physical agents, and hardware–software systems.

The forthcoming monograph contains **12 chapters in three parts**:

| Part | Chapters | Scope |
| --- | --- | --- |
| I. Overview and Foundations | 1–2 | Definitions, boundaries, and technical foundations |
| II. Methodology | 3–9 | Perception, data, world models, manipulation, motor control, agents, and systems |
| III. Future Outlook | 10–12 | General physical intelligence, evaluation, safety, governance, and development strategies |

The website includes the book introduction, an expandable table of contents, author information, companion resources, and a provisional citation. An original concept cover is included. The manuscript is not yet publicly released; its reading link is disabled. Publication details and additional resources will be added when available.

## Development

Requires **Node.js 20.9+** and **pnpm**. The pnpm version is specified in `package.json`.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the local URL printed by Next.js.

```sh
pnpm typecheck
pnpm build
```

The static export is generated in `out/`. The GitHub Pages workflow is in `.github/workflows/deploy-pages.yml`; it configures the deployment base path automatically.

## Updating content

| Content | Location |
| --- | --- |
| Book information, cover configuration, resource links, and citation | `src/data/project-page.ts` |
| Parts, chapters, sections, and page numbers | `src/data/contents.json` |
| Unreleased manuscript (local only, excluded from Git and deployment) | `reference/private-manuscript/` |
| Cover artwork and book figures | `public/images/monograph/` |
| Page sections and layout | `src/components/research-page/` |
| Theme and responsive styles | `src/app/globals.css` |

The current concept cover is in `public/images/monograph/cover-v2.png`. To replace it with final artwork, place the new image in the same directory and update `bookCover.src`, its dimensions, and alternative text in `src/data/project-page.ts`. The existing hover interaction and mobile placement apply to the replacement automatically.

The manuscript URL is set to `projectInfo.pdf: null`. Set it to a public URL only when the manuscript is ready for release. Keep unpublished PDFs outside `public/`; `reference/` is ignored by Git and is not part of the site export. The manuscript extraction script reads the local copy under `reference/private-manuscript/`.

Unavailable resource links use `href: null`. Add their URLs and labels when the materials are ready. Publisher, publication date, and purchase link are configured in `projectInfo`. The table of contents expands within the page and does not link to PDF chapters.

## Citation

```bibtex
@misc{physicalai2026monograph,
  title  = {Physical AI: Concepts, Techniques, and Challenges},
  author = {{Physical Intelligence Team, Shanghai AI Laboratory}},
  year   = {2026},
  note   = {Forthcoming; manuscript not yet publicly released}
}
```

The citation will be updated when final publication details are available.
