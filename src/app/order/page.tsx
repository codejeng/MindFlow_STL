"use client";

import { useEffect } from "react";

import { Box, Typography, Button, Container, Chip } from "@mui/material";
import Image from "next/image";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGame, CHARACTERS } from "@/context/GameContext";
import PageTransition from "@/components/common/PageTransition";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import DragIndicatorRoundedIcon from "@mui/icons-material/DragIndicatorRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ChildCareRoundedIcon from "@mui/icons-material/ChildCareRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import { useState } from "react";

// ─── Design tokens ────────────────────────────────────────────────────────────
const BG      = "#FAF5EC";
const PRIMARY = "#4E7B5E";
const ACCENT  = "#CF6B3E";
const CARD_BG = "#FFFFFF";

// ─── Role helpers ─────────────────────────────────────────────────────────────
function getRoleLabel(role: string): string {
  if (role === "parent") return "ผู้ปกครอง";
  if (role === "child")  return "ลูก";
  return "เพื่อน";
}

function getRoleIcon(role: string) {
  if (role === "parent") return <PersonRoundedIcon sx={{ fontSize: 13 }} />;
  if (role === "child")  return <ChildCareRoundedIcon sx={{ fontSize: 13 }} />;
  return <GroupsRoundedIcon sx={{ fontSize: 13 }} />;
}

function getRoleColor(role: string): string {
  if (role === "parent") return PRIMARY;
  if (role === "child")  return ACCENT;
  return "#7C5CBF";
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function OrderPage() {
  const router = useRouter();
  const {
    players, turnOrder, setTurnOrder,
    randomizeTurnOrder,
  } = useGame();

  const [shuffled, setShuffled] = useState(false);

  // Seed turn order from players on first mount if setup never called setTurnOrder
  useEffect(() => {
    if (players.length > 0 && turnOrder.length === 0) {
      setTurnOrder(players.map((p) => p.id));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShuffle = () => {
    randomizeTurnOrder();
    setShuffled(true);
    setTimeout(() => setShuffled(false), 600);
  };

  const handleStart = () => {
    router.push("/intro");
  };

  return (
    <PageTransition>
      <Box sx={{ minHeight: "100vh", background: BG, pb: 16 }}>
        <Container maxWidth="sm" sx={{ pt: 3 }}>

          {/* Back */}
          <Box sx={{ mb: 2 }}>
            <Button
              onClick={() => router.push("/setup")}
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
              4. PLAYER ORDER
            </Typography>
            <Typography
              fontWeight={900}
              sx={{ color: "#2C2218", fontSize: "1.8rem", letterSpacing: "-0.02em" }}
            >
              ลำดับการเล่น
            </Typography>
            <Typography variant="body2" sx={{ color: "#7A6248", mt: 0.5 }}>
              ลากเพื่อจัดลำดับ หรือกดสุ่ม
            </Typography>
          </Box>

          {/* Shuffle button */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Button
              variant="outlined"
              startIcon={
                <Box
                  component={motion.div}
                  animate={shuffled ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <ShuffleRoundedIcon sx={{ fontSize: "1.1rem" }} />
                </Box>
              }
              onClick={handleShuffle}
              component={motion.button}
              whileTap={{ scale: 0.94 }}
              sx={{
                borderRadius: "12px",
                borderColor: ACCENT,
                color: ACCENT,
                fontWeight: 700,
                px: 3.5, py: 1.1,
                fontSize: "0.9rem",
                textTransform: "none",
                "&:hover": {
                  borderColor: "#BF5B2E",
                  backgroundColor: `${ACCENT}0E`,
                },
              }}
            >
              สุ่มลำดับ
            </Button>
          </Box>

          {/* Reorderable list */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            sx={{
              backgroundColor: CARD_BG,
              borderRadius: 3,
              p: 2,
              boxShadow: "0 4px 24px rgba(100,70,30,0.09)",
              border: "1px solid rgba(180,155,120,0.18)",
              mb: 2.5,
            }}
          >
            <Reorder.Group
              axis="y"
              values={turnOrder}
              onReorder={setTurnOrder}
              style={{ listStyle: "none", padding: 0, margin: 0 }}
            >
              <AnimatePresence initial={false}>
                {turnOrder.map((id, index) => {
                  const player = players.find((p) => p.id === id);
                  if (!player) return null;
                  const char = CHARACTERS.find((c) => c.id === player.characterId) ?? CHARACTERS[0];
                  const roleColor = getRoleColor(player.role);

                  return (
                    <Reorder.Item
                      key={id}
                      value={id}
                      style={{ marginBottom: index < turnOrder.length - 1 ? 10 : 0 }}
                    >
                      <Box
                        component={motion.div}
                        layout
                        whileDrag={{
                          scale: 1.03,
                          boxShadow: "0 12px 36px rgba(78,123,94,0.22)",
                          zIndex: 10,
                        }}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          p: 1.5,
                          borderRadius: 3,
                          backgroundColor: "#FDFAF5",
                          border: `1.5px solid rgba(180,155,120,0.2)`,
                          cursor: "grab",
                          userSelect: "none",
                          "&:active": { cursor: "grabbing" },
                          transition: "border-color 0.15s, box-shadow 0.15s",
                          "&:hover": {
                            borderColor: `${char.baseColor}55`,
                            boxShadow: `0 3px 14px ${char.baseColor}18`,
                          },
                        }}
                      >
                        {/* Drag handle */}
                        <DragIndicatorRoundedIcon
                          sx={{ color: "#C8BAA8", fontSize: "1.2rem", flexShrink: 0 }}
                        />

                        {/* Order badge */}
                        <Box
                          sx={{
                            width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                            background: `linear-gradient(135deg, ${char.baseColor}, ${char.baseColor}BB)`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "white", fontWeight: 800, fontSize: "0.95rem",
                            boxShadow: `0 3px 10px ${char.baseColor}44`,
                          }}
                        >
                          {index + 1}
                        </Box>

                        {/* Character image */}
                        <Box sx={{ width: 46, height: 56, position: "relative", flexShrink: 0 }}>
                          <Image
                            src={char.image}
                            alt={char.name}
                            fill
                            style={{ objectFit: "contain" }}
                          />
                        </Box>

                        {/* Player info */}
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            fontWeight={800}
                            noWrap
                            sx={{ color: "#2C2218", fontSize: "0.98rem", lineHeight: 1.3 }}
                          >
                            {player.name}
                          </Typography>
                          <Box
                            sx={{
                              display: "inline-flex", alignItems: "center", gap: 0.5,
                              mt: 0.4,
                              backgroundColor: `${roleColor}14`,
                              color: roleColor,
                              borderRadius: 1.5, px: 0.9, py: 0.2,
                            }}
                          >
                            {getRoleIcon(player.role)}
                            <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, lineHeight: 1 }}>
                              {getRoleLabel(player.role)}
                            </Typography>
                          </Box>
                        </Box>

                        {/* First indicator */}
                        {index === 0 && (
                          <Chip
                            label="เริ่มก่อน"
                            size="small"
                            sx={{
                              backgroundColor: `${PRIMARY}18`,
                              color: PRIMARY,
                              fontWeight: 700,
                              fontSize: "0.65rem",
                              height: 22,
                              flexShrink: 0,
                              "& .MuiChip-label": { px: 1 },
                            }}
                          />
                        )}
                      </Box>
                    </Reorder.Item>
                  );
                })}
              </AnimatePresence>
            </Reorder.Group>
          </Box>

          {/* Hint */}
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="caption" sx={{ color: "#B0A090" }}>
              กดค้างแล้วลากเพื่อเปลี่ยนลำดับ
            </Typography>
          </Box>

        </Container>

        {/* Sticky Start button */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          sx={{
            position: "fixed", bottom: 64, left: 0, right: 0,
            px: 3, pb: 2, pt: 1.5,
            background: "linear-gradient(180deg,transparent 0%,rgba(250,245,236,0.97) 28%)",
          }}
        >
          <Box sx={{ maxWidth: 600, mx: "auto" }}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleStart}
              endIcon={<ArrowForwardRoundedIcon />}
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
