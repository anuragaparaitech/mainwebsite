# AparaiTech Software - Landing Page (React)

React + Vite + Tailwind CSS conversion of the Stitch design export.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
```

## Add your hero video
Place your file at `public/videos/hero.mp4` (MP4/H.264, about 10 s, no audio, under ~10 MB).
Until then the poster image is shown. Visitors with "reduce motion" enabled always get the still image.

## Structure
```
src/
  App.jsx                 page order: Preloader, Header, Hero, Philosophy, Services, Platforms, Footer
  components/             Preloader, Header, HamburgerMenu, ChatDrawer, Hero, HeroMedia, Counter,
                          Philosophy, Services, Platforms, Footer
  hooks/                  useScrolled, useCountUp, useReducedMotion, useEscape, useReveal
  services/chat.js        mock chat replies - replace getReply() with a call to your own backend
  index.css               Tailwind + keyframes (glow-pulse, vibrate, icon-wiggle)
tailwind.config.js        design tokens copied from the Stitch export
```

## Notes
- Only ONE chat entry exists: the "Ask AI Agent" button (and its mobile floating icon).
- Images currently load from the original Stitch export URLs. Replace them with your own files
  in `public/images/` before launch (the hero poster is in `HeroMedia.jsx`, the footer logo in `Footer.jsx`).
- Never put API keys in this frontend. A real AI chat needs a small backend that holds the key.
