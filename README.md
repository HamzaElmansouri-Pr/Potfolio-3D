# Software Engineering Portfolio — Command Center Edition

A highly interactive, enterprise-grade Next.js portfolio with a "Command Center" aesthetic. Built with React, Tailwind CSS, and Framer Motion, featuring immersive 3D physics, interactive glass-morphism bento grids, and dynamic terminal telemetry.

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Minimalist Enterprise / Deep Navy Protocol)
- **Animations:** Framer Motion (3D Orbit, Parallax, SVG tracking)
- **Icons:** Lucide-React

## ⚙️ Features

- **Command Center Hero:** A visually stunning 3D Orbit slider demonstrating architectural concepts with Z-axis depth scaling and live synchronized typographic HUDs.
- **Dynamic Telemetry Badges:** Live status readouts, 'glitch' effect heartbeat monitors, and interactive cross-fading terminal lines.
- **Enterprise Bento Grid:** Responsive CSS Grid layouts containing services mapping (Cloud, Backend, Security) powered by custom interactive radial hover gradients.
- **Scroll Reveal Physics:** Staggered intersection observer hooks yielding smooth scroll transitions.

## 📦 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Build Context:**
   The project is heavily optimized for fast rendering out of the box and natively maps image references to local `/images/` subfolders.

## 📂 Architecture Overview
- `src/components/sections/`: Contains the primary volumetric blocks (HeroOrbitSlider, AboutMe, Services, FeaturedProjects).
- `src/hooks/`: Contains custom intersection physics (`useScrollReveal`).
- `src/lib/`: Houses the simulated data and future-proof API abstraction layers logic (`mock-data.ts`, `api.ts`).

## 🛡️ License
Private repository / All rights reserved.
