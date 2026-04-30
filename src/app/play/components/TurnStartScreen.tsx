"use client";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import type { CharacterDef, Player } from "@/context/GameContext";

const PRIMARY = "#5A7A65";

interface Props {
  currentPlayer: Player;
  char?: CharacterDef;
  turnIndex: number;
  totalTurns: number;
  onPlayCard: () => void;
  onSkip: () => void;
}

export default function TurnStartScreen({
  currentPlayer, char, turnIndex, totalTurns, onPlayCard, onSkip,
}: Props) {
  return (
    <motion.div
      key="turn-start"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.35 }}
    >
      {/* Current player banner */}
      <Box
        component={motion.div}
        animate={{ scale: [1, 1.012, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        sx={{
          background: `linear-gradient(135deg, ${char?.baseColor ?? PRIMARY}18, ${char?.baseColor ?? PRIMARY}06)`,
          border: `3px solid ${char?.baseColor ?? PRIMARY}44`,
          borderRadius: 5, p: 3, textAlign: "center", mb: 3,
          boxShadow: `0 8px 30px ${char?.baseColor ?? PRIMARY}20`,
        }}
      >
        {/* Floating character */}
        <Box
          component={motion.div}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          sx={{ width: 120, height: 150, mx: "auto", mb: 1.5, position: "relative" }}
        >
          {char && (
            <Image src={char.image} alt={char.name} fill style={{ objectFit: "contain" }} />
          )}
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          ตาของ
        </Typography>
        <Typography variant="h4" fontWeight={800} sx={{ color: char?.baseColor ?? PRIMARY, mb: 1 }}>
          {currentPlayer.name}
        </Typography>

        <Box sx={{
          display: "inline-flex", alignItems: "center", gap: 0.75,
          backgroundColor: "white", borderRadius: 5, px: 2, py: 0.5,
          border: `1px solid ${char?.baseColor ?? PRIMARY}30`,
        }}>
          <Typography sx={{ fontSize: "0.85rem" }}>
            {currentPlayer.role === "parent" ? "👨‍👩‍👧" : currentPlayer.role === "child" ? "🧒" : "🧑‍🤝‍🧑"}
          </Typography>
          <Typography variant="body2" fontWeight={600} sx={{ color: char?.baseColor ?? PRIMARY }}>
            {currentPlayer.role === "parent" ? "ผู้ปกครอง" : currentPlayer.role === "child" ? "ลูก" : "เพื่อน"}
          </Typography>
        </Box>
      </Box>

      {/* Question */}
      <Box sx={{
        backgroundColor: "white", borderRadius: 4, p: 3,
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)", mb: 3, textAlign: "center",
        border: "1.5px solid #E5D5C5",
      }}>
        <Typography sx={{ fontSize: "1.5rem", mb: 1 }}>🎲</Typography>
        <Typography fontWeight={700} sx={{ color: "#1F2937", fontSize: "1.1rem", mb: 0.5 }}>
          ตกพื้นที่การ์ดหรือไม่?
        </Typography>
        <Typography variant="body2" color="text.secondary">
          หากตกช่องการ์ด กด "เล่นการ์ด" เพื่อเริ่มเทิร์น
        </Typography>
      </Box>

      {/* Action buttons */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={onPlayCard}
          component={motion.button}
          whileTap={{ scale: 0.97 }}
          sx={{
            py: 2, fontSize: "1.1rem", fontWeight: 700, borderRadius: 4,
            background: `linear-gradient(135deg, ${PRIMARY}, #7AA880)`,
            boxShadow: `0 6px 20px ${PRIMARY}40`,
          }}
        >
          🃏 เล่นการ์ด
        </Button>

        <Button
          variant="outlined"
          fullWidth
          onClick={onSkip}
          component={motion.button}
          whileTap={{ scale: 0.97 }}
          sx={{
            py: 1.75, fontSize: "1rem", fontWeight: 600, borderRadius: 4,
            borderColor: "#D1D5DB", color: "#6B7280",
            "&:hover": { borderColor: "#9CA3AF", backgroundColor: "#F9FAFB" },
          }}
        >
          ⏭ ไม่ตกช่องการ์ด — ข้ามเทิร์น
        </Button>
      </Box>

      {/* Turn progress dots */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5, mt: 3 }}>
        {Array.from({ length: Math.min(totalTurns, 8) }).map((_, i) => (
          <Box key={i} sx={{
            width: 8, height: 8, borderRadius: "50%",
            backgroundColor: i === turnIndex % Math.min(totalTurns, 8)
              ? (char?.baseColor ?? PRIMARY)
              : "#D1D5DB",
            transition: "background-color 0.3s",
          }} />
        ))}
      </Box>
    </motion.div>
  );
}
