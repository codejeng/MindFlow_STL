"use client";

import React, { useState } from "react";
import {
  Box, Typography, Button, Container, InputBase,
  Alert,
} from "@mui/material";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGame, CHARACTERS } from "@/context/GameContext";
import type { PlayerRole, AgeGroup } from "@/context/GameContext";
import PageTransition from "@/components/common/PageTransition";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ChildCareRoundedIcon from "@mui/icons-material/ChildCareRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import TimerRoundedIcon from "@mui/icons-material/TimerRounded";
import GroupIcon from '@mui/icons-material/Group';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';

const BG      = "#FAF5EC";
const PRIMARY = "#4E7B5E";
const ACCENT  = "#CF6B3E";
const CARD_BG = "white";

export default function SetupPage() {
  const router = useRouter();
  const { players, addPlayer, removePlayer, setTurnOrder, setGamePhase, timeLimit, setTimeLimit } = useGame();
  const [name, setName] = useState("");
  const [role, setRole] = useState<PlayerRole>("parent");
  const [selectedChar, setSelectedChar] = useState(CHARACTERS[0].id);
  const [error, setError] = useState("");

  const handleAdd = () => {
    const trimmed = name.trim();
    if (!trimmed) { setError("กรุณาใส่ชื่อผู้เล่น"); return; }
    if (players.length >= 5) { setError("ผู้เล่นเต็มแล้ว (สูงสุด 5 คน)"); return; }
    addPlayer(trimmed, role, "ประถม", selectedChar);
    setName("");
    setError("");
  };

  const handleNext = () => {
    if (players.length < 2) { setError("ต้องมีผู้เล่นอย่างน้อย 2 คน"); return; }
    setTurnOrder(players.map((p) => p.id));
    setGamePhase("ordering");
    router.push("/order");
  };

  return (
    <PageTransition>
      <Box sx={{ minHeight: "100vh", background: BG, pb: 14 }}>
        <Container maxWidth="sm" sx={{ pt: 3 }}>

          {/* Back */}
          <Box sx={{ mb: 2 }}>
            <Button onClick={() => router.back()} startIcon={<ArrowBackRoundedIcon />}
              sx={{ color: "#7A6248", textTransform: "none", fontWeight: 600,
                borderRadius: 3, px: 1.5, py: 0.75,
                "&:hover": { backgroundColor: `${PRIMARY}12` } }}>
              ย้อนกลับ
            </Button>
          </Box>

          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 3.5 }}>
            <Typography fontWeight={900} sx={{
              color: "#2C2218", fontSize: "1.8rem", letterSpacing: "-0.02em"
            }}>
              ตั้งค่าผู้เล่น
            </Typography>
            <Typography variant="body2" sx={{ color: "#7A6248", mt: 0.5 }}>
              เพิ่มผู้เล่น 2–5 คน และเลือกตัวละครและบทบาท (ผู้ปกครอง / ลูก / เพื่อน)
            </Typography>
          </Box>

          {/* ── Add player card ── */}
          <Box component={motion.div} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            sx={{
              backgroundColor: CARD_BG, borderRadius: 4, p: 3, mb: 3,
              boxShadow: "0 4px 24px rgba(100,70,30,0.09)",
              border: "1px solid rgba(180,155,120,0.18)",
            }}>
            <Typography fontWeight={800} sx={{ color: "#2C2218", mb: 2.5, fontSize: "0.95rem" }}>
              เพิ่มผู้เล่น ({players.length}/5)
            </Typography>

            {/* Character picker */}
            <Typography variant="body2" fontWeight={700} sx={{ color: "#5A4A36", mb: 1.25 }}>เลือกตัวละคร</Typography>
            <Box sx={{ display: "flex", gap: 0.75, mb: 2.5, justifyContent: "center", flexWrap: "wrap" }}>
              {CHARACTERS.map((char) => {
                const isSelected = selectedChar === char.id;
                return (
                  <Box key={char.id} component={motion.div}
                    whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.93 }}
                    onClick={() => setSelectedChar(char.id)}
                    sx={{
                      width: 76, height: 90,
                      borderRadius: 3,
                      cursor: "pointer",
                      border: `2.5px solid ${isSelected ? char.baseColor : "rgba(180,155,120,0.2)"}`,
                      backgroundColor: isSelected ? char.baseColor + "14" : "#FDFAF5",
                      display: "flex", flexDirection: "column", alignItems: "center",
                      justifyContent: "center", transition: "all 0.2s",
                      boxShadow: isSelected ? `0 4px 14px ${char.baseColor}40` : "none",
                    }}>
                    <Image src={char.image} alt={char.name} width={54} height={62}
                      style={{ objectFit: "contain" }} />
                    <Typography variant="caption" fontWeight={700}
                      sx={{ color: isSelected ? char.baseColor : "#B0A090", fontSize: "0.62rem", mt: 0.25 }}>
                      {char.name}
                    </Typography>
                  </Box>
                );
              })}
            </Box>

            {/* Name input */}
            <Box sx={{
              display: "flex", alignItems: "center",
              backgroundColor: "#FAF5EC", borderRadius: 3, px: 2, py: 1.25, mb: 2.5,
              border: "1.5px solid rgba(180,155,120,0.25)",
            }}>
              <InputBase fullWidth placeholder="ชื่อผู้เล่น"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                inputProps={{ maxLength: 20 }}
                sx={{ fontSize: "0.95rem", color: "#2C2218" }} />
              {name && (
                <CloseRoundedIcon onClick={() => setName("")}
                  sx={{ color: "#B0A090", fontSize: "1rem", cursor: "pointer" }} />
              )}
            </Box>

            {/* Role */}
            <Typography variant="body2" fontWeight={700} sx={{ color: "#5A4A36", mb: 1.25 }}>บทบาท</Typography>
            <Box sx={{ display: "flex", gap: 1.5, mb: 2.5, flexWrap: "wrap" }}>
              {([
                { value: "parent", label: "ผู้ปกครอง", Icon: PersonRoundedIcon,   color: PRIMARY },
                { value: "child",  label: "ลูก",        Icon: ChildCareRoundedIcon, color: ACCENT },
                { value: "friend", label: "เพื่อน",       Icon: GroupsRoundedIcon,   color: "#7C5CBF" },
              ] as { value: PlayerRole; label: string; Icon: React.ElementType; color: string }[]).map((r) => {
                const isActive = role === r.value;
                return (
                  <Box key={r.value} onClick={() => setRole(r.value)}
                    component={motion.div} whileTap={{ scale: 0.96 }}
                    sx={{
                      flex: 1, minWidth: 80, py: 1.4, borderRadius: 3, cursor: "pointer", textAlign: "center",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 0.75,
                      backgroundColor: isActive ? r.color + "14" : "#FDFAF5",
                      border: `2px solid ${isActive ? r.color : "rgba(180,155,120,0.25)"}`,
                      transition: "all 0.18s",
                    }}>
                    <r.Icon sx={{ color: isActive ? r.color : "#B0A090", fontSize: "1.1rem" }} />
                    <Typography fontWeight={700}
                      sx={{ color: isActive ? r.color : "#9C8B76", fontSize: "0.9rem" }}>
                      {r.label}
                    </Typography>
                  </Box>
                );
              })}
            </Box>



            {/* Add button */}
            <Button variant="contained" fullWidth size="large"
              onClick={handleAdd}
              startIcon={<PersonAddAltRoundedIcon />}
              disabled={players.length >= 5}
              component={motion.button} whileTap={{ scale: 0.97 }}
              sx={{
                py: 1.7, borderRadius: "14px", textTransform: "none",
                fontWeight: 800, fontSize: "1rem",
                background: `linear-gradient(135deg,${ACCENT},#DF7E52)`,
                boxShadow: `0 6px 20px ${ACCENT}45`,
                "&:disabled": { background: "#E5D5C5", color: "#B0A090", boxShadow: "none" },
              }}>
              เพิ่มผู้เล่น
            </Button>
          </Box>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                <Alert severity="warning" sx={{ mb: 2, borderRadius: 3, backgroundColor: "#FEF3E6",
                  "& .MuiAlert-icon": { color: ACCENT } }}
                  onClose={() => setError("")}>
                  {error}
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Player list */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 3 }}>
            <AnimatePresence mode="popLayout">
              {players.map((player, i) => {
                const char = CHARACTERS.find((c) => c.id === player.characterId);
                return (
                  <Box key={player.id} component={motion.div} layout
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                    sx={{
                      display: "flex", alignItems: "center", gap: 2, p: 2,
                      borderRadius: 4, backgroundColor: CARD_BG,
                      border: `2px solid ${char?.baseColor ?? "#ddd"}25`,
                      boxShadow: "0 2px 14px rgba(100,70,30,0.07)",
                    }}>
                    <Box sx={{ width: 48, height: 58, flexShrink: 0, position: "relative" }}>
                      {char && <Image src={char.image} alt={char.name} fill style={{ objectFit: "contain" }} />}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography fontWeight={800} sx={{ color: char?.baseColor ?? PRIMARY, fontSize: "0.95rem" }}>
                        {player.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#9C8B76" }}>
                        {char?.name} · {player.role === "parent" ? "ผู้ปกครอง" : player.role === "child" ? "ลูก" : "เพื่อน"}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontWeight: 800, color: "#D1C4B4", mr: 0.5, fontSize: "0.85rem" }}>#{i + 1}</Typography>
                    <Box component={motion.div} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      onClick={() => removePlayer(player.id)}
                      sx={{
                        cursor: "pointer", width: 30, height: 30, borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        backgroundColor: "#F5ECD7",
                        "&:hover": { backgroundColor: "#FEE2E2" }, transition: "background 0.2s",
                      }}>
                      <CloseRoundedIcon sx={{ fontSize: "0.95rem", color: "#B0A090", ".MuiBox-root:hover > &": { color: "#EF4444" } }} />
                    </Box>
                  </Box>
                );
              })}
            </AnimatePresence>

            {players.length === 0 && (
              <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                sx={{ textAlign: "center", py: 5, color: "#B0A090" }}>
                <GroupIcon sx={{ fontSize: "2.5rem", mb: 1, color: "#B0A090" }} />
                <Typography fontWeight={600} sx={{ color: "#9C8B76" }}>ยังไม่มีผู้เล่น</Typography>
              </Box>
            )}
          </Box>

          {/* Timer settings */}
          <AnimatePresence>
            {players.length >= 2 && (
              <Box component={motion.div} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                sx={{
                  backgroundColor: CARD_BG, borderRadius: 4, p: 3, mb: 3,
                  boxShadow: "0 4px 20px rgba(100,70,30,0.08)",
                  border: "1px solid rgba(180,155,120,0.18)",
                }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <TimerRoundedIcon sx={{ color: PRIMARY, fontSize: "1.1rem" }} />
                  <Typography fontWeight={800} sx={{ color: "#2C2218", fontSize: "0.95rem" }}>
                    ตั้งเวลาการเล่น
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  {[45, 60, 90].map((t) => {
                    const isActive = timeLimit === t;
                    return (
                      <Box key={t} onClick={() => setTimeLimit(t)}
                        component={motion.div} whileTap={{ scale: 0.94 }}
                        sx={{
                          flex: 1, py: 1.4, borderRadius: 3, cursor: "pointer", textAlign: "center",
                          backgroundColor: isActive ? PRIMARY + "14" : "#FAF5EC",
                          border: `2px solid ${isActive ? PRIMARY : "rgba(180,155,120,0.25)"}`,
                          transition: "all 0.18s",
                          boxShadow: isActive ? `0 3px 10px ${PRIMARY}28` : "none",
                        }}>
                        <Typography fontWeight={800} sx={{ color: isActive ? PRIMARY : "#9C8B76", fontSize: "0.95rem" }}>
                          {t}
                        </Typography>
                        <Typography variant="caption" sx={{ color: isActive ? PRIMARY + "AA" : "#B0A090", fontSize: "0.65rem" }}>
                          นาที
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
                <Typography variant="caption" sx={{ display: "block", mt: 1.5, textAlign: "center", color: "#9C8B76" }}>
                  *แนะนำ 60 นาทีสำหรับผู้เล่น 3 คนขึ้นไป
                </Typography>
              </Box>
            )}
          </AnimatePresence>

        </Container>

        {/* Sticky Next button */}
        <AnimatePresence>
          {players.length >= 2 && (
            <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
              sx={{
                position: "fixed", bottom: 64, left: 0, right: 0,
                px: 3, pb: 2, pt: 1.5,
                background: "linear-gradient(180deg,transparent 0%,rgba(250,245,236,0.97) 28%)",
              }}>
              <Box sx={{ maxWidth: 600, mx: "auto" }}>
                <Button variant="contained" fullWidth size="large"
                  onClick={handleNext}
                  endIcon={<ArrowForwardRoundedIcon />}
                  component={motion.button} whileTap={{ scale: 0.97 }}
                  sx={{
                    py: 1.85, borderRadius: "16px", textTransform: "none",
                    fontWeight: 800, fontSize: "1.05rem",
                    background: `linear-gradient(135deg,${PRIMARY},#5E8F6E)`,
                    boxShadow: `0 6px 24px ${PRIMARY}50`,
                  }}>
                  ถัดไป – เลือกลำดับ
                </Button>
              </Box>
            </Box>
          )}
        </AnimatePresence>
      </Box>
    </PageTransition>
  );
}
