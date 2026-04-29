"use client";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import { OCE_META, type OCEScore, type CharacterDef } from "@/context/GameContext";
import { REFLECTION_TAGS } from "@/constants/reflectionTags";

const PRIMARY = "#5A7A65";
const MAX = 6;

interface Props {
  playerName: string;
  char?: CharacterDef;
  charColor: string;
  oceScore: OCEScore;
  selectedTag: string | null;
  onNext: () => void;
}

export default function TurnSummaryScreen({ playerName, char, charColor, oceScore, selectedTag, onNext }: Props) {
  const tag = REFLECTION_TAGS.find((t) => t.id === selectedTag);

  return (
    <motion.div key="summary" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

      <Box sx={{
        backgroundColor: "#fff", borderRadius: 4, p: 3,
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)", mb: 2, textAlign: "center",
      }}>
        <Typography fontWeight={700} sx={{ color: PRIMARY, fontSize: "1.15rem", mb: 2 }}>
          สรุปผลเทิร์นนี้
        </Typography>

        {/* Character */}
        <Box component={motion.div} animate={{ y: [0, -6, 0] }} transition={{ duration: 2, repeat: Infinity }}
          sx={{ width: 90, height: 112, mx: "auto", mb: 1, position: "relative" }}>
          {char && <Image src={char.image} alt={char.name} fill style={{ objectFit: "contain" }} />}
        </Box>

        <Typography fontWeight={700} sx={{ color: charColor, fontSize: "1.1rem", mb: 0.5 }}>
          {playerName}
        </Typography>

        {tag && (
          <Box sx={{
            display: "inline-flex", alignItems: "center", gap: 0.75,
            backgroundColor: tag.bg, borderRadius: 5, px: 2, py: 0.5, mb: 2.5,
            border: `1.5px solid ${tag.color}50`,
          }}>
            <Typography sx={{ fontSize: "0.9rem" }}>{tag.emoji}</Typography>
            <Typography variant="body2" fontWeight={600} sx={{ color: tag.color }}>{tag.label}</Typography>
          </Box>
        )}

        {/* OEC Score badges */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 1 }}>
          {(Object.entries(OCE_META) as [keyof OCEScore, typeof OCE_META[keyof typeof OCE_META]][]).map(([key, m]) => (
            <Box key={key} sx={{ textAlign: "center" }}>
              <Box sx={{
                width: 64, height: 64, borderRadius: "50%", mx: "auto", mb: 0.5,
                backgroundColor: m.bg, border: `3px solid ${m.color}60`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexDirection: "column",
              }}>
                <Typography sx={{ fontSize: "1.2rem", lineHeight: 1 }}>{m.icon}</Typography>
                <Typography fontWeight={800} sx={{ fontSize: "1rem", color: m.color, lineHeight: 1 }}>
                  {oceScore[key]}
                </Typography>
                <Typography sx={{ fontSize: "0.6rem", color: m.color + "90" }}>/{MAX}</Typography>
              </Box>
              <Typography variant="caption" fontWeight={600} sx={{ color: m.color, fontSize: "0.7rem" }}>
                {m.labelEn}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Score bars */}
        <Box sx={{ mt: 2, px: 1 }}>
          {(Object.entries(OCE_META) as [keyof OCEScore, typeof OCE_META[keyof typeof OCE_META]][]).map(([key, m]) => (
            <Box key={key} sx={{ mb: 1.5 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                <Typography variant="caption" fontWeight={600} sx={{ color: m.color }}>
                  {m.icon} {m.label}
                </Typography>
                <Typography variant="caption" fontWeight={700} sx={{ color: m.color }}>
                  {oceScore[key]}/{MAX}
                </Typography>
              </Box>
              <Box sx={{ height: 8, borderRadius: 4, backgroundColor: m.bg, overflow: "hidden" }}>
                <Box
                  component={motion.div}
                  initial={{ width: 0 }}
                  animate={{ width: `${(oceScore[key] / MAX) * 100}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  sx={{ height: "100%", borderRadius: 4, backgroundColor: m.color }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Button variant="contained" fullWidth onClick={onNext}
        component={motion.button} whileTap={{ scale: 0.97 }}
        sx={{
          py: 1.75, borderRadius: 3, fontWeight: 700, fontSize: "1rem",
          background: `linear-gradient(135deg, ${PRIMARY}, #7AA880)`,
          boxShadow: `0 4px 16px ${PRIMARY}40`,
        }}>
        ส่งต่อให้คนต่อไป →
      </Button>
    </motion.div>
  );
}
