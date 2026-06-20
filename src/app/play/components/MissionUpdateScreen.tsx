"use client";
import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useGame } from "@/context/GameContext";
import { MISSION_ICON_META } from "@/data/missions";

const BG_CARD = "#FFFFFF";
const PRIMARY = "#4E7B5E";

interface Props {
  onNext: () => void;
  targetPlayerId?: string; // Optional: if we want to show a specific player's progress (e.g. Pass The Heart)
  earnedCoins?: number;
}

export default function MissionUpdateScreen({ onNext, targetPlayerId, earnedCoins = 0 }: Props) {
  const { players, getCurrentPlayer } = useGame();
  
  // Use targetPlayerId if provided, otherwise default to current player
  const player = targetPlayerId 
    ? players.find(p => p.id === targetPlayerId) 
    : getCurrentPlayer();

  const missions = player?.missions ?? [];

  return (
    <motion.div key="mission_update" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography fontWeight={800} sx={{ color: PRIMARY, fontSize: "1.2rem", mb: 0.5 }}>
          อัปเดตความคืบหน้า
        </Typography>
        <Typography fontWeight={700} sx={{ color: "#7A6248", fontSize: "0.95rem" }}>
          ภารกิจของ {player?.name}
        </Typography>
      </Box>

      {/* Mission List */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
        {missions.map((m, mIdx) => {
          const isComplete = m.goals.every((g) => g.progress >= g.target);
          const primaryType = m.goals[0]?.type ?? "life-event";
          const meta = MISSION_ICON_META[primaryType];
          const IconComponent = meta.Icon;

          return (
            <Box key={m.missionId} 
              component={motion.div}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (mIdx * 0.1), duration: 0.4 }}
              sx={{
                backgroundColor: BG_CARD, borderRadius: 1, p: 2,
                boxShadow: "0 4px 16px rgba(100,70,30,0.06)",
                border: isComplete ? `2px solid ${PRIMARY}60` : "1px solid rgba(180,155,120,0.18)",
                display: "flex", alignItems: "center", gap: 2,
              }}
            >
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
                        <Box 
                          component={motion.div}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ delay: 0.5 + (mIdx * 0.1), duration: 0.8, ease: "easeOut" }}
                          sx={{
                            height: "100%",
                            backgroundColor: goalComplete ? PRIMARY : goalMeta.iconColor,
                            borderRadius: 2,
                          }} 
                        />
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

      {/* Heart Coins Notification */}
      {earnedCoins !== 0 && (
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          sx={{
            backgroundColor: earnedCoins > 0 ? "#E6F5EC" : "#FCE8E8",
            border: `2px solid ${earnedCoins > 0 ? PRIMARY : "#D45B5B"}`,
            borderRadius: 3, p: 2, mb: 4, textAlign: "center",
          }}
        >
          <Typography fontWeight={800} sx={{ color: earnedCoins > 0 ? PRIMARY : "#D45B5B", fontSize: "1.05rem" }}>
            {earnedCoins > 0 ? `ยินดีด้วย! คุณได้รับ +${earnedCoins} Heart Coin!` : `คุณสูญเสีย ${Math.abs(earnedCoins)} Heart Coin`}
          </Typography>
        </Box>
      )}

      {/* Action Button */}
      <Button variant="contained" fullWidth onClick={onNext}
        component={motion.button} 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        whileTap={{ scale: 0.97 }}
        sx={{
          py: 1.85, borderRadius: 4, fontWeight: 800, fontSize: "1.1rem",
          background: `linear-gradient(135deg, ${PRIMARY}, #7AA880)`,
          boxShadow: `0 6px 20px ${PRIMARY}40`,
          textTransform: "none",
        }}>
        จบเทิร์น
      </Button>

    </motion.div>
  );
}
