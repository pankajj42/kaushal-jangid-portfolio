"use client";
import { useState } from "react";
import { profile } from "@/content/profile";

const kinds = ["Wedding invitation video", "Birthday or event video", "Business or corporate video", "Logo or brand design", "Something else"];

/** No server needed: the form opens the visitor's email app with the message ready to send. */
export default function Contact() {
  const [f, setF] = useState({ name: "", kind: kinds[0], message: "" });
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Hi Kaushal,\n\n${f.message}\n\nProject type: ${f.kind}\nFrom: ${f.name}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`${f.kind} enquiry`)}&body=${encodeURIComponent(body)}`;
  };
  const field = "mt-1 w-full rounded-xl border border-paper/25 bg-pine/60 px-4 py-3 text-base text-paper placeholder:text-paper/40";
  return (
    <form onSubmit={send} className="grid gap-5">
      <label className="text-sm">Your name
        <input required className={field} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} autoComplete="name" />
      </label>
      <label className="text-sm">What do you need?
        <select className={field} value={f.kind} onChange={(e) => setF({ ...f, kind: e.target.value })}>
          {kinds.map((k) => <option key={k}>{k}</option>)}
        </select>
      </label>
      <label className="text-sm">Tell me about it
        <textarea required rows={5} className={field} value={f.message} placeholder="Event date, language, style, anything useful" onChange={(e) => setF({ ...f, message: e.target.value })} />
      </label>
      <button className="btn-primary justify-self-start" type="submit">Send Mail</button>
      <p className="text-sm text-paper/55">This opens your email app with the message filled in, ready to send.</p>
    </form>
  );
}
