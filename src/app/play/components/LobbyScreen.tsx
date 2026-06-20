"use client";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import BackspaceRoundedIcon from "@mui/icons-material/BackspaceRounded";

const BG_CARD = "#FFFFFF";
const PRIMARY = "#4E7B5E";

interface Props {
  channelName: string;
  prefix: string;
  selectedNumberStr: string;
  setSelectedNumberStr: (v: string | ((p: string) => string)) => void;
  inputError: string;
  setInputError: (v: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export default function LobbyScreen({
  channelName, prefix, selectedNumberStr, setSelectedNumberStr,
  inputError, setInputError, onSubmit, onBack,
}: Props) {
  const handleKey = (key: string) => {
    if (selectedNumberStr.length >= 3) return; // allow exactly 3 digits
    setSelectedNumberStr((p: string) => p + key);
    setInputError("");
  };

  const handleDel = () => {
    setSelectedNumberStr((p: string) => p.slice(0, -1));
    setInputError("");
  };

  const codeChars = (prefix + selectedNumberStr).split("");
  const totalSlots = prefix.length + 3;
  
  // Pad with empty strings
  while (codeChars.length < totalSlots) {
    codeChars.push("");
  }

  return (
    <motion.div key="lobby" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}>

      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Button
          onClick={onBack}
          sx={{ minWidth: 0, p: 1, color: "#7A6248", borderRadius: 3 }}
        >
          <ArrowBackRoundedIcon />
        </Button>
        <Typography fontWeight={800} sx={{ flex: 1, textAlign: "center", color: "#3D8B5E", fontSize: "0.85rem", letterSpacing: "0.05em", mr: 4 }}>
          6. ใส่รหัสการ์ด
        </Typography>
      </Box>

      {/* Card Input Area */}
      <Box sx={{
        backgroundColor: BG_CARD, borderRadius: 2, p: 4,
        boxShadow: "0 4px 24px rgba(100,70,30,0.09)", mb: 2, textAlign: "center",
        border: "1px solid rgba(180,155,120,0.18)",
      }}>
        <Typography fontWeight={900} sx={{ color: "#2C2218", fontSize: "1.4rem", mb: 1 }}>
          {channelName}
        </Typography>
        <Typography variant="body2" sx={{ color: "#7A6248", mb: 4 }}>
          กรอกรหัสการ์ดที่คุณจั่วได้
        </Typography>

        {/* Number Boxes */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1.5, mb: 3 }}>
          {codeChars.map((char, i) => {
            const isPrefix = i < prefix.length;
            return (
              <Box
                key={i}
                sx={{
                  width: 50, height: 60,
                  backgroundColor: char ? "#FFFFFF" : "#F9F5F0",
                  borderRadius: 3,
                  border: char ? `2px solid ${PRIMARY}` : "2px solid #EDE3D8",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: char ? `0 4px 12px ${PRIMARY}20` : "none",
                }}
              >
                <Typography fontWeight={800} sx={{ fontSize: "1.8rem", color: isPrefix ? PRIMARY : "#2C2218" }}>
                  {char}
                </Typography>
              </Box>
            );
          })}
        </Box>

        <Typography variant="caption" sx={{ color: "#B0A090", mb: 4, display: "block" }}>
          เช่น P024, F015, S030, U012
        </Typography>

        {/* Numpad */}
        <Box sx={{ maxWidth: 280, mx: "auto", mb: 3 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1.5, mb: 1.5 }}>
            {["1","2","3"].map((n) => <NumKey key={n} label={n} onClick={() => handleKey(n)} />)}
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1.5, mb: 1.5 }}>
            {["4","5","6"].map((n) => <NumKey key={n} label={n} onClick={() => handleKey(n)} />)}
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1.5, mb: 1.5 }}>
            {["7","8","9"].map((n) => <NumKey key={n} label={n} onClick={() => handleKey(n)} />)}
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1.5 }}>
            <Box />
            <NumKey label="0" onClick={() => handleKey("0")} />
            <NumKey icon={<BackspaceRoundedIcon fontSize="small" />} onClick={handleDel} deleteKey />
          </Box>
        </Box>

        {inputError && (
          <Typography variant="caption" sx={{ color: "#DC2626", display: "block", mb: 2, fontWeight: 600 }}>
            {inputError}
          </Typography>
        )}

        <Button variant="contained" fullWidth disabled={selectedNumberStr.length !== 3} onClick={onSubmit}
          component={motion.button} whileTap={{ scale: 0.97 }}
          sx={{
            py: 1.85, borderRadius: 4, fontWeight: 800, fontSize: "1.1rem",
            background: `linear-gradient(135deg, ${PRIMARY}, #7AA880)`,
            boxShadow: `0 6px 20px ${PRIMARY}40`,
            textTransform: "none",
            "&:disabled": { backgroundColor: "#E5E7EB", color: "#9CA3AF", boxShadow: "none", background: "#E5E7EB" },
          }}>
          ถัดไป
        </Button>
      </Box>
    </motion.div>
  );
}

function NumKey({ label, icon, onClick, deleteKey }: { label?: string; icon?: React.ReactNode; onClick: () => void; deleteKey?: boolean }) {
  return (
    <Box component={motion.div} whileTap={{ scale: 0.92 }} onClick={onClick}
      sx={{
        height: 56, borderRadius: 3, cursor: "pointer", userSelect: "none",
        backgroundColor: deleteKey ? "#FEF2F2" : "#FFFFFF",
        border: deleteKey ? "1px solid #FCA5A5" : "1px solid #EDE3D8",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        display: "flex", justifyContent: "center", alignItems: "center",
      }}>
      <Typography fontWeight={700} sx={{ fontSize: "1.4rem", color: deleteKey ? "#DC2626" : "#2C2218" }}>
        {label}
      </Typography>
      {icon && <Box sx={{ color: "#DC2626", display: "flex", mt: 0.5 }}>{icon}</Box>}
    </Box>
  );
}
