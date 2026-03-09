"use client";

import { Box, Typography, Chip, IconButton } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import type { Player } from "@/context/GameContext";
import { CHARACTERS } from "@/context/GameContext";

interface PlayerCardProps {
  player: Player;
  index?: number;
  onRemove?: (id: string) => void;
  isActive?: boolean;
  showStats?: boolean;
  compact?: boolean;
}

export default function PlayerCard({
  player, index, onRemove, isActive = false, showStats = false, compact = false,
}: PlayerCardProps) {
  const char = CHARACTERS.find((c) => c.id === player.characterId) ?? CHARACTERS[0];

  return (
    <Box
      component={motion.div}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: isActive ? 1.05 : 1,
        boxShadow: isActive
          ? `0 8px 30px ${char.baseColor}44`
          : "0 4px 15px rgba(0,0,0,0.06)",
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      sx={{
        display: "flex", alignItems: "center", gap: compact ? 1.5 : 2,
        p: compact ? 1.5 : 2, borderRadius: 3,
        backgroundColor: isActive ? `${char.baseColor}15` : "white",
        border: `2px solid ${isActive ? char.baseColor : "transparent"}`,
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Character image */}
      <Box
        component={motion.div}
        animate={isActive ? { scale: [1, 1.08, 1] } : {}}
        transition={{ repeat: Infinity, duration: 2 }}
        sx={{ width: compact ? 36 : 48, height: compact ? 45 : 60, position: "relative", flexShrink: 0 }}
      >
        <Image src={char.image} alt={char.name} fill style={{ objectFit: "contain" }} />
      </Box>

      {/* Info */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant={compact ? "body1" : "h6"}
          fontWeight={600} noWrap
          sx={{ color: isActive ? char.baseColor : "text.primary" }}
        >
          {player.name}
        </Typography>
        <Chip
          icon={player.role === "parent" ? <PersonIcon /> : <ChildCareIcon />}
          label={player.role === "parent" ? "ผู้ปกครอง" : "ลูก"}
          size="small"
          sx={{
            mt: 0.5,
            backgroundColor: player.role === "parent" ? "#E8F5E9" : "#FFF3E0",
            color: player.role === "parent" ? "#2E7D32" : "#E65100",
            fontWeight: 500, fontSize: "0.75rem", height: 24,
          }}
        />
        {showStats && (
          <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
            <Typography variant="caption" color="text.secondary">
              ตอบ {player.stats.questionsAnswered} ข้อ
            </Typography>
          </Box>
        )}
      </Box>

      {/* Remove button */}
      {onRemove && (
        <IconButton size="small" onClick={() => onRemove(player.id)}
          sx={{ color: "#999", "&:hover": { color: "#F44336", backgroundColor: "#FEE" } }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
}
