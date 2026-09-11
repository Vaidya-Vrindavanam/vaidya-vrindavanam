# Mobile responsive audit

Date: 2026-09-11

## Fixes

- Grouped the announcement and main navigation into one sticky header. The previous 44px offset overlapped a wrapping announcement on phones.
- Measured the header and condition navigation heights with ResizeObserver. Section navigation, anchor destinations, and treatment booking sidebars now use those measurements instead of fixed offsets.
- Made the mobile navigation scrollable with a separate fixed 44px close control. Previously the logo and booking link could extend outside a short viewport with no way to scroll to them.
- Increased menu tap targets to 44px, kept the compact header logo on one line, and retained the mobile menu until the full desktop navigation fits at 1280px.
- Closed the overlay and released the body scroll lock when resizing into desktop navigation.
- Allowed treatment breadcrumbs to wrap. At 320px, several current-page names were clipped by the hero image container.
- Set mobile contact form inputs and textarea to 16px.

## Verification

Browser inspection used the Computer browser tools with Chrome viewport overrides; this was not physical iOS/Android device testing.

| Coverage | Viewport | Result |
| --- | --- | --- |
| All 44 local pages | 320 × 568 | No page-level horizontal overflow; treatment breadcrumbs fit |
| All 44 local pages | 390 × 844 | No page-level horizontal overflow or clipped tested heading/paragraph/link containers |
| All 44 local pages | 430 × 932 | No page-level horizontal overflow |
| 13 representative routes covering every template | 768, 1024, 1280 × 900 | No page or main-navigation horizontal overflow |
| Mobile menu | 320 × 568 and 667 × 375 | Booking link reachable by scrolling/keyboard, close control accessible |
| Menu resize | 667 → 1280px | Overlay closes and body scrolling is restored |
| Condition navigation | 320px | Navigation starts at header bottom; selected section clears both sticky bars |
| Contact page | Mobile | All four visible fields render at 16px; form editing and FAQ expansion work |
| Production build | `npm run build` | Passed, 44 pages generated |
| Diff whitespace | `git diff --check` | Passed |

The 44 pages comprise the home, about, contact, packages, treatments listing, conditions listing, blog listing, 20 treatment details, 12 condition details, 2 articles, 2 seasonal pages, and 404 page. Intentional clipping of decorative seasonal/404 artwork and horizontal scrolling inside the condition section-navigation strip are preserved.

The live site was inspected to reproduce the original mobile issues. The full verification matrix above targets the edited local source. Existing local edits and seasonal content differ from production; this work does not deploy or reconcile those content changes. No contact form was submitted and no external booking message was sent.
