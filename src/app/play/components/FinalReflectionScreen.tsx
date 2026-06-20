"use client";
import { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import type { Player } from "@/context/GameContext";

const BG_CARD = "#FFFFFF";
const PRIMARY = "#4E7B5E";

interface Props {
  players: Player[];
  answeringPlayer: Player;
  onBack: () => void;
  onDone: () => void;
}

export default function FinalReflectionScreen({ players, answeringPlayer, onBack, onDone }: Props) {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  // Map choices dynamically from players (A, B, C, D...)
  const letters = ["A.", "B.", "C.", "D.", "E.", "F."];

  // Choices: 'ตัวเอง' for the answering player, their names for others
  const choices = [
    { id: answeringPlayer.id, label: "ตัวเอง" },
    ...players.filter((p) => p.id !== answeringPlayer.id).map((p) => ({ id: p.id, label: p.name })),
  ];

  return (
    <motion.div key="final_reflection" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>

      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton onClick={onBack} sx={{ color: "#2C2218" }}>
          <ArrowBackRoundedIcon />
        </IconButton>
        <Typography fontWeight={800} sx={{ flex: 1, textAlign: "center", color: "#2C2218", fontSize: "1.15rem", mr: 5 }}>
          คำถามสุดท้าย
        </Typography>
      </Box>

      <Box sx={{
        backgroundColor: BG_CARD, borderRadius: 2, p: 3, pt: 4, pb: 4,
        boxShadow: "0 4px 24px rgba(100,70,30,0.09)", mb: 3, textAlign: "center",
        border: "1px solid rgba(180,155,120,0.18)",
      }}>
        <Typography variant="caption" sx={{ color: "#9C8B76", fontWeight: 600, letterSpacing: "0.04em" }}>
          ถึงตาของ {answeringPlayer.name} ตอบคำถาม
        </Typography>
        <Typography variant="body2" sx={{ color: "#7A6248", mb: 4, mt: 1, fontWeight: 700, fontSize: "0.95rem", lineHeight: 1.6 }}>
          จากการเล่นเกมนี้<br />คุณเข้าใจใครมากขึ้นที่สุด?
        </Typography>

        {/* Choices */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 5 }}>
          {choices.map((choice, index) => {
            const isSelected = selectedPlayerId === choice.id;
            return (
              <Box
                key={choice.id}
                component={motion.div}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPlayerId(choice.id)}
                sx={{
                  display: "flex", alignItems: "center", gap: 2,
                  px: 3, py: 1.5, borderRadius: 4,
                  backgroundColor: isSelected ? "#E6F5EC" : "#F9F5F0",
                  border: `2px solid ${isSelected ? PRIMARY : "transparent"}`,
                  cursor: "pointer", transition: "all 0.2s",
                }}
              >
                <Typography fontWeight={800} sx={{ color: isSelected ? PRIMARY : "#9C8B76", minWidth: 24, textAlign: "left" }}>
                  {letters[index] || ""}
                </Typography>
                <Typography fontWeight={700} sx={{ color: isSelected ? PRIMARY : "#2C2218" }}>
                  {choice.label}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {/* Submit Button */}
        <Button variant="contained" fullWidth disabled={!selectedPlayerId} onClick={onDone}
          sx={{
            py: 1.85, borderRadius: 4, fontWeight: 800, fontSize: "1.1rem",
            background: selectedPlayerId ? `linear-gradient(135deg, ${PRIMARY}, #7AA880)` : "#E5E7EB",
            boxShadow: selectedPlayerId ? `0 6px 20px ${PRIMARY}40` : "none",
            color: selectedPlayerId ? "#FFFFFF" : "#9CA3AF",
            textTransform: "none",
            "&.Mui-disabled": {
              backgroundColor: "#E5E7EB",
              color: "#9CA3AF",
            }
          }}>
          ส่งคำตอบ
        </Button>
      </Box>
    </motion.div>
  );
}
