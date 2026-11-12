"use client";
import { useEffect, useRef, useState } from "react";

type Kind = { id: string; label: string; blurb: string; items: { src: string; title: string; sample?: boolean }[] };

export default function Gallery({ kinds }: { kinds: Kind[] }) {
  const [kindId, setKindId] = useState(kinds[0].id);
  const [open, setOpen] = useState<number | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const kind = kinds.find((k) => k.id === kindId) ?? kinds[0];
  const n = kind.items.length;

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);
  useEffect(() => {
    if (open === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % n));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + n) % n));
    };
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, [open, n]);

  const item = open === null ? null : kind.items[open];
  return (
    <div>
      {kinds.length > 1 && (
        <div role="group" aria-label="Gallery type" className="flex flex-wrap gap-2">
          {kinds.map((k) => <button key={k.id} className="chip" aria-pressed={k.id === kind.id} onClick={() => setKindId(k.id)}>{k.label}</button>)}
        </div>
      )}
      <p className="mt-4 max-w-xl text-paper/70">{kind.blurb}</p>
      <ul className="mt-8 columns-2 gap-3 md:columns-3 lg:columns-4">
        {kind.items.map((it, i) => (
          <li key={it.src} className="mb-3 break-inside-avoid">
            <button onClick={() => setOpen(i)} className="relative block w-full overflow-hidden rounded-xl" aria-label={`Open ${it.title}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.src} alt={it.sample ? `${it.title} (sample image)` : it.title} loading="lazy" className="h-auto w-full transition duration-500 hover:scale-105" />
              {it.sample && <span className="absolute left-2 top-2 rounded-full bg-ink/80 px-2 py-0.5 text-xs text-paper">Sample</span>}
            </button>
          </li>
        ))}
      </ul>
      <dialog ref={dlg} onClose={() => setOpen(null)} className="m-auto max-h-[92vh] max-w-[92vw] bg-transparent p-0 text-paper backdrop:bg-black/85">
        {item && (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.src} alt={item.title} className="max-h-[85vh] max-w-[92vw] rounded-xl object-contain" />
            <div className="mt-3 flex items-center justify-between gap-3 text-sm text-white">
              <span className="capitalize">{item.title}{item.sample ? " (sample)" : ""}</span>
              <span className="flex gap-2">
                <button className="chip !border-white/40 !text-white" onClick={() => setOpen((open! - 1 + n) % n)}>Previous</button>
                <button className="chip !border-white/40 !text-white" onClick={() => setOpen((open! + 1) % n)}>Next</button>
                <button className="chip !border-white/40 !text-white" onClick={() => setOpen(null)}>Close</button>
              </span>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
