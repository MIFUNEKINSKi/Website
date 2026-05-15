# Portfolio Site — Design Handoff

**Prepared by:** Claude (engineering)
**For:** Design team
**Date:** 2026-05-04
**Repo:** github.com/MIFUNEKINSKi/Website
**Live:** https://chris-moore-portfolio.vercel.app

---

## 1. Context

Personal portfolio for **Christopher Moore**, currently job-hunting. Audience is
**technical hiring managers and recruiters for data engineering, data analytics,
and software engineering roles**. The site's single job is to convert a cold
visit into an interview.

**The gap to close:** the project *content* now reads as a mid-to-senior
engineer who ships production systems — event-driven AWS pipelines, infra-as-code,
geospatial data fusion, healthcare data standards. The *visual design* still
reads as early-career, because it's a recognizable tutorial template. Design's
mandate is to make the chrome match the substance.

## 2. Tech constraints (keep the design implementable)

- **Stack:** React 18, Create React App (`react-scripts` 5), per-component SCSS,
  React Router v6, deployed on Vercel.
- **Structure:** `src/components/{home, about, projects, contact, sidebar,
  layout, animated_letters}` — each folder has an `index.js` + `index.scss`.
- Stay within this stack for now. A framework migration (Next, Tailwind, a
  component library) is viable but is a separate scoping conversation — flag it
  if you think it's warranted rather than assuming it.
- Build must stay Vercel-deployable; no SSR assumptions.

## 3. What's already working — please don't redo

- **Projects page content & information architecture** — expandable cards with
  metrics, code snippets, architecture bullets, and deep-dive copy. The copy is
  accurate and dialed in. **Restyle freely, but keep the structure and don't
  rewrite the technical copy.**
- **Routing, navigation, live links** — all functional and current.
- **Deploy pipeline** — working; don't break the CRA build.

## 4. The core problem: it looks like the template it came from

The site is built on a widely-used React portfolio tutorial template. The
specific tells:

| Element | Where | Why it's a tell |
|---|---|---|
| Teal `rgba(40,80,100)` + gold `#ffd700` palette | global / all SCSS | Template's default palette, unchanged |
| Coolvetica display font | global | Template's default display face |
| Rotating 3D cube of tech-stack icons | `about/index.js` (`cubespinner`) | Signature template component |
| Letter-by-letter animated intro | `home/index.js` + `animated_letters/` | Signature template component |
| `react-loaders` "line-scale" loader on every route | all pages | Template default |

Anyone who screens early-career portfolios recognizes this on sight. It quietly
undercuts the seniority the project content is working to establish.

## 5. Design punch list (prioritized)

### P0 — Highest leverage (the template tells)

1. **Replace the signature template animations.** The cube spinner (`about`),
   the letter-by-letter intro (`home`), and the line-scale loaders. These are
   the loudest "tutorial" markers. They don't have to be deleted — but they need
   to be replaced with something that reads as deliberate, not default.
2. **Typography system.** Replace Coolvetica. Establish a real type scale:
   display / heading / body / **mono** (mono matters — the projects page renders
   code). Define weights, sizes, line-heights.
3. **Color system.** Decide: refine the teal/gold into an owned palette, or
   repalette entirely. Two issues regardless of that choice:
   - Run a **WCAG AA contrast audit**. `rgba(255,255,255,0.5)` body text
     (`projects` intro) and `rgba(255,215,0,0.55)` hint text are likely under
     the 4.5:1 threshold.
   - The **5 project-card accent colors** (`#4CAF50`, `#7C3AED`, `#FF9900`,
     `#2196F3`, `#E91E63`) currently look arbitrary — harmonize them into an
     intentional set.

### P1 — Worth doing

4. **Home page hierarchy.** Currently sparse — name, a one-line subtitle, a few
   buttons, and large dead space. It should do more work: preview the strongest
   content rather than making visitors click in to find it.
5. **Surface the projects.** The projects page is the strongest asset but it's
   one click away. Consider 1–2 featured project cards on the home page.
6. **Spacing & rhythm system.** Establish consistent vertical rhythm, container
   widths, and margins across all four pages. Right now each page is styled as
   its own island.
7. **Sidebar / nav.** Icon-only vertical rail. Functional — active states and
   tooltips were just fixed — but still reads template. Worth a pass on labels,
   active treatment, and the profile-photo crop.

### P2 — Polish

8. **Project card detail.** Expand/collapse interaction, the code-block chrome
   (it uses fake macOS traffic-light dots), and the metric-badge design.
9. **Contact page.** Recently built, intentionally minimal (`contact/index.js`)
   — functional but could be elevated to match the rest.
10. **Mobile.** Media queries exist but are inconsistent; some hardcoded values
    (e.g. `projects/index.scss` `padding: 60px 100px`). Needs a coherent
    responsive pass.
11. **Share assets.** Favicon, Open Graph image, meta description — for when the
    link is pasted into Slack, email, or LinkedIn.

## 6. Open questions for design

- Keep teal/gold as a refined, owned brand — or full repalette?
- Stay on CRA + SCSS, or is a migration on the table?
- Is there a stronger headshot available? The current one is a small sidebar crop.
- Wordmark only, or does Chris want a personal logomark?
- Tone target: how far toward "editorial / personal" vs "clean / corporate / SaaS"?

## 7. Explicitly out of scope

- Project technical copy and the list of projects (locked — engineering owns this).
- The resume / résumé-button decision (a separate open question with Chris).
- Anything backend- or deploy-related.
