# Navy & Gold Nikah Invitation · Next.js

What guests see, in order:
1. **Navy intro**: gold Bismillah, gold Arabic monogram (ف ت), date and an **Open Invitation** button.
2. **Opening**: a giant satin bow comes undone (loops fly apart, knot bursts) into a blue sky, and white doves fly up.
3. **Hero**: the couple walking on clouds among pink, blue and white roses, with the monogram sparkling above. A sticky top menu appears (Nikah · Family · Wishes) and blue petals fall throughout.
4. **Navy watercolour**: Bismillah and the sacred line, a large monogram, and Surah An-Nisa 4:1.
5. **Fathima weds Thanseem** with date boxes, then a scrolling name ticker.
6. **Blush**: countdown, blessings of the elders, and the Nikah event card with **Venue Location** and **Add to Calendar**.
7. **Two families, one bond**: bride and groom cards with parents.
8. **Blessings from family and friends**: photo card and the prophetic dua for newlyweds (+ optional "Send your wishes" on WhatsApp).
9. **Awaiting to welcome you**: hosts, address, contact and footer.

## Run
```bash
npm install
npm run dev     # http://localhost:3000   (add ?open to skip the intro)
```

## Edit
Everything is in `lib/config.ts`: names, parents, grandparents, date/time, venue, hosts, contact, WhatsApp/Instagram.
- Photos: put files in `public/` and set `heroImage` (couple) and `blessingImage` (hands/rings photo).
- Music: add `public/music.mp3`. It starts when "Open Invitation" is tapped. The music button only shows when the file exists.

## Deploy
Push to GitHub → import on vercel.com.
