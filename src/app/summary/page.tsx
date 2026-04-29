"use client";
import { Box, Typography, Button, Container, Card, CardContent, LinearProgress } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGame, CHARACTERS, OCE_META, type OCEScore } from "@/context/GameContext";
import PageTransition from "@/components/common/PageTransition";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";

const PRIMARY = "#5A7A65";
const MAX_PER_TURN = 6;

function addOCE(a: OCEScore, b: OCEScore): OCEScore {
  return { openness: a.openness + b.openness, empathy: a.empathy + b.empathy, clarity: a.clarity + b.clarity };
}

export default function SummaryPage() {
  const router = useRouter();
  const { players, turnOrder, questionHistory, resetGame } = useGame();

  const orderedPlayers = turnOrder
    .map((id) => players.find((p) => p.id === id))
    .filter(Boolean) as typeof players;

  const totalTurns = questionHistory.length;

  // Group OCE totals by player
  const playerOCE = (playerId: string): OCEScore => {
    return questionHistory
      .filter((r) => r.playerId === playerId)
      .reduce((acc, r) => addOCE(acc, r.oceScore), { openness: 0, empathy: 0, clarity: 0 });
  };

  // Overall OCE
  const totalOCE = orderedPlayers.reduce((acc, p) => addOCE(acc, playerOCE(p.id)), { openness: 0, empathy: 0, clarity: 0 });

  return (
    <PageTransition>
      <Box sx={{ minHeight: "100vh", background: "#FDF6EE", pb: 8 }}>
        <Container maxWidth="sm" sx={{ py: 4 }}>

          {/* Header */}
          <Box component={motion.div} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h4" fontWeight={800} sx={{ color: PRIMARY, mb: 0.5 }}>
              🎉 สรุปผลการเล่น
            </Typography>
            <Typography variant="body2" color="text.secondary">
              เล่นไปทั้งหมด {totalTurns} เทิร์น
            </Typography>
          </Box>

          {/* Overall OEC Card */}
          <Box component={motion.div} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            sx={{ backgroundColor: "#fff", borderRadius: 4, p: 3, mb: 3,
              boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
            <Typography fontWeight={700} sx={{ color: PRIMARY, mb: 2 }}>✨ คะแนนรวมกลุ่ม</Typography>
            {(Object.entries(OCE_META) as [keyof OCEScore, typeof OCE_META[keyof typeof OCE_META]][]).map(([key, m]) => {
              const val = totalOCE[key];
              const maxVal = Math.max(totalTurns * MAX_PER_TURN, 1);
              return (
                <Box key={key} sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                      <Typography>{m.icon}</Typography>
                      <Typography variant="body2" fontWeight={600}>{m.label}</Typography>
                    </Box>
                    <Typography variant="body2" fontWeight={700} sx={{ color: m.color }}>
                      {val} / {maxVal}
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={Math.round((val / maxVal) * 100)}
                    sx={{ height: 10, borderRadius: 5, backgroundColor: m.bg,
                      "& .MuiLinearProgress-bar": { background: `linear-gradient(90deg,${m.color}88,${m.color})`, borderRadius: 5 } }} />
                </Box>
              );
            })}
          </Box>

          {/* Per-player cards */}
          <Typography variant="h6" fontWeight={700} sx={{ color: PRIMARY, mb: 2 }}>👥 ผู้เล่นทั้งหมด</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
            {orderedPlayers.map((player, i) => {
              const pChar = CHARACTERS.find((c) => c.id === player.characterId);
              const oce = playerOCE(player.id);
              const turns = questionHistory.filter((r) => r.playerId === player.id).length;
              const maxVal = Math.max(turns * MAX_PER_TURN, 1);
              const topKey = (Object.keys(oce) as (keyof OCEScore)[])
                .sort((a, b) => oce[b] - oce[a])[0];
              const topMeta = OCE_META[topKey];

              return (
                <Card key={player.id} component={motion.div}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  sx={{ borderRadius: 4, overflow: "hidden", border: `1.5px solid ${pChar?.baseColor ?? PRIMARY}22` }}>
                  <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                      <Box sx={{ width: 52, height: 68, position: "relative", flexShrink: 0 }}>
                        {pChar && <Image src={pChar.image} alt={pChar.name} fill style={{ objectFit: "contain" }} />}
                      </Box>
                      <Box>
                        <Typography fontWeight={700} sx={{ color: pChar?.baseColor ?? PRIMARY }}>
                          {player.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {player.role === "parent" ? "ผู้ปกครอง" : "ลูก"} · {turns} เทิร์น
                        </Typography>
                        {topMeta && (
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.25 }}>
                            <Typography variant="caption">{topMeta.icon}</Typography>
                            <Typography variant="caption" fontWeight={600} sx={{ color: topMeta.color }}>
                              เด่นด้าน: {topMeta.label}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>

                    {/* Mini OEC bars */}
                    {(Object.entries(OCE_META) as [keyof OCEScore, typeof OCE_META[keyof typeof OCE_META]][]).map(([key, m]) => (
                      <Box key={key} sx={{ mb: 1 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.25 }}>
                          <Typography variant="caption" sx={{ color: m.color }}>{m.icon} {m.labelEn}</Typography>
                          <Typography variant="caption" fontWeight={700} sx={{ color: m.color }}>{oce[key]}/{maxVal}</Typography>
                        </Box>
                        <LinearProgress variant="determinate"
                          value={Math.round((oce[key] / maxVal) * 100)}
                          sx={{ height: 6, borderRadius: 3, backgroundColor: m.bg,
                            "& .MuiLinearProgress-bar": { backgroundColor: m.color, borderRadius: 3 } }} />
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </Box>

          {/* Reflection tags summary */}
          <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            sx={{ backgroundColor: "#fff", borderRadius: 4, p: 3, mb: 4,
              boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
            <Typography fontWeight={700} sx={{ color: PRIMARY, mb: 2 }}>🏷️ แท็กที่เลือกบ่อย</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {(() => {
                const tagCounts: Record<string, number> = {};
                questionHistory.forEach((r) => {
                  if (r.selfReflectionTag) {
                    tagCounts[r.selfReflectionTag] = (tagCounts[r.selfReflectionTag] ?? 0) + 1;
                  }
                });
                return Object.entries(tagCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([tag, count]) => (
                    <Box key={tag} sx={{
                      backgroundColor: "#EAF7EE", borderRadius: 5, px: 1.5, py: 0.5,
                      border: `1px solid ${PRIMARY}40`,
                      display: "flex", alignItems: "center", gap: 0.5,
                    }}>
                      <Typography variant="caption" fontWeight={700} sx={{ color: PRIMARY }}>{tag}</Typography>
                      <Typography variant="caption" sx={{ color: "#6B7280" }}>×{count}</Typography>
                    </Box>
                  ));
              })()}
            </Box>
          </Box>

          {/* Actions */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="outlined" fullWidth startIcon={<HomeRoundedIcon />}
              onClick={() => { resetGame(); router.push("/"); }}
              sx={{ py: 1.5, borderRadius: 4, borderColor: PRIMARY, color: PRIMARY }}>
              กลับหน้าแรก
            </Button>
            <Button variant="contained" fullWidth startIcon={<ReplayRoundedIcon />}
              onClick={() => { resetGame(); router.push("/setup"); }}
              sx={{ py: 1.5, borderRadius: 4, background: `linear-gradient(135deg,${PRIMARY},#7AA880)` }}>
              เล่นอีกครั้ง
            </Button>
          </Box>
        </Container>
      </Box>
    </PageTransition>
  );
}
