// ─────────────────────────────────────────────────────────────
//  Edit everything about your wedding invitation here.
// ─────────────────────────────────────────────────────────────

export const config = {
  // Couple (shown in this order on the invitation)
  bride: "Fathima A",
  brideParents: "", // e.g. "D/o Mr. … & Mrs. …" — leave "" to hide
  groom: "Muhammed Thanseem C",
  groomParents: "", // e.g. "S/o Mr. … & Mrs. …" — leave "" to hide
  initials: "F T", // shown on the wax seal

  // Event (India time, +05:30, so the countdown & calendar file are right for guests anywhere)
  dateISO: "2026-12-20T16:00:00+05:30",
  durationHours: 4,
  dateText: "20 December 2026",
  timeText: "4 PM onwards",
  venueName: "Pulakkunnath House",
  venueLines: ["Valakettu, Cherapuram"],
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Pulakkunnath+House+Valakettu+Cherapuram",

  // RSVP via WhatsApp (country code + number, digits only). Leave "" to hide.
  whatsapp: "",

  // Optional background music: drop an mp3 at /public/music.mp3
  musicSrc: "/music.mp3",

  // Text
  title: "Wedding Ceremony",
  blessing: "With the blessings of Allah and the love of our families,",
  inviteLine: "we joyfully invite you to celebrate the wedding of",
  and: "And",

  bismillah: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
  verseArabic:
    "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
  verseEnglish:
    "And among His signs is that He created for you spouses from among yourselves so that you may find tranquility in them, and He placed between you affection and mercy.",
  verseRef: "(Surah Ar-Rum 30:21)",
  inshaAllah: "إِن شَاءَ ٱللَّٰه",
};
