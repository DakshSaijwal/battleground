# battleground

A browser-based 3D arena shooter, built as a Next.js/React wrapper around a vanilla-JS game engine ("Arena 5"). The player fights waves of enemies in a 3D arena rendered on an HTML canvas, with custom weapons, effects, and sound.

## Structure

The repository currently contains a single project:

```
arena5-react/
├── public/
│   ├── images/              # Background art
│   ├── sounds/              # Laser, explosion, and pickup sound effects
│   └── scripts/             # Legacy vanilla-JS game engine
│       ├── mathlib-min.js   # Math/vector utilities
│       ├── k3d-min.js       # Lightweight 3D rendering library
│       ├── gamelib.js       # Core game loop / handler
│       ├── arena_main.js    # Arena setup and game state
│       ├── arena_prerender.js
│       ├── arena_3d.js
│       ├── arena_player.js  # Player movement and controls
│       ├── arena_weapons.js # Weapon behavior
│       ├── arena_enemies.js # Enemy AI/spawning
│       └── arena_effects.js # Visual/particle effects
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx          # Renders the GameCanvas
    │   └── globals.css
    └── components/
        └── GameCanvas.tsx    # Loads the game scripts in sequence and mounts the canvas
```

`GameCanvas.tsx` sequentially injects the legacy scripts into the page, then calls into the resulting global `GameHandler`/`Arena` objects to initialize and start the game on a full-screen `<canvas>`.

## Tech stack

- Next.js 16 (App Router)
- React 19 / TypeScript
- Tailwind CSS 4
- A bundled, framework-agnostic JS game engine (`k3d`, `gamelib`, `arena_*`) for the actual 3D rendering and gameplay

## Getting started

```bash
cd arena5-react
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) to play.

Other available scripts:

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # lint with ESLint
```

## Notes

- `arena5-react/AGENTS.md` documents that this project runs on a customized/pre-release version of Next.js, and instructs AI coding agents to consult `node_modules/next/dist/docs/` before making changes, since APIs may differ from what's publicly documented.
