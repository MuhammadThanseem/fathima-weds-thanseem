// ─────────────────────────────────────────────────────────────
//  Edit everything about your Nikkah invitation here.
// ─────────────────────────────────────────────────────────────

export const config = {
  ceremony: "Nikkah Ceremony",

  groom: "Muhammed Thanseem C",
  groomShort: "Thanseem",
  groomParents: "Late Abdul Kareem C & Thahira",
  bride: "Fathima A",
  brideShort: "Fathima",
  brideParents: "Abdul Latheef & Sabeera",

  // Event date/time (local). Used by the scratch cards, countdown & calendar.
  dateISO: "2026-12-20T16:00:00",
  timeText: "4 PM onwards",
  durationHours: 5,

  // Optional: put your own photo in /public (e.g. "/hero.jpg") to replace the illustrated scene.
  heroImage: "",

  welcomeNote:
    "Dear friends and family, with hearts full of gratitude we would love for you to join us for an evening of love, laughter, duas and unforgettable memories as we begin our forever.",

  verseArabic: "وَخَلَقْنَاكُمْ أَزْوَاجًا",
  verseEnglish: "“And We created you in pairs.”",
  verseRef: "(Surah An-Naba 78:8)",

  timeline: [
    { time: "6:00 pm", title: "Guest Arrival and Welcome Drinks", art: "doors" },
    { time: "6:30 pm", title: "Bride Entrance", art: "bride" },
    { time: "7:00 pm", title: "Nikkah", art: "rings" },
    { time: "7:30 pm", title: "Salat al Isha", art: "mosque" },
    { time: "8:30 pm", title: "Buffet Opening", art: "cloche" },
  ] as { time: string; title: string; art: "doors" | "bride" | "rings" | "mosque" | "cloche" }[],

  city: "Valakettu, Cherapuram",
  venue: "Pulakkunnath House",
  // Photo at the bottom of the Location section. Put any image in /public and set its path here
  // (e.g. a photo of the house). "" shows the illustrated scene instead.
  // Default: Jumeirah Al Qasr, Dubai, by Aidas U. — CC BY 3.0, so the credit below must stay visible
  // while this photo is used (https://commons.wikimedia.org/wiki/File:Jumeirah_Al_Qasr_-_panoramio_(6).jpg).
  // Using your own photo? Set locationImageCredit to "" to hide the credit.
  locationImage: "/location.jpg",
  locationImageCredit: "Photo: Aidas U. · CC BY 3.0",
  mapUrl: "https://www.google.com/maps/dir/?api=1&destination=11.634858,75.7211581",

  // RSVP via WhatsApp: country code + number, digits only (e.g. "919876543210"). "" hides it.
  whatsapp: "",

  musicSrc: "/music.mp3",
};
