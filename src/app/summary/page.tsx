"use client";

import {
  Box, Typography, Button, Container, Card, CardContent, LinearProgress,
} from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGame, CHARACTERS, type TraitPoints } from "@/context/GameContext";
import PageTransition from "@/components/common/PageTransition";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";

// ─── Trait metadata ────────────────────────────────────────────────────────────

const TRAIT_META: Record<keyof TraitPoints, { label: string; icon: string; color: string; description: string }> = {
  communication: { label: "การสื่อสาร", icon: "💬", color: "#1B7B7E", description: "พูดคุยและรับฟังกัน" },
  empathy: { label: "ความเข้าอกเข้าใจ", icon: "❤️", color: "#E05A7A", description: "รับรู้และเข้าใจความรู้สึก" },
  trust: { label: "ความไว้วางใจ", icon: "🤝", color: "#5BB8A8", description: "เชื่อมั่นและซื่อสัตย์ต่อกัน" },
  quality_time: { label: "เวลาคุณภาพ", icon: "⏰", color: "#E8A030", description: "อยู่ด้วยกันอย่างมีความหมาย" },
  boundaries: { label: "การเคารพพื้นที่", icon: "🌿", color: "#7A9E7A", description: "เคารพความเป็นส่วนตัวกัน" },
  growth: { label: "การเติบโตร่วมกัน", icon: "🌱", color: "#7B68EE", description: "เรียนรู้และพัฒนาไปด้วยกัน" },
};

// ─── Relationship type based on dominant traits ─────────────────────────────

interface RelationshipType {
  title: string;
  subtitle: string;
  emoji: string;
  bgGradient: string;
  borderColor: string;
  description: string;
}

function getRelationshipType(traits: TraitPoints): RelationshipType {
  const entries = Object.entries(traits) as [keyof TraitPoints, number][];
  const dominant = entries.sort((a, b) => b[1] - a[1]).slice(0, 2).map((e) => e[0]);
  const total = entries.reduce((s, e) => s + e[1], 0);

  if (total === 0) {
    return { title: "ครอบครัวที่กำลังค้นหาตัวเอง", subtitle: "ยังมีเวลาเติมความรักให้กัน", emoji: "🌱", bgGradient: "linear-gradient(135deg, #F5EBC8, #FDF9F0)", borderColor: "#E8D89A", description: "ครอบครัวของคุณยังมีพื้นที่ให้เติบโต ทุกก้าวเล็กๆ ของการพูดคุยกัน คือจุดเริ่มต้นที่ดี" };
  }

  if (dominant.includes("communication") && dominant.includes("empathy")) {
    return { title: "ครอบครัวแห่งการเข้าใจ", subtitle: "เปิดใจ รับฟัง และเข้าอกเข้าใจกัน", emoji: "💬❤️", bgGradient: "linear-gradient(135deg, #B8E4F0, #FADCE3)", borderColor: "#8FD4C8", description: "ครอบครัวของคุณมีการสื่อสารที่เปิดเผยและเข้าใจกันอย่างลึกซึ้ง นี่คือรากฐานที่แข็งแกร่งของความสัมพันธ์ที่ยั่งยืน" };
  }
  if (dominant.includes("trust") && dominant.includes("communication")) {
    return { title: "ครอบครัวแห่งความไว้วางใจ", subtitle: "เชื่อมั่น ซื่อสัตย์ และพูดความจริงต่อกัน", emoji: "🤝💬", bgGradient: "linear-gradient(135deg, #B8E4F0, #E8F8F5)", borderColor: "#5BB8A8", description: "พื้นฐานของครอบครัวคุณคือความซื่อสัตย์และไว้ใจกัน สมาชิกทุกคนรู้สึกปลอดภัยในการพูดความจริง" };
  }
  if (dominant.includes("quality_time") && dominant.includes("empathy")) {
    return { title: "ครอบครัวแห่งความอบอุ่น", subtitle: "ใช้เวลาด้วยกัน อย่างมีความหมาย", emoji: "⏰❤️", bgGradient: "linear-gradient(135deg, #FADCE3, #FFF8E1)", borderColor: "#F0A0B0", description: "ครอบครัวของคุณให้ความสำคัญกับเวลาคุณภาพและแสดงความรักผ่านการอยู่เคียงข้างกัน" };
  }
  if (dominant.includes("growth") && dominant.includes("quality_time")) {
    return { title: "ครอบครัวแห่งการเติบโต", subtitle: "เรียนรู้และพัฒนาไปด้วยกันเสมอ", emoji: "🌱⏰", bgGradient: "linear-gradient(135deg, #E8F5E9, #FFF8E1)", borderColor: "#7B68EE", description: "ครอบครัวคุณชอบค้นหาประสบการณ์ใหม่ร่วมกัน และสนับสนุนการพัฒนาของแต่ละคน" };
  }
  if (dominant.includes("boundaries") && dominant.includes("trust")) {
    return { title: "ครอบครัวแห่งการเคารพกัน", subtitle: "เคารพพื้นที่ส่วนตัวและไว้วางใจกัน", emoji: "🌿🤝", bgGradient: "linear-gradient(135deg, #E8F5E9, #E8F5FE)", borderColor: "#7A9E7A", description: "ครอบครัวคุณให้ความสำคัญกับความเป็นตัวเองของแต่ละคน ในขณะเดียวกันก็ไว้วางใจซึ่งกันและกัน" };
  }

  // Default: most prominent single trait
  const top = dominant[0];
  const m = TRAIT_META[top];
  return {
    title: `ครอบครัวที่มุ่งเน้น${m.label}`,
    subtitle: m.description,
    emoji: m.icon,
    bgGradient: `linear-gradient(135deg, ${m.color}15, ${m.color}08)`,
    borderColor: m.color,
    description: `ครอบครัวของคุณให้ความสำคัญกับ${m.label}เป็นพิเศษ ลองเสริมด้านอื่นๆ เพิ่มเติมเพื่อความสัมพันธ์ที่สมดุล`,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SummaryPage() {
  const router = useRouter();
  const { players, turnOrder, totalTraitPoints, questionHistory, resetGame } = useGame();
  const orderedPlayers = turnOrder.map((id) => players.find((p) => p.id === id)).filter(Boolean) as typeof players;
  const totalQuestions = questionHistory.length;
  const relType = getRelationshipType(totalTraitPoints);

  // Max points for scaling
  const traitEntries = Object.entries(totalTraitPoints) as [keyof TraitPoints, number][];
  const maxPoints = Math.max(...traitEntries.map((e) => e[1]), 1);

  return (
    <PageTransition>
      <Container maxWidth="sm" sx={{ py: 4, pb: 8, minHeight: "100vh" }}>
        {/* Header */}
        <Box component={motion.div} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" fontWeight={700} sx={{ color: "#1B7B7E", mb: 0.5 }}>
            ผลสรุปความสัมพันธ์
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ตอบคำถามทั้งหมด {totalQuestions} ข้อ
          </Typography>
        </Box>

        {/* ── RELATIONSHIP CARD ── */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          sx={{
            background: relType.bgGradient,
            border: `3px solid ${relType.borderColor}`,
            borderRadius: 5, p: 4, mb: 4, textAlign: "center",
            boxShadow: `0 8px 30px ${relType.borderColor}22`,
            position: "relative", overflow: "hidden",
          }}
        >
          {/* Decorative blobs */}
          <Box sx={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: relType.borderColor + "15", filter: "blur(20px)" }} />
          <Box sx={{ position: "absolute", bottom: -20, left: -20, width: 80, height: 80, borderRadius: "50%", background: relType.borderColor + "10", filter: "blur(18px)" }} />

          {/* Emoji large */}
          <Box component={motion.div} animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 2.5, repeat: Infinity }}
            sx={{ fontSize: "3.5rem", mb: 1.5 }}>
            {relType.emoji}
          </Box>

          <Typography variant="h5" fontWeight={700} sx={{ color: relType.borderColor, mb: 0.5 }}>
            {relType.title}
          </Typography>
          <Typography variant="body1" fontWeight={500} sx={{ color: "#555", mb: 2 }}>
            {relType.subtitle}
          </Typography>
          <Typography variant="body2" sx={{ color: "#777", lineHeight: 1.7, maxWidth: 360, mx: "auto" }}>
            {relType.description}
          </Typography>

          {/* MindFlow logo watermark */}
          <Box sx={{ mt: 2.5, pt: 2, borderTop: `1px solid ${relType.borderColor}22` }}>
            <Typography variant="caption" fontWeight={600} sx={{ color: relType.borderColor, letterSpacing: "0.05em" }}>
              🧠 mindflow Board Game
            </Typography>
          </Box>
        </Box>

        {/* ── TRAIT RADAR BARS ── */}
        <Card component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          sx={{ mb: 4, borderRadius: 4 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2.5, color: "#1B7B7E" }}>
              ✨ มิติความสัมพันธ์
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {traitEntries
                .sort((a, b) => b[1] - a[1])
                .map(([key, value], i) => {
                  const m = TRAIT_META[key];
                  return (
                    <Box key={key} component={motion.div} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.08 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                          <Typography>{m.icon}</Typography>
                          <Typography variant="body2" fontWeight={600}>{m.label}</Typography>
                        </Box>
                        <Typography variant="body2" fontWeight={700} sx={{ color: m.color }}>{value} คะแนน</Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={Math.round((value / maxPoints) * 100)}
                        sx={{
                          height: 10, borderRadius: 5,
                          backgroundColor: m.color + "18",
                          "& .MuiLinearProgress-bar": { background: `linear-gradient(90deg, ${m.color}88, ${m.color})`, borderRadius: 5 },
                        }}
                      />
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25, display: "block" }}>
                        {m.description}
                      </Typography>
                    </Box>
                  );
                })}
            </Box>
          </CardContent>
        </Card>

        {/* ── PLAYER CARDS ── */}
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2, color: "#1B7B7E" }}>
          👥 สมาชิกที่เข้าร่วม
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
          {orderedPlayers.map((player, i) => {
            const char = CHARACTERS.find((c) => c.id === player.characterId);
            const playerTraits = Object.entries(player.stats.traitPoints) as [keyof TraitPoints, number][];
            const topTrait = playerTraits.sort((a, b) => b[1] - a[1])[0];
            return (
              <Card key={player.id} component={motion.div} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.1 }}>
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box sx={{ width: 52, height: 68, position: "relative", flexShrink: 0 }}>
                      {char && <Image src={char.image} alt={char.name} fill style={{ objectFit: "contain" }} />}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography fontWeight={700} sx={{ color: char?.baseColor }}>{player.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {char?.name} · {player.role === "parent" ? "ผู้ปกครอง" : "ลูก"} · ตอบ {player.stats.questionsAnswered} ข้อ
                      </Typography>
                      {topTrait && topTrait[1] > 0 && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
                          <Typography variant="caption">{TRAIT_META[topTrait[0]].icon}</Typography>
                          <Typography variant="caption" fontWeight={600} sx={{ color: TRAIT_META[topTrait[0]].color }}>
                            เด่นด้าน: {TRAIT_META[topTrait[0]].label}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <FavoriteIcon sx={{ color: char?.baseColor + "66", fontSize: 20 }} />
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>

        {/* Bottom actions */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="outlined" fullWidth startIcon={<HomeRoundedIcon />}
            onClick={() => { resetGame(); router.push("/"); }}
            sx={{ py: 1.5, borderRadius: 4 }}>
            กลับหน้าแรก
          </Button>
          <Button variant="contained" color="primary" fullWidth startIcon={<ReplayRoundedIcon />}
            onClick={() => { resetGame(); router.push("/setup"); }}
            sx={{ py: 1.5 }}>
            เล่นอีกครั้ง
          </Button>
        </Box>
      </Container>
    </PageTransition>
  );
}
