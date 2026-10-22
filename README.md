# Sewa Academy Website – School & Admissions Edition

This package is a static website for Sewa Academy in Slota, Athi River.

## Changes in this edition

- Added a dedicated **Why Enroll** page explaining the reasons families may choose Sewa Academy.
- Added a dedicated **School Life** page covering school transport, classrooms, sports, arts, music, scouts, trips and the nurturing environment.
- Added prominent Why Enroll and School Life sections to the home page.
- Added real school photographs already supplied in the `img/` folder; no fake school-bus photograph has been used.
- Removed coding/robotics and French from the website content as requested.
- Added the new pages to the navigation and sitemap.

## School transport

The public Sewa Academy information states that school transport is available for families in Athi River and surrounding areas, with routes, availability and current charges confirmed by the school. Do not publish a bus count, route list or fee unless the school confirms it.

## Important photo note

Only photographs that are actually available in `img/` should be presented as Sewa Academy photographs. A photograph of another school's bus must never be presented as a Sewa Academy bus. If you have an actual Sewa Academy bus photograph, place it in `img/` and it can replace the campus image used beside the transport section.
## SEO and clean URLs

The site includes clean URL routing, canonical URLs, Open Graph and Twitter/X metadata, `sitemap.xml`, `robots.txt`, structured data for the school, accessible image alt text, and improved heading hierarchy.

- Apache/cPanel: `.htaccess` handles clean URLs and 301 redirects.
- Vercel: `vercel.json` handles clean URLs and redirects because Vercel does not use `.htaccess`.
- Canonical host currently configured as `https://sewa-website-demo-vpy4.vercel.app`. Update this host if the site moves to a permanent custom domain.
