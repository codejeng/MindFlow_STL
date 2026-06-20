# MindFlow STL — Agent Rules

This file documents project-wide conventions that all AI agents must follow when working on this codebase.

## UI & Styling Rules

### No Emojis
**Do not use emoji characters anywhere in the codebase.**
This applies to:
- JSX / TSX render output (visible text, labels, buttons)
- String constants and data definitions (e.g. role labels, category names)
- Comments and documentation strings inside source files

Use plain Thai or English text, MUI icons (`@mui/icons-material`), or SVG assets instead.

## Technology Stack

- Framework: **Next.js** (App Router, TypeScript)
- Styling: **MUI (Material UI v5)** — use `sx` prop for all styling; do not use Tailwind or inline `style` except for `objectFit` / image properties
- Animation: **Framer Motion**
- State: **React Context** (`GameContext`) — extend this for new shared state, do not add separate stores
- Icons: **`@mui/icons-material`** — prefer these over emoji or custom SVG where possible

## File & Folder Conventions

- Pages live under `src/app/<route>/page.tsx`
- Shared UI components go in `src/components/common/`
- Global state lives in `src/context/GameContext.tsx`
- Public static assets: `public/` — images in `public/images/`, character sprites in `public/characters/`, deck icons in `public/deck-icons/`

## Navigation Flow

```
/ (Home)  →  /select-deck  →  /setup  →  /order  →  /play  →  /summary
```

Back buttons must use explicit `router.push(previousRoute)` — not `router.back()` — so the flow is always predictable.

## Design Tokens (shared across all pages)

```ts
const BG      = "#FAF5EC";  // page background
const PRIMARY = "#4E7B5E";  // brand green
const ACCENT  = "#CF6B3E";  // warm orange accent
const CARD_BG = "#FFFFFF";  // card surfaces
```

## Critical Game Logic Rules

- **Mission Gate Penalty**: If a player lands on the Mission Gate channel but has NOT completed all 3 missions, their turn must be skipped.
- **Heart Gate Entry**: ALL players must finish their missions and unlock their Mission Doors (`doorUnlocked = true`) before the Heart Gate can be opened. Use `Array.prototype.every()`, not `some()`.
- **Heart Gate Checking**: The `HeartGateWaitingScreen` must ALWAYS derive player readiness from `Player.doorUnlocked`. Do NOT use manual React state checkboxes.
- **Heart Gate Early Access**: Players can access the `HeartGateWaitingScreen` at any time via the "จบเกม" button to check the team's progress. If they try to unlock it early, they suffer a "skip turn" penalty and return to the board.
- **Johari Window Scoring**: 
  - The Y-Axis (Self-Awareness) is derived automatically from the `Player.stats.selfReflectionTags` chosen during gameplay.
  - The X-Axis (Peer-Feedback) is manually inputted at the Summary screen based on physical coins given by other players.
  - Max coin score per dimension is `(Total Players - 1) * 2`.
  - Max tag score per dimension is `Math.max(questionsAnswered, 1)`.
