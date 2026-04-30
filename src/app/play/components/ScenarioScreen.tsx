"use client";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import type { CharacterDef } from "@/context/GameContext";
import type { Question } from "@/data/questions";

const PRIMARY = "#5A7A65";

interface Props {
  question: Question;
  char?: CharacterDef;
  onConfirm: () => void;
}

export default function ScenarioScreen({ question, char, onConfirm }: Props) {
  return (
    <motion.div key="scenario" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>

      {/* Card header */}
      <Box sx={{
        display: "flex", alignItems: "center", gap: 1.5, mb: 2,
        backgroundColor: "#fff", borderRadius: 3, p: 2,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}>
        <Box sx={{
          width: 40, height: 40, borderRadius: "50%",
          backgroundColor: char?.baseColor ?? PRIMARY,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Typography sx={{ color: "white", fontWeight: 700, fontSize: "0.8rem" }}>
            {question.code}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">การ์ด #{question.code}</Typography>
          <Typography variant="body2" fontWeight={600} sx={{ color: "#374151" }}>
            {question.ageGroup}
          </Typography>
        </Box>
      </Box>

      {/* Scenario box */}
      <Box sx={{
        backgroundColor: "#fff", borderRadius: 4, p: 3,
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        border: `2px solid ${PRIMARY}22`, mb: 2,
      }}>
        <Typography variant="caption" fontWeight={700} sx={{
          color: PRIMARY, textTransform: "uppercase", letterSpacing: "0.08em",
          display: "block", mb: 1.5,
        }}>
          📋 สถานการณ์
        </Typography>
        <Typography sx={{
          fontSize: "1.05rem", fontWeight: 600, color: "#1F2937",
          lineHeight: 1.8, mb: 2,
        }}>
          {question.text}
        </Typography>

        {/* Decorative mic */}
        <Box sx={{
          display: "flex", alignItems: "center", gap: 1,
          backgroundColor: "#F0FDF4", borderRadius: 3, px: 2, py: 1.25,
          border: "1px dashed #86EFAC",
        }}>
          <Typography sx={{ fontSize: "1.3rem" }}>🎙️</Typography>
          <Typography variant="body2" sx={{ color: "#166534", fontWeight: 500 }}>
            อ่านสถานการณ์นี้ให้เพื่อนฟัง และแชร์สิ่งที่คุณจะทำในสถานการณ์นี้
          </Typography>
        </Box>
      </Box>

      <Button variant="contained" fullWidth onClick={onConfirm}
        component={motion.button} whileTap={{ scale: 0.97 }}
        sx={{
          py: 1.75, borderRadius: 3, fontWeight: 700, fontSize: "1rem",
          background: `linear-gradient(135deg, ${PRIMARY}, #7AA880)`,
          boxShadow: `0 4px 16px ${PRIMARY}40`,
        }}>
        ✅ ยืนยันพูดเรียบร้อยแล้ว
      </Button>
    </motion.div>
  );
}
