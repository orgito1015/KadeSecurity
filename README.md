# Kade Security

Professional cybersecurity company website for **Kade Security** — an Albanian cybersecurity firm targeting SMEs in Albania and the Balkans region.

Hosted on **GitHub Pages** using pure HTML, CSS, and JavaScript (no build step required).

## Pages & Sections

- **Hero** — Company name, tagline "Your Shield in the Digital World", animated background grid, stats strip
- **About** — Company description, values, animated shield visual
- **Services** — Penetration Testing, Security Assessments, Security Awareness Training
- **Why Choose Us** — Local expertise, affordable SME pricing, regional presence
- **Contact** — Contact form (name, email, company, service, message) + contact details
- **Footer** — Logo, service/company links, social icons, © 2025 Kade Security

## Design

| Token | Value |
|---|---|
| Background primary | `#0a0a0a` |
| Background secondary | `#111111` |
| Accent | `#00aaff` |
| Text | `#ffffff` / `#a0a0a0` |
| Font | Inter (Google Fonts) |

- Fully responsive (mobile + desktop)
- Scroll-reveal animations via `IntersectionObserver`
- Animated counters in the hero stats strip
- Mobile hamburger navigation

## File Structure

```
index.html        ← Main HTML
css/style.css     ← Styles
js/main.js        ← JavaScript
README.md
```

## Deployment

Push to the `main` branch and enable **GitHub Pages** (`Settings → Pages → Source: main / root`). No build step needed.
