"use client";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { OCE_META, type OCEScore } from "@/context/GameContext";

const PRIMARY = "#5A7A65";

interface Props {
  oceScore: OCEScore;
  adjustScore: (key: keyof OCEScore, delta: number) => void;
  onSave: () => void;
}

export default function ScoreScreen({ oceScore, adjustScore, onSave }: Props) {
  return (
    <motion.div key="score" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>

      <Box sx={{
        backgroundColor: "#fff", borderRadius: 4, p: 3,
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)", mb: 2,
      }}>
        <Typography fontWeight={700} sx={{ color: "#1F2937", fontSize: "1.05rem", mb: 0.25 }}>
          นับเหรียญแล้ว กรอกคะแนนของคุณ
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          คะแนนสูงสุด: 0 – 6
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          {(Object.entries(OCE_META) as [keyof OCEScore, typeof OCE_META[keyof typeof OCE_META]][]).map(([key, m]) => (
            <Box key={key} sx={{
              display: "flex", alignItems: "center", gap: 2,
              backgroundColor: m.bg, borderRadius: 3, p: 2,
              border: `1.5px solid ${m.color}40`,
            }}>
              <Box sx={{
                width: 44, height: 44, borderRadius: "50%",
                backgroundColor: m.color + "22",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.4rem", flexShrink: 0,
              }}>
                {m.icon}
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight={700} sx={{ color: m.color }}>
                  {m.label}
                </Typography>
                <Typography variant="caption" color="text.secondary">{m.labelEn}</Typography>
              </Box>

              {/* − / score / + */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <ScoreBtn label="−" onClick={() => adjustScore(key, -1)} disabled={oceScore[key] <= 0} color={m.color} />
                <Box sx={{
                  width: 40, height: 40, borderRadius: 2,
                  backgroundColor: "#fff", border: `2px solid ${m.color}60`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Typography fontWeight={800} sx={{ fontSize: "1.3rem", color: m.color }}>
                    {oceScore[key]}
                  </Typography>
                </Box>
                <ScoreBtn label="+" onClick={() => adjustScore(key, 1)} disabled={oceScore[key] >= 6} color={m.color} />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Button variant="contained" fullWidth onClick={onSave}
        sx={{
          py: 1.75, borderRadius: 3, fontWeight: 700, fontSize: "1rem",
          background: `linear-gradient(135deg, ${PRIMARY}, #7AA880)`,
          boxShadow: `0 4px 16px ${PRIMARY}40`,
        }}>
        บันทึกผลเทิร์นนี้ →
      </Button>
    </motion.div>
  );
}

function ScoreBtn({ label, onClick, disabled, color }: {
  label: string; onClick: () => void; disabled: boolean; color: string;
}) {
  return (
    <Box
      component={motion.div}
      whileTap={disabled ? {} : { scale: 0.88 }}
      onClick={disabled ? undefined : onClick}
      sx={{
        width: 36, height: 36, borderRadius: "50%", cursor: disabled ? "default" : "pointer",
        backgroundColor: disabled ? "#E5E7EB" : color,
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: disabled ? 0.4 : 1,
        boxShadow: disabled ? "none" : `0 2px 8px ${color}50`,
        transition: "all 0.2s",
      }}
    >
      <Typography fontWeight={800} sx={{ color: "white", fontSize: "1.15rem", lineHeight: 1 }}>
        {label}
      </Typography>
    </Box>
  );
}
