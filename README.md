# Xenon Saud — UI/UX Portfolio

A premium, editorial personal portfolio built to support UI/UX design internship
applications. Built with React, Vite, Tailwind CSS, and lucide-react.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

Output is written to `dist/`. Deploy that folder to any static host
(Vercel, Netlify, GitHub Pages, etc.).

## Structure

- `src/pages/Home.jsx` — hero, selected work, about, process, skills, education
- `src/pages/Contact.jsx` — standalone contact page
- `src/pages/CaseStudy.jsx` — case study template, driven by `src/data/projects.js`
- `src/components/` — Navbar, Footer, section components, and the abstract
  Figma-inspired mockup graphics used as project placeholders
- `src/data/projects.js` — all case study copy in one place; edit this file to
  update project descriptions or swap in real screenshots

## Notes for you, Xenon

- The project visuals are abstract geometric compositions (`Mockup.jsx`), not
  real screenshots — swap in actual Figma exports or product screenshots for
  Aura Beauty, WorkFolio, and TaskOra when you have them (drop images into
  `src/assets/` and update `ProjectCard` / `CaseStudy` to render `<img>`
  instead of `<Mockup />`).
- The contact form doesn't send email yet — it just confirms submission
  locally. Wire it up to a service like Formspree, Resend, or a small backend
  endpoint when you're ready.
- Email, LinkedIn, and GitHub links use the details on file
  (xenusaud1010@gmail.com, github.com/nonex10,
  linkedin.com/in/xenon-saud-645034289) — update them in
  `src/pages/Contact.jsx` and `src/components/Footer.jsx` if they change.
