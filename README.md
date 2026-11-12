# Kaushal Jangid portfolio

Next.js 16, React 19, Tailwind v4, Motion. Node 22+.

    pnpm install && pnpm dev      # http://localhost:3000
    pnpm typecheck                # catches wrong ids in featured.ts / shop.ts / order.ts
    pnpm build

## Edit the content (everything is in `content/`)
| File | Controls |
|---|---|
| `profile.ts` | name, intro, about, skills, tools, links, stats, email |
| `categories.ts` | category names and the order of the filter chips |
| `works/*.ts` | one file per work (title, category, videos, buy links) |
| `works/index.ts` | **one ordered array of all works = display order** |
| `featured.ts` | ordered favourites for the home page |
| `shop.ts` | ordered favourites shown first in the shop |
| `order.ts` | pin favourites to the top of a single category |
| `testimonials.ts` | client quotes |

Add a work: copy any file in `content/works`, change it, and add it to `works/index.ts`.
Videos are embeds only: `{ platform: "youtube" | "vimeo" | "instagram", id, aspect }`.

## Refresh from YouTube
Export your channel to CSV, then `pnpm import:youtube path/to/export.csv`. It adds files for new videos,
never overwrites edited ones, and lists new works to add to `works/index.ts`.
Videos that promote the same VideoHive item are merged into one work. Client names are replaced with "Client project".

## Deploy
Push to GitHub, import on Vercel, no settings needed.

## More features
- **Dark/light mode**: follows the visitor's system, with a toggle in the header. Colours live in `app/globals.css` (`--c-*`).
- **Project pages**: every work has `/work/<id>` (static, with SEO tags and video structured data). `sitemap.xml` and `robots.txt` are generated.
- **Section order**: `content/site.ts`. Remove a name to hide a section.
- **Services, order steps, FAQ**: `content/services.ts`, `content/faq.ts`.
- **Photography, 3D and fonts**: drop images into `public/gallery/photography`, `3d` or `fonts`. A section appears per folder that has images. Keep each under about 1 MB.
- **Custom cursor and page transitions**: `components/Cursor.tsx` (mouse devices only), `app/template.tsx`.
- Set `NEXT_PUBLIC_SITE_URL` on Vercel once you have a domain so the sitemap uses it.

## Sample gallery images
`public/gallery/` ships with 12 generated stand-ins (`sample-*.jpg`: 3D renders, bokeh "photos", type specimens) so the
Photography, 3D and Font sections are not empty. They show a "Sample" tag. Replace them by adding your own files to the same
folders and deleting the `sample-*` ones. Files without the `sample-` prefix show with no tag.
