"use client";
import { useState } from "react";
import type { Video } from "@/content/types";

// Click-to-play facade: only the thumbnail loads until someone presses play, then the platform's own embed takes over.
const embed = (v: Video) =>
  v.platform === "youtube" ? `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&playsinline=1`
  : v.platform === "vimeo" ? `https://player.vimeo.com/video/${v.id}?autoplay=1`
  : `https://www.instagram.com/p/${v.id}/embed`;

export default function VideoPlayer({ video, title }: { video: Video; title: string }) {
  const [playing, setPlaying] = useState(false);
  const ratio = video.aspect === "vertical" ? "aspect-[9/16]" : "aspect-video";
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-pine ${ratio}`}>
      {playing ? (
        <iframe
          src={embed(video)} title={title} className="absolute inset-0 h-full w-full"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen
        />
      ) : (
        <button onClick={() => setPlaying(true)} aria-label={`Play ${title}`} className="group absolute inset-0 grid place-items-center">
          {video.platform === "youtube" && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          )}
          <span className="relative grid size-14 place-items-center rounded-full bg-brass text-ink shadow-xl transition group-hover:scale-110 group-active:scale-95">
            <svg viewBox="0 0 24 24" className="ml-0.5 size-6" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
          </span>
        </button>
      )}
    </div>
  );
}
