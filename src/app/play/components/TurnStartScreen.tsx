"use client";

import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import type { CharacterDef, Player } from "@/context/GameContext";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import ExtensionRoundedIcon from "@mui/icons-material/ExtensionRounded";

const PRIMARY = "#4E7B5E";
const BG      = "#FAF5EC";

// ─── Channel menu items ───────────────────────────────────────────────────────
interface ChannelItem {
  id: string;
  label: string;
  iconBg: string;
  iconColor: string;
  Icon: React.ElementType;
}

const MiniGateIcon = ({ color }: { color: string }) => (
  <Box sx={{ 
    width: 22, height: 26, 
    border: `2px solid ${color}`, 
    borderBottom: "none",
    borderRadius: "10px 10px 0 0", 
    position: "relative", 
    display: "flex", alignItems: "center", justifyContent: "center",
    mt: 0.5
  }}>
    <Box sx={{ position: "absolute", bottom: 0, left: "50%", width: "2px", height: "100%", backgroundColor: color, transform: "translateX(-50%)", opacity: 0.5 }} />
    <FavoriteRoundedIcon sx={{ fontSize: "11px", color: color, zIndex: 1, backgroundColor: "#FDF3E3", borderRadius: "50%" }} />
  </Box>
);

const CHANNELS: ChannelItem[] = [
  {
    id: "life-event",
    label: "Life Event",
    iconBg: "#DFF0F5",
    iconColor: "#3B9AB8",
    Icon: ChatRoundedIcon,
  },
  {
    id: "good-moments",
    label: "Good Moments",
    iconBg: "#E6F5EC",
    iconColor: "#4E7B5E",
    Icon: FavoriteRoundedIcon,
  },
  {
    id: "challenge-moments",
    label: "Challenge Moments",
    iconBg: "#F3E8FF",
    iconColor: "#7C5CBF",
    Icon: ExtensionRoundedIcon,
  },
  {
    id: "pass-the-heart",
    label: "Pass The Heart",
    iconBg: "#FFE8E8",
    iconColor: "#D45B5B",
    Icon: FavoriteRoundedIcon,
  },
  {
    id: "mission-gate",
    label: "Mission Gate",
    iconBg: "#FDF3E3",
    iconColor: "#D4A012",
    Icon: () => <MiniGateIcon color="#D4A012" />,
  },
];

// ─── Props ────────────────────────────────────────────────────────────────────
interface Props {
  currentPlayer: Player;
  char?: CharacterDef;
  turnIndex: number;
  totalTurns: number;
  onSelectChannel: (channelId: string) => void;
  onSkip: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function TurnStartScreen({
  currentPlayer, char, turnIndex, totalTurns, onSelectChannel,
}: Props) {
  return (
    <motion.div
      key="turn-start"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.28 }}
    >
      {/* Header text */}
      <Box sx={{ textAlign: "center", mb: 2.5 }}>
        <Typography fontWeight={900} sx={{ color: "#2C2218", fontSize: "1.5rem" }}>
          เลือกช่องที่ตก
        </Typography>
      </Box>

      {/* Main card */}
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: "0 4px 24px rgba(100,70,30,0.09)",
          border: "1px solid rgba(180,155,120,0.18)",
          overflow: "hidden",
          mb: 2,
        }}
      >
        {/* Player banner */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            px: 3,
            pt: 2.5,
            pb: 2,
            borderBottom: "1px solid rgba(180,155,120,0.15)",
          }}
        >
          {/* Character */}
          <Box
            component={motion.div}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            sx={{ width: 76, height: 86, position: "relative", flexShrink: 0 }}
          >
            {char && (
              <Image src={char.image} alt={char.name} fill style={{ objectFit: "contain" }} />
            )}
          </Box>

          {/* Name + sub */}
          <Box>
            <Typography variant="caption" sx={{ color: "#9C8B76", fontWeight: 600, letterSpacing: "0.04em" }}>
              เลือกช่องที่ตก
            </Typography>
            <Typography variant="caption" sx={{ color: "#9C8B76", display: "block",fontWeight: 600, letterSpacing: "0.04em" }}>
              ถึงตาทอยลูกเต๋าของ
            </Typography>
            <Typography fontWeight={900} sx={{ color: "#2C2218", fontSize: "1.2rem", lineHeight: 1.2 }}>
              {currentPlayer.name}
            </Typography>
          </Box>
        </Box>

        {/* Channel list */}
        <Box sx={{ p: 1.5, display: "flex", flexDirection: "column", gap: 1 }}>
          {CHANNELS.map((ch, idx) => (
            <Box
              key={ch.id}
              component={motion.div}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              whileTap={{ scale: (ch.id === "mission-gate" && currentPlayer.doorUnlocked) ? 1 : 0.975 }}
              onClick={() => {
                if (ch.id === "mission-gate" && currentPlayer.doorUnlocked) return;
                onSelectChannel(ch.id);
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.75,
                p: 1.4,
                borderRadius: 3,
                cursor: (ch.id === "mission-gate" && currentPlayer.doorUnlocked) ? "not-allowed" : "pointer",
                backgroundColor: BG,
                border: "1.5px solid rgba(180,155,120,0.16)",
                opacity: (ch.id === "mission-gate" && currentPlayer.doorUnlocked) ? 0.6 : 1,
                transition: "all 0.15s",
                "&:hover": {
                  borderColor: (ch.id === "mission-gate" && currentPlayer.doorUnlocked) ? "rgba(180,155,120,0.16)" : `${PRIMARY}50`,
                  backgroundColor: (ch.id === "mission-gate" && currentPlayer.doorUnlocked) ? BG : `${PRIMARY}06`,
                  transform: (ch.id === "mission-gate" && currentPlayer.doorUnlocked) ? "none" : "translateX(2px)",
                },
              }}
            >
              {/* CSS Icon circle */}
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: ch.iconBg,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ch.Icon sx={{ color: ch.iconColor, fontSize: "1.5rem" }} />
              </Box>

              {/* Label */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  fontWeight={700}
                  sx={{ color: "#2C2218", fontSize: "1rem", lineHeight: 1.3 }}
                >
                  {ch.label}
                  {ch.id === "mission-gate" && currentPlayer.doorUnlocked && " (ปลดล็อกแล้ว)"}
                </Typography>
              </Box>

              {/* Chevron */}
              <ArrowForwardIosRoundedIcon sx={{ color: "#C8BAA8", fontSize: "0.85rem" }} />
            </Box>
          ))}
        </Box>

        {/* Heart Gate collective goal */}
        <Box
          sx={{
            mx: 1.5, mb: 1.5, mt: 0.5,
            display: "flex", alignItems: "center", gap: 1.5,
            backgroundColor: "#FDF0F0",
            borderRadius: 3,
            border: "1.5px solid rgba(212,91,91,0.18)",
            p: 1.5,
          }}
        >
          <Box
            sx={{
              width: 40, height: 40, borderRadius: "50%",
              backgroundColor: "#FDECEA",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <FavoriteRoundedIcon sx={{ color: "#D45B5B", fontSize: "1.2rem" }} />
          </Box>
          <Box>
            <Typography fontWeight={800} sx={{ color: "#2C2218", fontSize: "0.85rem", lineHeight: 1.3 }}>
              ทุกคนปลดล็อกประตูได้
            </Typography>
            <Typography fontWeight={700} sx={{ color: "#D45B5B", fontSize: "0.82rem", lineHeight: 1.3 }}>
              เปิด Heart Gate ร่วมกัน!
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Turn progress dots */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 0.75, mt: 1.5 }}>
        {Array.from({ length: Math.min(totalTurns, 8) }).map((_, i) => (
          <Box
            key={i}
            component={motion.div}
            animate={{ width: i === turnIndex % Math.min(totalTurns, 8) ? 20 : 8 }}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor:
                i === turnIndex % Math.min(totalTurns, 8)
                  ? (char?.baseColor ?? PRIMARY)
                  : "rgba(180,155,120,0.3)",
              transition: "background-color 0.3s",
            }}
          />
        ))}
      </Box>
    </motion.div>
  );
}

