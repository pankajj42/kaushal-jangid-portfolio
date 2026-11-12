// Usage: pnpm import:youtube [path/to/export.csv]
// Reads a YouTube channel export and writes one file per work into content/works.
// Existing files are never overwritten, so hand edits are safe. Re-run with a fresh export to add new videos.
import fs from "node:fs";
import path from "node:path";

const csv = process.argv[2] ?? "data/kaushal-jangid.csv";
const dir = path.resolve("content/works");
fs.mkdirSync(dir, { recursive: true });

function parse(t) {
  const rows = []; let r = [], f = "", q = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '"') { if (t[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
    else if (c === '"') q = true;
    else if (c === ",") { r.push(f); f = ""; }
    else if (c === "\n" || c === "\r") { if (c === "\r" && t[i + 1] === "\n") i++; r.push(f); rows.push(r); r = []; f = ""; }
    else f += c;
  }
  if (f || r.length) { r.push(f); rows.push(r); }
  return rows;
}
const [head, ...rows] = parse(fs.readFileSync(csv, "utf8").replace(/^\uFEFF/, ""));
const col = Object.fromEntries(head.map((h, i) => [h.trim(), i]));
const get = (r, k) => (r[col[k]] ?? "").trim();

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
const secs = (d) => d.split(":").map(Number).reduce((a, n) => a * 60 + n, 0);
const clean = (t) => t.replace(/#\S+/g, "").replace(/\s+/g, " ").trim();
const CLIENT = /weds|\s&\s|revofinance|phoenix tx|hired ink|total design|surveillance/i; // names stay hidden
const RULES = [
  ["logos", /logo|reveal/], ["celebrations", /anniversary|birthday|warming|mundan|celebration of life/],
  ["wedding", /wedding|invitation|save the date/],
  ["festivals", /diwali|christmas|thanksgiving|women|mother|father|easter|new year|nanak|halloween|forest day|greetings|wishes|wreath/],
  ["promos", /promo|pomo|stories|travel|globe/], ["slideshows", /slideshow|memor|photo/],
  ["business", /company|business|corporate|presentation|timeline|opener|profile|price|medical|architect|interior|technology/],
];
const categorize = (t) => RULES.find(([, re]) => re.test(t.toLowerCase()))?.[0] ?? "more";
const links = (d) => [...new Set((d.match(/https?:\/\/[^\s)>\]]+/g) ?? []).map((u) => u.replace(/[.,;]+$/, "")))].filter((u) => !u.endsWith("..."));
const store = (u) =>
  /videohive\.net\/item/.test(u) ? "videohive" : /creativemarket\.com\/[^/]+\/\d+/.test(u) ? "creativemarket"
  : /fiverr\.com\/kaushaljangid\/[^/]+/i.test(u) ? "fiverr" : null;

// Group videos that promote the same VideoHive item into one work.
const groups = new Map();
for (const r of rows) {
  if (r.length < 8) continue;
  const vh = get(r, "Description").match(/videohive\.net\/item\/[^\s/]+\/(\d+)/);
  const key = vh ? `vh:${vh[1]}` : `v:${get(r, "Video ID")}`;
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(r);
}

const works = [], views = new Map(), used = new Set();
for (const [key, g] of groups) {
  const first = g[g.length - 1]; // oldest
  const raw = clean(get(first, "Video Title"));
  const client = CLIENT.test(raw);
  const title = client ? `Client project: ${/anniversary/i.test(raw) ? "anniversary video" : /weds|&|wedding/i.test(raw) ? "wedding video" : "brand video"}` : raw;
  let id = `${slug(title)}-${key.startsWith("vh:") ? key.slice(3) : slug(get(first, "Video ID")).slice(0, 5).replace(/-+$/, "")}`;
  for (let n = 2; used.has(id); n++) id = `${id.replace(/-\d+$/, "")}-${n}`;
  used.add(id);
  const text = g.map((r) => get(r, "Description")).join("\n");
  const offers = client ? [] : links(text).flatMap((u) => { const s = store(u); return s ? [{ store: s, url: u }] : []; });
  const specs = client ? [] : [...new Set((text.match(/^\s*[*•]\s+.+$/gm) ?? []).map((l) => l.replace(/^\s*[*•]\s+/, "").trim()).filter((l) => l.length < 80))].slice(0, 6);
  const tags = client ? [] : [...new Set(g.flatMap((r) => (get(r, "Video Title").match(/#(\w+)/g) ?? []).map((t) => t.slice(1).toLowerCase())))].slice(0, 5);
  const videos = g.slice().reverse().slice(0, 6).map((r) => ({
    platform: "youtube", id: get(r, "Video ID"),
    aspect: secs(get(r, "Duration")) <= 60 || /vertical|portrait|stories/i.test(get(r, "Video Title")) ? "vertical" : "wide",
  }));
  const work = {
    id, title, category: client ? "client" : categorize(raw), year: Number(get(first, "Publish Date").slice(0, 4)), videos,
    ...(offers.length && { offers }), ...(specs.length && { specs }), ...(tags.length && { tags }), ...(client && { client: true }),
  };
  views.set(id, g.reduce((a, r) => a + (Number(get(r, "Views").replace(/,/g, "")) || 0), 0));
  works.push(work);
  const file = path.join(dir, `${id}.ts`);
  if (!fs.existsSync(file)) fs.writeFileSync(file, `import { defineWork } from "../types";\n\nexport default defineWork(${JSON.stringify(work, null, 2)});\n`);
}

// index.ts is YOUR ordered list (array order = display order). Created once; later runs only report new works.
const idx = path.join(dir, "index.ts");
const listed = fs.existsSync(idx) ? fs.readFileSync(idx, "utf8") : "";
if (!listed) {
  const imp = works.map((w, i) => `import w${i} from "./${w.id}";`).join("\n");
  fs.writeFileSync(idx, `import type { Work } from "../types";\n${imp}\n\n// Array order = display order on the site. Move, remove or add entries freely.\nconst list = [\n${works.map((_, i) => `  w${i},`).join("\n")}\n] as const;\n\nexport type WorkId = (typeof list)[number]["id"];\nexport const works: readonly Work[] = list;\n`);
} else {
  const fresh = works.filter((w) => !listed.includes(`./${w.id}"`));
  if (fresh.length) console.log(`New works not in index.ts yet:\n${fresh.map((w) => "  " + w.id).join("\n")}`);
}

const once = (name, body) => { const f = path.resolve("content", name); if (!fs.existsSync(f)) fs.writeFileSync(f, body); };
const byViews = works.filter((w) => !w.client).sort((a, b) => views.get(b.id) - views.get(a.id));
const perCat = {}, feat = [];
for (const w of byViews) { if ((perCat[w.category] = (perCat[w.category] ?? 0) + 1) <= 2 && feat.length < 8) feat.push(w.id); }
const fmt = (ids) => ids.map((i) => `  "${i}",`).join("\n");
once("featured.ts", `import type { WorkId } from "./works";\n\n// Home page favourites. Array order = display order. Unknown ids fail the type check.\nexport const featured = [\n${fmt(feat)}\n] satisfies WorkId[];\n`);
once("shop.ts", `import type { WorkId } from "./works";\n\n// Shop favourites shown first. Everything else with a buy link follows.\nexport const shopFavourites = [\n${fmt(byViews.filter((w) => w.offers).slice(0, 8).map((w) => w.id))}\n] satisfies WorkId[];\n`);
console.log(`${works.length} works from ${rows.length} videos; ${works.filter((w) => w.offers).length} with buy links; ${works.filter((w) => w.client).length} client projects.`);
