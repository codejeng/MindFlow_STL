"use client";

import { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGame, CHARACTERS, type PlayerMission, type MissionGoalProgress } from "@/context/GameContext";
import { spawnMissions, MISSION_ICON_META } from "@/data/missions";
import PageTransition from "@/components/common/PageTransition";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

// --- Design tokens ---
const BG      = "#FAF5EC";
const PRIMARY = "#4E7B5E";
const CARD_BG = "#FFFFFF";

// --- Component ---
export default function MissionPage() {
  const router = useRouter();
  const { players, turnOrder, setGameStartTime, setGamePhase, assignMissions } = useGame();
  const spawnedRef = useRef(false);

  // Ordered player list following turnOrder
  const orderedPlayers = turnOrder
    .map((id) => players.find((p) => p.id === id))
    .filter(Boolean) as typeof players;

  const [currentIdx, setCurrentIdx] = useState(0);
  const isLast = currentIdx >= orderedPlayers.length - 1;

  // Spawn and assign missions once on mount
  useEffect(() => {
    if (spawnedRef.current || orderedPlayers.length === 0) return;
    spawnedRef.current = true;

    orderedPlayers.forEach((player) => {
      // Only assign if player has no missions yet
      if (player.missions.length === 0) {
        const spawned = spawnMissions(3);
        const playerMissions: PlayerMission[] = spawned.map((def) => ({
          missionId: def.id,
          label: def.label,
          goals: def.goals.map((g): MissionGoalProgress => ({
            type: g.type,
            target: g.target,
            progress: 0,
          })),
        }));
        assignMissions(player.id, playerMissions);
      }
    });
  }, [orderedPlayers, assignMissions]);

  const currentPlayer = orderedPlayers[currentIdx];
  const char = CHARACTERS.find((c) => c.id === currentPlayer?.characterId) ?? CHARACTERS[0];

  // Get missions for current player (may be from spawned state or already assigned)
  const currentMissions = currentPlayer?.missions ?? [];

  const handleConfirm = () => {
    if (isLast) {
      setGameStartTime(Date.now());
      setGamePhase("playing");
      router.push("/play");
    } else {
      setCurrentIdx((i) => i + 1);
    }
  };

  if (!currentPlayer) {
    return null;
  }

  return (
    <PageTransition>
      <Box sx={{ minHeight: "100vh", background: BG, pb: 24 }}>
        <Container maxWidth="sm" sx={{ pt: 3 }}>

          {/* Back (only shown for first player) */}
          <Box sx={{ mb: 2 }}>
            {currentIdx === 0 && (
              <Button
                onClick={() => router.push("/order")}
                startIcon={<ArrowBackRoundedIcon />}
                sx={{
                  color: "#7A6248", textTransform: "none", fontWeight: 600,
                  borderRadius: 3, px: 1.5, py: 0.75,
                  "&:hover": { backgroundColor: `${PRIMARY}12` },
                }}
              >
                ย้อนกลับ
              </Button>
            )}
          </Box>

          {/* Step badge + title */}
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
              6. MISSION
            </Typography>
            <Typography
              fontWeight={900}
              sx={{ color: "#2C2218", fontSize: "1.8rem", letterSpacing: "-0.02em" }}
            >
              ภารกิจของคุณ
            </Typography>
          </Box>

          {/* Player progress dots */}
          {orderedPlayers.length > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 3 }}>
              {orderedPlayers.map((_, idx) => (
                <Box
                  key={idx}
                  component={motion.div}
                  animate={{ width: idx === currentIdx ? 22 : 8 }}
                  sx={{
                    height: 8, borderRadius: 4,
                    backgroundColor: idx === currentIdx
                      ? PRIMARY
                      : idx < currentIdx
                        ? `${PRIMARY}60`
                        : "rgba(180,155,120,0.3)",
                    transition: "background 0.2s",
                  }}
                />
              ))}
            </Box>
          )}

          {/* Mission card -- animates per player */}
          <AnimatePresence mode="wait">
            <Box
              key={currentIdx}
              component={motion.div}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              sx={{
                backgroundColor: CARD_BG,
                borderRadius: 2,
                p: 3,
                mb: 2.5,
                boxShadow: "0 4px 24px rgba(100,70,30,0.09)",
                border: "1px solid rgba(180,155,120,0.18)",
              }}
            >
              {/* Player identity */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2.5, pb: 2.5, borderBottom: "1px solid rgba(180,155,120,0.18)" }}>
                <Box sx={{ width: 56, height: 66, position: "relative", flexShrink: 0 }}>
                  <Image src={char.image} alt={char.name} fill style={{ objectFit: "contain" }} />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: "#9C8B76", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    ผู้เล่นคนที่ {currentIdx + 1}
                  </Typography>
                  <Typography fontWeight={900} sx={{ color: "#2C2218", fontSize: "1.25rem", lineHeight: 1.2 }}>
                    {currentPlayer.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "inline-flex", alignItems: "center", gap: 0.5, mt: 0.4,
                      backgroundColor: `${char.baseColor}18`,
                      color: char.baseColor,
                      borderRadius: 1.5, px: 1, py: 0.2,
                    }}
                  >
                    <Typography sx={{ fontSize: "0.72rem", fontWeight: 700 }}>
                      {currentPlayer.role === "parent" ? "ผู้ปกครอง" : currentPlayer.role === "child" ? "ลูก" : "เพื่อน"}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Mission intro */}
              <Typography fontWeight={800} sx={{ color: "#2C2218", fontSize: "1.05rem", mb: 0.5 }}>
                ภารกิจของคุณ
              </Typography>
              <Typography variant="body2" sx={{ color: "#7A6248", mb: 2.5 }}>
                ทำภารกิจให้ครบเพื่อปลดล็อกประตูของคุณ
              </Typography>

              {/* Mission items -- real data */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {currentMissions.map((mission, mIdx) => {
                  // Get icon meta for the primary goal type
                  const primaryType = mission.goals[0]?.type ?? "life-event";
                  const meta = MISSION_ICON_META[primaryType];
                  const IconComponent = meta.Icon;

                  return (
                    <Box
                      key={mission.missionId}
                      component={motion.div}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: mIdx * 0.08 }}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: 1.75,
                        borderRadius: 2,
                        backgroundColor: "#FDFAF5",
                        border: "1.5px solid rgba(180,155,120,0.18)",
                      }}
                    >
                      {/* Icon */}
                      <Box
                        sx={{
                          width: 50, height: 50, borderRadius: "50%",
                          backgroundColor: meta.iconBg,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <IconComponent sx={{ color: meta.iconColor, fontSize: "1.5rem" }} />
                      </Box>

                      {/* Label + progress */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography fontWeight={800} sx={{ color: "#2C2218", fontSize: "0.95rem" }}>
                          {mission.label}
                        </Typography>
                        {/* Show goal breakdown for mixed missions */}
                        {mission.goals.map((g, gi) => (
                          <Box key={gi} sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                            <Box sx={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: "rgba(180,155,120,0.22)", overflow: "hidden" }}>
                              <Box sx={{ width: `${Math.min(100, (g.progress / g.target) * 100)}%`, height: "100%", borderRadius: 3, backgroundColor: MISSION_ICON_META[g.type].iconColor, transition: "width 0.3s" }} />
                            </Box>
                            <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: "#B0A090", flexShrink: 0 }}>
                              {g.progress}/{g.target}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </AnimatePresence>

        </Container>

        {/* Sticky confirm button */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          sx={{
            position: "fixed", bottom: 40, left: 0, right: 0,
            px: 3, pb: 2, pt: 4, zIndex: 10,
            background: "linear-gradient(180deg,transparent 0%,rgba(250,245,236,0.97) 35%, #FAF5EC 100%)",
          }}
        >
          <Box sx={{ maxWidth: 600, mx: "auto" }}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleConfirm}
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
              เข้าใจแล้ว
            </Button>
            {!isLast && (
              <Typography
                variant="caption"
                sx={{ display: "block", textAlign: "center", mt: 1, color: "#9C8B76" }}
              >
                (ส่งมือถือให้ผู้เล่นถัดไป)
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </PageTransition>
  );
}
