"use client";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useGame } from "@/context/GameContext";
import { MISSION_ICON_META } from "@/data/missions";

const BG_CARD = "#FFFFFF";
const PRIMARY = "#4E7B5E";

interface Props {
  onBack: () => void;
  onUnlock: () => void;
  onNotReady: () => void;
}

export default function MissionGateProgressScreen({ onBack, onUnlock, onNotReady }: Props) {
  const { getCurrentPlayer, checkAllMissionsComplete } = useGame();
  const currentPlayer = getCurrentPlayer();

  const missions = currentPlayer?.missions ?? [];
  const allComplete = currentPlayer ? checkAllMissionsComplete(currentPlayer.id) : false;

  const handleCheck = () => {
    if (allComplete) {
      onUnlock();
    } else {
      onNotReady();
    }
  };

  return (
    <motion.div key="mission_gate_progress" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>

      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton onClick={onBack} sx={{ color: "#2C2218" }}>
          <ArrowBackRoundedIcon />
        </IconButton>
        <Typography fontWeight={800} sx={{ flex: 1, textAlign: "center", color: "#2C2218", fontSize: "1.15rem", mr: 5 }}>
          ภารกิจของคุณ
        </Typography>
      </Box>

      {/* Player name */}
      {currentPlayer && (
        <Typography fontWeight={700} sx={{ textAlign: "center", color: "#7A6248", fontSize: "0.9rem", mb: 2.5 }}>
          {currentPlayer.name}
        </Typography>
      )}

      {/* Mission List */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
        {missions.map((m) => {
          const isComplete = m.goals.every((g) => g.progress >= g.target);
          const primaryType = m.goals[0]?.type ?? "life-event";
          const meta = MISSION_ICON_META[primaryType];
          const IconComponent = meta.Icon;

          return (
            <Box key={m.missionId} sx={{
              backgroundColor: BG_CARD, borderRadius: 1, p: 2,
              boxShadow: "0 2px 12px rgba(100,70,30,0.06)",
              border: isComplete ? `2px solid ${PRIMARY}60` : "1px solid rgba(180,155,120,0.18)",
              display: "flex", alignItems: "center", gap: 2,
            }}>
              {/* Icon */}
              <Box sx={{
                width: 48, height: 48, borderRadius: "50%",
                backgroundColor: isComplete ? `${PRIMARY}18` : meta.iconBg,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                {isComplete ? (
                  <CheckCircleRoundedIcon sx={{ color: PRIMARY, fontSize: "1.5rem" }} />
                ) : (
                  <IconComponent sx={{ color: meta.iconColor, fontSize: "1.5rem" }} />
                )}
              </Box>

              {/* Details */}
              <Box sx={{ flex: 1 }}>
                <Typography fontWeight={800} sx={{ color: "#2C2218", fontSize: "0.95rem", mb: 0.5 }}>
                  {m.label}
                </Typography>

                {/* Progress bars for each goal */}
                {m.goals.map((g, gi) => {
                  const goalComplete = g.progress >= g.target;
                  const pct = Math.min(100, (g.progress / g.target) * 100);
                  const goalMeta = MISSION_ICON_META[g.type];

                  return (
                    <Box key={gi} sx={{ display: "flex", alignItems: "center", gap: 2, mb: 0.3 }}>
                      <Box sx={{ flex: 1, height: 8, backgroundColor: "#E5E7EB", borderRadius: 2, overflow: "hidden" }}>
                        <Box sx={{
                          width: `${pct}%`, height: "100%",
                          backgroundColor: goalComplete ? PRIMARY : goalMeta.iconColor,
                          borderRadius: 2, transition: "width 0.4s ease",
                        }} />
                      </Box>
                      <Typography fontWeight={800} sx={{
                        color: goalComplete ? PRIMARY : "#2C2218",
                        fontSize: "0.85rem", minWidth: 50, textAlign: "right",
                      }}>
                        {goalComplete ? "สำเร็จ!" : `${g.progress}/${g.target}`}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Status message */}
      <Box sx={{
        textAlign: "center", mb: 3, p: 2, borderRadius: 3,
        backgroundColor: allComplete ? `${PRIMARY}12` : "#FFF5E6",
        border: `1.5px solid ${allComplete ? `${PRIMARY}30` : "#F0D6A0"}`,
      }}>
        <Typography fontWeight={700} sx={{ color: allComplete ? PRIMARY : "#8B6914", fontSize: "0.95rem" }}>
          {allComplete
            ? "ภารกิจครบทั้ง 3 ใบแล้ว! พร้อมปลดล็อกประตู"
            : "ยังทำภารกิจไม่ครบ! คุณต้องข้ามเทิร์นนี้ไป"
          }
        </Typography>
      </Box>

      {/* Action Button */}
      <Button variant="contained" fullWidth onClick={handleCheck}
        component={motion.button} whileTap={{ scale: 0.97 }}
        sx={{
          py: 1.85, borderRadius: 4, fontWeight: 800, fontSize: "1.1rem",
          background: allComplete
            ? `linear-gradient(135deg, ${PRIMARY}, #7AA880)`
            : "linear-gradient(135deg, #9C8B76, #B0A090)",
          boxShadow: allComplete ? `0 6px 20px ${PRIMARY}40` : "0 4px 12px rgba(0,0,0,0.1)",
          textTransform: "none",
        }}>
        {allComplete ? "ปลดล็อกประตู" : "จบเทิร์น"}
      </Button>

    </motion.div>
  );
}
