"use client";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

interface Props {
  onBack: () => void;
  onNext: () => void;
}

export default function HeartGateReadyScreen({ onBack, onNext }: Props) {
  return (
    <motion.div key="heart_gate_ready" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>

      {/* Confetti-like background effects */}
      <Box sx={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        {/* Scattered shapes */}
        <Box component={motion.div} animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity }} sx={{ position: "absolute", top: "20%", left: "10%", width: 10, height: 10, backgroundColor: "#D45B5B", borderRadius: "2px" }} />
        <Box component={motion.div} animate={{ y: [0, 30, 0], rotate: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }} sx={{ position: "absolute", top: "30%", right: "15%", width: 8, height: 8, backgroundColor: "#E0B850", borderRadius: "50%" }} />
        <Box component={motion.div} animate={{ y: [0, -15, 0], rotate: [0, 45, 0] }} transition={{ duration: 2.5, repeat: Infinity }} sx={{ position: "absolute", bottom: "40%", left: "20%", width: 12, height: 12, backgroundColor: "#3B9AB8", borderRadius: "2px" }} />
        <Box component={motion.div} animate={{ y: [0, 25, 0], rotate: [0, -45, 0] }} transition={{ duration: 3.5, repeat: Infinity }} sx={{ position: "absolute", bottom: "35%", right: "25%", width: 10, height: 10, backgroundColor: "#7AA880", borderRadius: "50%" }} />
      </Box>

      {/* Header with Back Button */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2, position: "relative", zIndex: 2 }}>
        <IconButton onClick={onBack} sx={{ color: "#2C2218" }}>
          <ArrowBackRoundedIcon />
        </IconButton>
      </Box>

      <Box sx={{
        backgroundColor: "#FFFFFF", borderRadius: 2, p: 4, pt: 4, pb: 4,
        boxShadow: "0 4px 24px rgba(100,70,30,0.09)", mb: 3, textAlign: "center",
        border: "1px solid rgba(180,155,120,0.18)",
        position: "relative", zIndex: 1,
      }}>
        <Typography fontWeight={900} sx={{ color: "#2C2218", fontSize: "1.4rem", mb: 1 }}>
          ทุกคนพร้อมแล้ว!
        </Typography>
        <Typography variant="body2" sx={{ color: "#7A6248", mb: 5, fontWeight: 600, lineHeight: 1.6 }}>
          มาเปิด Heart Gate<br />
          ไปด้วยกันเลย
        </Typography>

        {/* Mock Heart Gate Door (Arched) */}
        <Box component={motion.div}
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          sx={{
            width: 160, height: 180, mx: "auto", mb: 6,
            backgroundColor: "#ECA5A5", 
            borderTopLeftRadius: "80px", borderTopRightRadius: "80px", // Arched door
            position: "relative",
            border: "6px solid #D9B890", // Door frame
            boxShadow: "inset 0 0 20px rgba(0,0,0,0.1), 0 10px 30px rgba(0,0,0,0.05)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          {/* Vertical door split */}
          <Box sx={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: "2px", backgroundColor: "rgba(0,0,0,0.1)", transform: "translateX(-50%)" }} />

          {/* Glowing Heart Lock */}
          <Box component={motion.div}
            animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            sx={{
              zIndex: 2, filter: "drop-shadow(0 0 15px rgba(212,91,91,0.6))"
            }}
          >
            <FavoriteRoundedIcon sx={{ color: "#D45B5B", fontSize: "4rem" }} />
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Button variant="contained" fullWidth onClick={onNext}
            component={motion.button} whileTap={{ scale: 0.97 }}
            sx={{
              py: 1.85, borderRadius: 4, fontWeight: 800, fontSize: "1.1rem",
              background: `linear-gradient(135deg, #E06D6D, #D45B5B)`, // Red button
              boxShadow: `0 6px 20px rgba(212,91,91,0.4)`,
              textTransform: "none",
            }}>
            Unlock Heart Gate
          </Button>
        </Box>
      </Box>
    </motion.div>
  );
}
