# Amalfi-style Wedding Invitation (Next.js)

A mobile-first digital wedding invitation:

1. **Painted envelope** with a satin ribbon & bow. Tap → bow unties, flap opens, card rises.
2. **Hero card**: names, date with fluttering butterflies, venue, framed by an impasto sky and blossoms.
3. **Countdown**: live days / hours / minutes / seconds inside a blue-gingham floral frame.
4. **Our Story**: drifting painted clouds and a script signature.
5. **The Celebration**: dark green section with a garden fountain, botanical line frame, and a "View on map" button.
6. **The Day**: villa illustration, a week strip with a heart on the wedding day, and an alternating timeline with painted icons.
7. **RSVP** form, background-music toggle, and an EN/ES language switch.

All artwork is drawn in SVG (no image files needed).

## Run

```bash
npm install
npm run dev      # http://localhost:3000
```

Add `?open` to the URL to skip the envelope while editing.

## Customise

Everything is in **`lib/config.ts`**: names, date/time, venue, map link, story text, program timeline, and both languages.

- **Music**: put an mp3 at `public/music.mp3`. It starts when the envelope is opened. If there's no file, the button stays hidden.
- **RSVP**: set `rsvpEndpoint` to a Formspree / Getform / Google Apps Script URL to collect replies. If it's empty, replies are logged by `/api/rsvp` and an email to `rsvpEmail` opens instead.
- **Your own paintings**: replace any component in `components/art/Scenes.tsx` (e.g. `Villa`, `Fountain`, `Coast`) with an `<img src="/your-art.png" />`.

## Deploy

Push to GitHub and import it on [vercel.com](https://vercel.com). No extra settings are needed.
