"use client";

/* ──────────────────────────────────────────────────────────────
   Minimal, hand-drawn SVG icon set for the MindFlow play guide.
   Line style: rounded caps/joins, 2px strokes, two-tone fills.
   No emoji — everything here is vector art.
   ────────────────────────────────────────────────────────────── */

type IcoProps = { size?: number };

const PRIMARY = "#4E7B5E";
const ACCENT = "#CF6B3E";

/* Reusable heart shape (24×24 viewBox) */
export function Heart({ size = 24, color = ACCENT, filled = true }: IcoProps & { color?: string; filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 20.4C12 20.4 3.6 14.7 3.6 8.9C3.6 5.9 5.8 3.9 8.3 3.9C10 3.9 11.4 4.9 12 6.2C12.6 4.9 14 3.9 15.7 3.9C18.2 3.9 20.4 5.9 20.4 8.9C20.4 14.7 12 20.4 12 20.4Z"
        fill={filled ? color : "none"}
        stroke={color}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Door card with arched door + heart */
export function IcDoorCard({ size = 44 }: IcoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden>
      <rect x="9" y="4" width="26" height="36" rx="5" fill="#F1EAFB" stroke="#7C5CBF" strokeWidth="2" />
      <path d="M15 35V20a7 7 0 0114 0v15" fill="#FFFFFF" stroke="#7C5CBF" strokeWidth="2" />
      <path
        d="M22 22.4c-.7-1.1-2.4-.8-2.9.4-.4.9.1 1.9 2.9 3.7 2.8-1.8 3.3-2.8 2.9-3.7-.5-1.2-2.2-1.5-2.9-.4Z"
        fill="#7C5CBF"
      />
    </svg>
  );
}

/* Heart token coin */
export function IcHeartToken({ size = 44 }: IcoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden>
      <circle cx="22" cy="22" r="16" fill="#FBE0E6" stroke="#E0708A" strokeWidth="2" />
      <circle cx="22" cy="22" r="12" fill="none" stroke="#E0708A" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
      <path
        d="M22 28.5C22 28.5 15 23.7 15 19.6C15 17.5 16.6 16 18.5 16C19.8 16 20.9 16.8 22 18C23.1 16.8 24.2 16 25.5 16C27.4 16 29 17.5 29 19.6C29 23.7 22 28.5 22 28.5Z"
        fill="#E0708A"
      />
    </svg>
  );
}

/* Heart gate — stone arch with glowing heart */
export function IcHeartGate({ size = 44 }: IcoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden>
      <path d="M7 40V22a15 15 0 0130 0v18" fill="#EFE6F5" stroke="#A98FC4" strokeWidth="2" strokeLinejoin="round" />
      <path d="M13 40V23a9 9 0 0118 0v17" fill="#8C6A5A" stroke="#5A3E32" strokeWidth="2" strokeLinejoin="round" />
      <line x1="22" y1="14" x2="22" y2="40" stroke="#5A3E32" strokeWidth="1.4" opacity="0.5" />
      <path
        d="M22 31C22 31 16 26.7 16 22.8C16 20.9 17.5 19.5 19.3 19.5C20.4 19.5 21.4 20.2 22 21.2C22.6 20.2 23.6 19.5 24.7 19.5C26.5 19.5 28 20.9 28 22.8C28 26.7 22 31 22 31Z"
        fill="#FFF1C8"
        stroke="#F0C95A"
        strokeWidth="1.2"
      />
    </svg>
  );
}

/* Game board with path */
export function IcBoard({ size = 44 }: IcoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden>
      <rect x="5" y="7" width="34" height="30" rx="5" fill="#EAF2EC" stroke={PRIMARY} strokeWidth="2" />
      <path d="M11 31c4-1 4-8 9-8s5 6 9 5 5-9 5-9" fill="none" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeDasharray="0.5 5" />
      <circle cx="12" cy="31" r="2.6" fill={ACCENT} />
      <circle cx="33" cy="13" r="2.6" fill="#7C5CBF" />
    </svg>
  );
}

/* Dice */
export function IcDice({ size = 44 }: IcoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden>
      <rect x="9" y="9" width="26" height="26" rx="6" fill="#FFFFFF" stroke="#6B6B6B" strokeWidth="2" />
      <circle cx="16" cy="16" r="2.2" fill={ACCENT} />
      <circle cx="28" cy="16" r="2.2" fill={ACCENT} />
      <circle cx="22" cy="22" r="2.2" fill={ACCENT} />
      <circle cx="16" cy="28" r="2.2" fill={ACCENT} />
      <circle cx="28" cy="28" r="2.2" fill={ACCENT} />
    </svg>
  );
}

/* Player pawn */
export function IcPawn({ size = 44, color = PRIMARY }: IcoProps & { color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden>
      <circle cx="22" cy="13" r="6" fill={color} />
      <path d="M16 22c0-2 12-2 12 0l3 13a2 2 0 01-2 2.5H15A2 2 0 0113 35Z" fill={color} />
    </svg>
  );
}

/* Stacked cards */
export function IcCardStack({ size = 44 }: IcoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden>
      <rect x="8" y="13" width="20" height="26" rx="4" fill="#FBF0D8" stroke="#C58A2E" strokeWidth="2" transform="rotate(-9 18 26)" />
      <rect x="16" y="8" width="20" height="26" rx="4" fill="#FFFFFF" stroke={ACCENT} strokeWidth="2" />
      <line x1="20" y1="15" x2="32" y2="15" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="20" y1="20" x2="29" y2="20" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

/* Banknote (ธนบัตรเปิดใจ) — generic bill, tinted */
export function IcBanknote({ size = 44, color = "#3B9AB8" }: IcoProps & { color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 44" fill="none" aria-hidden>
      <rect x="5" y="11" width="38" height="22" rx="4" fill="#FFFFFF" stroke={color} strokeWidth="2" />
      <circle cx="24" cy="22" r="6" fill="none" stroke={color} strokeWidth="2" />
      <path
        d="M24 25.2C24 25.2 20.6 22.9 20.6 20.9C20.6 19.9 21.4 19.2 22.3 19.2C22.9 19.2 23.6 19.6 24 20.2C24.4 19.6 25.1 19.2 25.7 19.2C26.6 19.2 27.4 19.9 27.4 20.9C27.4 22.9 24 25.2 24 25.2Z"
        fill={color}
      />
      <circle cx="11" cy="16.5" r="1.4" fill={color} />
      <circle cx="37" cy="27.5" r="1.4" fill={color} />
    </svg>
  );
}

/* Manual / booklet */
export function IcManual({ size = 44 }: IcoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden>
      <path d="M22 11c-3-2-8-2-12-1v23c4-1 9-1 12 1 3-2 8-2 12-1V10c-4-1-9-1-12 1Z" fill="#EAF2EC" stroke={PRIMARY} strokeWidth="2" strokeLinejoin="round" />
      <line x1="22" y1="11" x2="22" y2="34" stroke={PRIMARY} strokeWidth="1.6" />
    </svg>
  );
}

/* Flag (START) */
export function IcFlag({ size = 44 }: IcoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden>
      <line x1="14" y1="7" x2="14" y2="37" stroke={PRIMARY} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M14 9h17l-4 5 4 5H14Z" fill={ACCENT} stroke={ACCENT} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

/* Speech bubble — Life Event */
export function IcChat({ size = 28, color = "#3B9AB8" }: IcoProps & { color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden>
      <path d="M5 6h18a2 2 0 012 2v9a2 2 0 01-2 2h-9l-5 4v-4H5a2 2 0 01-2-2V8a2 2 0 012-2Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="10" cy="12.5" r="1.4" fill={color} />
      <circle cx="14" cy="12.5" r="1.4" fill={color} />
      <circle cx="18" cy="12.5" r="1.4" fill={color} />
    </svg>
  );
}

/* Sun / good moment */
export function IcGoodMoment({ size = 28, color = PRIMARY }: IcoProps & { color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="14" cy="14" r="6" fill="none" stroke={color} strokeWidth="2" />
      <path d="M14 7v-3M14 24v-3M7 14H4M24 14h-3M9 9 7 7M21 21l-2-2M19 9l2-2M7 21l2-2" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* Puzzle — challenge */
export function IcPuzzle({ size = 28, color = "#7C5CBF" }: IcoProps & { color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M6 6h6a2 2 0 114 0h6v6a2 2 0 110 4v6h-6a2 2 0 10-4 0H6v-6a2 2 0 100-4V6Z"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Two hands offering a heart — Pass The Heart */
export function IcHands({ size = 28, color = "#D45B5B" }: IcoProps & { color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M14 13C14 13 10.5 10.6 10.5 8.4C10.5 7.2 11.4 6.4 12.5 6.4C13.2 6.4 13.7 6.8 14 7.3C14.3 6.8 14.8 6.4 15.5 6.4C16.6 6.4 17.5 7.2 17.5 8.4C17.5 10.6 14 13 14 13Z"
        fill={color}
      />
      <path d="M3 16c2-1 4 0 5 2l3 3M25 16c-2-1-4 0-5 2l-3 3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M8 18l3 3M20 18l-3 3" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* Target / mission */
export function IcTarget({ size = 28, color = "#C58A2E" }: IcoProps & { color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="14" cy="14" r="9" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="14" cy="14" r="5" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="14" cy="14" r="1.6" fill={color} />
    </svg>
  );
}

/* Sparkle — good moments memory */
export function IcSparkle({ size = 28, color = PRIMARY }: IcoProps & { color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden>
      <path d="M14 4c1 5 2 6 7 7-5 1-6 2-7 7-1-5-2-6-7-7 5-1 6-2 7-7Z" fill={color} />
      <path d="M22 16c.5 2 .8 2.5 2.8 3-2 .5-2.3 1-2.8 3-.5-2-.8-2.5-2.8-3 2-.5 2.3-1 2.8-3Z" fill={color} opacity="0.6" />
    </svg>
  );
}

/* Checkmark in circle */
export function IcCheck({ size = 22, color = PRIMARY }: IcoProps & { color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="9" fill={color} opacity="0.14" />
      <path d="M7 11.2l2.8 2.8L15.5 8" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
