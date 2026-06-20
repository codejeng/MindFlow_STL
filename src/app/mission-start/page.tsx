"use client";

import { Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import PageTransition from "@/components/common/PageTransition";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { useGame, CHARACTERS } from "@/context/GameContext";

const BG = "#FAF5EC";
const PRIMARY = "#4E7B5E";

const CSSPlayers = () => (
  <Box sx={{ display: "flex", justifyContent: "center", gap: 3, alignItems: "flex-end", height: 100, mb: 4 }}>
    <Box component={motion.div} animate={{ y: [0,-8,0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0 }} sx={{ width: 60, height: 60, borderRadius: "50%", backgroundColor: "#CF6B3E", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 16px rgba(207,107,62,0.4)" }}>
      <PersonRoundedIcon sx={{ color: "white", fontSize: "2.2rem" }} />
    </Box>
    <Box component={motion.div} animate={{ y: [0,-8,0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }} sx={{ width: 75, height: 75, borderRadius: "50%", backgroundColor: "#4E7B5E", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 16px rgba(78,123,94,0.4)", mb: 2 }}>
      <PersonRoundedIcon sx={{ color: "white", fontSize: "3rem" }} />
    </Box>
    <Box component={motion.div} animate={{ y: [0,-8,0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 1.6 }} sx={{ width: 60, height: 60, borderRadius: "50%", backgroundColor: "#7C5CBF", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 16px rgba(124,92,191,0.4)" }}>
      <PersonRoundedIcon sx={{ color: "white", fontSize: "2.2rem" }} />
    </Box>
  </Box>
);

const CSSPhoneWithArrows = () => (
  <Box sx={{ position: "relative", width: 200, height: 200, mx: "auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
    {/* Rotating Arrows */}
    <Box component={motion.div} animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} sx={{ position: "absolute", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
       <svg width="300" height="300" viewBox="0 0 100 100" fill="none" stroke="#C8BAA8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
         <path d="M 10 50 A 40 40 0 0 1 50 10" />
         <polygon fill="#C8BAA8" points="50,4 58,10 50,16" />
         <path d="M 90 50 A 40 40 0 0 1 50 90" />
         <polygon fill="#C8BAA8" points="50,96 42,90 50,84" />
       </svg>
    </Box>
    
    {/* Phone */}
    <Box component={motion.div} animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} sx={{ width: 60, height: 100, backgroundColor: "#2C2218", borderRadius: 0.5, position: "relative", border: "4px solid #2C2218", boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}>
      <Box sx={{ width: "100%", height: "100%", backgroundColor: "#FAF5EC", borderRadius: 0.5, p: 0.5 }}>
        <Box sx={{ width: 20, height: 4, backgroundColor: "#2C2218", borderRadius: 0.5, mx: "auto", mt: 0.5, mb: 1 }} />
        <Box sx={{ width: "80%", height: 6, backgroundColor: "#D9B890", borderRadius: 0.5, mx: "auto", mb: 0.5 }} />
        <Box sx={{ width: "60%", height: 6, backgroundColor: "#D9B890", borderRadius: 0.5, mx: "auto", mb: 0.5 }} />
        <Box sx={{ width: "90%", height: 6, backgroundColor: "#D9B890", borderRadius: 0.5, mx: "auto", mb: 0.5 }} />
      </Box>
    </Box>
  </Box>
);

export default function MissionStartPage() {
  const router = useRouter();
  const { players, turnOrder } = useGame();

  const orderedPlayers = turnOrder
    .map((id) => players.find((p) => p.id === id))
    .filter(Boolean) as typeof players;

  const firstPlayerName = orderedPlayers.length > 0 ? orderedPlayers[0].name : "Player 1";

  const handleStart = () => {
    router.push("/mission");
  };

  return (
    <PageTransition>
      <Box sx={{ minHeight: "100vh", background: BG, pb: 14 }}>
        <Container maxWidth="sm" sx={{ pt: 4, display: "flex", flexDirection: "column" }}>
          
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography fontWeight={800} sx={{ color: "#2C2218", fontSize: "1.2rem", letterSpacing: "-0.01em" }}>
              6. รับภารกิจ (MISSION)
            </Typography>
          </Box>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              p: 3, pb: 4,
              boxShadow: "0 4px 24px rgba(100,70,30,0.09)",
              border: "1px solid rgba(180,155,120,0.18)",
              textAlign: "center"
            }}
          >
            <Typography fontWeight={800} sx={{ color: "#2C2218", fontSize: "1.1rem", mb: 3 }}>
              แจกภารกิจให้ผู้เล่นทีละคน
            </Typography>
            
            <Box sx={{ border: "1.5px solid rgba(180,155,120,0.18)", borderRadius: 3, pt: 3, pb: 1, px: 2, mb: 4, backgroundColor: "#FDFAF5" }}>
              <CSSPlayers />
            </Box>

            <Typography fontWeight={800} sx={{ color: "#2C2218", fontSize: "1.15rem", mb: 0.5 }}>
              ส่งมือถือให้ {firstPlayerName}
            </Typography>
            <Typography sx={{ color: "#7A6248", fontSize: "0.95rem", fontWeight: 500, mb: 4 }}>
              เพื่อดูภารกิจของตนเอง
            </Typography>

            <CSSPhoneWithArrows />

            <Box sx={{ mt: 5 }}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleStart}
                component={motion.button}
                whileTap={{ scale: 0.97 }}
                sx={{
                  py: 1.85, borderRadius: "24px", textTransform: "none",
                  fontWeight: 800, fontSize: "1.1rem",
                  background: `linear-gradient(135deg,${PRIMARY},#5E8F6E)`,
                  boxShadow: "none",
                  "&:hover": { background: "#3E6B4E", boxShadow: "none" }
                }}
              >
                เริ่มเกม
              </Button>
            </Box>
          </Box>

        </Container>
      </Box>
    </PageTransition>
  );
}
