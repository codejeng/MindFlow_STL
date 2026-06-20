import { useState } from "react";
import { Box, Typography, Button, TextField, MenuItem } from "@mui/material";
import { motion } from "framer-motion";
import type { Player, OCEScore } from "@/context/GameContext";

const PRIMARY = "#4E7B5E";

interface Props {
  player: Player;
  maxCoins: number;
  onSubmit: (coins: OCEScore, contextTag: string) => void;
}

const CONTEXT_TAGS = [
  "ครอบครัว (Family)",
  "เพื่อนสนิท (Close Friends)",
  "เพื่อนร่วมงาน (Coworkers)",
  "คนรัก (Partner)",
  "เพื่อนทั่วไป (Acquaintances)",
];

export default function CoinInputForm({ player, maxCoins, onSubmit }: Props) {
  const [openness, setOpenness] = useState<number | "">("");
  const [empathy, setEmpathy] = useState<number | "">("");
  const [clarity, setClarity] = useState<number | "">("");
  const [contextTag, setContextTag] = useState<string>(CONTEXT_TAGS[0]);

  const isFormValid =
    openness !== "" && empathy !== "" && clarity !== "" &&
    openness >= 0 && openness <= maxCoins &&
    empathy >= 0 && empathy <= maxCoins &&
    clarity >= 0 && clarity <= maxCoins;

  const handleSubmit = () => {
    if (isFormValid) {
      onSubmit(
        { openness: Number(openness), empathy: Number(empathy), clarity: Number(clarity) },
        contextTag
      );
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Box sx={{
        backgroundColor: "#FFFFFF", borderRadius: 3, p: 4,
        boxShadow: "0 8px 32px rgba(100,70,30,0.08)",
        border: "1px solid rgba(180,155,120,0.18)",
        maxWidth: 500, mx: "auto", textAlign: "center"
      }}>
        <Typography variant="h5" fontWeight={800} sx={{ color: "#2C2218", mb: 1 }}>
          นับเหรียญของ {player.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "#7A6248", mb: 4, fontWeight: 600 }}>
          เปิดกล่องของคุณและกรอกจำนวนเหรียญที่ได้รับในแต่ละมิติ (สูงสุดมิติละ {maxCoins} เหรียญ)
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 4 }}>
          {/* Context Selector */}
          <TextField
            select
            fullWidth
            label="บริบทการเล่นครั้งนี้"
            value={contextTag}
            onChange={(e) => setContextTag(e.target.value)}
            variant="outlined"
            sx={{ textAlign: "left" }}
          >
            {CONTEXT_TAGS.map((tag) => (
              <MenuItem key={tag} value={tag}>{tag}</MenuItem>
            ))}
          </TextField>

          {/* Inputs */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              type="number"
              label="การเปิดใจ (Openness)"
              value={openness}
              onChange={(e) => setOpenness(e.target.value ? Number(e.target.value) : "")}
              inputProps={{ min: 0, max: maxCoins }}
              fullWidth
            />
            <TextField
              type="number"
              label="ความเห็นอกเห็นใจ (Empathy)"
              value={empathy}
              onChange={(e) => setEmpathy(e.target.value ? Number(e.target.value) : "")}
              inputProps={{ min: 0, max: maxCoins }}
              fullWidth
            />
          </Box>
          <TextField
            type="number"
            label="ความชัดเจนในตัวเอง (Self-Clarity)"
            value={clarity}
            onChange={(e) => setClarity(e.target.value ? Number(e.target.value) : "")}
            inputProps={{ min: 0, max: maxCoins }}
            fullWidth
          />
        </Box>

        <Button
          variant="contained"
          fullWidth
          disabled={!isFormValid}
          onClick={handleSubmit}
          sx={{
            py: 1.8, borderRadius: 3, fontWeight: 800, fontSize: "1.05rem",
            background: isFormValid ? `linear-gradient(135deg, ${PRIMARY}, #7AA880)` : "#E5E7EB",
            color: isFormValid ? "#FFF" : "#9CA3AF",
            boxShadow: isFormValid ? `0 6px 20px ${PRIMARY}40` : "none",
          }}
        >
          ยืนยันคะแนน
        </Button>
      </Box>
    </motion.div>
  );
}
