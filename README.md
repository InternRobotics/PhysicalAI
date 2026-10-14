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

The website includes the book introduction, a three-part expandable table of contents, author information, companion resources, contact information, and a provisional citation. An original concept cover and a vector overview figure are included. The manuscript is not yet publicly released. The only arXiv reading link appears under **Explore Intelligence in the Physical World.** It currently points to an unpublished placeholder that returns 404.

## Development

Requires **Node.js 20.9+** and **pnpm**. The pnpm version is specified in `package.json`.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the local URL printed by Next.js.

```sh
pnpm typecheck
pnpm test:analytics
pnpm build
```

The static export is generated in `out/`. The GitHub Pages workflow is in `.github/workflows/deploy-pages.yml`; it configures the deployment base path automatically.

## Updating content

| Content | Location |
| --- | --- |
| Book information, cover configuration, resource links, and citation | `src/data/project-page.ts` |
| Parts, chapters, sections, and page numbers | `src/data/contents.json` |
| arXiv destination | `projectInfo.arxivUrl` in `src/data/project-page.ts` |
| Click collection, persistence, and aggregation | `src/lib/analytics.ts` |
| Analytics dashboard | `src/app/analytics/` and `src/components/analytics/` |
| Unreleased manuscript (local only, excluded from Git and deployment) | `reference/private-manuscript/` |
| Cover artwork and book figures | `public/images/monograph/` |
| Page sections and layout | `src/components/research-page/` |
| Theme and responsive styles | `src/app/globals.css` |

The current concept cover is in `public/images/monograph/cover-v2.png`. To replace it with final artwork, place the new image in the same directory and update `bookCover.src`, its dimensions, and alternative text in `src/data/project-page.ts`. The existing hover interaction and mobile placement apply to the replacement automatically.

Replace `projectInfo.arxivUrl` with the official public arXiv URL after release. The button links directly to arXiv without an intermediate page. Keep unpublished PDFs outside `public/`; `reference/` is ignored by Git and is not part of the site export. The manuscript extraction script reads the local copy under `reference/private-manuscript/`.

Unavailable resource links use `href: null`. Add their URLs and labels when the materials are ready. Publisher, publication date, and purchase link are configured in `projectInfo`. The table of contents displays one column per part on desktop and one column on smaller screens. Chapter rows expand or collapse their sections; the table of contents has no reading links. The former `/read/` and `/chapters/` pages have been removed.

Set `contactInfo.email` in `src/data/project-page.ts` to enable the InternRobotics email link. While it is `null`, the site displays an email placeholder without a fabricated address.

## Click analytics

[Analytics dashboard](https://internrobotics.github.io/PhysicalAI/analytics/)

The bottom arXiv button records `arxiv_click` events. Its left click, keyboard activation, and middle click are counted even while the destination returns 404. These are button clicks, not unique readers or completed downloads.

By default, daily counts are saved in **this browser only**, under the `physicalai:arxiv-clicks:v1` localStorage key. The dashboard shows total clicks, today's clicks, the last seven days, 7/30/90-day charts, a daily table, and CSV export. Dates use Asia/Shanghai (UTC+8). Different visitors, devices, browsers, and browser profiles are not combined. Clearing browser data removes local counts. Storage or analytics failures do not block the arXiv link.

No external analytics service is enabled by default. Two optional HTTPS endpoints are ready for future global collection and visualization:

| Configuration | Purpose |
| --- | --- |
| `NEXT_PUBLIC_ANALYTICS_EVENT_ENDPOINT` | Receives click events via POST |
| `NEXT_PUBLIC_ANALYTICS_SUMMARY_ENDPOINT` | Supplies the dashboard's aggregated daily counts via GET |

For local development, copy `.env.example` to `.env.local`. For GitHub Pages, set these names as repository Actions variables and rebuild. Leave both empty for browser-local analytics. A collection endpoint alone does not turn local dashboard data into global counts: the summary endpoint must also be configured. When the summary endpoint is configured, the dashboard labels its data as global and reports service failures explicitly.

The collection payload is JSON sent with a `text/plain` content type, so the endpoint should parse the text body as JSON:

```json
{"event":"arxiv_click","event_id":"unique-event-id","occurred_at":"2026-10-14T08:00:00Z","source":"bottom_cta","destination":"https://arxiv.org/abs/0000.00000"}
```

The backend should deduplicate `event_id`, aggregate dates in Asia/Shanghai, and return this summary shape with CORS access for the website:

```json
{"version":1,"daily":{"2026-10-14":12},"updatedAt":"2026-10-14T08:00:00Z"}
```

The daily count above is a schema example, not live data. No reader identity, IP address, referrer, or browser fingerprint is added to the application payload. An optional integration can listen for the `physicalai:analytics` browser event; its detail also indicates whether the local count was saved.

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
