# Visualize Interior — Rebuild Design (final, slim)

Date: 2026-11-08 · Status: approved

## Intent
Major project, shown to university admissions (GitHub + README + screenshots). Goal: **looks really good, stable, every feature works.** Not a production app, so no backend beyond what's already used.

## Decisions
- Fresh **Expo SDK 58** + **Expo Router** + TypeScript. Runs in current Expo Go, iOS/Android, and web. (SDK 51 no longer opens in current Expo Go.)
- **Firebase JS SDK, email/password auth** (as in the original). Login persists across restarts. Name is stored on the Firebase user (`displayName`), so "Hi, name" survives. Forgot-password works. Errors are shown in the UI, not just logged.
- **Content is bundled** as a typed module (18 inspirations, portfolio, team). Images are converted to WebP and duplicates removed. No Redux.
- **AI Studio** (Stability AI):
  - *Imagine*: text → image.
  - *Redesign my room*: photo + style → restyled room, using the structure-control endpoint. Includes a before/after slider.
  - Save to gallery and Share both work (via a `file://` download on native, browser download/share on web).
- **API key:** `EXPO_PUBLIC_STABILITY_API_KEY` in a git-ignored `.env`. `ponytail:` the key is still inside the app bundle, which is acceptable for a demo that isn't publicly hosted. Move it to a server function if the app is ever published.
- **Visual direction (builder's call):** warm editorial interior-design look. Cream background, charcoal text, terracotta accent, serif display font with a clean sans for body, large imagery, soft radii.
- **Tabs:** Home · Portfolio · AI Studio · Profile. Profile holds About Us, the team and logout.

## Out of scope
Server functions, bookings backend, analytics, app-store setup, dark mode.
