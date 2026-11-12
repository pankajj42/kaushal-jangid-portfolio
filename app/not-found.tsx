import Link from "next/link";
export default function NotFound() {
  return (
    <main className="mx-auto grid min-h-[70vh] max-w-xl place-content-center gap-5 px-5 text-center">
      <h1 className="font-display text-5xl">That page is not here.</h1>
      <p className="text-paper/70">The link may be old. The work is still on the home page.</p>
      <Link href="/#work" className="btn-primary justify-self-center">Back to the work</Link>
    </main>
  );
}
