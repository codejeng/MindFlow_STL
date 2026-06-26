import { Box, Typography, Button, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import type { Player } from "@/context/GameContext";

interface Props {
  currentPlayer: Player;
  onResult: (success: boolean) => void;
  onBack: () => void;
}

export default function ChallengeMomentActionScreen({ currentPlayer, onResult, onBack }: Props) {
  return (
    <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      sx={{ textAlign: "center", py: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
      
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <IconButton onClick={onBack} sx={{ color: "#2C2218" }}>
          <ArrowBackRoundedIcon />
        </IconButton>
        <Typography variant="h5" fontWeight={800} sx={{ color: "#1F2937", flex: 1, pr: 5 }}>
          ช่วงเวลาท้าทาย
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", width: "100%", my: 1 }}>
        <Image 
          src="/deck-icons/challenging-moment-cover.png" 
          alt="Challenging Moment" 
          width={280} 
          height={390}
          style={{ 
            width: "100%", 
            maxWidth: 280, 
            height: "auto", 
            borderRadius: "16px", 
            boxShadow: "0 12px 40px rgba(0,0,0,0.15)" 
          }} 
          priority 
        />
      </Box>

      <Box>
        <Typography variant="body1" sx={{ color: "#5A4A36", px: 2, lineHeight: 1.6 }}>
          คุณ <Typography component="span" fontWeight={800} color="#5A7A65">{currentPlayer.name}</Typography> หยิบการ์ด <Typography component="span" fontWeight={800} color="#CF6B3E">Challenge</Typography> 1 ใบ
          <br />และทำภารกิจให้สำเร็จ!
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 2, width: "100%", mt: 1 }}>
        <Button variant="outlined" fullWidth size="large" onClick={() => onResult(false)}
          sx={{
            py: 1.5, borderRadius: 4, fontWeight: 800, fontSize: "1rem", textTransform: "none",
            borderColor: "#EF4444", color: "#EF4444",
            borderWidth: 2,
            "&:hover": { borderWidth: 2, backgroundColor: "#FEF2F2" }
          }}>
          <CancelRoundedIcon sx={{ mr: 1 }} />
          ไม่สำเร็จ
        </Button>
        <Button variant="contained" fullWidth size="large" onClick={() => onResult(true)}
          sx={{
            py: 1.5, borderRadius: 4, fontWeight: 800, fontSize: "1rem", textTransform: "none",
            background: `linear-gradient(135deg, #10B981, #059669)`,
            boxShadow: `0 8px 20px rgba(16,185,129,0.35)`,
            color: "white"
          }}>
          <CheckCircleRoundedIcon sx={{ mr: 1 }} />
          สำเร็จ!
        </Button>
      </Box>
    </Box>
  );
}
