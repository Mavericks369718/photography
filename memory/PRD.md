# CorporateMoments — Photographer Booking App

## Original problem statement
Build a photographer booking app inspired by the layout of the "Yes Madam" app. Brand: **CorporateMoments**. Aesthetic: premium, professional, modern, cinematic editorial — warm cream `#FFF1EC` background, photo banners, curved white cards (`rounded-t-[28px]`), mixed typography (Plus Jakarta Sans + italic Fraunces).

## Tech stack
- **Frontend**: React (CRA) + TailwindCSS + react-router-dom + Sonner toasts + lucide-react icons
- **Backend**: Not implemented yet — entire app is frontend-only with mock data + localStorage state
- **State keys (localStorage)**: `cm_phone`, `cm_name`, `cm_selected`, `cm_booking`, `cm_last_booking`, `cm_bookings_history`

## Sitemap (final)
1. `/login` — phone (+91, 10 digits) → triggers OTP step
2. `/login` (otp step) — 6-digit code → sets `cm_phone`, navigates to `/onboarding`
3. `/onboarding` — name capture → sets `cm_name`, navigates to `/`
4. `/` — Home (Hero header + Categories grid + Most Booked carousel + Offers + Testimonials + BottomNav)
5. `/category/:categoryId` — list of photographers offering this service (sortable: popular / rating / price)
6. `/photographer/:photographerId` — editorial profile with sticky tabs (Portfolio / Packages / Reviews / About) + sticky bottom CTA
7. `/search` — search photographers by name, tagline, city, specialty, category
8. `/bookings` — user's confirmed bookings (reads `cm_bookings_history`)
9. `/account` — profile screen with quick links + sign out
10. `/booking` — calendar + time slot. Reads selected package from `cm_selected` (set by photographer profile); falls back to a default package
11. `/payment` — price breakdown + Razorpay-style methods (UPI/Card/NetBanking/Wallet/Pay-on-day). On confirm: writes `cm_last_booking` and pushes to `cm_bookings_history`
12. `/confirmation` — success state, ticket card, ref code, copy/download CTAs

## Bottom Tab Bar (4 tabs)
Home · Search · Bookings · Account — present on Home, Category, Profile, Search, MyBookings, Account screens. z-index `z-[60]` to sit above the Emergent preview badge.

## Data model (mock.js)
- `categories[]` — id, title, image, badge, wide
- `photographers[]` — id, name, tagline, cover, avatar, city, rating, reviews, yearsExperience, deliveriesCompleted, verified, award, categories[], specialties[], languages[], startingPrice, about, portfolio[], packages[{id,name,subtitle,duration,price,originalPrice}], reviewsList[]
- `mostBookedServices` — each service item now references `photographerId` + `packageId` so cards link straight to a profile
- helpers: `getPhotographer(id)`, `getPhotographersByCategory(catId)`, `categoryTitle(id)`, `tabToCategory{}`

## Implementation log

### Apr 25, 2026 — Sitemap completion + photographer profile/listing (P2)
- Added 9 photographers across all categories with editorial portfolios, packages, reviews
- New pages: `CategoryPhotographers`, `PhotographerProfile` (editorial magazine layout — Fraunces italic name in hero, 4 sticky tabs, masonry portfolio, package cards, review breakdown, about block), `MyBookings`, `Profile`, `Search`
- Rewired: `CategoriesGrid` cards → `/category/:id`; `MostBooked` cards → `/photographer/:id`; "See all" → category page
- `Booking.jsx` now reads `cm_selected` to render the chosen photographer/package; falls back to default
- `Payment.jsx` now appends every confirmed booking to `cm_bookings_history` and clears `cm_selected`
- New `BottomNav` (router-aware, 4 tabs, z-[60])
- All routes guarded by `RequireAuth` (cm_phone + cm_name)
- Testing agent (iteration_1): 100% functional flows pass; fixed BottomNav z-index overlap + PhotographerProfile bottom padding

### (earlier) Apr 25, 2026 — Premium UI/UX overhaul + screen PDF
- Cinematic editorial design across all screens (cream + curved cards + Fraunces italic accents)
- Generated `/app/CorporateMoments_Screens.pdf` (7 screens, no Emergent badge) for client deliverable
- Re-capture script saved at `/app/capture_pdf.py`

## Backlog
- **P0**: FastAPI + MongoDB backend — replace mock.js & localStorage with real APIs (Auth/OTP, Photographers, Bookings, Payments)
- **P1**: Real Razorpay payment gateway (currently UI-only mock)
- **P2 (next)**: Photographer reviews submission, favorites/wishlist persistence, push/email notifications
- Admin dashboard, photographer KYC + onboarding, payouts, refunds

## Testing
- Iteration 1 (Apr 25, 2026): frontend e2e flow — `/app/test_reports/iteration_1.json`. 100% functional flows pass.

## Test credentials
- N/A — frontend-only auth via OTP. Any 10-digit phone + any 6-digit OTP works.
