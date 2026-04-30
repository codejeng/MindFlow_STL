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
  selectedNumberStr: string; // Now acts as full card code
  setSelectedNumberStr: (v: string | ((p: string) => string)) => void;
  inputError: string;
  setInputError: (v: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export default function LobbyScreen({
  char, playerName, selectedNumberStr, setSelectedNumberStr,
  inputError, setInputError, onSubmit, onBack,
}: Props) {
  const handleKey = (key: string) => {
    // Only allow max 4 characters (e.g. PP01)
    if (selectedNumberStr.length >= 4) return;
    setSelectedNumberStr((p: string) => p + key);
    setInputError("");
  };

  const handleDel = () => {
    setSelectedNumberStr((p: string) => {
      // If ends with PP, LL, UU we should probably delete the whole prefix?
      // Simple char-by-char deletion is fine for now, or just slice
      return p.slice(0, -1);
    });
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
        <Typography variant="body2" color="text.secondary">กรอกรหัสการ์ดที่จั่วได้</Typography>
      </Box>

      {/* Display */}
      <Box sx={{
        backgroundColor: BG_CARD, borderRadius: 4, p: 3,
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)", mb: 2, textAlign: "center",
      }}>
        <Typography variant="caption" sx={{ color: "#9CA3AF", mb: 1, display: "block" }}>
          รหัสการ์ด
        </Typography>
        <Box sx={{
          backgroundColor: NUM_BG, borderRadius: 3, py: 2, mb: 3,
          border: selectedNumberStr ? `2px solid ${PRIMARY}` : "2px solid #E5D5C5",
        }}>
          <Typography fontWeight={800} sx={{
            fontSize: "2.5rem", letterSpacing: "0.15em",
            color: selectedNumberStr ? "#2D3748" : "#CBD5E0",
          }}>
            {selectedNumberStr || "____"}
          </Typography>
        </Box>

        {/* Custom Numpad */}
        <Box sx={{ maxWidth: 300, mx: "auto", mb: 2 }}>
          {/* Prefix Keys */}
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, mb: 1 }}>
            {["P", "L", "U"].map((n) => (
              <NumKey key={n} label={n} onClick={() => handleKey(n)} accent />
            ))}
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, mb: 2 }}>
            {["PP", "LL", "UU"].map((n) => (
              <NumKey key={n} label={n} onClick={() => handleKey(n)} accent />
            ))}
          </Box>
          
          {/* Number Keys */}
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, mb: 1 }}>
            {["1","2","3"].map((n) => <NumKey key={n} label={n} onClick={() => handleKey(n)} />)}
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, mb: 1 }}>
            {["4","5","6"].map((n) => <NumKey key={n} label={n} onClick={() => handleKey(n)} />)}
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, mb: 1 }}>
            {["7","8","9"].map((n) => <NumKey key={n} label={n} onClick={() => handleKey(n)} />)}
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1 }}>
            <Box />
            <NumKey label="0" onClick={() => handleKey("0")} />
            <NumKey label="⌫" onClick={handleDel} deleteKey />
          </Box>
        </Box>

        {inputError && (
          <Typography variant="caption" sx={{ color: "#EF4444", display: "block", mb: 1 }}>
            {inputError}
          </Typography>
        )}

        <Button variant="contained" fullWidth disabled={!selectedNumberStr} onClick={onSubmit}
          sx={{
            py: 1.75, borderRadius: 3, fontWeight: 700, fontSize: "1rem", mt: 2,
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

function NumKey({ label, onClick, accent, deleteKey }: { label: string; onClick: () => void; accent?: boolean; deleteKey?: boolean }) {
  return (
    <Box component={motion.div} whileTap={{ scale: 0.92 }} onClick={onClick}
      sx={{
        py: accent ? 1.2 : 1.5, borderRadius: 3, cursor: "pointer", userSelect: "none",
        backgroundColor: accent ? "#E5F0E9" : deleteKey ? "#FEF2F2" : "#F9F5F0",
        border: accent ? "1px solid #C0D8C8" : deleteKey ? "1px solid #FCA5A5" : "1px solid #EDE3D8",
        display: "flex", justifyContent: "center", alignItems: "center",
      }}>
      <Typography fontWeight={700} sx={{ 
        fontSize: accent ? "1.1rem" : "1.3rem", 
        color: accent ? "#3D5A45" : deleteKey ? "#DC2626" : "#4A5568" 
      }}>
        {label}
      </Typography>
    </Box>
  );
}
