"use client";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { type OCEScore } from "@/context/GameContext";

const BG_CARD = "#FFFFFF";
const PRIMARY = "#3B9AB8"; // Life Event Blue

interface Props {
  oceScore: OCEScore;
  adjustScore: (key: keyof OCEScore, delta: number) => void;
  onBack: () => void;
  onSave: () => void;
}

export default function ScoreScreen({ oceScore, adjustScore, onBack, onSave }: Props) {
  const fields: { key: keyof OCEScore; label: string; sub: string }[] = [
    { key: "openness", label: "Openness", sub: "(เปิดใจ)" },
    { key: "empathy", label: "Empathy", sub: "(เข้าใจผู้อื่น)" },
    { key: "clarity", label: "Self-Clarity", sub: "(เข้าใจตนเอง)" },
  ];

  return (
    <motion.div key="score" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>

      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Button
          onClick={onBack}
          sx={{ minWidth: 0, p: 1, color: "#7A6248", borderRadius: 3 }}
        >
          <ArrowBackRoundedIcon />
        </Button>
        <Typography fontWeight={800} sx={{ flex: 1, textAlign: "center", color: "#3B9AB8", fontSize: "0.85rem", letterSpacing: "0.05em", mr: 4 }}>
          10. กรอกคะแนนรวม
        </Typography>
      </Box>

      <Box sx={{
        backgroundColor: BG_CARD, borderRadius: 2, p: 4, pt: 5, pb: 4,
        boxShadow: "0 4px 24px rgba(100,70,30,0.09)", mb: 3,
        border: "1px solid rgba(180,155,120,0.18)",
      }}>
        <Typography fontWeight={900} align="center" sx={{ color: "#2C2218", fontSize: "1.3rem", mb: 0.5 }}>
          คะแนนรวมที่ได้รับ
        </Typography>
        <Typography variant="body2" align="center" sx={{ color: "#7A6248", mb: 4, fontWeight: 600 }}>
          จากเพื่อนทุกคน
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 4 }}>
          {fields.map(({ key, label, sub }) => (
            <Box key={key} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.75 }}>
                <Typography fontWeight={800} sx={{ color: "#2C2218", fontSize: "0.95rem" }}>
                  {label}
                </Typography>
                <Typography fontWeight={700} sx={{ color: "#7A6248", fontSize: "0.75rem" }}>
                  {sub}
                </Typography>
              </Box>

              <Box sx={{
                display: "flex", alignItems: "center", gap: 1.5,
                backgroundColor: "#F9F5F0", borderRadius: 3, p: 0.5,
                border: "1px solid #EDE3D8",
              }}>
                <IconButton size="small" onClick={() => adjustScore(key, -1)}
                  sx={{ color: "#7A6248", backgroundColor: "#FFFFFF", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", borderRadius: 2 }}>
                  <RemoveRoundedIcon fontSize="small" />
                </IconButton>
                <Typography fontWeight={800} sx={{ minWidth: 20, textAlign: "center", color: "#2C2218", fontSize: "1.1rem" }}>
                  {oceScore[key] || 0}
                </Typography>
                <IconButton size="small" onClick={() => adjustScore(key, 1)}
                  sx={{ color: "#7A6248", backgroundColor: "#FFFFFF", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", borderRadius: 2 }}>
                  <AddRoundedIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>

        <Button variant="contained" fullWidth onClick={onSave}
          component={motion.button} whileTap={{ scale: 0.97 }}
          sx={{
            py: 1.85, borderRadius: 4, fontWeight: 800, fontSize: "1.1rem",
            background: `linear-gradient(135deg, ${PRIMARY}, #7AA880)`,
            boxShadow: `0 6px 20px ${PRIMARY}40`,
            textTransform: "none",
          }}>
          บันทึกคะแนน
        </Button>
      </Box>
    </motion.div>
  );
}
