// Array order = order of the filter chips on the site. Add/rename freely.
export const categories = [
  { id: "wedding", label: "Wedding invitations" },
  { id: "celebrations", label: "Birthdays and ceremonies" },
  { id: "festivals", label: "Festival greetings" },
  { id: "business", label: "Business and corporate" },
  { id: "slideshows", label: "Photo slideshows" },
  { id: "promos", label: "Promos and stories" },
  { id: "logos", label: "Logo reveals" },
  { id: "client", label: "Client projects" },
  { id: "more", label: "More" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];
