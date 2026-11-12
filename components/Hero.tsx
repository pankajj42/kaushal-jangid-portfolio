"use client";
import { MotionConfig, motion } from "motion/react";
import { profile } from "@/content/profile";

type Phone = { id: string; v: string; title: string };
const slots = [{ left: "0%", rotate: -8, top: 56 }, { left: "32%", rotate: 0, top: 0 }, { left: "64%", rotate: 8, top: 56 }];

export default function Hero({ phones, stats }: { phones: Phone[]; stats: { value: string; label: string }[] }) {
  return (
    <MotionConfig reducedMotion="user">
      <section className="jaali relative overflow-hidden px-5 pb-20 pt-28 sm:pt-36">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-brass/40 px-3 py-1 text-sm text-blush">
              <span className="size-2 rounded-full bg-brass" aria-hidden /> Taking new invitation and motion projects
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">Invitations that move.</h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/75">{profile.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#work" className="btn-primary">See the work</a>
              <a href="#contact" className="btn-ghost">Start a project</a>
            </div>
            <ul className="mt-12 grid grid-cols-3 gap-4 border-t border-paper/15 pt-6">
              {stats.map((s) => (
                <li key={s.label}>
                  <p className="font-display text-3xl sm:text-4xl">{s.value}</p>
                  <p className="text-sm text-paper/60">{s.label}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto h-[380px] w-full max-w-md sm:h-[480px]">
            {phones.map((p, i) => (
              <motion.a
                key={p.id} href="#featured" aria-label={p.title}
                className="absolute w-[36%] overflow-hidden rounded-[1.4rem] border-[5px] border-paper/20 bg-pine shadow-2xl"
                style={{ left: slots[i].left, top: slots[i].top, aspectRatio: "9/16" }}
                initial={{ opacity: 0, y: 60, rotate: 0 }} animate={{ opacity: 1, y: 0, rotate: slots[i].rotate }}
                transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.15 + i * 0.12 }}
                whileHover={{ y: -14, rotate: 0, zIndex: 5 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://i.ytimg.com/vi/${p.v}/hqdefault.jpg`} alt="" className="h-full w-full object-cover" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
