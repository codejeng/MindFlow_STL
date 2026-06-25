"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Box, Typography, Button, Container, InputBase,
} from "@mui/material";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGame, CHARACTERS, type DeckCategory } from "@/context/GameContext";
import type { PlayerRole } from "@/context/GameContext";
import PageTransition from "@/components/common/PageTransition";
import CSSParticles from "@/components/common/CSSParticles";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

// ─── Design tokens ────────────────────────────────────────────────────────────
const BG      = "#FAF5EC";
const PRIMARY = "#4E7B5E";
const CARD_BG = "#FFFFFF";

// ─── Roles per deck ──────────────────────────────────────────────────────────
type RoleOption = { value: PlayerRole; label: string };

const DECK_ROLES: Record<DeckCategory, RoleOption[]> = {
  family: [
    { value: "parent",  label: "ผู้ปกครอง"   },
    { value: "child",   label: "ลูก"          },
    { value: "friend",  label: "ปู่ย่าตายาย" },
  ],
  primary: [
    { value: "child",   label: "ลูก / นักเรียน" },
    { value: "parent",  label: "ผู้ปกครอง / ครู" },
    { value: "friend",  label: "เพื่อน"    },
  ],
  secondary: [
    { value: "child",   label: "ลูก / นักเรียน" },
    { value: "parent",  label: "ผู้ปกครอง / ครู" },
    { value: "friend",  label: "เพื่อน"    },
  ],
  university: [
    { value: "child",   label: "นักศึกษา" },
    { value: "parent",  label: "อาจารย์"   },
    { value: "friend",  label: "เพื่อน"    },
  ],
};

// Default fallback roles
const DEFAULT_ROLES: RoleOption[] = [
  { value: "parent",  label: "ผู้ปกครอง" },
  { value: "child",   label: "ลูก"        },
  { value: "friend",  label: "เพื่อน"     },
];

// ─── Per-player draft ─────────────────────────────────────────────────────────
interface PlayerDraft {
  name: string;
  role: PlayerRole;
  characterId: string;
}

function buildDrafts(count: number, prev: PlayerDraft[]): PlayerDraft[] {
  return Array.from({ length: count }, (_, i) =>
    prev[i] ?? {
      name: `Player ${i + 1}`,
      role: "child" as PlayerRole,
      characterId: CHARACTERS[i % CHARACTERS.length].id,
    }
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function SetupPage() {
  const router = useRouter();
  const { addPlayer, resetGame, setTurnOrder, setGamePhase, selectedDeck } = useGame();

  const roles = selectedDeck ? DECK_ROLES[selectedDeck] : DEFAULT_ROLES;

  const [playerCount, setPlayerCount] = useState(3);
  const [drafts, setDrafts]           = useState<PlayerDraft[]>(() => buildDrafts(3, []));
  const [activeIdx, setActiveIdx]     = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Adjust drafts when player count changes
  useEffect(() => {
    setDrafts((prev) => buildDrafts(playerCount, prev));
    setActiveIdx((i) => Math.min(i, playerCount - 1));
  }, [playerCount]);

  // Scroll active card into view
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.children[activeIdx] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeIdx]);

  const updateDraft = (idx: number, patch: Partial<PlayerDraft>) => {
    setDrafts((prev) => prev.map((d, i) => (i === idx ? { ...d, ...patch } : d)));
  };

  const handleStart = () => {
    resetGame();
    // addPlayer generates IDs internally; we add all players then navigate
    drafts.forEach((d) => addPlayer(d.name, d.role, "ประถม", d.characterId));
    setGamePhase("ordering");
    router.push("/order");
  };

  const activeDraft  = drafts[activeIdx];
  const activeChar   = CHARACTERS.find((c) => c.id === activeDraft?.characterId) ?? CHARACTERS[0];

  return (
    <PageTransition>
      <Box sx={{ minHeight: "100vh", background: BG, pb: 24, position: "relative", overflowX: "hidden" }}>
        <CSSParticles />
        <Container maxWidth="sm" sx={{ pt: 4, position: "relative", zIndex: 1 }}>

          {/* Back */}
          <Box sx={{ mb: 2 }}>
            <Button
              onClick={() => router.push("/select-deck")}
              startIcon={<ArrowBackRoundedIcon />}
              sx={{
                color: "#7A6248", textTransform: "none", fontWeight: 600,
                borderRadius: 3, px: 1.5, py: 0.75,
                "&:hover": { backgroundColor: `${PRIMARY}12` },
              }}
            >
              ย้อนกลับ
            </Button>
          </Box>

          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 3.5 }}>
            <Typography
              component="span"
              sx={{
                display: "inline-block",
                backgroundColor: `${PRIMARY}15`,
                color: PRIMARY,
                fontWeight: 800,
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                borderRadius: 2,
                px: 1.5, py: 0.4, mb: 1,
              }}
            >
              3. SETUP PLAYERS
            </Typography>
            <Typography fontWeight={900} sx={{ color: "#2C2218", fontSize: "1.8rem", letterSpacing: "-0.02em" }}>
              ตั้งค่าผู้เล่น
            </Typography>
          </Box>

          {/* ── Card 1: Number of players ── */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            sx={{
              backgroundColor: CARD_BG, borderRadius: 2, p: 3, mb: 2.5,
              boxShadow: "0 4px 24px rgba(100,70,30,0.09)",
              border: "1px solid rgba(180,155,120,0.18)",
            }}
          >
            <Typography fontWeight={800} sx={{ color: "#2C2218", fontSize: "1.05rem", textAlign: "center", mb: 2 }}>
              จำนวนผู้เล่น
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center" }}>
              {[2, 3, 4, 5].map((n) => {
                const isActive = playerCount === n;
                return (
                  <Box
                    key={n}
                    component={motion.div}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => setPlayerCount(n)}
                    sx={{
                      width: 64, height: 64, borderRadius: 3,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer",
                      backgroundColor: isActive ? PRIMARY : "transparent",
                      border: `2px solid ${isActive ? PRIMARY : "rgba(180,155,120,0.35)"}`,
                      transition: "all 0.18s",
                      boxShadow: isActive ? `0 4px 14px ${PRIMARY}44` : "none",
                    }}
                  >
                    <Typography
                      fontWeight={800}
                      sx={{ fontSize: "1.4rem", color: isActive ? "white" : "#5A4A36" }}
                    >
                      {n}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* ── Card 2: Character picker + per-player detail ── */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            sx={{
              backgroundColor: CARD_BG, borderRadius: 2, p: 3, mb: 2.5,
              boxShadow: "0 4px 24px rgba(100,70,30,0.09)",
              border: "1px solid rgba(180,155,120,0.18)",
            }}
          >
            <Typography fontWeight={800} sx={{ color: "#2C2218", fontSize: "1.05rem", textAlign: "center", mb: 2.5 }}>
              เลือกตัวละคร
            </Typography>

            {/* Horizontal character scroll */}
            <Box
              ref={scrollRef}
              sx={{
                display: "flex",
                gap: 1.5,
                overflowX: "auto",
                pb: 1,
                px: 0.5,
                scrollSnapType: "x mandatory",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {drafts.map((draft, idx) => {
                const char  = CHARACTERS.find((c) => c.id === draft.characterId) ?? CHARACTERS[idx % CHARACTERS.length];
                const isActive = activeIdx === idx;
                return (
                  <Box
                    key={idx}
                    component={motion.div}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveIdx(idx)}
                    sx={{
                      flexShrink: 0,
                      width: 150,
                      scrollSnapAlign: "center",
                      borderRadius: 1.5,
                      border: `2.5px solid ${isActive ? PRIMARY : "rgba(180,155,120,0.25)"}`,
                      backgroundColor: isActive ? `${PRIMARY}0E` : "#FDFAF5",
                      p: 1.5,
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      transition: "all 0.18s",
                      boxShadow: isActive ? `0 4px 18px ${PRIMARY}30` : "0 2px 8px rgba(100,70,30,0.05)",
                    }}
                  >
                    <Box sx={{ width: 70, height: 80, position: "relative", mb: 1 }}>
                      <Image
                        src={char.image}
                        alt={char.name}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </Box>
                    <Typography
                      fontWeight={700}
                      sx={{
                        fontSize: "0.8rem",
                        color: isActive ? PRIMARY : "#7A6248",
                        textAlign: "center",
                      }}
                    >
                      Player {idx + 1}
                    </Typography>
                  </Box>
                );
              })}
            </Box>

            {/* Dot indicators */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}>
              {drafts.map((_, idx) => (
                <Box
                  key={idx}
                  component={motion.div}
                  animate={{ width: idx === activeIdx ? 20 : 8 }}
                  onClick={() => setActiveIdx(idx)}
                  sx={{
                    height: 8, borderRadius: 4, cursor: "pointer",
                    backgroundColor: idx === activeIdx ? PRIMARY : "rgba(180,155,120,0.35)",
                    transition: "background 0.18s",
                  }}
                />
              ))}
            </Box>

            {/* ── Per-player detail panel ── */}
            <AnimatePresence mode="wait">
              {activeDraft && (
                <Box
                  key={activeIdx}
                  component={motion.div}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  sx={{ mt: 3 }}
                >
                  {/* Player label */}
                  <Typography
                    fontWeight={800}
                    sx={{ color: PRIMARY, fontSize: "0.9rem", mb: 2, textAlign: "center" }}
                  >
                    ตั้งค่า Player {activeIdx + 1}
                  </Typography>

                  {/* Name input */}
                  <Typography variant="body2" fontWeight={700} sx={{ color: "#5A4A36", mb: 0.75 }}>
                    ชื่อผู้เล่น
                  </Typography>
                  <Box
                    sx={{
                      display: "flex", alignItems: "center",
                      backgroundColor: "#FAF5EC", borderRadius: 3, px: 2, py: 1.2, mb: 2.5,
                      border: "1.5px solid rgba(180,155,120,0.3)",
                    }}
                  >
                    <InputBase
                      fullWidth
                      placeholder={`Player ${activeIdx + 1}`}
                      value={activeDraft.name}
                      onChange={(e) => updateDraft(activeIdx, { name: e.target.value })}
                      inputProps={{ maxLength: 20 }}
                      sx={{ fontSize: "0.95rem", color: "#2C2218" }}
                    />
                  </Box>

                  {/* Character selection for this player */}
                  <Typography variant="body2" fontWeight={700} sx={{ color: "#5A4A36", mb: 0.75 }}>
                    ตัวละคร
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, mb: 2.5, flexWrap: "wrap" }}>
                    {CHARACTERS.map((char) => {
                      const isSelected = activeDraft.characterId === char.id;
                      // Disable if another player already uses this character
                      const usedByOther = drafts.some((d, i) => i !== activeIdx && d.characterId === char.id);
                      return (
                        <Box
                          key={char.id}
                          component={motion.div}
                          whileTap={!usedByOther ? { scale: 0.9 } : {}}
                          onClick={() => !usedByOther && updateDraft(activeIdx, { characterId: char.id })}
                          sx={{
                            width: 80, height: 82,
                            borderRadius: 1,
                            border: `2px solid ${isSelected ? char.baseColor : usedByOther ? "rgba(180,155,120,0.15)" : "rgba(180,155,120,0.28)"}`,
                            backgroundColor: isSelected ? char.baseColor + "18" : usedByOther ? "#F5F0EA" : "#FDFAF5",
                            display: "flex", flexDirection: "column",
                            alignItems: "center", justifyContent: "center",
                            cursor: usedByOther ? "not-allowed" : "pointer",
                            opacity: usedByOther ? 0.4 : 1,
                            transition: "all 0.18s",
                            boxShadow: isSelected ? `0 3px 12px ${char.baseColor}40` : "none",
                            position: "relative",
                          }}
                        >
                          <Box sx={{ width: 60, height: 66, position: "relative" }}>
                            <Image src={char.image} alt={char.name} fill style={{ objectFit: "contain" }} />
                          </Box>
                          {isSelected && (
                            <Box
                              sx={{
                                position: "absolute", top: 3, right: 3,
                                width: 16, height: 16, borderRadius: "50%",
                                backgroundColor: char.baseColor,
                                display: "flex", alignItems: "center", justifyContent: "center",
                              }}
                            >
                              <CheckRoundedIcon sx={{ fontSize: "0.65rem", color: "white" }} />
                            </Box>
                          )}
                        </Box>
                      );
                    })}
                  </Box>

                  {/* Role selection */}
                  <Typography variant="body2" fontWeight={700} sx={{ color: "#5A4A36", mb: 0.75 }}>
                    บทบาท
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {roles.map((r) => {
                      const isRoleActive = activeDraft.role === r.value;
                      return (
                        <Box
                          key={r.label}
                          component={motion.div}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateDraft(activeIdx, { role: r.value })}
                          sx={{
                            flex: "1 1 auto",
                            minWidth: 80,
                            py: 1.2, px: 1,
                            borderRadius: 3,
                            cursor: "pointer",
                            textAlign: "center",
                            backgroundColor: isRoleActive ? `${PRIMARY}14` : "#FAF5EC",
                            border: `2px solid ${isRoleActive ? PRIMARY : "rgba(180,155,120,0.28)"}`,
                            transition: "all 0.18s",
                            boxShadow: isRoleActive ? `0 3px 10px ${PRIMARY}28` : "none",
                          }}
                        >
                          <Typography
                            fontWeight={700}
                            sx={{ fontSize: "0.88rem", color: isRoleActive ? PRIMARY : "#9C8B76" }}
                          >
                            {r.label}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              )}
            </AnimatePresence>
          </Box>

        </Container>

        {/* ── Sticky Start button ── */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          sx={{
            position: "fixed", bottom: 40, left: 0, right: 0,
            px: 3, pb: 2, pt: 4,
            zIndex: 10,
            background: "linear-gradient(180deg,transparent 0%,rgba(250,245,236,0.97) 35%, #FAF5EC 100%)",
          }}
        >
          <Box sx={{ maxWidth: 600, mx: "auto" }}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleStart}
              component={motion.button}
              whileTap={{ scale: 0.97 }}
              sx={{
                py: 1.85, borderRadius: "16px", textTransform: "none",
                fontWeight: 800, fontSize: "1.1rem",
                background: `linear-gradient(135deg,${PRIMARY},#5E8F6E)`,
                boxShadow: `0 6px 24px ${PRIMARY}50`,
                letterSpacing: "0.02em",
              }}
            >
              เริ่มเกม
            </Button>
          </Box>
        </Box>
      </Box>
    </PageTransition>
  );
}
