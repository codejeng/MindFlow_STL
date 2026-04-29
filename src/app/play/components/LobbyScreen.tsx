"use client";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import type { CharacterDef } from "@/context/GameContext";

const BG_CARD = "#FFFFFF";
const PRIMARY = "#5A7A65";
const NUM_BG  = "#F5EDE0";

interface Props {
  char?: CharacterDef;
  playerName: string;
  selectedNumberStr: string;
  setSelectedNumberStr: (v: string | ((p: string) => string)) => void;
  inputError: string;
  setInputError: (v: string) => void;
  cardPrefix: string;
  onSubmit: () => void;
  onBack: () => void;
}

export default function LobbyScreen({
  char, playerName, selectedNumberStr, setSelectedNumberStr,
  inputError, setInputError, cardPrefix, onSubmit, onBack,
}: Props) {
  const handleNum = (n: string) => {
    if (selectedNumberStr.length >= 3) return;
    setSelectedNumberStr((p: string) => p + n);
    setInputError("");
  };
  const handleDel = () => {
    setSelectedNumberStr((p: string) => p.slice(0, -1));
    setInputError("");
  };

  return (
    <motion.div key="lobby" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}>

      {/* Back button */}
      <Box sx={{ mb: 2 }}>
        <Button
          size="small"
          onClick={onBack}
          startIcon={<span style={{ fontSize: "1rem" }}>←</span>}
          sx={{
            color: "#6B7280", fontWeight: 600, textTransform: "none",
            borderRadius: 3, px: 1.5,
            "&:hover": { backgroundColor: "#F3F4F6" },
          }}
        >
          ย้อนกลับ
        </Button>
      </Box>

      <Box sx={{ textAlign: "center", mb: 2 }}>
        {char && (
          <Box sx={{ width: 72, height: 90, mx: "auto", position: "relative", mb: 1 }}>
            <Image src={char.image} alt={char.name} fill style={{ objectFit: "contain" }} />
          </Box>
        )}
        <Typography fontWeight={700} sx={{ color: char?.baseColor ?? PRIMARY, fontSize: "1.1rem" }}>
          {playerName}
        </Typography>
        <Typography variant="body2" color="text.secondary">กรอกหมายเลขการ์ด</Typography>
      </Box>

      {/* Display */}
      <Box sx={{
        backgroundColor: BG_CARD, borderRadius: 4, p: 3,
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)", mb: 2, textAlign: "center",
      }}>
        <Typography variant="caption" sx={{ color: "#9CA3AF", mb: 1, display: "block" }}>
          หมายเลขการ์ด
        </Typography>
        <Box sx={{
          backgroundColor: NUM_BG, borderRadius: 3, py: 2, mb: 3,
          border: selectedNumberStr ? `2px solid ${PRIMARY}` : "2px solid #E5D5C5",
        }}>
          <Typography fontWeight={800} sx={{
            fontSize: "2.5rem", letterSpacing: "0.2em",
            color: selectedNumberStr ? "#2D3748" : "#CBD5E0",
          }}>
            {selectedNumberStr ? selectedNumberStr.padStart(3, " ") : "_ _ _"}
          </Typography>
        </Box>

        {/* Numpad */}
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1.5, maxWidth: 260, mx: "auto", mb: 2 }}>
          {["1","2","3","4","5","6","7","8","9"].map((n) => (
            <NumKey key={n} label={n} onClick={() => handleNum(n)} />
          ))}
          <Box />
          <NumKey label="0" onClick={() => handleNum("0")} />
          <NumKey label="⌫" onClick={handleDel} accent />
        </Box>

        {inputError && (
          <Typography variant="caption" sx={{ color: "#EF4444", display: "block", mb: 1 }}>
            {inputError}
          </Typography>
        )}

        {selectedNumberStr && (
          <Box component={motion.div} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            sx={{ display: "inline-flex", gap: 1, alignItems: "center",
              backgroundColor: PRIMARY + "15", borderRadius: 3, px: 2, py: 0.75, mb: 2,
              border: `1.5px solid ${PRIMARY}40` }}>
            <Typography sx={{ fontSize: "0.85rem" }}>🃏</Typography>
            <Typography fontWeight={700} sx={{ color: PRIMARY, letterSpacing: "0.1em" }}>
              {cardPrefix}{selectedNumberStr.padStart(2, "0")}
            </Typography>
          </Box>
        )}

        <Button variant="contained" fullWidth disabled={!selectedNumberStr} onClick={onSubmit}
          sx={{
            py: 1.75, borderRadius: 3, fontWeight: 700, fontSize: "1rem",
            background: `linear-gradient(135deg, ${PRIMARY}, #7AA880)`,
            boxShadow: `0 4px 16px ${PRIMARY}40`,
            "&:disabled": { backgroundColor: "#D1D5DB", color: "#9CA3AF" },
          }}>
          ถัดไป →
        </Button>
      </Box>
    </motion.div>
  );
}

function NumKey({ label, onClick, accent }: { label: string; onClick: () => void; accent?: boolean }) {
  return (
    <Box component={motion.div} whileTap={{ scale: 0.92 }} onClick={onClick}
      sx={{
        py: 1.75, borderRadius: 3, cursor: "pointer", userSelect: "none",
        backgroundColor: accent ? "#FEF6E5" : "#F9F5F0",
        border: accent ? "1px solid #F6D860" : "1px solid #EDE3D8",
        display: "flex", justifyContent: "center", alignItems: "center",
      }}>
      <Typography fontWeight={700} sx={{ fontSize: "1.3rem", color: accent ? "#C07A1A" : "#4A5568" }}>
        {label}
      </Typography>
    </Box>
  );
}
