// Order of the sections on the home page. Move, remove or add names freely.
export const site = {
  sections: ["featured", "work", "clients", "shop", "services", "studio", "about", "reviews", "faq", "contact"],
} as const;
export type Section = (typeof site.sections)[number];
