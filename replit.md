# Word Rush - Party Word Game

A hilarious party word guessing game for teams, built with React + Vite + TypeScript.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Routing**: React Router v6
- **State/Data**: TanStack Query, React Hook Form + Zod
- **Charts**: Recharts
- **PWA**: vite-plugin-pwa (installable on mobile)

## Project Structure

- `src/pages/` — Route-level pages (Index, NotFound)
- `src/components/` — Game screens (GameSetup, GamePlay, ReadyScreen, TurnEndScreen, GameOverScreen) and UI components
- `src/hooks/` — Custom React hooks
- `src/lib/` — Utilities

## Dev Server

Runs on port 5000 via `npm run dev`.

## Replit Configuration

- Workflow: "Start application" → `npm run dev` on port 5000 (webview)
- Vite configured with `host: "0.0.0.0"` and `allowedHosts: true` for Replit proxy compatibility
- Lovable-tagger dependency removed (Replit-incompatible dev plugin)
