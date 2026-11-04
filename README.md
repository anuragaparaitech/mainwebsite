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
  App.jsx                 shared site shell and routes for home, service details, and contact
  main.jsx                React entry point wrapped in BrowserRouter
  components/             Preloader, Header, HamburgerMenu, ChatDrawer, Hero, HeroMedia, Counter,
                          Philosophy, Services, ServiceDetailPage, ContactPage, Platforms, Footer
  hooks/                  useScrolled, useCountUp, useReducedMotion, useEscape, useReveal
  services/serviceDetails.js
                          shared service-card and service-detail content
  services/chat.js        mock chat replies - replace getReply() with a call to your own backend
  index.css               Tailwind + keyframes (glow-pulse, vibrate, icon-wiggle)
tailwind.config.js        design tokens copied from the Stitch export
```

## Service pages
The standalone service directory is available at `/services`. Each service card and footer link opens a dedicated route:
- `/services`
- `/services/cloud-solutions`
- `/services/custom-software-development`
- `/services/ai-automation`
- `/services/devops-ci-cd`
- `/services/cybersecurity-solutions`
- `/services/mobile-app-development`

The shared contact destination is `/contact`. Production hosting must serve `index.html` as the fallback for these client-side routes so direct visits and browser refreshes work.

## Notes
- The AI chat is available from the "Ask AI Agent" button and the contact page.
- Images currently load from the original Stitch export URLs. Replace them with your own files
  in `public/images/` before launch (the hero poster is in `HeroMedia.jsx`, the footer logo in `Footer.jsx`).
- Never put API keys in this frontend. A real AI chat needs a small backend that holds the key.
