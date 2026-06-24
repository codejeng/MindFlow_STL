"use client";

import { useState, useEffect, useCallback } from "react";
import { Box, Typography, Container, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import Image from "next/image";
import PageTransition from "@/components/common/PageTransition";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";

const PAGE_BG = "#E9F1E3";
const PANEL_BG = "#FCFEFB";
const PANEL_BORDER = "#CBE0CB";
const BADGE = "#5BA081";
const TITLE = "#2F6B57";
const SUB = "#5E6B62";

function buildPages(startGame: () => void): ReactNode[] {
  const images = [
    "/guide/MF_.png",
    "/guide/MF_1.png",
    "/guide/MF_2.png",
    "/guide/MF_3.png",
    "/guide/MF_4.png",
    "/guide/MF_5.png",
    "/guide/MF_6.png",
    "/guide/MF_7.png",
    "/guide/MF_8.png",
    "/guide/MF_9.png",
    "/guide/MF_10.png",
    "/guide/MF_11.png",
    "/guide/MF_12.png",
  ];

  const pages = images.map((src, i) => (
    <Box key={i} sx={{ width: "100%", position: "relative" }}>
      <Image src={src} alt={`Guide page ${i}`} width={800} height={1130} style={{ width: "100%", height: "auto", display: "block" }} priority={i < 2} />
      {i === images.length - 1 && (
        <Box sx={{ position: "absolute", bottom: 20, left: 0, right: 0, px: 3 }}>
          <Box
            component={motion.button}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              startGame();
            }}
            sx={{
              width: "100%",
              border: "none",
              cursor: "pointer",
              py: 1.6,
              borderRadius: "16px",
              color: "#fff",
              fontWeight: 800,
              fontSize: "1rem",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              background: "linear-gradient(135deg, #4E9E7E 0%, #6FB892 100%)",
              boxShadow: "0 8px 24px rgba(78,158,126,0.35)",
            }}
          >
            <SportsEsportsRoundedIcon sx={{ fontSize: "1.3rem" }} /> เริ่มเล่นเลย
          </Box>
        </Box>
      )}
    </Box>
  ));

  return pages;
}

const flip: Variants = {
  enter: (dir: number) => ({ rotateY: dir > 0 ? -75 : 75, opacity: 0, scale: 0.92 }),
  center: { rotateY: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ rotateY: dir > 0 ? 75 : -75, opacity: 0, scale: 0.92 }),
};

export default function GuidePage() {
  const router = useRouter();
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const pages = buildPages(() => router.push("/select-deck"));
  const total = pages.length;

  const paginate = useCallback(
    (delta: number) => {
      setState(([i]) => {
        const next = i + delta;
        if (next < 0 || next >= total) return [i, 0];
        return [next, delta];
      });
    },
    [total]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paginate]);

  const isLast = index === total - 1;

  return (
    <PageTransition>
      <Box sx={{ minHeight: "100vh", backgroundColor: PAGE_BG, position: "relative", display: "flex", flexDirection: "column" }}>
        {/* ── Top bar ── */}
        <Box sx={{ position: "sticky", top: 0, zIndex: 20, backdropFilter: "blur(10px)", background: "rgba(233,241,227,0.85)", borderBottom: `1px solid ${PANEL_BORDER}` }}>
          <Container maxWidth="sm" sx={{ display: "flex", alignItems: "center", gap: 1, py: 1.2 }}>
            <IconButton
              onClick={() => router.push("/")}
              sx={{ color: TITLE, backgroundColor: "#fff", border: `1px solid ${PANEL_BORDER}`, "&:hover": { backgroundColor: "#fff" } }}
              aria-label="กลับ"
            >
              <ArrowBackRoundedIcon />
            </IconButton>
            <Typography sx={{ fontWeight: 800, color: TITLE, fontSize: "1.1rem" }}>คู่มือการเล่นเกม</Typography>
            <Typography sx={{ ml: "auto", color: SUB, fontWeight: 700, fontSize: "0.85rem" }}>
              {index === 0 ? "ปก" : `${index} / ${total - 1}`}
            </Typography>
          </Container>
        </Box>

        {/* ── Card stage ── */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", px: 2, py: 3 }}>
          <Box sx={{ width: "100%", maxWidth: 440, perspective: "1600px" }}>
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <Box
                component={motion.div}
                key={index}
                custom={dir}
                variants={flip}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.4, 0.0, 0.2, 1] }}
                onClick={() => {
                  if (!isLast) paginate(1);
                }}
                style={{ transformStyle: "preserve-3d", transformOrigin: "center" }}
                sx={{
                  position: "relative",
                  backgroundColor: PANEL_BG,
                  borderRadius: "24px",
                  border: `1.5px solid ${PANEL_BORDER}`,
                  boxShadow: "0 16px 40px rgba(90,140,110,0.18)",
                  p: 0,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  cursor: isLast ? "default" : "pointer",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {pages[index]}
              </Box>
            </AnimatePresence>
          </Box>

          {/* ── Controls ── */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3, width: "100%", maxWidth: 440, justifyContent: "space-between" }}>
            <IconButton
              onClick={() => paginate(-1)}
              disabled={index === 0}
              sx={{
                color: TITLE,
                backgroundColor: "#fff",
                border: `1px solid ${PANEL_BORDER}`,
                "&:hover": { backgroundColor: "#fff" },
                "&.Mui-disabled": { opacity: 0.35 },
              }}
              aria-label="ก่อนหน้า"
            >
              <ChevronLeftRoundedIcon />
            </IconButton>

            {/* dots */}
            <Box sx={{ display: "flex", gap: 0.6, flexWrap: "wrap", justifyContent: "center", flex: 1 }}>
              {pages.map((_, i) => (
                <Box
                  key={i}
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  sx={{
                    width: i === index ? 18 : 8,
                    height: 8,
                    borderRadius: 4,
                    cursor: "pointer",
                    backgroundColor: i === index ? BADGE : "rgba(91,160,129,0.3)",
                    transition: "all 0.3s",
                  }}
                />
              ))}
            </Box>

            <IconButton
              onClick={() => paginate(1)}
              disabled={isLast}
              sx={{
                color: "#fff",
                backgroundColor: BADGE,
                "&:hover": { backgroundColor: "#4E9070" },
                "&.Mui-disabled": { opacity: 0.35 },
              }}
              aria-label="ถัดไป"
            >
              <ChevronRightRoundedIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </PageTransition>
  );
}
