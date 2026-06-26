import { Box, Typography, Button, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import type { Player } from "@/context/GameContext";

interface Props {
  currentPlayer: Player;
  players: Player[];
  onSelectTarget: (playerId: string) => void;
  onBack: () => void;
}

const PRIMARY = "#D45B5B"; // Pass the Heart Red

export default function TargetPlayerSelectScreen({ currentPlayer, players, onSelectTarget, onBack }: Props) {
  // Can only target others
  const targets = players.filter(p => p.id !== currentPlayer.id);

  return (
    <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      sx={{ textAlign: "center", py: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
      
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <IconButton onClick={onBack} sx={{ color: "#2C2218" }}>
          <ArrowBackRoundedIcon />
        </IconButton>
        <Typography variant="h5" fontWeight={800} sx={{ color: "#1F2937", flex: 1, pr: 5 }}>
          Pass the Heart
        </Typography>
      </Box>

      <Typography variant="body1" sx={{ color: "#5A4A36", px: 2, lineHeight: 1.6 }}>
        เลือกผู้เล่น 1 คน<br/>เพื่อให้พวกเขาเป็นคนเปิดการ์ด Life Event!
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", mt: 2 }}>
        {targets.map((p) => (
          <Button
            key={p.id}
            variant="outlined"
            onClick={() => onSelectTarget(p.id)}
            sx={{
              py: 2, borderRadius: 4, fontWeight: 700, fontSize: "1.1rem", textTransform: "none",
              borderColor: "#E5E7EB", color: "#374151",
              backgroundColor: "white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
              display: "flex", justifyContent: "flex-start", gap: 2,
              "&:hover": { borderColor: PRIMARY, backgroundColor: PRIMARY + "08" }
            }}
          >
            <Box sx={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: PRIMARY + "20", color: PRIMARY, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {p.name.charAt(0)}
            </Box>
            {p.name} ({p.role === "child" ? "ลูก/นักเรียน" : "ผู้ปกครอง/ครู"})
          </Button>
        ))}
      </Box>
    </Box>
  );
}
