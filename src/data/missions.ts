// ── Mission Types & Interfaces ───────────────────────────────────────────────

import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ExtensionRoundedIcon from "@mui/icons-material/ExtensionRounded";

export type MissionType =
  | "life-event"
  | "challenge"
  | "good-moments"
  | "pass-the-heart"
  | "coin";

export interface MissionGoal {
  type: MissionType;
  target: number;
}

export interface MissionDef {
  id: string;
  label: string;
  goals: MissionGoal[]; // 1 for simple, 2 for mixed
}

// ── Mission Pool ─────────────────────────────────────────────────────────────

const MISSION_POOL: MissionDef[] = [
  // --- Simple missions (single goal) ---
  {
    id: "m-le-2",
    label: "ตอบ Life Event 2 ครั้ง",
    goals: [{ type: "life-event", target: 2 }],
  },
  {
    id: "m-le-3",
    label: "ตอบ Life Event 3 ครั้ง",
    goals: [{ type: "life-event", target: 3 }],
  },
  {
    id: "m-ch-2",
    label: "ผ่าน Challenge 2 ครั้ง",
    goals: [{ type: "challenge", target: 2 }],
  },
  {
    id: "m-ch-2b",
    label: "ผ่าน Challenge 2 ครั้ง",
    goals: [{ type: "challenge", target: 2 }],
  },
  {
    id: "m-gm-2",
    label: "ได้รับ Good Moments 2 ใบ",
    goals: [{ type: "good-moments", target: 2 }],
  },
  {
    id: "m-gm-2b",
    label: "ได้รับ Good Moments 2 ใบ",
    goals: [{ type: "good-moments", target: 2 }],
  },
  {
    id: "m-ph-1",
    label: "ถูกเลือก Pass The Heart 1 ครั้ง",
    goals: [{ type: "pass-the-heart", target: 1 }],
  },
  {
    id: "m-ph-2",
    label: "ถูกเลือก Pass The Heart 2 ครั้ง",
    goals: [{ type: "pass-the-heart", target: 2 }],
  },
  {
    id: "m-coin-4",
    label: "มี Heart Coin 4 เหรียญ",
    goals: [{ type: "coin", target: 4 }],
  },
  {
    id: "m-coin-3",
    label: "มี Heart Coin 3 เหรียญ",
    goals: [{ type: "coin", target: 3 }],
  },

  // --- Mixed missions (two goals) ---
  {
    id: "m-mix-le1-ch1",
    label: "ตอบ Life Event 1 ครั้ง + ผ่าน Challenge 1 ครั้ง",
    goals: [
      { type: "life-event", target: 1 },
      { type: "challenge", target: 1 },
    ],
  },
  {
    id: "m-mix-gm2-ch1",
    label: "ได้ Good Moments 2 ใบ + ผ่าน Challenge 1 ครั้ง",
    goals: [
      { type: "good-moments", target: 2 },
      { type: "challenge", target: 1 },
    ],
  },
  {
    id: "m-mix-le1-gm1",
    label: "ตอบ Life Event 1 ครั้ง + ได้ Good Moments 1 ใบ",
    goals: [
      { type: "life-event", target: 1 },
      { type: "good-moments", target: 1 },
    ],
  },
  {
    id: "m-mix-ch1-ph1",
    label: "ผ่าน Challenge 1 ครั้ง + ถูกเลือก Pass The Heart 1 ครั้ง",
    goals: [
      { type: "challenge", target: 1 },
      { type: "pass-the-heart", target: 1 },
    ],
  },
  {
    id: "m-mix-le2-coin3",
    label: "ตอบ Life Event 2 ครั้ง + มี Heart Coin 3 เหรียญ",
    goals: [
      { type: "life-event", target: 2 },
      { type: "coin", target: 3 },
    ],
  },
];

// ── Spawn Logic ──────────────────────────────────────────────────────────────

/**
 * Randomly select `count` unique missions from the pool.
 * Uses a Fisher-Yates shuffle on a copy of the pool, then takes the first
 * `count` entries.
 */
export function spawnMissions(count: number = 3): MissionDef[] {
  const pool = [...MISSION_POOL];

  // Fisher-Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, Math.min(count, pool.length));
}

// ── Icon Mapping ─────────────────────────────────────────────────────────────

export const MISSION_ICON_META: Record<MissionType, { Icon: React.ElementType; iconBg: string; iconColor: string }> = {
  "life-event": {
    Icon: ChatRoundedIcon,
    iconBg: "#DFF0F5",
    iconColor: "#3B9AB8",
  },
  "challenge": {
    Icon: ExtensionRoundedIcon,
    iconBg: "#F3E8FF",
    iconColor: "#7C5CBF",
  },
  "good-moments": {
    Icon: FavoriteRoundedIcon,
    iconBg: "#E6F5EC",
    iconColor: "#4E7B5E",
  },
  "pass-the-heart": {
    Icon: FavoriteRoundedIcon,
    iconBg: "#FFE8E8",
    iconColor: "#D45B5B",
  },
  "coin": {
    Icon: FavoriteRoundedIcon,
    iconBg: "#FEF6E5",
    iconColor: "#E0B850",
  },
};

export default MISSION_POOL;
