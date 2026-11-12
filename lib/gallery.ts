import fs from "node:fs";
import path from "node:path";

export const galleryKinds = [
  { id: "photography", label: "Photography", blurb: "Portraits, events and travel, edited in Lightroom and Photoshop." },
  { id: "3d", label: "3D", blurb: "Models and renders made in Maya and 3ds Max." },
  { id: "fonts", label: "Font design", blurb: "Custom lettering and typefaces." },
] as const;

/** Reads public/gallery/<kind>/ at build time. Drop images in a folder and they appear. No code or config. */
export function getGallery() {
  return galleryKinds
    .map((k) => {
      let files: string[] = [];
      try { files = fs.readdirSync(path.join(process.cwd(), "public", "gallery", k.id)).filter((f) => /\.(jpe?g|png|webp|avif|gif)$/i.test(f)).sort(); } catch {}
      return { ...k, items: files.map((f) => ({ src: `/gallery/${k.id}/${f}`, title: f.replace(/\.[^.]+$/, "").replace(/^sample[-_]/i, "").replace(/[-_]+/g, " "), sample: /^sample[-_]/i.test(f) })) };
    })
    .filter((k) => k.items.length > 0);
}
