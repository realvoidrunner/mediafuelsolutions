# Media Fuel Solutions website

One-page site for Media Fuel Solutions, a lead generation agency for local and service businesses. Built with Next.js (App Router).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy (Docker + Traefik)

The site runs as one Docker container behind the shared Traefik proxy (the same one used by `frappe-route-trading`), which handles HTTPS certificates from Let's Encrypt automatically.

**One-time setup**

1. At your domain registrar, add **A** records for `mediafuelsolutions.com` and `www.mediafuelsolutions.com` pointing to the server's IP.
2. Make sure Traefik is running on the server (`cd traefik && docker compose up -d` in the Frappe project) and ports 80 and 443 are open.
3. Copy this project to the server (for example `git clone`).

**Deploy or update**

```bash
git pull
docker compose up -d --build
```

Traefik picks the container up once it reports healthy (a few seconds) and requests the certificate on the first visit. `www.` redirects to `https://mediafuelsolutions.com`, and plain `http://` redirects to `https://`.

**Useful commands**

```bash
docker compose ps          # status and health
docker compose logs -f     # site logs
docker compose down        # stop the site
```

The domain and redirect live in the `labels` in `docker-compose.yml`. The share-image domain is `metadataBase` in `app/layout.tsx`. Change both together if the domain ever changes.

## Where to change things

| What | File |
| --- | --- |
| Contact details (email, phone, WhatsApp, hours) | `app/content.ts`, `contact` |
| Services, industries, "why us", steps | `app/content.ts` |
| Hero headline and example lead feed | `app/page.tsx` |
| Colours, fonts, spacing | `app/globals.css`, the `:root` block at the top |
| Logo | `public/media-fuel-logo.png` (header and footer), `public/og-image.png` (link preview). Original artwork: `media-fuel-solutions-high-resolution-logo.png` |
| Browser tab icon | `app/icon.png`, `app/apple-icon.png` |

## Motion

Smooth scrolling uses [Lenis](https://github.com/darkroomengineering/lenis); scroll animations use [GSAP](https://gsap.com) + ScrollTrigger. All of it is set up in `app/components/Motion.tsx`, and the page opts in with data attributes:

| Attribute | Effect |
| --- | --- |
| `data-split` (with `<SplitWords />` inside) | Heading words slide up when scrolled into view |
| `data-reveal` | Element fades up when scrolled into view |
| `data-stagger` | Its children fade up one after another |
| `data-float="0.5"` | Drifts gently with scroll (negative = opposite direction) |

Visitors with "reduce motion" turned on in their device settings get a still page with normal scrolling.

## Contact form

There's no backend yet. Pressing **Send message** opens the visitor's email app with the message already written, addressed to `contact.email`. To receive messages directly, connect a form service (Formspree, Resend, etc.) or a Next.js Server Action in `app/components/ContactForm.tsx`.
