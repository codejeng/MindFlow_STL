"use client";
import { useEffect, useState } from "react";
import { Box, Typography, Button, LinearProgress } from "@mui/material";
import { motion } from "framer-motion";
import { OCE_META } from "@/context/GameContext";

const WAIT_SECS = 90;
const PRIMARY = "#5A7A65";

interface Props {
  playerName: string;
  charColor: string;
  onDone: () => void;
}

export default function WaitingScreen({ playerName, charColor, onDone }: Props) {
  const [secs, setSecs] = useState(WAIT_SECS);

  useEffect(() => {
    if (secs <= 0) { onDone(); return; }
    const t = setTimeout(() => setSecs((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secs, onDone]);

  const pct = (secs / WAIT_SECS) * 100;
  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  return (
    <motion.div key="waiting" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>

      <Box sx={{
        backgroundColor: "#fff", borderRadius: 4, p: 3,
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)", textAlign: "center", mb: 2,
      }}>
        {/* Coin box animation */}
        <Box component={motion.div}
          animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }}
          sx={{ fontSize: "4rem", mb: 1 }}>
          📦
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5, mb: 2 }}>
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              component={motion.div}
              animate={{ y: [0, -12, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.2, delay: i * 0.3, repeat: Infinity }}
              sx={{ fontSize: "1.5rem" }}
            >
              🪙
            </Box>
          ))}
        </Box>

        <Typography fontWeight={700} sx={{ color: "#1F2937", fontSize: "1.15rem", mb: 0.5 }}>
          รอเพื่อน ๆ หย่อนเหรียญลงกล่อง
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          <Box component="span" fontWeight={700} sx={{ color: charColor }}>{playerName}</Box>
          {" "}— เพื่อนจะให้คะแนนคุณใน 3 มิติ
        </Typography>

        {/* Trait icons */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
          {(Object.entries(OCE_META) as [string, typeof OCE_META[keyof typeof OCE_META]][]).map(([, m]) => (
            <Box key={m.labelEn} sx={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5,
            }}>
              <Box sx={{
                width: 48, height: 48, borderRadius: "50%",
                backgroundColor: m.bg, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.4rem", border: `2px solid ${m.color}40`,
              }}>
                {m.icon}
              </Box>
              <Typography variant="caption" fontWeight={600} sx={{ color: m.color, fontSize: "0.7rem" }}>
                {m.labelEn}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Countdown */}
        <Box sx={{
          backgroundColor: secs <= 15 ? "#FEF2F2" : "#F0FDF4",
          borderRadius: 3, py: 1.5, px: 2, mb: 2,
          border: `1px solid ${secs <= 15 ? "#FCA5A5" : "#86EFAC"}`,
        }}>
          <Typography fontWeight={800} sx={{
            fontSize: "2rem", letterSpacing: "0.1em",
            color: secs <= 15 ? "#DC2626" : PRIMARY,
          }}>
            {mm}:{ss}
          </Typography>
        </Box>

        <LinearProgress variant="determinate" value={pct} sx={{
          height: 8, borderRadius: 4,
          backgroundColor: "#E5E7EB",
          "& .MuiLinearProgress-bar": {
            background: secs <= 15
              ? "linear-gradient(90deg,#FCA5A5,#EF4444)"
              : `linear-gradient(90deg,#86EFAC,${PRIMARY})`,
            borderRadius: 4,
          },
        }} />
      </Box>

      <Button variant="outlined" fullWidth onClick={onDone}
        sx={{ py: 1.5, borderRadius: 3, fontWeight: 600, borderColor: PRIMARY, color: PRIMARY }}>
        นับเหรียญแล้ว → กรอกคะแนน
      </Button>
    </motion.div>
  );
}
