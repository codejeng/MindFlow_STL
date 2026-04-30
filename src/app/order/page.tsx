"use client";

import { Box, Typography, Button, Container } from "@mui/material";
import Image from "next/image";
import { motion, Reorder } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGame, CHARACTERS } from "@/context/GameContext";
import PageTransition from "@/components/common/PageTransition";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import DragIndicatorRoundedIcon from "@mui/icons-material/DragIndicatorRounded";
import PersonIcon from "@mui/icons-material/Person";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import GroupIcon from "@mui/icons-material/Group";

export default function OrderPage() {
  const router = useRouter();
  const { players, turnOrder, setTurnOrder, randomizeTurnOrder, setGamePhase, setGameStartTime } = useGame();

  const handleStart = () => {
    setGameStartTime(Date.now());
    setGamePhase("playing");
    router.push("/play");
  };

  return (
    <PageTransition>
      <Container maxWidth="sm" sx={{ py: 4, minHeight: "100vh" }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" fontWeight={600} sx={{ color: "#1B7B7E", mb: 1 }}>
            ลำดับการเล่น
          </Typography>
          <Typography variant="body1" color="text.secondary">
            ลากเพื่อจัดลำดับ หรือกดสุ่ม
          </Typography>
        </Box>

        {/* Shuffle button */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Button
            variant="outlined"
            startIcon={<ShuffleRoundedIcon />}
            onClick={randomizeTurnOrder}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95, rotate: 180 }}
            sx={{
              borderRadius: 6, borderColor: "#E8A838", color: "#E8A838",
              fontWeight: 600, px: 3,
              "&:hover": { borderColor: "#D4972E", backgroundColor: "#FFF8E1" },
            }}
          >
            🎲 สุ่มลำดับ
          </Button>
        </Box>

        {/* Reorderable list */}
        <Reorder.Group axis="y" values={turnOrder} onReorder={setTurnOrder}
          style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {turnOrder.map((id, index) => {
            const player = players.find((p) => p.id === id);
            if (!player) return null;
            const char = CHARACTERS.find((c) => c.id === player.characterId) ?? CHARACTERS[0];

            return (
              <Reorder.Item key={id} value={id} style={{ marginBottom: 12 }}>
                <Box
                  component={motion.div}
                  whileHover={{ scale: 1.02 }}
                  whileDrag={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
                  sx={{
                    display: "flex", alignItems: "center", gap: 2, p: 2,
                    borderRadius: 3, backgroundColor: "white",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                    cursor: "grab", userSelect: "none",
                    border: "2px solid transparent",
                    "&:hover": { borderColor: char.baseColor + "44" },
                  }}
                >
                  <DragIndicatorRoundedIcon sx={{ color: "#CCC", fontSize: 20 }} />

                  {/* Number badge */}
                  <Box sx={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${char.baseColor}, ${char.baseColor}88)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "white", fontWeight: 700, fontSize: "1.2rem", flexShrink: 0,
                  }}>
                    {index + 1}
                  </Box>

                  {/* Character image */}
                  <Box sx={{ width: 48, height: 60, position: "relative", flexShrink: 0 }}>
                    <Image src={char.image} alt={char.name} fill style={{ objectFit: "contain" }} />
                  </Box>

                  {/* Info */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="h6" fontWeight={600} noWrap sx={{ color: char.baseColor }}>
                      {player.name}
                    </Typography>
                    <Box sx={{
                      display: "inline-flex", alignItems: "center", gap: 0.5,
                      backgroundColor: player.role === "parent" ? "#E8F5E9" : player.role === "child" ? "#FFF3E0" : "#F3E5F5",
                      color: player.role === "parent" ? "#2E7D32" : player.role === "child" ? "#E65100" : "#7B1FA2",
                      borderRadius: 1.5, px: 1, py: 0.25, fontSize: "0.75rem", fontWeight: 500,
                    }}>
                      {player.role === "parent" ? <PersonIcon sx={{ fontSize: 14 }} /> : player.role === "child" ? <ChildCareIcon sx={{ fontSize: 14 }} /> : <GroupIcon sx={{ fontSize: 14 }} />}
                      {player.role === "parent" ? "ผู้ปกครอง" : player.role === "child" ? "ลูก" : "เพื่อน"}
                    </Box>
                  </Box>
                </Box>
              </Reorder.Item>
            );
          })}
        </Reorder.Group>

        {/* Bottom buttons */}
        <Box sx={{ display: "flex", gap: 2, mt: 4, position: "sticky", bottom: 16, zIndex: 10 }}>
          <Button variant="outlined" onClick={() => router.push("/setup")} startIcon={<ArrowBackRoundedIcon />}
            sx={{ flex: 1, py: 1.5, borderRadius: 4, borderColor: "#CCC", color: "text.secondary" }}>
            กลับ
          </Button>
          <Button variant="contained" color="primary" onClick={handleStart}
            endIcon={<ArrowForwardRoundedIcon />} sx={{ flex: 2, py: 1.5, fontSize: "1.1rem" }}>
            เริ่มเล่น!
          </Button>
        </Box>
      </Container>
    </PageTransition>
  );
}
