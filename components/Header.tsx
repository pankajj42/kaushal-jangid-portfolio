
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { profile } from "@/content/profile";
import ThemeToggle from "./ThemeToggle";

const nav = [
  ["Work", "/#work"],
  ["Clients", "/#clients"],
  ["Shop", "/#shop"],
  ["Services", "/#services"],
  ["About", "/#about"],
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-paper/10 bg-ink/85 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 text-sm"
      >
        {/* Profile Image + Name */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/kaushal.jpg"
            alt="Kaushal"
            width={36}
            height={36}
            priority
            className="size-9 rounded-full object-cover object-center border border-paper/20"
          />
          <span className="font-display text-lg whitespace-nowrap">
            {profile.name}
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <ul className="hidden items-center gap-5 md:flex">
            {nav.map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="hover:text-brass">
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          <Link
            href="/#contact"
            className="btn-primary !min-h-9 !px-4 !text-sm"
          >
            Hire me
          </Link>

          <button
            className="grid size-9 place-items-center rounded-full border border-paper/25 md:hidden"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden
            >
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <ul
          id="mobile-menu"
          className="grid border-t border-paper/10 px-5 py-2 md:hidden"
        >
          {nav.map(([label, href]) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className="block py-3 text-base"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
