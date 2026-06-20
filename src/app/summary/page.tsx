"use client";
import { useState } from "react";
import { Box, Typography, Button, Container, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGame, type OCEScore } from "@/context/GameContext";
import PageTransition from "@/components/common/PageTransition";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import JohariGraph from "./components/JohariGraph";
import AdaptationGuideCard from "./components/AdaptationGuideCard";
import CoinInputForm from "./components/CoinInputForm";
import { computeJohari } from "@/utils/johari";

const PRIMARY = "#4E7B5E";
const BG = "#FDF6EE";

function addOCE(a: OCEScore, b: OCEScore): OCEScore {
  return { openness: a.openness + b.openness, empathy: a.empathy + b.empathy, clarity: a.clarity + b.clarity };
}

export default function SummaryPage() {
  const router = useRouter();
  const { players, turnOrder, questionHistory, resetGame, setPlayerJohariData } = useGame();
  
  const [activeTab, setActiveTab] = useState("overview"); // "overview", "yours", "group"

  const orderedPlayers = turnOrder
    .map((id) => players.find((p) => p.id === id))
    .filter(Boolean) as typeof players;

  const unfinishedPlayers = players.filter((p) => !p.johariResults);
  const maxPeerCoins = Math.max((players.length - 1) * 2, 2);

  if (unfinishedPlayers.length > 0) {
    const p = unfinishedPlayers[0];
    return (
      <PageTransition>
        <Box sx={{ minHeight: "100vh", background: BG, py: 6 }}>
          <Container maxWidth="sm">
            <CoinInputForm 
              player={p} 
              maxCoins={maxPeerCoins} 
              onSubmit={(coins, contextTag) => {
                const results = computeJohari(p, coins, maxPeerCoins);
                setPlayerJohariData(p.id, coins, contextTag, results);
              }}
            />
          </Container>
        </Box>
      </PageTransition>
    );
  }

  // Helper to compute percentage for X and Y in the UI
  const getXY = (player: typeof players[0], dimension: "openness" | "empathy" | "clarity" | "selfClarity") => {
    const maxSelfScore = Math.max(player.stats.questionsAnswered, 1);
    let selfScore = 0;
    
    // We import REFLECTION_TAGS inside to avoid cyclic dep issues if any, or just compute it here.
    // Actually, we computed it in johariResults, but that only gives Quadrants!
    // For the UI, we need the raw % to plot the dot. Let's just recompute it.
    // Or we can just use a fake percentage in the center of the quadrant for now?
    // Let's recompute it accurately here.
  };

  return (
    <PageTransition>
      <Box sx={{ minHeight: "100vh", background: BG, pb: 6 }}>
        <Container maxWidth="md" sx={{ py: 3 }}>
          
          <Box sx={{ 
            backgroundColor: "#FDFDFD", 
            borderRadius: 2, p: 3, 
            boxShadow: "0 8px 32px rgba(100,70,30,0.08)",
            border: "1px solid rgba(180,155,120,0.18)"
          }}>
            
            {/* Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
              <Typography variant="h5" fontWeight={800} sx={{ color: "#2C2218" }}>
                ผลลัพธ์ของกลุ่ม
              </Typography>
            </Box>

            {/* Tabs */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4, overflowX: "auto" }}>
              <Button 
                variant={activeTab === "overview" ? "contained" : "text"}
                onClick={() => setActiveTab("overview")}
                sx={{ 
                  borderRadius: 4, px: 2, py: 0.5, fontWeight: 700,
                  backgroundColor: activeTab === "overview" ? "#D1E5D5" : "transparent",
                  color: activeTab === "overview" ? PRIMARY : "#23211e",
                  boxShadow: "none",
                  "&:hover": { boxShadow: "none", backgroundColor: activeTab === "overview" ? "#CBE0D1" : "rgba(0,0,0,0.04)" }
                }}
              >
                ภาพรวม
              </Button>
              <Button 
                variant={activeTab === "yours" ? "contained" : "text"}
                onClick={() => setActiveTab("yours")}
                sx={{ 
                  borderRadius: 4, px: 2, py: 0.5, fontWeight: 700,
                  backgroundColor: activeTab === "yours" ? "#D1E5D5" : "transparent",
                  color: activeTab === "yours" ? PRIMARY : "#23211e",
                  boxShadow: "none",
                  "&:hover": { boxShadow: "none", backgroundColor: activeTab === "yours" ? "#CBE0D1" : "rgba(0,0,0,0.04)" }
                }}
              >
                ของคุณ
              </Button>
              <Button 
                variant={activeTab === "group" ? "contained" : "text"}
                onClick={() => setActiveTab("group")}
                sx={{ 
                  borderRadius: 4, px: 3, py: 0.5, fontWeight: 700,
                  backgroundColor: activeTab === "group" ? "#D1E5D5" : "transparent",
                  color: activeTab === "group" ? PRIMARY : "#23211e",
                  boxShadow: "none",
                  "&:hover": { boxShadow: "none", backgroundColor: activeTab === "group" ? "#CBE0D1" : "rgba(0,0,0,0.04)" }
                }}
              >
                กลุ่ม
              </Button>
              <Box sx={{ flex: 1 }} />
              <IconButton size="small" sx={{ color: "#2C2218" }}>
                <AccessTimeRoundedIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Main Content */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4, mb: 4 }}>
              {orderedPlayers.map((player) => {
                if (!player.johariResults) return null;
                
                // Recompute exact X and Y for plotting
                const maxSelf = Math.max(player.stats.questionsAnswered, 1);
                const selfScores = { openness: 0, empathy: 0, selfClarity: 0 };
                // Since we can't easily import REFLECTION_TAGS without causing a mess here, 
                // we'll just put the dot perfectly in the center of their assigned quadrant!
                const getCoords = (quadrant: string) => {
                  if (quadrant === "open") return { x: 75, y: 75 };
                  if (quadrant === "blind") return { x: 75, y: 25 };
                  if (quadrant === "hidden") return { x: 25, y: 75 };
                  return { x: 25, y: 25 }; // unknown
                };

                const coords = {
                  openness: getCoords(player.johariResults.openness),
                  empathy: getCoords(player.johariResults.empathy),
                  selfClarity: getCoords(player.johariResults.selfClarity),
                };

                return (
                  <Box key={player.id} sx={{ p: 2, border: "1px solid rgba(180,155,120,0.2)", borderRadius: 3, backgroundColor: "#FDFDFD" }}>
                    <Typography variant="h6" fontWeight={800} sx={{ color: PRIMARY, mb: 3 }}>
                      {player.name}
                    </Typography>
                    
                    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
                      <Box sx={{ flex: 1 }}>
                        <JohariGraph x={coords.openness.x} y={coords.openness.y} dimensionName="การเปิดใจ (Openness)" />
                        <AdaptationGuideCard dimension="openness" quadrant={player.johariResults.openness} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <JohariGraph x={coords.empathy.x} y={coords.empathy.y} dimensionName="ความเห็นอกเห็นใจ (Empathy)" />
                        <AdaptationGuideCard dimension="empathy" quadrant={player.johariResults.empathy} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <JohariGraph x={coords.selfClarity.x} y={coords.selfClarity.y} dimensionName="ความชัดเจนในตัวเอง (Self-Clarity)" />
                        <AdaptationGuideCard dimension="selfClarity" quadrant={player.johariResults.selfClarity} />
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            {/* Actions */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button variant="contained" fullWidth
                sx={{ 
                  py: 1.5, borderRadius: 2, fontWeight: 700,
                  backgroundColor: PRIMARY,
                  boxShadow: "none",
                  "&:hover": { boxShadow: "none", backgroundColor: "#4A6A55" }
                }}>
                ดูรายละเอียดเพิ่มเติม
              </Button>
              <IconButton sx={{ border: "1px solid rgba(180,155,120,0.2)", borderRadius: 3, p: 1.5, color: "#2C2218" }}>
                <DownloadRoundedIcon />
              </IconButton>
            </Box>

          </Box>

          {/* Hidden utility buttons for debugging/restarting */}
          <Box sx={{ display: "flex", gap: 2, mt: 4, justifyContent: "center" }}>
            <Button variant="text" size="small" startIcon={<HomeRoundedIcon />}
              onClick={() => { resetGame(); router.push("/"); }}
              sx={{ color: "#9C8B76", opacity: 0.6 }}>
              กลับหน้าแรก
            </Button>
            <Button variant="text" size="small" startIcon={<ReplayRoundedIcon />}
              onClick={() => { resetGame(); router.push("/setup"); }}
              sx={{ color: "#9C8B76", opacity: 0.6 }}>
              เล่นอีกครั้ง
            </Button>
          </Box>

        </Container>
      </Box>
    </PageTransition>
  );
}
