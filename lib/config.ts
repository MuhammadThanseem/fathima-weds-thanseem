// ─────────────────────────────────────────────────────────────
//  Edit everything about your Nikah invitation here.
// ─────────────────────────────────────────────────────────────

export const config = {
  ceremony: "Nikah Ceremony",

  bride: "Fathima",
  brideFull: "Fathima A",
  brideParents: "D/O Mrs Mother's Name & Mr Father's Name",
  groom: "Thanseem",
  groomFull: "Muhammed Thanseem C",
  groomParents: "S/O Mrs Mother's Name & Mr Father's Name",

  // Arabic monogram letters shown in the gold circle (ف = F, ت = T)
  monogram: "فت",

  // Event
  dateISO: "2026-12-20T18:30:00",
  durationHours: 4,
  timeText: "6:30 PM Onwards",
  timeNote: "After Namaz E Maghrib InshaAllah",
  venueName: "@Venue Name",
  venueAddress: "Street, Landmark, Area, City",
  mapUrl: "https://maps.google.com/?q=Kerala",

  // Blessings of the elders
  elders: [
    { label: "Dada & Dadi", names: "Late Grandmother's Name & Late Grandfather's Name" },
    { label: "Nana & Nani", names: "Grandmother's Name & Grandfather's Name" },
  ],
  invitationLine:
    "Request your gracious presence to greet and bless their beloved granddaughter on the auspicious occasion of her Nikah",

  // "Awaiting to welcome you"
  hosts: ["Mr Family Member", "Mr Family Member", "Mr Family Member", "Mr Family Member", "Mr Family Member"],
  familyName: "& Family",
  contact: "+91 00000 00000",

  // Optional photos (put files in /public): couple walking in the sky, and a "hands" photo for the blessings card
  heroImage: "/hero.jpg",
  blessingImage: "/blessing-couple.jpg",
  blessingImageCredit: "",

  // WhatsApp number for wishes / RSVP: country code + number, digits only. "" hides the button.
  whatsapp: "",
  instagram: "",

  musicSrc: "/music.mp3",

  bismillah: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
  sacredLine: "In the Sacred Name of Rabbul Alameen, with endless love and salutations upon Rehmatul Lil Alameen ﷺ.",
  verseArabic: "وَاتَّقُوا اللَّهَ الَّذِي تَسَاءَلُونَ بِهِ وَالْأَرْحَامَ",
  verseEnglish: "“And be mindful of Allah, through whom you ask one another, and maintain family ties.”",
  verseRef: "Surah An-Nisa (4:1)",
  duaArabic: "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
  duaEnglish: "“May Allah bless you both, and shower His blessings upon you, and unite you together in goodness.”",
};
