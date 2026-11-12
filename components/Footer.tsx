import { profile } from "@/content/profile";
export default function Footer() {
  return (
    <footer className="border-t border-paper/10 px-5 py-10 text-center text-sm text-paper/55">
      <p className="mb-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
        {profile.links.map((l) => <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="hover:text-brass">{l.label}</a>)}
      </p>
      <p>{profile.name}, {profile.location}. Videos are embedded from YouTube.</p>
    </footer>
  );
}
