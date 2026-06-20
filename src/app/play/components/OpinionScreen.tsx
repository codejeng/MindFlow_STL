"use client";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import RecordVoiceOverRoundedIcon from "@mui/icons-material/RecordVoiceOverRounded";

const BG_CARD = "#FFFFFF";
const PRIMARY = "#4E7B5E";

interface Props {
  onBack: () => void;
  onNext: () => void;
}

export default function OpinionScreen({ onBack, onNext }: Props) {
  return (
    <motion.div key="opinion" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>

      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Button
          onClick={onBack}
          sx={{ minWidth: 0, p: 1, color: "#7A6248", borderRadius: 3 }}
        >
          <ArrowBackRoundedIcon />
        </Button>
        <Typography fontWeight={800} sx={{ flex: 1, textAlign: "center", color: "#3D8B5E", fontSize: "0.85rem", letterSpacing: "0.05em", mr: 4 }}>
          แสดงความคิดเห็น
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
            backgroundColor: "#E6F5EC", display: "flex", alignItems: "center", justifyContent: "center"
          }}
        >
          <RecordVoiceOverRoundedIcon sx={{ fontSize: "3rem", color: PRIMARY }} />
        </Box>

        <Typography fontWeight={900} sx={{ color: "#2C2218", fontSize: "1.4rem", mb: 2 }}>
          แชร์ความคิดเห็นของคุณ
        </Typography>
        <Typography variant="body1" sx={{ color: "#7A6248", mb: 4, fontWeight: 600, lineHeight: 1.6 }}>
          บอกเล่าให้เพื่อนๆ ฟังว่าคุณคิดอย่างไรกับสถานการณ์นี้
        </Typography>

        <Button variant="contained" fullWidth onClick={onNext}
          component={motion.button} whileTap={{ scale: 0.97 }}
          sx={{
            py: 1.85, borderRadius: 4, fontWeight: 800, fontSize: "1.1rem",
            background: `linear-gradient(135deg, ${PRIMARY}, #7AA880)`,
            boxShadow: `0 6px 20px ${PRIMARY}40`,
            textTransform: "none",
          }}>
          พูดเสร็จแล้ว ถัดไป
        </Button>
      </Box>
    </motion.div>
  );
}
