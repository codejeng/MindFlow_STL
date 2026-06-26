import { Box, Typography, Button, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import type { Player } from "@/context/GameContext";

interface Props {
  currentPlayer: Player;
  onDone: () => void;
  onBack: () => void;
}

export default function GoodMomentActionScreen({ currentPlayer, onDone, onBack }: Props) {
  return (
    <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      sx={{ textAlign: "center", py: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
      
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <IconButton onClick={onBack} sx={{ color: "#2C2218" }}>
          <ArrowBackRoundedIcon />
        </IconButton>
        <Typography variant="h5" fontWeight={800} sx={{ color: "#1F2937", flex: 1, pr: 5 }}>
          ช่วงเวลาดีๆ
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", width: "100%", my: 1 }}>
        <Image 
          src="/deck-icons/good-moment-cover.png" 
          alt="Good Moment" 
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
          คุณ <Typography component="span" fontWeight={800} color="#5A7A65">{currentPlayer.name}</Typography> หยิบการ์ด <Typography component="span" fontWeight={800} color="#2B9395">Good Moments</Typography> 1 ใบ
          <br />และแบ่งปันเรื่องราวให้ทุกคนฟัง
        </Typography>
      </Box>

      <Button variant="contained" fullWidth size="large" onClick={onDone}
        sx={{
          mt: 1, py: 2, borderRadius: 4, fontWeight: 800, fontSize: "1.05rem", textTransform: "none",
          background: `linear-gradient(135deg, #5A7A65, #7AA880)`,
          boxShadow: `0 8px 24px rgba(90,122,101,0.35)`,
          color: "white"
        }}>
        รับเหรียญหัวใจ 1 เหรียญ
        <Image src="/images/heart-token.png" alt="Heart Token" width={24} height={24} style={{ marginLeft: 8 }} />
      </Button>
    </Box>
  );
}
