"use client";
import { useState } from "react";
import type { Work } from "@/content/types";
import VideoPlayer from "./VideoPlayer";

export default function WorkPlayer({ work }: { work: Work }) {
  const [i, setI] = useState(0);
  const v = work.videos[i];
  return (
    <div className={v.aspect === "vertical" ? "mx-auto w-full max-w-[22rem]" : "w-full"}>
      <VideoPlayer key={i} video={v} title={work.title} />
      {work.videos.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Versions">
          {work.videos.map((_, n) => <button key={n} className="chip" aria-pressed={n === i} onClick={() => setI(n)}>Version {n + 1}</button>)}
        </div>
      )}
    </div>
  );
}
