"use client";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import type { Player } from "@/context/GameContext";
import { CHARACTERS } from "@/context/GameContext";

const BG_CARD = "#FFFFFF";
const PRIMARY = "#4E7B5E";

interface Props {
  players: Player[];
  onBack: () => void;
  onReady: () => void;
}

export default function HeartGateWaitingScreen({ players, onBack, onReady }: Props) {
  const allReady = players.every((p) => p.doorUnlocked);

  return (
    <motion.div key="heart_gate_waiting" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>

      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton onClick={onBack} sx={{ color: "#2C2218" }}>
          <ArrowBackRoundedIcon />
        </IconButton>
        <Typography fontWeight={800} sx={{ flex: 1, textAlign: "center", color: "#2C2218", fontSize: "1.15rem", mr: 5 }}>
          Heart Gate
        </Typography>
      </Box>

      <Box sx={{
        backgroundColor: BG_CARD, borderRadius: 2, p: 3, pt: 4, pb: 4,
        boxShadow: "0 4px 24px rgba(100,70,30,0.09)", mb: 3, textAlign: "center",
        border: "1px solid rgba(180,155,120,0.18)",
      }}>
        <Typography variant="body2" sx={{ color: "#7A6248", mb: 4, fontWeight: 600 }}>
          ทุกคนปลดล็อกประตูของตัวเองแล้วหรือยัง?
        </Typography>

        {/* Players Grid */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap", mb: 5 }}>
          {players.map((p) => {
            const char = CHARACTERS.find((c) => c.id === p.characterId);
            const isReady = p.doorUnlocked;
            const baseColor = char?.baseColor || PRIMARY;

            return (
              <Box 
                key={p.id} 
                component={motion.div}
                sx={{
                  position: "relative",
                  width: 90, height: 130,
                  backgroundColor: isReady ? `${baseColor}20` : "#F9F5F0",
                  borderRadius: 1, p: 1,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  border: `2px solid ${isReady ? baseColor : "rgba(180,155,120,0.15)"}`,
                  transition: "all 0.3s",
                  opacity: isReady ? 1 : 0.65,
                }}
              >
                <Box sx={{ position: "relative", width: 60, height: 70, mb: 1 }}>
                  {char && <Image src={char.image} alt={char.name} fill style={{ objectFit: "contain" }} />}
                </Box>
                <Typography fontWeight={800} noWrap sx={{ color: "#2C2218", fontSize: "0.8rem", width: "100%", textAlign: "center" }}>
                  {p.name}
                </Typography>

                {isReady && (
                  <Box component={motion.div} initial={{ scale: 0 }} animate={{ scale: 1 }} sx={{ position: "absolute", bottom: -10, right: -10, backgroundColor: "#FFFFFF", borderRadius: "50%" }}>
                    <CheckCircleRoundedIcon sx={{ color: PRIMARY, fontSize: "1.6rem" }} />
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>

        {/* Action Button */}
        <Button variant="contained" fullWidth onClick={allReady ? onReady : onBack}
          component={motion.button} whileTap={{ scale: 0.97 }}
          sx={{
            py: 1.85, borderRadius: 4, fontWeight: 800, fontSize: "1.1rem",
            background: allReady ? `linear-gradient(135deg, ${PRIMARY}, #7AA880)` : "linear-gradient(135deg, #9C8B76, #B0A090)",
            boxShadow: allReady ? `0 6px 20px ${PRIMARY}40` : "0 4px 12px rgba(0,0,0,0.1)",
            color: "#FFFFFF",
            textTransform: "none",
          }}>
          {allReady ? "Unlock Heart Gate" : "กลับไปเล่นต่อ (ข้ามเทิร์น)"}
        </Button>
      </Box>
    </motion.div>
  );
}
