// Each service links out: Fiverr to order, or an on-page section.
const FIVERR = "https://www.fiverr.com/kaushaljangid";
const order = { label: "Order on Fiverr", href: FIVERR };

export const services = [
  { title: "Wedding invitation videos", text: "Haldi, Mehendi, Sangeet, wedding and reception scenes in English or Hindi, made vertical for WhatsApp and Instagram.", link: { label: "Order on Fiverr", href: `${FIVERR}/make-elegant-indian-wedding-invitation-video` } },
  { title: "Birthday, housewarming and event invites", text: "Animated invitations for mundan, housewarming, engagement, anniversary and birthday celebrations.", link: order },
  { title: "Festival greetings and business promos", text: "Diwali, Christmas and Women's Day greetings, plus company timelines, openers and product promos.", link: order },
  { title: "Logo animation and intros", text: "Logo reveals and photography intros, delivered in full HD.", link: { label: "Order on Fiverr", href: `${FIVERR}/make-3-photography-logo-animation-in-hd-720p` } },
  { title: "Memorial and photo slideshows", text: "Tribute and memory videos built from your own photographs.", link: order },
  { title: "Logo, flyer and brochure design", text: "Brand marks and print layouts, with illustration when the idea needs it.", link: order },
  { title: "After Effects templates", text: "Customisable templates, no plugins needed, sold on VideoHive and Creative Market.", link: { label: "Browse templates", href: "#shop" } },
] as const;

export const process = [
  { title: "Send the details", text: "Names, ceremonies, date, language (English or Hindi), family names and any music you want." },
  { title: "Get the first cut", text: "Your text and photos go into the design. Orders on Fiverr list two-day delivery." },
  { title: "Ask for changes", text: "One revision is included. Scenes, colours, text and music can all change." },
  { title: "Receive the final video", text: "Delivered in 1080×1920 for phones, or full HD horizontal." },
] as const;
