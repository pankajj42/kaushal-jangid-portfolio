"use client";
import Link from "next/link";
import { useState } from "react";
import { categories } from "@/content/categories";
import { storeLabels, type Work } from "@/content/types";
import VideoPlayer from "./VideoPlayer";

export default function WorkCard({ work }: { work: Work }) {
  const [i, setI] = useState(0);
  const category = categories.find((c) => c.id === work.category)?.label;
  return (
    <article>
      <VideoPlayer key={i} video={work.videos[i]} title={work.title} />
      {work.videos.length > 1 && (
        <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label="Versions">
          {work.videos.map((_, n) => (
            <button key={n} aria-pressed={n === i} aria-label={`Version ${n + 1}`} onClick={() => setI(n)} className="chip !min-h-8 !px-3 !text-xs">{n + 1}</button>
          ))}
        </div>
      )}
      <h3 className="mt-3 font-display text-lg leading-snug"><Link href={`/work/${work.id}`} className="hover:text-brass">{work.title}</Link></h3>
      <p className="text-sm text-paper/60">{category}, {work.year}</p>
      <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm">
        <Link href={`/work/${work.id}`} className="underline underline-offset-4 hover:text-brass">Details</Link>
        {work.offers?.map((o) => (
          <a key={o.url} href={o.url} target="_blank" rel="noopener noreferrer" className="text-brass underline underline-offset-4 hover:text-blush">{storeLabels[o.store]}</a>
        ))}
      </p>
    </article>
  );
}
