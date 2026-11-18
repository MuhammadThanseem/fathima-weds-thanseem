# Engagement Invitation (ivory & gold) · Next.js

What guests see, in order:
1. **Envelope**: ivory with pearl-edged satin sashes in an X, white roses, a satin bow and a gold wax seal with pearl tassels. Tap to open → the bow drops away, the envelope opens like two doors, and **Save The Date** glows in shimmering gold.
2. **Bismillah** in gold calligraphy inside a baroque oval mirror on a white & gold console table, with flickering candles.
3. **Surah Ar-Rum 30:21**: the Arabic and English text writes itself in, word by word.
4. **Engagement Ceremony** in a rope-and-pearl arch with white roses: the groom's and bride's names and their parents.
5. **In sha Allah**: date, time and venue with gold icons.
6. Countdown, **View Location**, **Add to Calendar** (.ics file), optional **RSVP on WhatsApp**, and a closing line.

All artwork is SVG; fonts are bundled locally (Great Vibes, Cormorant Garamond, Amiri, Aref Ruqaa).

## Run
```bash
npm install
npm run dev     # http://localhost:3000   (add ?open to skip the envelope)
```

## Edit
Everything is in `lib/config.ts`: names, parents, date/time, venue, map link, WhatsApp number and initials on the seal.
Music: add `public/music.mp3`. It starts when the envelope is opened.

## Deploy
Push to GitHub → import on vercel.com. No extra settings needed.
