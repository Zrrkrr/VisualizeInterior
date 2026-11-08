# VisualizeInterior — Codebase Audit (2026-11-08)

Scope: every source file (`App.js`, `firebase.js`, `features/`, `navigation/`, `screen/`), config, and assets.
App today: Expo 51 / RN 0.74 app with an inspiration gallery (Home), a portfolio grid, an "AI Image Generator" (Camera tab, Stability AI), About Us, and Firebase email auth (currently disabled).

## 🔴 Critical — act now

| # | Issue | Where | Fix |
|---|---|---|---|
| 1 | **Stability AI API key is committed and public.** `.env` is tracked (since commit `4c13c8c`) and the GitHub repo is public. Anyone can bill your Stability account. | `.env`, `.gitignore` (only ignores `.env*.local`) | **Revoke/rotate the key in the Stability dashboard today.** Add `.env` to `.gitignore`, `git rm --cached .env`. Rotating is mandatory — the key stays in git history. |
| 2 | **API key is shipped inside the app bundle.** `react-native-dotenv` inlines `STABILITY_API_KEY` into JS; anyone can extract it from the APK/IPA even after fixing #1. | `screen/Camera.js` | Move the Stability call behind a server (Firebase Cloud Function / Vercel function) that checks Firebase auth and rate-limits per user. |

## 🟠 Bugs

| # | Issue | Where |
|---|---|---|
| 3 | Login/Signup are commented out, so `name` is always empty — Home shows **"Hi, "**. | `navigation/AppNav.js:381`, `screen/Home.js` |
| 4 | `ImageDetailScreen` (Save/Share) is unreachable — Camera never navigates to it. Generated images can't be saved or shared. | `screen/Camera.js` |
| 5 | Even if reached, Save/Share would fail: `MediaLibrary.saveToLibraryAsync` and `Sharing.shareAsync` need a `file://` URI, not a `data:` base64 URI. | `screen/ImageDetailScreen.js` |
| 6 | Login failures are only `console.log`ged — user sees nothing. No loading state; "Forgot password?" does nothing. | `screen/Login.js` |
| 7 | Auth session isn't persisted (`getAuth` without `initializeAuth` + AsyncStorage persistence) — users get logged out on every restart. Name lives only in Redux memory, so it's lost too. | `firebase.js`, `features/nameSlice.js` |
| 8 | Portfolio descriptions are wrong/placeholder (e.g. `bedroom2.png` → "Stylish office space…", 10 items say "Contemporary commercial interior."). | `features/portfolioSlice.js` |
| 9 | `onLoadStart` on `Animated.View` returning JSX does nothing. | `screen/Home.js:900` |
| 10 | Top inset hack: `marginTop: "10%"` instead of safe-area insets — wrong on notched/Dynamic Island devices and tablets. | `App.js` |

## 🟡 Tech debt

- **Unused/conflicting deps:** `@react-native-firebase/app` + `/auth` installed but unused (they also need a native dev build and conflict with the JS `firebase` SDK). `getFirestore` imported, never used. `react-native-svg-transformer` with no `metro.config.js`. `expo-camera`, `expo-image-picker`, `expo-linear-gradient`, `expo-build-properties` unused.
- **Static data in Redux:** `imageSlice` / `portfolioSlice` are constant arrays with no reducers — plain data modules would do. Real content should come from a backend (Firestore) so the studio can update projects without an app release.
- **Assets:** `assets/additional/*.jpg` are byte-identical copies of `assets/HomeImgs/*.jpg`. Frame PNGs are 0.7–1.8 MB each; ~14 MB total. Convert to WebP / serve from storage + CDN.
- **Naming:** "Camera" tab is actually an AI text-to-image generator.
- **Duplication:** Login/Signup share ~100 lines of identical styles; every screen hardcodes colors/sizes — no theme/design tokens.
- **No TypeScript, no lint, no tests, no CI.**
- **Outdated stack:** Expo 51 (current is far newer), React Navigation 6, 86 npm audit findings (6 critical).
- **Secrets hygiene:** Firebase web config in source is OK (it's public by design) **only if** Firestore/Storage security rules are locked down — verify in console.
- `console.log("User signed up:", user)` logs the full user object.

## 💡 Feature ideas for the redesign

Core (what an interior-design studio app should do):
1. **AI Room Redesign** — photograph your room → pick a style (Japandi, Modern, Indian Contemporary…) → AI re-renders *your* room (image-to-image / ControlNet-style), with before/after slider. This is the "Visualize" the name promises; the current text-only generator isn't.
2. **Style quiz → personalized moodboard** of gallery images + palette.
3. **Saved/favorites & personal projects** synced to the account (Firestore).
4. **Book a consultation** — city picker (studio lists 12 cities), date/time, sends lead to the studio. Turns the app into a lead-gen channel.
5. **Portfolio from CMS** — categories (Residential / Commercial / Office / Mandir), filters, project detail pages with multiple photos, budget range.
6. **Share & save** generated designs (fix #4/#5).

Advanced:
7. **AR furniture/décor placement** (needs a native dev build).
8. **Room measurement** via LiDAR/AR, rough cost estimator.
9. **Chat with a designer / AI design assistant** (Claude) for advice on palettes, layouts, materials.
10. Dark mode, accessibility (labels, contrast, dynamic type), offline image caching, analytics.
