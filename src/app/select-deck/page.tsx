"use client";

import React, { useState } from "react";
import {
  Box, Typography, Button, Container,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGame, type DeckCategory } from "@/context/GameContext";
import PageTransition from "@/components/common/PageTransition";
import CSSParticles from "@/components/common/CSSParticles";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ImportContactsRoundedIcon from "@mui/icons-material/ImportContactsRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

const BG_TOP  = "#FDFBF7"; // Return to warm cream
const BG_BOT  = "#F5EFE6"; 
const PRIMARY = "#539E8A"; // Mint Green / Teal from Logo

interface DeckOption {
  id: DeckCategory;
  label: string;
  labelEn: string;
  image: string; // placeholder – user will replace
}

const DECKS: DeckOption[] = [
  // {
  //   id: "family",
  //   label: "ครอบครัว",
  //   labelEn: "Family",
  //   image: "/deck-icons/family.png",
  // },
  {
    id: "primary",
    label: "ประถมศึกษา",
    labelEn: "Primary School",
    image: "/deck-icons/primary.png",
  },
  {
    id: "secondary",
    label: "มัธยมศึกษา",
    labelEn: "Secondary School",
    image: "/deck-icons/secondary.png",
  },
  // {
  //   id: "university",
  //   label: "นักศึกษา",
  //   labelEn: "University",
  //   image: "/deck-icons/university.png",
  // },
];

export default function SelectDeckPage() {
  const router = useRouter();
  const { setSelectedDeck, selectedDeck } = useGame();
  const [chosen, setChosen] = useState<DeckCategory | null>(selectedDeck ?? null);
  const [error, setError] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleNext = () => {
    if (!chosen) { setError(true); return; }
    setSelectedDeck(chosen);
    router.push("/setup");
  };

  return (
    <PageTransition>
      <Box sx={{ minHeight: "100vh", background: `linear-gradient(170deg, ${BG_TOP} 0%, ${BG_BOT} 100%)`, pb: 14, position: "relative", overflowX: "hidden" }}>
        <CSSParticles />
        <Container maxWidth="sm" sx={{ pt: 4, position: "relative", zIndex: 1 }}>

          {/* Back */}
          <Box sx={{ mb: 2 }}>
            <Button
              onClick={() => router.push("/")}
              startIcon={<ArrowBackRoundedIcon />}
              sx={{
                color: "#7A6248", textTransform: "none", fontWeight: 600,
                borderRadius: 2, px: 1.5, py: 0.75,
                "&:hover": { backgroundColor: `${PRIMARY}22` },
              }}
            >
              ย้อนกลับ
            </Button>
          </Box>

          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 3.5 }}>
            <Typography
              fontWeight={800}
              sx={{ color: "#2C2218", fontSize: "1.2rem", letterSpacing: "-0.01em" }}
            >
              2. เลือกชุดการ์ด (Deck)
            </Typography>
          </Box>

          {/* Deck Cards */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              p: 2.5,
              boxShadow: "0 4px 24px rgba(100,70,30,0.09)",
              border: "1px solid rgba(180,155,120,0.18)",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            <Typography fontWeight={800} sx={{ color: "#2C2218", fontSize: "0.95rem", mb: 0.5, textAlign: "center" }}>
              เลือกชุดการ์ดที่ต้องการเล่น
            </Typography>

            {DECKS.map((deck, idx) => {
              const isSelected = chosen === deck.id;
              return (
                <Box
                  key={deck.id}
                  component={motion.div}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.07 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => { setChosen(deck.id); setError(false); }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 1.5,
                    borderRadius: 3,
                    cursor: "pointer",
                    border: `2px solid ${isSelected ? PRIMARY : "rgba(180,155,120,0.22)"}`,
                    backgroundColor: isSelected ? `${PRIMARY}0C` : "#FDFAF5",
                    transition: "all 0.18s",
                    boxShadow: isSelected
                      ? `0 4px 16px ${PRIMARY}28`
                      : "0 1px 6px rgba(100,70,30,0.04)",
                    "&:hover": {
                      borderColor: isSelected ? PRIMARY : "rgba(78,123,94,0.45)",
                      backgroundColor: isSelected ? `${PRIMARY}0C` : `${PRIMARY}06`,
                    },
                  }}
                >
                  {/* Placeholder image area */}
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 2.5,
                      backgroundColor: "#F5EDE0",
                      flexShrink: 0,
                      overflow: "hidden",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {imgErrors[deck.id] ? (
                      /* Fallback: show first letter when image not found */
                      <Typography
                        sx={{
                          fontWeight: 900,
                          fontSize: "1.6rem",
                          color: isSelected ? PRIMARY : "#B0A090",
                          userSelect: "none",
                        }}
                      >
                        {deck.label.charAt(0)}
                      </Typography>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={deck.image}
                        alt={deck.label}
                        onError={() => setImgErrors((prev) => ({ ...prev, [deck.id]: true }))}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    )}
                  </Box>

                  {/* Labels */}
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      fontWeight={800}
                      sx={{ color: isSelected ? PRIMARY : "#2C2218", fontSize: "1rem", lineHeight: 1.3 }}
                    >
                      {deck.label}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: isSelected ? `${PRIMARY}AA` : "#9C8B76", fontWeight: 500 }}
                    >
                      ({deck.labelEn})
                    </Typography>
                  </Box>

                  {/* Check icon */}
                  <AnimatePresence>
                    {isSelected && (
                      <Box
                        component={motion.div}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 18 }}
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          backgroundColor: PRIMARY,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          boxShadow: `0 3px 10px ${PRIMARY}55`,
                        }}
                      >
                        <CheckRoundedIcon sx={{ color: "white", fontSize: "1.1rem" }} />
                      </Box>
                    )}
                  </AnimatePresence>
                </Box>
              );
            })}

            {/* Validation message */}
            <AnimatePresence>
              {error && (
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  sx={{
                    textAlign: "center",
                    color: "#CF6B3E",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    pt: 0.5,
                  }}
                >
                  กรุณาเลือกชุดการ์ดก่อนดำเนินการต่อ
                </Box>
              )}
            </AnimatePresence>

            {/* Next Button inside card */}
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleNext}
                component={motion.button}
                whileTap={{ scale: 0.97 }}
                sx={{
                  py: 1.85,
                  borderRadius: "24px",
                  textTransform: "none",
                  fontWeight: 800,
                  fontSize: "1.05rem",
                  background: chosen ? PRIMARY : "#EBE3D5",
                  color: chosen ? "#FFFFFF" : "#9C8B76",
                  boxShadow: "none",
                  transition: "all 0.3s",
                  "&:hover": { 
                    background: chosen ? "#448674" : "#DED5C5",
                    boxShadow: "none"
                  },
                }}
              >
                ถัดไป
              </Button>
            </Box>
          </Box>

          {/* คู่มือการเล่น (Guide Button) */}
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" fullWidth size="large"
              onClick={() => router.push("/guide")}
              component={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              startIcon={<ImportContactsRoundedIcon sx={{ fontSize: "1.3rem !important", color: "#A88D6F" }} />}
              endIcon={<ChevronRightRoundedIcon sx={{ fontSize: "1.5rem !important", color: "#A88D6F", opacity: 0.7 }} />}
              sx={{
                py: 2, px: 3, borderRadius: "20px",
                fontSize: "1.05rem", fontWeight: 800, textTransform: "none",
                justifyContent: "space-between",
                background: "rgba(255,255,255,0.9)",
                color: "#5A4A36",
                boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
                border: "1px solid rgba(180,155,120,0.18)",
                backdropFilter: "blur(10px)",
                letterSpacing: "0.02em",
                "& .MuiButton-startIcon": { mr: 1.5, ml: 0 },
                "& .MuiButton-endIcon": { ml: "auto" },
                "&:hover": { 
                  background: "#FFFFFF",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.09)",
                  borderColor: "rgba(180,155,120,0.3)",
                },
              }}>
              คู่มือการเล่น
            </Button>
          </Box>

        </Container>
      </Box>
    </PageTransition>
  );
}
