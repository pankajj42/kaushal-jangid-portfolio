"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** Mouse devices only. Touch screens and reduced-motion users keep the normal cursor. */
export default function Cursor() {
  const [on, setOn] = useState(false);
  const [hot, setHot] = useState(false);
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 34, mass: 0.5 }), ry = useSpring(y, { stiffness: 420, damping: 34, mass: 0.5 });

  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setOn(true);
    document.documentElement.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      setHot(!!(e.target as Element | null)?.closest?.("a, button, summary, select, label, [role=button]"));
    };
    addEventListener("pointermove", move);
    return () => { removeEventListener("pointermove", move); document.documentElement.classList.remove("has-cursor"); };
  }, [x, y]);

  if (!on) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] mix-blend-difference">
      <motion.div className="absolute left-0 top-0 -ml-1 -mt-1 size-2 rounded-full bg-white" style={{ x, y }} />
      <motion.div className="absolute left-0 top-0 -ml-5 -mt-5 size-10 rounded-full border border-white"
        style={{ x: rx, y: ry }} animate={{ scale: hot ? 1.7 : 1, opacity: hot ? 1 : 0.6 }} transition={{ duration: 0.2 }} />
    </div>
  );
}
