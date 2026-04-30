"use client";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import type { CharacterDef } from "@/context/GameContext";
import type { Question } from "@/data/questions";

const PRIMARY = "#5A7A65";

interface Props {
  question: Question;
  char?: CharacterDef;
  cardImageCode: string; // e.g. "P01", "PP01"
  onConfirm: () => void;
}

export default function ScenarioScreen({ question, char, cardImageCode, onConfirm }: Props) {
  // e.g. "P" or "PP"
  const prefix = cardImageCode.replace(/[0-9]/g, '');
  const imagePath = `/cards/${prefix}/${cardImageCode}.png`;
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
        boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
        border: "1px solid #E5E7EB", mb: 2,
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Typography sx={{ fontSize: "1.1rem" }}>📋</Typography>
          <Typography variant="body2" fontWeight={800} sx={{ color: "#374151", letterSpacing: "0.05em" }}>
            สถานการณ์
          </Typography>
        </Box>

        {/* Card Image Container */}
        <Box sx={{
          width: "100%", aspectRatio: "3/4", mb: 3,
          borderRadius: 4, overflow: "hidden", 
          backgroundColor: "#93C5FD", // Light blue background acting as border
          p: 2, 
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        }}>
          <Box sx={{
            position: "relative", width: "100%", height: "100%",
            backgroundColor: "white", borderRadius: 2, overflow: "hidden",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={imagePath} 
              alt={`การ์ด ${cardImageCode}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        </Box>

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
