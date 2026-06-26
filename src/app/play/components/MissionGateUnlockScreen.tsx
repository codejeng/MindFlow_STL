"use client";
import { useEffect } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useGame } from "@/context/GameContext";

const PRIMARY = "#D4A012";

interface Props {
  onBack: () => void;
  onDone: () => void;
  onAllUnlocked: () => void;
}

export default function MissionGateUnlockScreen({ onBack, onDone, onAllUnlocked }: Props) {
  const { getCurrentPlayer, unlockDoor, areAllDoorsUnlocked } = useGame();
  const currentPlayer = getCurrentPlayer();

  // Unlock door for current player on mount
  useEffect(() => {
    if (currentPlayer && !currentPlayer.doorUnlocked) {
      unlockDoor(currentPlayer.id);
    }
  }, [currentPlayer, unlockDoor]);

  const handleReceiveCard = () => {
    // Check if all players have unlocked doors
    if (areAllDoorsUnlocked()) {
      onAllUnlocked();
    } else {
      onDone();
    }
  };

  return (
    <motion.div key="mission_gate_unlock" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>

      {/* Confetti-like background effects */}
      <Box sx={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <Box component={motion.div} animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity }} sx={{ position: "absolute", top: "20%", left: "10%", width: 10, height: 10, backgroundColor: "#D45B5B", borderRadius: "2px" }} />
        <Box component={motion.div} animate={{ y: [0, 30, 0], rotate: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }} sx={{ position: "absolute", top: "30%", right: "15%", width: 8, height: 8, backgroundColor: "#E0B850", borderRadius: "50%" }} />
        <Box component={motion.div} animate={{ y: [0, -15, 0], rotate: [0, 45, 0] }} transition={{ duration: 2.5, repeat: Infinity }} sx={{ position: "absolute", bottom: "30%", left: "20%", width: 12, height: 12, backgroundColor: "#3B9AB8", borderRadius: "2px" }} />
      </Box>

      <Box sx={{
        backgroundColor: "#FFFFFF", borderRadius: 2, p: 4, pt: 4, pb: 4,
        boxShadow: "0 4px 24px rgba(100,70,30,0.09)", mb: 3, textAlign: "center",
        border: "1px solid rgba(180,155,120,0.18)",
        position: "relative", zIndex: 1,
      }}>
        {/* Header with back button */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3, width: "100%" }}>
          <IconButton onClick={onBack} sx={{ color: "#7A6248" }}>
            <ArrowBackRoundedIcon />
          </IconButton>
        </Box>

        <Typography fontWeight={800} sx={{ color: "#7A6248", fontSize: "0.95rem", mb: 1 }}>
          ยินดีด้วย!<br />คุณทำภารกิจครบแล้ว
        </Typography>
        <Typography fontWeight={900} sx={{ color: "#2C2218", fontSize: "1.5rem", mb: 5, lineHeight: 1.3 }}>
          ประตูของคุณ<br />ถูกปลดล็อก!
        </Typography>

        {/* Mock Wooden Door */}
        <Box component={motion.div}
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          sx={{
            width: 140, height: 180, mx: "auto", mb: 5,
            backgroundColor: "#B08D6A", borderRadius: 2,
            position: "relative",
            border: "4px solid #8B6B4A",
            boxShadow: "inset 0 0 20px rgba(0,0,0,0.2), 0 10px 30px rgba(0,0,0,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden"
          }}
        >
          {/* Vertical wood planks */}
          <Box sx={{ position: "absolute", top: 0, bottom: 0, left: "33%", width: "2px", backgroundColor: "rgba(0,0,0,0.15)" }} />
          <Box sx={{ position: "absolute", top: 0, bottom: 0, right: "33%", width: "2px", backgroundColor: "rgba(0,0,0,0.15)" }} />

          {/* Horizontal crossbar */}
          <Box sx={{ position: "absolute", top: "15%", left: 0, right: 0, height: "15px", backgroundColor: "#9D7A5A", borderTop: "2px solid rgba(255,255,255,0.1)", borderBottom: "2px solid rgba(0,0,0,0.2)" }} />
          <Box sx={{ position: "absolute", bottom: "15%", left: 0, right: 0, height: "15px", backgroundColor: "#9D7A5A", borderTop: "2px solid rgba(255,255,255,0.1)", borderBottom: "2px solid rgba(0,0,0,0.2)" }} />

          {/* Nails/Bolts */}
          <Box sx={{ position: "absolute", top: "17%", left: "10%", width: 6, height: 6, borderRadius: "50%", backgroundColor: "#5A4A3A" }} />
          <Box sx={{ position: "absolute", top: "17%", right: "10%", width: 6, height: 6, borderRadius: "50%", backgroundColor: "#5A4A3A" }} />
          <Box sx={{ position: "absolute", bottom: "17%", left: "10%", width: 6, height: 6, borderRadius: "50%", backgroundColor: "#5A4A3A" }} />
          <Box sx={{ position: "absolute", bottom: "17%", right: "10%", width: 6, height: 6, borderRadius: "50%", backgroundColor: "#5A4A3A" }} />

          {/* Glowing Heart Lock */}
          <Box component={motion.div}
            animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}
            sx={{
              width: 50, height: 50, borderRadius: "50%",
              backgroundColor: "#F9F5F0",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 20px rgba(255,255,255,0.8), inset 0 2px 5px rgba(0,0,0,0.1)",
              zIndex: 2,
            }}
          >
            <FavoriteRoundedIcon sx={{ color: "#D45B5B", fontSize: "1.8rem" }} />
          </Box>
        </Box>

        {currentPlayer && (
          <Typography sx={{ color: "#9C8B76", fontSize: "0.85rem", mb: 3 }}>
            {currentPlayer.name} ได้รับ Door Card แล้ว
          </Typography>
        )}

        <Box sx={{ mt: 2 }}>
          <Button variant="contained" fullWidth onClick={handleReceiveCard}
            component={motion.button} whileTap={{ scale: 0.97 }}
            sx={{
              py: 1.85, borderRadius: 4, fontWeight: 800, fontSize: "1.1rem",
              background: `linear-gradient(135deg, ${PRIMARY}, #7AA880)`,
              boxShadow: `0 6px 20px ${PRIMARY}40`,
              textTransform: "none",
            }}>
            รับการ์ดประตู
          </Button>
        </Box>
      </Box>
    </motion.div>
  );
}
