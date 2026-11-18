# Nikkah Invitation (white embossed & gold) · Next.js

What guests see, in order:
1. **Embossed white envelope** with a white wax seal. Tap → the flap lifts with the seal, golden light bursts out, and the screen fades to white.
2. **Welcome**: a carved Mughal arch framing the couple walking toward a white mosque, with swaying lanterns and white roses.
3. **The Date**: three gold-foil **scratch cards** (Day / Month / Year). Guests scratch with a finger to reveal the date. Double-tap also reveals.
4. **Embossed arch card**: Bismillah, both names and parents.
5. Welcome note + **Surah An-Naba 78:8**.
6. **Wedding Timeline** with gold line drawings (entrance, bride, rings, mosque, buffet).
7. **The Celebration Begins** countdown.
8. **Location** with Get Directions, Add to Calendar (.ics), optional RSVP on WhatsApp, and a palace-and-palms illustration.

## Run
```bash
npm install
npm run dev     # http://localhost:3000   (add ?open to skip the envelope)
```

## Edit
Everything is in `lib/config.ts`: names, parents, date/time (drives the scratch cards & countdown), timeline, venue, map link, WhatsApp number.
- Your own photo for the welcome arch: put it in `public/` and set `heroImage: "/hero.jpg"`.
- Music: add `public/music.mp3`. It starts when the envelope is opened.

## Deploy
Push to GitHub → import on vercel.com.
