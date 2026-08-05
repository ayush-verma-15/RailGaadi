# RailGaadi / RailPulse AI

This repository contains the **RailGaadi** project, a Next.js-based railway telemetry and route intelligence platform designed for Indian Railways corridors.

It includes dynamic live train telemetry, route planning, fleet dashboards, delay risk scoring, eco analytics, search, and bookmark/watchlist capabilities.

---

## 🚀 Project Overview

RailGaadi is a full-stack Next.js application built with the App Router. The project is organized into reusable UI components, domain services, data adapters, state stores, and API routes.

Key capabilities:
- Live train telemetry and vehicle tracking
- AI-style delay risk prediction
- Eco footprint analytics and carbon comparison
- Fleet matrix and mission-critical train dashboards
- Inter-corridor route planner
- Search-driven command console and train lookup
- Bookmark/watchlist persistence

---

## 📂 Repository Structure

```
RailGaadi-main/
├── app/                    # Next.js app router pages and API routes
│   ├── api/                # REST API endpoints for telemetry, search, analytics, etc.
│   ├── analytics/          # Analytics overview page
│   ├── bookmarks/          # Watchlist/bookmark page
│   ├── fleet/              # Fleet matrix page
│   ├── planner/            # Route planner page
│   ├── telemetry/[id]/     # Live telemetry detail page for each train
│   ├── train/[id]/         # Train detail pages
│   ├── layout.tsx          # Global layout wrapper
│   └── page.tsx            # Home / command console entry page
├── components/             # Reusable React components
│   ├── ai/                 # AI assistant and recommendations UI
│   ├── analytics/          # Analytics cards and widgets
│   ├── common/             # Generic UI elements (Badge, Card, VoiceSearch)
│   ├── journey/            # Journey-related display components
│   ├── layout/             # Navigation, footer, and page layout
│   ├── radar/              # Map and radar canvas components
│   ├── search/             # Search bar and result components
│   └── telemetry/          # Telemetry dashboard cards and timeline views
├── core/                   # Domain and service layer
│   ├── infrastructure/     # Adapters and data source integrations
│   └── services/           # Prediction and analytics engines
├── hooks/                  # Custom React hooks for telemetry and search
├── lib/                    # Helper modules for external APIs and caches
├── prisma/                 # Prisma schema and database config
├── store/                  # Zustand stores and global state logic
├── public/                 # Static assets
├── styles/                 # Global CSS and Tailwind styles
├── types/                  # Shared TypeScript types
├── utils/                  # Utility helpers
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript config
└── tailwind.config.ts      # Tailwind config
```

---

## ✨ Features

### Core User Features
- **Live telemetry dashboard**: Real-time train tracking and vehicle status display.
- **Search & command console**: Search train numbers or route names with keyboard shortcut `Ctrl+K` / `⌘K`.
- **Fleet matrix**: Overview of important trains and corridor status.
- **Planner**: Simulate route connections and compare estimated durations and eco impact.
- **Bookmarks**: Save favorite trains or telemetry items to a watchlist.
- **Analytics**: Delay risk scores, eco metrics, emissions comparison, and efficiency ratings.

### UX / UI
- responsive layout for desktop and mobile
- modern glassmorphism with dark theme
- animated menu/console interactions using Framer Motion
- map-based route visualization using MapLibre GL

### Data Services
- `TelemetryService` handles live telemetry fetch and updates
- `DelayPredictorEngine` computes delay risk from speed, station density, corridor constraints, and schedule lag
- `EcoAnalyticsEngine` computes energy, emission and carbon savings estimates
- External data integration through APIs such as OpenWeather, OpenTopography, and RailRadar integrations

---

## 🛠 Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript 5.5**
- **Tailwind CSS**
- **Zustand** for global state
- **React Query** for async data fetching
- **MapLibre GL** for maps
- **Prisma** for database/client generation
- **Framer Motion** for motion and animation

---

## ⚙️ Requirements

- Node.js 18+ (recommended)
- npm 11+
- A modern browser for local development

---

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd RailGaadi-main/RailGaadi-main
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

4. Add required keys to `.env`.

---

## 🌍 Environment Variables

The project uses the following environment variables. Populate them in a `.env` file at the project root.

```env
RAILRADAR_API_KEY=
NEXT_PUBLIC_MAPTILER_API_KEY=
OPENWEATHER_API_KEY=
OPENTOPOGRAPHY_API_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

- `RAILRADAR_API_KEY`: API key for railway telemetry / schedule data.
- `NEXT_PUBLIC_MAPTILER_API_KEY`: Public MapTiler API key for basemaps.
- `OPENWEATHER_API_KEY`: OpenWeather API key for weather-driven analytics.
- `OPENTOPOGRAPHY_API_KEY`: OpenTopography key for terrain elevation or slope metrics.
- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`: Redis cache / persistence support for session or telemetry state.

---

## 🚀 Running Locally

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

## 📦 Production Build

Build the app for production:

```bash
npm run build
```

Run the production server:

```bash
npm run start
```

---

## 🧪 Useful Scripts

- `npm run dev` — Start Next.js development server.
- `npm run build` — Build production assets.
- `npm run start` — Start Next.js production server.
- `npm run lint` — Run ESLint checks.
- `npm run prisma:generate` — Generate Prisma client from schema.

---

## 📌 Key Pages

- `/` — Home command console and search entry.
- `/fleet` — Fleet matrix and train dispatch overview.
- `/planner` — Route planner and corridor simulation.
- `/bookmarks` — Saved watchlist and favorites.
- `/telemetry/[id]` — Live train telemetry and diagnostics page.
- `/analytics` — Analytics summary panel.
- `/train/[id]` — Train-specific detail pages.

---

## 💡 Development Notes

- The app uses the App Router; page files in `app/` map directly to route URLs.
- Shared UI components are in `components/`, with specialized radar, telemetry, analytics, and layout components.
- Domain logic is inside `core/services/` and `core/infrastructure/`.
- Global client state is stored in `store/` using Zustand.
- Helpers and API integration utilities are stored in `lib/`.

---

## 🪄 Suggested Improvements

If you want to extend this project, consider:
- Adding authentication / user accounts
- Adding real-time websocket telemetry updates
- Improving route planner pathfinding with actual rail network graph data
- Adding unit / integration tests
- Connecting Prisma to a real database backend
- Adding offline caching and service worker support

---

## 📚 Notes

This README is intended to document the full structure and usage of the RailGaadi project. Adjust the environment variable settings, API endpoints, and service integrations to match your own deployment environment.
