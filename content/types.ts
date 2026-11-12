import type { CategoryId } from "./categories";

export type Platform = "youtube" | "vimeo" | "instagram";
export type Store = "videohive" | "creativemarket" | "fiverr";

/** Videos are always embedded from their platform, never hosted here. */
export type Video = { readonly platform: Platform; readonly id: string; readonly aspect: "vertical" | "wide" };
export type Offer = { readonly store: Store; readonly url: string };

export type Work = {
  readonly id: string;
  readonly title: string;
  readonly category: CategoryId;
  readonly year: number;
  readonly videos: readonly Video[];
  readonly offers?: readonly Offer[]; // where it can be bought or ordered
  readonly specs?: readonly string[];
  readonly tags?: readonly string[];
  readonly client?: boolean; // client project: names are kept off the site
};

export const storeLabels: Record<Store, string> = {
  videohive: "VideoHive",
  creativemarket: "Creative Market",
  fiverr: "Fiverr",
};

export const defineWork = <const T extends Work>(work: T): T => work;
