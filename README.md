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

The website includes the book introduction, a three-part expandable table of contents, 12 chapter overview pages, publication updates, author information, companion resources, contact information, and a provisional citation. An original concept cover is included. The manuscript is not yet publicly released: the overview pages contain outlines and a publication notice, with manuscript access disabled until release.

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
| Chapter introductions and future public reading URLs | `src/data/reading.ts` |
| Chapter overview pages | `src/app/chapters/[chapter]/page.tsx` |
| Publication updates page | `src/app/read/page.tsx` |
| Optional click-event integration | `src/lib/analytics.ts` |
| Unreleased manuscript (local only, excluded from Git and deployment) | `reference/private-manuscript/` |
| Cover artwork and book figures | `public/images/monograph/` |
| Page sections and layout | `src/components/research-page/` |
| Theme and responsive styles | `src/app/globals.css` |

The current concept cover is in `public/images/monograph/cover-v2.png`. To replace it with final artwork, place the new image in the same directory and update `bookCover.src`, its dimensions, and alternative text in `src/data/project-page.ts`. The existing hover interaction and mobile placement apply to the replacement automatically.

All public reading destinations in `publicationLinks` (`src/data/reading.ts`) are currently `null`. After release, set `book` to the public monograph URL and the relevant `chapters` entries to their public arXiv or publisher URLs. The chapter overview routes remain stable, and their access buttons enable only when a URL has been supplied. Keep unpublished PDFs outside `public/`; `reference/` is ignored by Git and is not part of the site export. The manuscript extraction script reads the local copy under `reference/private-manuscript/`.

Unavailable resource links use `href: null`. Add their URLs and labels when the materials are ready. Publisher, publication date, and purchase link are configured in `projectInfo`. The table of contents displays one column per part on desktop and one column on smaller screens. Chapter titles open overview pages; the rest of a chapter row expands or collapses its sections.

Set `contactInfo.email` in `src/data/project-page.ts` to enable the InternRobotics email link. While it is `null`, the site displays an email placeholder without a fabricated address.

## Click-event integration

Analytics is a placeholder and is **disabled by default** (`analyticsConfig.enabled: false` in `src/lib/analytics.ts`). No analytics provider, network collection, shared click counter, or browser storage is enabled.

The navigation uses `TrackedLink` and defines `chapter_open`, `reading_open`, and `publication_open` events. When a provider is selected, connect a listener to the `physicalai:analytics` browser event and enable the configuration. Its `detail` contains `name` and `parameters`, including the chapter ID and entry point; publication events also include the public destination. Aggregate counts must come from the chosen provider. Event failures do not block navigation.

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
