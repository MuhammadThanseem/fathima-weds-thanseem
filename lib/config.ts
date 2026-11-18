// ─────────────────────────────────────────────────────────────
//  Edit everything about your invitation here.
// ─────────────────────────────────────────────────────────────

export type Lang = "en" | "es";

export const config = {
  bride: "Fathima A",
  groom: "Muhammed Thanseem C",
  monogram: ["F", "T"] as const, // initials shown on the wax seal & crest
  // ISO date/time of the ceremony (local time of the venue)
  weddingDate: "2026-12-20T17:10:00",
  musicSrc: "/music.mp3", // drop an mp3 into /public (leave as-is to hide errors)
  mapUrl: "https://maps.google.com/?q=Son+Bunyola+Mallorca",
  // Optional: a Formspree / Getform / Google Apps Script URL. If empty, RSVP opens an email.
  rsvpEndpoint: "",
  rsvpEmail: "hello@example.com",
  rsvpDeadline: "5 December 2026",
};

type Dict = {
  tapToOpen: string;
  inviteLine: string;
  month: string;
  weekday: string;
  year: string;
  heldAt: string;
  venueShort: string;
  until: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  storyTitle: string;
  story: string[];
  signature: string;
  celebrationTitle: string;
  celebrationSub: string;
  venueName: string;
  venueArea: string;
  celebrationText: string;
  celebrationDate: string;
  celebrationTime: string;
  viewMap: string;
  dayTitle: string;
  programLabel: string;
  programDate: string;
  programSub: string;
  program: { time: string; title: string; icon: string }[];
  rsvpTitle: string;
  rsvpSub: string;
  name: string;
  attending: string;
  yes: string;
  no: string;
  guests: string;
  message: string;
  send: string;
  thanks: string;
  footer: string;
};

export const t: Record<Lang, Dict> = {
  en: {
    tapToOpen: "Tap to open",
    inviteLine: "We invite you to celebrate our wedding",
    month: "December",
    weekday: "Sunday",
    year: "2026",
    heldAt: "To be held at",
    venueShort: "Son Bunyola, Mallorca",
    until: "Until 20 December 2026",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    storyTitle: "Our Story",
    story: [
      "Some of the best love stories begin unexpectedly, and ours was no different.",
      "What started as a chance encounter soon became endless conversations, spontaneous adventures and countless memories together.",
      "Somewhere along the way, we found our favorite place: by each other's side.",
      "And now, we're ready for our greatest adventure yet — a lifetime together.",
    ],
    signature: "Fathima & Thanseem",
    celebrationTitle: "The Celebration",
    celebrationSub: "Ceremony & Dinner",
    venueName: "Sa Talaia",
    venueArea: "Son Bunyola",
    celebrationText:
      "A ceremony in the gardens at sunset, behind the fountain, followed by dinner and dancing.",
    celebrationDate: "Sunday, 20 December 2026",
    celebrationTime: "5:10 PM",
    viewMap: "View on map",
    dayTitle: "The Day",
    programLabel: "Program",
    programDate: "Sunday 20 December",
    programSub: "Our wedding day, from sunset drinks to the last dance",
    program: [
      { time: "17:00", title: "Guests Arrival & Welcome Drinks", icon: "glasses" },
      { time: "17:30", title: "Ceremony", icon: "rings" },
      { time: "19:15", title: "Cocktail Hour", icon: "cocktail" },
      { time: "20:30", title: "Dinner", icon: "dinner" },
      { time: "22:10", title: "Cake & Toasts", icon: "cake" },
      { time: "23:00", title: "First Dance", icon: "dance" },
      { time: "23:15", title: "Dancing under the Stars", icon: "moon" },
      { time: "02:00", title: "Goodnight", icon: "bow" },
    ],
    rsvpTitle: "Kindly Reply",
    rsvpSub: `Please let us know by ${config.rsvpDeadline}`,
    name: "Your name",
    attending: "Will you join us?",
    yes: "Joyfully accepts",
    no: "Regretfully declines",
    guests: "Number of guests",
    message: "A note for the couple (optional)",
    send: "Send RSVP",
    thanks: "Grazie! Your reply has been received.",
    footer: "With love, Fathima & Thanseem",
  },
  es: {
    tapToOpen: "Toca para abrir",
    inviteLine: "Os invitamos a celebrar nuestra boda",
    month: "Diciembre",
    weekday: "Domingo",
    year: "2026",
    heldAt: "Se celebrará en",
    venueShort: "Son Bunyola, Mallorca",
    until: "Hasta el 20 de diciembre de 2026",
    days: "Días",
    hours: "Horas",
    minutes: "Minutos",
    seconds: "Segundos",
    storyTitle: "Nuestra Historia",
    story: [
      "Algunas de las mejores historias de amor empiezan sin esperarlo, y la nuestra no fue diferente.",
      "Lo que comenzó como un encuentro casual se convirtió en conversaciones infinitas, aventuras espontáneas e incontables recuerdos juntos.",
      "En algún momento del camino encontramos nuestro lugar favorito: el uno al lado del otro.",
      "Y ahora estamos listos para nuestra mayor aventura: toda una vida juntos.",
    ],
    signature: "Fathima y Thanseem",
    celebrationTitle: "La Celebración",
    celebrationSub: "Ceremonia y Cena",
    venueName: "Sa Talaia",
    venueArea: "Son Bunyola",
    celebrationText:
      "Una ceremonia en los jardines al atardecer, junto a la fuente, seguida de cena y baile.",
    celebrationDate: "Domingo, 20 de diciembre de 2026",
    celebrationTime: "17:10 h",
    viewMap: "Ver en el mapa",
    dayTitle: "El Día",
    programLabel: "Programa",
    programDate: "Domingo 20 de diciembre",
    programSub: "Nuestro día, desde el aperitivo al atardecer hasta el último baile",
    program: [
      { time: "17:00", title: "Llegada y Bienvenida", icon: "glasses" },
      { time: "17:30", title: "Ceremonia", icon: "rings" },
      { time: "19:15", title: "Cóctel", icon: "cocktail" },
      { time: "20:30", title: "Cena", icon: "dinner" },
      { time: "22:10", title: "Tarta y Brindis", icon: "cake" },
      { time: "23:00", title: "Primer Baile", icon: "dance" },
      { time: "23:15", title: "Baile bajo las Estrellas", icon: "moon" },
      { time: "02:00", title: "Buenas Noches", icon: "bow" },
    ],
    rsvpTitle: "Confirmación",
    rsvpSub: `Por favor, confirmad antes del ${config.rsvpDeadline}`,
    name: "Tu nombre",
    attending: "¿Nos acompañarás?",
    yes: "Asistiré con alegría",
    no: "Lamento no poder asistir",
    guests: "Número de invitados",
    message: "Un mensaje para los novios (opcional)",
    send: "Enviar",
    thanks: "¡Gracias! Hemos recibido tu respuesta.",
    footer: "Con cariño, Fathima y Thanseem",
  },
};
