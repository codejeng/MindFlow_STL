"use client";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import RecordVoiceOverRoundedIcon from "@mui/icons-material/RecordVoiceOverRounded";
import type { Question } from "@/data/questions";
import type { Player } from "@/context/GameContext";

const BG_CARD = "#FFFFFF";
const PRIMARY = "#D45B5B"; // Red for pass the heart

interface Props {
  question: Question;
  currentPlayer: Player;
  targetPlayer?: Player;
  onBack: () => void;
  onNext: () => void;
}

export default function PassTheHeartActionScreen({ question, currentPlayer, targetPlayer, onBack, onNext }: Props) {
  return (
    <motion.div key="pass_the_heart_action" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>

      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Button
          onClick={onBack}
          sx={{ minWidth: 0, p: 1, color: "#7A6248", borderRadius: 3 }}
        >
          <ArrowBackRoundedIcon />
        </Button>
        <Typography fontWeight={800} sx={{ flex: 1, textAlign: "center", color: PRIMARY, fontSize: "0.85rem", letterSpacing: "0.05em", mr: 4 }}>
          Pass The Heart
        </Typography>
      </Box>

      {/* Main Card */}
      <Box sx={{
        backgroundColor: BG_CARD, borderRadius: 2, p: 4, pt: 6, pb: 5,
        boxShadow: "0 4px 24px rgba(100,70,30,0.09)", mb: 3, textAlign: "center",
        border: "1px solid rgba(180,155,120,0.18)",
      }}>
        
        <Box
          component={motion.div}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          sx={{
            width: 80, height: 80, borderRadius: "50%", mx: "auto", mb: 4,
            backgroundColor: "#FCE8E8", display: "flex", alignItems: "center", justifyContent: "center"
          }}
        >
          <RecordVoiceOverRoundedIcon sx={{ fontSize: "3rem", color: PRIMARY }} />
        </Box>

        <Typography fontWeight={900} sx={{ color: "#2C2218", fontSize: "1.4rem", mb: 1, lineHeight: 1.4 }}>
          ถึงตาของ {targetPlayer?.name || "ผู้ถูกเลือก"} แล้ว!
        </Typography>
        
        <Typography variant="body1" sx={{ color: "#7A6248", mb: 3, fontWeight: 600 }}>
          ให้ {targetPlayer?.name || "เพื่อนที่คุณเลือก"} เป็นผู้ตอบคำถามหรือเล่าเรื่องราวนี้แทน
        </Typography>

        {/* Question display */}
        <Box sx={{ backgroundColor: "#F9F5F0", p: 3, borderRadius: 3, mb: 4 }}>
          <Typography fontWeight={800} sx={{ color: PRIMARY, mb: 1, fontSize: "0.9rem" }}>คำถาม:</Typography>
          <Typography fontWeight={700} sx={{ color: "#2C2218", fontSize: "1.05rem", lineHeight: 1.6 }}>
            {question.text}
          </Typography>
        </Box>

        <Button variant="contained" fullWidth onClick={onNext}
          component={motion.button} whileTap={{ scale: 0.97 }}
          sx={{
            py: 1.85, borderRadius: 4, fontWeight: 800, fontSize: "1.1rem",
            background: `linear-gradient(135deg, ${PRIMARY}, #E07070)`,
            boxShadow: `0 6px 20px ${PRIMARY}40`,
            textTransform: "none",
          }}>
          ตอบเสร็จแล้ว ถัดไป
        </Button>
      </Box>
    </motion.div>
  );
}
