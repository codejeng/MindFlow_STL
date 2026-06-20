"use client";

import { useState } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import PageTransition from "@/components/common/PageTransition";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ExtensionRoundedIcon from "@mui/icons-material/ExtensionRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CSSParticles from "@/components/common/CSSParticles";

const BG = "linear-gradient(180deg, #E0DFF5 0%, #EFE1ED 45%, #E2EDEE 100%)";
const PRIMARY = "#4E7B5E";

// --- CSS Art Components ---

const CSSPlants = ({ scale = 1, flip = false }: { scale?: number, flip?: boolean }) => (
  <Box sx={{
    position: "absolute", bottom: -5 * scale, [flip ? "right" : "left"]: -40 * scale,
    width: 60 * scale, height: 110 * scale,
    transform: flip ? "scaleX(-1)" : "none",
    pointerEvents: "none", zIndex: 3
  }}>
    <svg viewBox="0 0 100 150" fill="none" style={{ width: "100%", height: "100%", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}>
      {/* Stems */}
      <path d="M50 150 Q40 80 20 20" stroke="#5A7A6D" strokeWidth="4" strokeLinecap="round" />
      <path d="M50 150 Q60 90 80 40" stroke="#4A6B5D" strokeWidth="3" strokeLinecap="round" />
      <path d="M50 150 Q45 100 30 60" stroke="#3A5A4D" strokeWidth="3" strokeLinecap="round" />
      
      {/* Leaves */}
      <path d="M20 20 Q30 30 25 40 Q15 35 20 20" fill="#7D9A8A" />
      <path d="M80 40 Q70 50 75 60 Q85 55 80 40" fill="#6A8A7D" />
      <path d="M35 70 Q45 65 50 75 Q40 80 35 70" fill="#7D9A8A" />
      <path d="M60 85 Q50 80 45 90 Q55 95 60 85" fill="#6A8A7D" />
      <path d="M25 90 Q35 85 40 95 Q30 100 25 90" fill="#7D9A8A" />
      <path d="M70 105 Q60 100 55 110 Q65 115 70 105" fill="#6A8A7D" />
      <path d="M40 120 Q30 115 25 125 Q35 130 40 120" fill="#5A7A6D" />
      <path d="M60 130 Q70 125 75 135 Q65 140 60 130" fill="#4A6B5D" />

      {/* Magical Flowers/Berries */}
      <circle cx="35" cy="50" r="4.5" fill="#FFF4D2" />
      <circle cx="65" cy="70" r="3.5" fill="#FCE8B2" />
      <circle cx="20" cy="80" r="5" fill="#FFF4D2" />
      <circle cx="80" cy="95" r="4" fill="#FCE8B2" />
      <circle cx="30" cy="115" r="3" fill="#FFF4D2" />
    </svg>
  </Box>
);

const CSSHeartGate = ({ scale = 1 }: { scale?: number }) => (
  <Box sx={{
    width: 140 * scale, height: 180 * scale, mx: "auto",
    position: "relative",
    display: "flex", alignItems: "flex-end", justifyContent: "center",
  }}>
    {/* Stone Arch Background */}
    <Box sx={{ 
      position: "absolute", top: -20 * scale, left: -20 * scale, right: -20 * scale, bottom: 0,
      background: "linear-gradient(180deg, #D9D6DF 0%, #E6E4EB 100%)", 
      borderTopLeftRadius: 90 * scale, borderTopRightRadius: 90 * scale,
      border: `${2 * scale}px solid #C4C0CE`,
      zIndex: 0,
      boxShadow: "0 10px 40px rgba(100,80,120,0.2), inset 0 4px 10px rgba(255,255,255,0.5)"
    }} />
    
    {/* Inner Wooden Door */}
    <Box sx={{
      width: 140 * scale, height: 180 * scale,
      background: "linear-gradient(180deg, #8C6A5A 0%, #6E4D40 100%)", 
      borderTopLeftRadius: 70 * scale, borderTopRightRadius: 70 * scale,
      position: "relative", zIndex: 1,
      border: `${4 * scale}px solid #5A3E32`,
      boxShadow: "inset 0 0 30px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.3)",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden"
    }}>
      {/* Center line */}
      <Box sx={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: "2px", backgroundColor: "rgba(0,0,0,0.4)", transform: "translateX(-50%)" }} />
      {/* Wood lines */}
      <Box sx={{ position: "absolute", top: 0, bottom: 0, left: "25%", width: "1px", backgroundColor: "rgba(0,0,0,0.2)" }} />
      <Box sx={{ position: "absolute", top: 0, bottom: 0, right: "25%", width: "1px", backgroundColor: "rgba(0,0,0,0.2)" }} />
      
      {/* Doorknobs */}
      <Box sx={{ position: "absolute", top: "55%", left: "40%", width: 6*scale, height: 6*scale, borderRadius: "50%", backgroundColor: "#D4AF37", boxShadow: "0 1px 3px rgba(0,0,0,0.5)" }} />
      <Box sx={{ position: "absolute", top: "55%", right: "40%", width: 6*scale, height: 6*scale, borderRadius: "50%", backgroundColor: "#D4AF37", boxShadow: "0 1px 3px rgba(0,0,0,0.5)" }} />
      
      {/* Glowing Heart */}
      <Box component={motion.div}
        animate={{ scale: [1, 1.12, 1], filter: ["drop-shadow(0 0 15px rgba(255,240,200,0.5))", "drop-shadow(0 0 35px rgba(255,240,200,1))", "drop-shadow(0 0 15px rgba(255,240,200,0.5))"] }} 
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        sx={{ zIndex: 2 }}
      >
        <FavoriteRoundedIcon sx={{ color: "#FFF8D6", fontSize: `${3.8 * scale}rem` }} />
      </Box>
    </Box>

    {/* Grass / Plants on both sides */}
    <CSSPlants scale={scale} />
    <CSSPlants scale={scale} flip />
  </Box>
);

const CSSClipboard = () => (
  <Box sx={{ width: 100, height: 130, mx: "auto", position: "relative", mt: 2 }}>
    <Box sx={{ position: "absolute", top: 12, left: 0, right: 0, bottom: 0, backgroundColor: "#FFF8F0", borderRadius: 0.5, border: "2px solid #D9B890", p: 2, pt: 3, boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
      {[1,2,3].map(i => (
        <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
          <FavoriteRoundedIcon sx={{ fontSize: "0.9rem", color: "#4E7B5E" }} />
          <Box sx={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: "#C8BAA8", opacity: 0.5 }} />
        </Box>
      ))}
    </Box>
    {/* Clip */}
    <Box sx={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 40, height: 20, backgroundColor: "#C8BAA8", borderRadius: 1, border: "2px solid #A08C75" }} />
  </Box>
);

const CSSDoorCard = ({ scale = 1 }: { scale?: number }) => (
  <Box sx={{
    width: 60 * scale, height: 90 * scale, mx: "auto",
    backgroundColor: "#A06B50", 
    borderRadius: 0.5,
    border: `${3 * scale}px solid #6E4432`,
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    position: "relative"
  }}>
    <Box sx={{ width: 30 * scale, height: 30 * scale, borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <FavoriteRoundedIcon sx={{ color: "#FFD700", fontSize: `${1.2 * scale}rem` }} />
    </Box>
  </Box>
);

const CSSFourDoors = () => (
  <Box sx={{ width: "100%", height: 260, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", mt: 4 }}>
    <Box sx={{ position: "absolute", bottom: 0 }}>
      <CSSHeartGate scale={0.8} />
    </Box>
    <Box sx={{ position: "absolute", top: -10, display: "flex", gap: 1.5 }}>
       <Box component={motion.div} animate={{ y: [0,-10,0] }} transition={{ duration: 3, repeat: Infinity, delay: 0 }}><CSSDoorCard /></Box>
       <Box component={motion.div} animate={{ y: [0,-10,0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.75 }}><CSSDoorCard /></Box>
       <Box component={motion.div} animate={{ y: [0,-10,0] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}><CSSDoorCard /></Box>
       <Box component={motion.div} animate={{ y: [0,-10,0] }} transition={{ duration: 3, repeat: Infinity, delay: 2.25 }}><CSSDoorCard /></Box>
    </Box>
  </Box>
);

const CSSPlayers = () => (
  <Box sx={{ display: "flex", justifyContent: "center", gap: 3, alignItems: "flex-end", height: 140, mb: 4 }}>
    <Box component={motion.div} animate={{ y: [0,-10,0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0 }} sx={{ width: 70, height: 70, borderRadius: "50%", backgroundColor: "#CF6B3E", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 16px rgba(207,107,62,0.4)" }}>
      <PersonRoundedIcon sx={{ color: "white", fontSize: "2.5rem" }} />
    </Box>
    <Box component={motion.div} animate={{ y: [0,-10,0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }} sx={{ width: 85, height: 85, borderRadius: "50%", backgroundColor: "#4E7B5E", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 16px rgba(78,123,94,0.4)", mb: 2 }}>
      <PersonRoundedIcon sx={{ color: "white", fontSize: "3.5rem" }} />
    </Box>
    <Box component={motion.div} animate={{ y: [0,-10,0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 1.6 }} sx={{ width: 70, height: 70, borderRadius: "50%", backgroundColor: "#7C5CBF", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 16px rgba(124,92,191,0.4)" }}>
      <PersonRoundedIcon sx={{ color: "white", fontSize: "2.5rem" }} />
    </Box>
  </Box>
);

// ------------------------------

export default function IntroPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
    else router.push("/mission-start"); // Go to pass-phone screen
  };

  const slideVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <PageTransition>
      <Box 
        onClick={step >= 1 && step <= 4 ? nextStep : undefined}
        sx={{ minHeight: "100vh", background: BG, pb: 14, overflowX: "hidden", cursor: step >= 1 && step <= 4 ? "pointer" : "default", position: "relative" }}
      >
        <CSSParticles />
        <Container maxWidth="sm" sx={{ pt: 4, height: "100%", display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>
          <AnimatePresence mode="wait">
            {step === 0 && (
              <Box key="step0" component={motion.div} variants={slideVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} sx={{ textAlign: "center" }}>
                <Typography sx={{ color: "#4E7B5E", fontWeight: 800, fontSize: "0.85rem", letterSpacing: "0.1em" }}>
                  5. STORY INTRODUCTION
                </Typography>
                <Typography fontWeight={900} sx={{ color: "#2C2218", fontSize: "1.4rem", mb: 4 }}>
                  เรื่องราวของการเดินทาง
                </Typography>
                <Box sx={{ position: "relative", width: "100%", height: 320, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CSSHeartGate scale={1.3} />
                </Box>
              </Box>
            )}

            {step === 1 && (
              <Box key="step1" component={motion.div} variants={slideVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} sx={{ textAlign: "center", pt: 2 }}>
                <Typography fontWeight={900} sx={{ color: "#2C2218", fontSize: "1.6rem", mb: 0.5 }}>
                  WELCOME TO
                </Typography>
                <Typography fontWeight={900} sx={{ color: "#2C2218", fontSize: "1.6rem", mb: 1 }}>
                  THE HEART GATE
                </Typography>
                <FavoriteRoundedIcon sx={{ color: "#CF6B3E", fontSize: "1.5rem", mb: 2 }} />
                <Typography sx={{ color: "#7A6248", fontSize: "1rem", lineHeight: 1.6, px: 2, mb: 4, fontWeight: 500 }}>
                  ทุกคนต่างมี "ประตูแห่งหัวใจ"<br />ของตัวเอง<br /><br />
                  ประตูที่เก็บความคิด ความรู้สึก<br />และเรื่องราวที่เราไม่ค่อยได้พูดออกมา
                </Typography>
                <Box sx={{ position: "relative", width: "100%", height: 260, display: "flex", alignItems: "center", justifyContent: "center", mt: 4 }}>
                  <CSSHeartGate />
                </Box>
              </Box>
            )}

            {step === 2 && (
              <Box key="step2" component={motion.div} variants={slideVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} sx={{ pt: 2 }}>
                <Typography fontWeight={800} sx={{ textAlign: "center", color: "#2C2218", fontSize: "1.2rem", mb: 4 }}>
                  ระหว่างการเดินทางครั้งนี้<br />คุณจะได้พบกับ
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, px: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2, borderRadius: 2, backgroundColor: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
                    <Box sx={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "#DFF0F5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <ChatRoundedIcon sx={{ color: "#3B9AB8" }} />
                    </Box>
                    <Box>
                      <Typography fontWeight={800} sx={{ color: "#2C2218", fontSize: "1rem" }}>สถานการณ์ชีวิต</Typography>
                      <Typography variant="caption" sx={{ color: "#7A6248" }}>(Life Event)</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2, borderRadius: 2, backgroundColor: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
                    <Box sx={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "#E6F4EA", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <FavoriteRoundedIcon sx={{ color: "#4E7B5E" }} />
                    </Box>
                    <Box>
                      <Typography fontWeight={800} sx={{ color: "#2C2218", fontSize: "1rem" }}>ช่วงเวลาดี ๆ</Typography>
                      <Typography variant="caption" sx={{ color: "#7A6248" }}>(Good Moments)</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2, borderRadius: 2, backgroundColor: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
                    <Box sx={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "#F3E8FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <ExtensionRoundedIcon sx={{ color: "#7C5CBF" }} />
                    </Box>
                    <Box>
                      <Typography fontWeight={800} sx={{ color: "#2C2218", fontSize: "1rem" }}>ความท้าทาย</Typography>
                      <Typography variant="caption" sx={{ color: "#7A6248" }}>(Challenge Moments)</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2, borderRadius: 2, backgroundColor: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
                    <Box sx={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "#FFE8E8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <FavoriteRoundedIcon sx={{ color: "#D45B5B" }} />
                    </Box>
                    <Box>
                      <Typography fontWeight={800} sx={{ color: "#2C2218", fontSize: "1rem" }}>มุมมองจากผู้อื่น</Typography>
                      <Typography variant="caption" sx={{ color: "#7A6248" }}>(Pass The Heart)</Typography>
                    </Box>
                  </Box>
                </Box>

                <Typography sx={{ textAlign: "center", color: "#7A6248", fontSize: "0.95rem", mt: 4, px: 2, fontWeight: 500 }}>
                  ทุกประสบการณ์จะช่วยให้คุณ<br />เข้าใจตัวเองและคนรอบข้างมากขึ้น
                </Typography>
              </Box>
            )}

            {step === 3 && (
              <Box key="step3" component={motion.div} variants={slideVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} sx={{ textAlign: "center", pt: 2 }}>
                <Typography fontWeight={900} sx={{ color: "#2C2218", fontSize: "1.4rem", mb: 3 }}>
                  ภารกิจของคุณ
                </Typography>
                <Box sx={{ position: "relative", width: "100%", height: 160, display: "flex", alignItems: "center", justifyContent: "center", mb: 3 }}>
                  <CSSClipboard />
                </Box>
                <Typography sx={{ color: "#7A6248", fontSize: "1rem", lineHeight: 1.6, px: 4, mb: 3, fontWeight: 500 }}>
                  ผู้เล่นแต่ละคนจะได้รับ<br />ภารกิจส่วนตัว 3 ภารกิจ<br /><br />
                  เมื่อทำสำเร็จครบทั้งหมด<br />คุณจะได้รับ
                </Typography>
                <Box sx={{ position: "relative", width: "100%", height: 120, display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                  <CSSDoorCard />
                </Box>
                <Typography fontWeight={800} sx={{ color: "#2C2218", fontSize: "1.1rem", mb: 0.5 }}>
                  Door Card
                </Typography>
                <Typography sx={{ color: "#7A6248", fontSize: "0.9rem" }}>
                  เพื่อปลดล็อกประตูของตนเอง
                </Typography>
              </Box>
            )}

            {step === 4 && (
              <Box key="step4" component={motion.div} variants={slideVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} sx={{ textAlign: "center", pt: 2 }}>
                <Typography fontWeight={900} sx={{ color: "#2C2218", fontSize: "1.4rem", mb: 1 }}>
                  เป้าหมายของทุกคน
                </Typography>
                <Typography sx={{ color: "#7A6248", fontSize: "1rem", mb: 4, fontWeight: 500 }}>
                  Heart Gate จะเปิดได้ก็ต่อเมื่อ...
                </Typography>
                <Box sx={{ position: "relative", width: "100%", height: 280, mx: "auto", mb: 4 }}>
                  <CSSFourDoors />
                </Box>
                <Typography fontWeight={800} sx={{ color: "#2C2218", fontSize: "1.05rem", px: 3, mb: 1.5 }}>
                  ผู้เล่นทุกคน<br />ปลดล็อกประตูของตัวเองสำเร็จ
                </Typography>
                <Typography sx={{ color: "#7A6248", fontSize: "0.9rem", px: 2, lineHeight: 1.5 }}>
                  เมื่อถึงเวลานั้น พวกคุณจะได้ค้นพบ Insight<br />
                  และมุมมองที่ซ่อนอยู่จากการเดินทาง<br />ครั้งนี้ร่วมกัน
                </Typography>
              </Box>
            )}

            {step === 5 && (
              <Box key="step5" component={motion.div} variants={slideVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} sx={{ textAlign: "center", pt: 6 }}>
                <FavoriteRoundedIcon sx={{ color: "#CF6B3E", fontSize: "2rem", mb: 3 }} />
                <Typography fontWeight={900} sx={{ color: "#2C2218", fontSize: "1.6rem", lineHeight: 1.4, px: 2, mb: 5 }}>
                  "ก่อนจะเข้าใจคนอื่น<br />เราต้องเปิดประตู<br />ของตัวเองก่อน"
                </Typography>
                <Box sx={{ position: "relative", width: "100%", height: 200, mx: "auto", mb: 6 }}>
                  <CSSPlayers />
                </Box>
              </Box>
            )}
          </AnimatePresence>

          {/* Dots Indicator (Only for steps 1-4) */}
          {step >= 1 && step <= 4 && (
            <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt:4 }}>
              {[1, 2, 3, 4].map((i) => (
                <Box
                  key={i}
                  sx={{
                    width: 8, height: 8, borderRadius: "50%",
                    backgroundColor: step === i ? PRIMARY : "rgba(78,123,94,0.2)",
                    transition: "all 0.3s"
                  }}
                />
              ))}
            </Box>
          )}

          {/* Bottom Action Area */}
          {(step === 0 || step === 5) && (
            <Box sx={{ position: "fixed", bottom: 40, left: 0, right: 0, px: 3 }}>
              <Box sx={{ maxWidth: 600, mx: "auto", textAlign: "center" }}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={nextStep}
                  sx={{
                    py: 1.85, borderRadius: "24px", textTransform: "none",
                    fontWeight: 800, fontSize: "1.1rem",
                    background: `linear-gradient(135deg,${PRIMARY},#5E8F6E)`,
                    boxShadow: "none",
                    "&:hover": { background: "#3E6B4E", boxShadow: "none" }
                  }}
                >
                  {step === 0 ? "ต่อไป" : "รับภารกิจ"}
                </Button>
                {step === 5 && (
                  <Typography variant="caption" sx={{ display: "block", mt: 1.5, color: "#7A6248", fontWeight: 600 }}>
                    ส่งมือถือให้ผู้เล่นคนถัดไป
                  </Typography>
                )}
              </Box>
            </Box>
          )}
          
        </Container>
      </Box>
    </PageTransition>
  );
}
