"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { categories } from "@/content/categories";
import { categoryPins } from "@/content/order";
import { storeLabels, type Work } from "@/content/types";
import WorkCard from "./WorkCard";

const PAGE = 12;

/** One grid for both sections: portfolio filters by category, shop filters by store. */
export default function Showcase({ items, mode }: { items: readonly Work[]; mode: "portfolio" | "shop" }) {
  const [filter, setFilter] = useState("all");
  const [shown, setShown] = useState(PAGE);

  const chips = useMemo(
    () => mode === "shop"
      ? Object.entries(storeLabels).filter(([s]) => items.some((w) => w.offers?.some((o) => o.store === s))).map(([id, label]) => ({ id, label }))
      : categories.filter((c) => items.some((w) => w.category === c.id)).map((c) => ({ id: c.id as string, label: c.label as string })),
    [items, mode],
  );

  const list = useMemo(() => {
    if (filter === "all") return items;
    const hit = items.filter((w) => (mode === "shop" ? w.offers?.some((o) => o.store === filter) : w.category === filter));
    const pins = (mode === "portfolio" ? (categoryPins as Record<string, readonly string[] | undefined>)[filter] : undefined) ?? [];
    return [...pins.flatMap((id) => hit.filter((w) => w.id === id)), ...hit.filter((w) => !pins.includes(w.id))];
  }, [items, filter, mode]);

  const pick = (id: string) => { setFilter(id); setShown(PAGE); };

  return (
    <div>
      <div role="group" aria-label="Filter" className="scroller -mx-5 flex gap-2 overflow-x-auto px-5 pb-2">
        {[{ id: "all", label: "Everything" }, ...chips].map((c) => (
          <button key={c.id} className="chip" aria-pressed={filter === c.id} onClick={() => pick(c.id)}>{c.label}</button>
        ))}
      </div>
      <ul className="mt-8 grid grid-cols-2 items-start gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.slice(0, shown).map((w) => (
            <motion.li key={w.id} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.25 }}>
              <WorkCard work={w} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {shown < list.length && (
        <div className="mt-12 text-center">
          <button className="btn-ghost" onClick={() => setShown((s) => s + PAGE)}>Show {Math.min(PAGE, list.length - shown)} more ({list.length - shown} left)</button>
        </div>
      )}
    </div>
  );
}
