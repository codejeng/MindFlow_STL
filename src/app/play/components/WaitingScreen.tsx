"use client";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const PRIMARY = "#3B9AB8";

interface Props {
  onBack: () => void;
  onDone: () => void;
}

export default function WaitingScreen({ onBack, onDone }: Props) {
  return (
    <motion.div key="waiting" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>

      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton onClick={onBack} sx={{ color: "#7A6248" }}>
          <ArrowBackRoundedIcon />
        </IconButton>
        <Typography fontWeight={800} sx={{ flex: 1, textAlign: "center", color: "#3B9AB8", fontSize: "0.85rem", letterSpacing: "0.05em", mr: 5 }}>
          9. ให้คะแนน (เพื่อนให้ธนบัตร)
        </Typography>
      </Box>

      <Box sx={{
        backgroundColor: "#FFFFFF", borderRadius: 2, p: 4,
        boxShadow: "0 4px 24px rgba(100,70,30,0.09)", textAlign: "center", mb: 2,
        border: "1px solid rgba(180,155,120,0.18)",
      }}>
        <Typography fontWeight={900} sx={{ color: "#2C2218", fontSize: "1.25rem", mb: 0.5 }}>
          เพื่อน ๆ ให้คะแนนคุณแล้ว
        </Typography>
        <Typography variant="body2" sx={{ color: "#7A6248", mb: 4, fontWeight: 600 }}>
          (นำธนบัตรใส่ซองของคุณ)
        </Typography>

        {/* Illustration: Animated Envelope and Coins */}
        <Box sx={{
          width: 180, height: 160, mx: "auto", mb: 4,
          position: "relative",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {/* Envelope Back */}
          <Box sx={{
            position: "absolute", top: 40, width: 120, height: 80,
            backgroundColor: "#D9B890", borderRadius: 1,
            zIndex: 1,
          }} />

          {/* Envelope Flap (Open) */}
          <Box sx={{
            position: "absolute", top: 10, width: 0, height: 0,
            borderLeft: "60px solid transparent",
            borderRight: "60px solid transparent",
            borderBottom: "45px solid #E4C8A5",
            zIndex: 2, transformOrigin: "bottom",
          }} />

          {/* Heart on Envelope */}
          <Box sx={{
            position: "absolute", top: 65, zIndex: 4,
            backgroundColor: "#F9F5F0", borderRadius: "50%", p: 0.5,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}>
            <FavoriteRoundedIcon sx={{ color: "#D45B5B", fontSize: "1.2rem" }} />
          </Box>

          {/* Envelope Front */}
          <Box sx={{
            position: "absolute", top: 40, width: 120, height: 80,
            backgroundColor: "#E4C8A5", borderRadius: 1,
            zIndex: 4,
            clipPath: "polygon(0 0, 50% 45%, 100% 0, 100% 100%, 0 100%)",
            boxShadow: "inset 0 -2px 10px rgba(0,0,0,0.05)"
          }} />

          {/* Coins Animation */}
          {/* Blue Coin */}
          <Box component={motion.div}
            initial={{ y: 0, opacity: 0, scale: 0.5 }}
            animate={{ y: -30, x: -50, opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 120 }}
            sx={{
              position: "absolute", top: 80, left: "50%", zIndex: 5,
              width: 48, height: 48, borderRadius: "50%", marginLeft: "-24px",
              backgroundColor: "#8FB8C4", border: "4px solid #7AA8B8",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 8px rgba(0,0,0,0.15)"
            }}
          >
            <StarRoundedIcon sx={{ color: "#6A9AA8", fontSize: "1.5rem" }} />
          </Box>

          {/* Pink Coin */}
          <Box component={motion.div}
            initial={{ y: 0, opacity: 0, scale: 0.5 }}
            animate={{ y: -10, x: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 120 }}
            sx={{
              position: "absolute", top: 80, left: "50%", zIndex: 6,
              width: 52, height: 52, borderRadius: "50%", marginLeft: "-26px",
              backgroundColor: "#E89B9B", border: "4px solid #D48080",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 8px rgba(0,0,0,0.15)"
            }}
          >
            <StarRoundedIcon sx={{ color: "#C06565", fontSize: "1.8rem" }} />
          </Box>

          {/* Yellow Coin */}
          <Box component={motion.div}
            initial={{ y: 0, opacity: 0, scale: 0.5 }}
            animate={{ y: -30, x: 50, opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6, type: "spring", stiffness: 120 }}
            sx={{
              position: "absolute", top: 80, left: "50%", zIndex: 5,
              width: 48, height: 48, borderRadius: "50%", marginLeft: "-24px",
              backgroundColor: "#F2CE6E", border: "4px solid #E0B850",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 8px rgba(0,0,0,0.15)"
            }}
          >
            <StarRoundedIcon sx={{ color: "#C8A030", fontSize: "1.5rem" }} />
          </Box>
        </Box>

        <Typography variant="body2" sx={{ color: "#7A6248", mb: 1, fontWeight: 600 }}>
          เมื่อเพื่อนให้คะแนนเสร็จ
        </Typography>
        <Typography variant="body2" sx={{ color: "#7A6248", mb: 4, fontWeight: 600 }}>
          นับคะแนนรวมของคุณ
        </Typography>

        <Button variant="contained" fullWidth onClick={onDone}
          component={motion.button} whileTap={{ scale: 0.97 }}
          sx={{
            py: 1.85, borderRadius: 4, fontWeight: 800, fontSize: "1.1rem",
            background: `linear-gradient(135deg, ${PRIMARY}, #7AA880)`,
            boxShadow: `0 6px 20px ${PRIMARY}40`,
            textTransform: "none",
          }}>
          กรอกคะแนนรวม
        </Button>
      </Box>
    </motion.div>
  );
}
