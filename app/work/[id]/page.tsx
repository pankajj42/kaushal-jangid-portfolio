import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import WorkCard from "@/components/WorkCard";
import WorkPlayer from "@/components/WorkPlayer";
import { categories } from "@/content/categories";
import { storeLabels } from "@/content/types";
import { works } from "@/content/works";

export const dynamicParams = false;
export const generateStaticParams = () => works.map((w) => ({ id: w.id }));

type Props = { params: Promise<{ id: string }> };
const find = (id: string) => works.find((w) => w.id === id);
const thumb = (v: string) => `https://i.ytimg.com/vi/${v}/hqdefault.jpg`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const w = find((await params).id);
  if (!w) return {};
  const cat = categories.find((c) => c.id === w.category)?.label ?? "";
  return {
    title: `${w.title} (${w.year})`,
    description: `${cat} by Kaushal Jangid.${w.specs?.length ? " " + w.specs.slice(0, 3).join(", ") + "." : ""}`,
    alternates: { canonical: `/work/${w.id}` },
    openGraph: { images: [thumb(w.videos[0].id)] },
  };
}

export default async function WorkPage({ params }: Props) {
  const w = find((await params).id);
  if (!w) notFound();
  const cat = categories.find((c) => c.id === w.category)?.label;
  const related = works.filter((x) => x.category === w.category && x.id !== w.id).slice(0, 4);
  const i = works.indexOf(w), prev = i > 0 ? works[i - 1] : null, next = i < works.length - 1 ? works[i + 1] : null;
  const ld = {
    "@context": "https://schema.org", "@type": "VideoObject", name: w.title, uploadDate: `${w.year}-01-01`,
    description: `${cat} by Kaushal Jangid`, thumbnailUrl: thumb(w.videos[0].id), embedUrl: `https://www.youtube.com/embed/${w.videos[0].id}`,
  };
  return (
    <main className="mx-auto max-w-6xl px-5 pb-24 pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Link href="/#work" className="text-sm text-paper/70 underline underline-offset-4 hover:text-brass">Back to all work</Link>
      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <WorkPlayer work={w} />
        <div>
          <h1 className="font-display text-4xl leading-tight sm:text-5xl">{w.title}</h1>
          <p className="mt-3 text-paper/65">{cat}, {w.year}</p>
          {w.client && <p className="mt-6 max-w-md text-paper/80">Made for a private client. Names are kept private; the design and animation are mine.</p>}
          {w.specs && (
            <ul className="mt-8 grid gap-2 text-paper/85">
              {w.specs.map((s) => <li key={s} className="border-b border-paper/10 pb-2">{s}</li>)}
            </ul>
          )}
          {w.offers && (
            <div className="mt-8 flex flex-wrap gap-3">
              {w.offers.map((o) => <a key={o.url} href={o.url} target="_blank" rel="noopener noreferrer" className="btn-primary">Get it on {storeLabels[o.store]}</a>)}
            </div>
          )}
          {w.tags && <p className="mt-8 flex flex-wrap gap-2 text-sm">{w.tags.map((t) => <span key={t} className="rounded-full border border-paper/20 px-3 py-1">{t}</span>)}</p>}
          <div className="mt-10 rounded-3xl border border-paper/12 bg-pine/50 p-6">
            <p className="font-display text-2xl">Want something like this?</p>
            <p className="mt-2 text-paper/70">Send your names, dates and style and I will make a version for you.</p>
            <Link href="/#contact" className="btn-primary mt-5">Start a project</Link>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display text-3xl">More in {cat}</h2>
          <ul className="mt-8 grid grid-cols-2 items-start gap-x-4 gap-y-10 md:grid-cols-4">
            {related.map((r) => <li key={r.id}><WorkCard work={r} /></li>)}
          </ul>
        </section>
      )}
      <nav aria-label="Previous and next" className="mt-16 flex justify-between gap-4 text-sm">
        {prev ? <Link href={`/work/${prev.id}`} className="btn-ghost">Previous</Link> : <span />}
        {next ? <Link href={`/work/${next.id}`} className="btn-ghost">Next</Link> : <span />}
      </nav>
    </main>
  );
}
