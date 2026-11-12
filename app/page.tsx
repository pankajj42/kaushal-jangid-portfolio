import type { ReactNode } from "react";
import Contact from "@/components/Contact";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import WorkCard from "@/components/WorkCard";
import { faq } from "@/content/faq";
import { featured } from "@/content/featured";
import { profile } from "@/content/profile";
import { process as steps, services } from "@/content/services";
import { shopFavourites } from "@/content/shop";
import { site, type Section } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import type { Work } from "@/content/types";
import { works } from "@/content/works";
import { getGallery } from "@/lib/gallery";

const byId = new Map<string, Work>(works.map((w) => [w.id, w]));
const pick = (ids: readonly string[]) => ids.flatMap((id) => byId.get(id) ?? []);
const pinnedFirst = (ids: readonly string[], list: readonly Work[]) => [...pick(ids), ...list.filter((w) => !ids.includes(w.id))];

const h2 = "font-display text-4xl leading-tight sm:text-5xl";
const wrap = "mx-auto max-w-6xl px-5 py-20 sm:py-28";

function Row({ items }: { items: readonly Work[] }) {
  return (
    <ul className="scroller -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4">
      {items.map((w) => <li key={w.id} className="w-[62%] shrink-0 snap-start sm:w-64"><WorkCard work={w} /></li>)}
    </ul>
  );
}

export default function Home() {
  const featuredWorks = pick(featured);
  const clients = works.filter((w) => w.client);
  const gallery = getGallery();
  const phones = featuredWorks.filter((w) => w.videos[0].aspect === "vertical").slice(0, 3).map((w) => ({ id: w.id, v: w.videos[0].id, title: w.title }));
  const videoCount = works.reduce((n, w) => n + w.videos.length, 0);
  const shop = pinnedFirst(shopFavourites, works.filter((w) => w.offers?.length));

  const blocks: Record<Section, ReactNode> = {
    featured: (
      <section id="featured" className={wrap}><h2 className={h2}>Favourites</h2><Row items={featuredWorks} /></section>
    ),
    work: (
      <section id="work" className={wrap}>
        <h2 className={h2}>All work</h2>
        <p className="mt-3 max-w-xl text-paper/70">Every video plays from YouTube. Pick a category to narrow it down, or open a video for details.</p>
        <div className="mt-10"><Showcase items={pinnedFirst(featured, works)} mode="portfolio" /></div>
      </section>
    ),
    clients: clients.length ? (
      <section id="clients" className={wrap}>
        <h2 className={h2}>Client projects</h2>
        <p className="mt-3 max-w-xl text-paper/70">Invitations and brand videos made for private clients. Names are kept private; the work is shown in full.</p>
        <Row items={clients} />
      </section>
    ) : null,
    shop: (
      <section id="shop" className={wrap}>
        <h2 className={h2}>Templates you can buy</h2>
        <p className="mt-3 max-w-xl text-paper/70">After Effects templates on VideoHive and Creative Market. Preview here, then follow the store link.</p>
        <div className="mt-10"><Showcase items={shop} mode="shop" /></div>
      </section>
    ),
    services: (
      <section id="services" className={`${wrap} grid gap-14 lg:grid-cols-2`}>
        <div>
          <h2 className={h2}>What I make for you</h2>
          <ul className="mt-8 divide-y divide-paper/12 border-y border-paper/12">
            {services.map((s) => (
              <li key={s.title} className="flex items-start justify-between gap-6 py-5">
                <div><h3 className="font-display text-xl">{s.title}</h3><p className="mt-1 max-w-md text-sm text-paper/65">{s.text}</p></div>
                <a href={s.link.href} {...(s.link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="shrink-0 text-sm text-brass underline underline-offset-4 hover:text-blush">{s.link.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={h2}>How an order goes</h2>
          <ol className="mt-8 grid gap-6">
            {steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-4">
                <span className="grid size-10 place-items-center rounded-full border border-brass/50 font-display text-brass">{i + 1}</span>
                <div><h3 className="font-display text-xl">{s.title}</h3><p className="mt-1 text-sm text-paper/65">{s.text}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    ),
    studio: gallery.length ? (
      <section id="studio" className={wrap}><h2 className={h2}>Beyond video</h2><div className="mt-8"><Gallery kinds={gallery} /></div></section>
    ) : process.env.NODE_ENV === "development" ? (
      <section id="studio" className={wrap}>
        <p className="rounded-3xl border border-dashed border-paper/30 p-8 text-paper/70">
          Photography, 3D and font sections appear here once you add images to <code>public/gallery/photography</code>, <code>3d</code> or <code>fonts</code>. This note shows in development only.
        </p>
      </section>
    ) : null,
    about: (
      <section id="about" className={`${wrap} grid gap-12 lg:grid-cols-[320px_1fr]`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/kaushal.jpg" alt="Portrait of Kaushal Jangid" className="w-full max-w-xs rounded-3xl object-cover lg:max-w-none" />
        <div>
          <h2 className={h2}>About</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/80">{profile.about}</p>
          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            <ul className="grid gap-3">
              {profile.skills.map(([name, level]) => (
                <li key={name} className="flex items-center justify-between gap-4 text-sm">
                  <span>{name}</span>
                  <span className="flex gap-1.5" role="img" aria-label={`${level} out of 5`}>
                    {[1, 2, 3, 4, 5].map((n) => <span key={n} className={`size-2.5 rounded-full ${n <= level ? "bg-brass" : "bg-paper/20"}`} />)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="grid content-start gap-6 text-sm">
              <p className="flex flex-wrap gap-2">{profile.tools.map((t) => <span key={t} className="rounded-full border border-paper/20 px-3 py-1">{t}</span>)}</p>
              {profile.experience.map((x) => <p key={x.role}><b className="font-semibold">{x.role}</b><br /><span className="text-paper/60">{x.period}</span></p>)}
              {profile.education.map((x) => <p key={x.course}><b className="font-semibold">{x.course}</b><br /><span className="text-paper/60">{x.school}, {x.period}</span></p>)}
            </div>
          </div>
        </div>
      </section>
    ),
    reviews: (
      <section id="reviews" className={wrap}>
        <h2 className={h2}>What clients say</h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <li key={t.quote}>
              <figure className="h-full rounded-3xl border border-paper/12 bg-pine/50 p-7">
                <blockquote className="font-display text-xl leading-snug">{t.quote}</blockquote>
                <figcaption className="mt-5 text-sm text-paper/60">{t.job}, client from {t.place}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>
    ),
    faq: (
      <section id="faq" className={`${wrap} max-w-3xl`}>
        <h2 className={h2}>Questions</h2>
        <div className="mt-8 divide-y divide-paper/12 border-y border-paper/12">
          {faq.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex items-center justify-between gap-4 font-display text-xl">
                {f.q}
                <svg viewBox="0 0 24 24" className="chev size-5 shrink-0 transition-transform" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><path d="m6 9 6 6 6-6" /></svg>
              </summary>
              <p className="mt-3 max-w-xl text-paper/70">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    ),
    contact: (
      <section id="contact" className={`${wrap} grid gap-12 lg:grid-cols-2`}>
        <div>
          <h2 className={h2}>Tell me what you are planning.</h2>
          <p className="mt-5 max-w-md text-paper/75">Wedding, birthday, festival or business video, or a logo. Share the date and the style you like and I will reply by email.</p>
        </div>
        <Contact />
      </section>
    ),
  };

  const person = { "@context": "https://schema.org", "@type": "Person", name: profile.name, jobTitle: profile.title, sameAs: profile.links.map((l) => l.url) };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <Hero phones={phones} stats={[{ value: String(videoCount), label: "videos on YouTube" }, ...profile.stats]} />
      {site.sections.map((s) => <div key={s}>{blocks[s]}</div>)}
    </main>
  );
}
