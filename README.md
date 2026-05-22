# Cougar Cuisine — Homepage

Upscale private dining marketing site. Static HTML, in-browser React + Babel, no build step.

## Run locally

Open `index.html` in any modern browser, or serve the folder:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then visit <http://localhost:8000>.

## Project structure

```
index.html              Entry — loads React, Babel, and the JSX components
app.jsx                 Page composition (which sections render, in what order)
components.jsx          All section components (Navbar, Hero, Brand, …, Footer)
tweaks-panel.jsx        Optional in-page tweak controls
styles.css              Page-level styles
colors_and_type.css     Design tokens — palette, typography, scheme classes
components.css          Button / input / badge / card primitives
assets/                 Photography (jpg), logos (svg)
fonts/                  Prata 400, Montserrat 300–700 (woff2)
```

## Design system

Built on the Cougar Cuisine design system:

- **Display:** Prata (serif)
- **Body:** Montserrat (sans)
- **Brand color:** Crown of Thorns burgundy `#6E1F28`
- **Neutrals:** Bone black `#090202`, stone gray `#DAD9D9`
- **Edges:** 0px radii everywhere
- **Borders:** 2px in scheme foreground

All tokens live in `colors_and_type.css`. Apply `.scheme-1`–`.scheme-6` to any section to recolor descendants.

## Pushing to GitHub

```bash
git init
git add .
git commit -m "Initial commit — Cougar Cuisine homepage"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Or drag this folder into <https://github.com/new> after creating an empty repo.
