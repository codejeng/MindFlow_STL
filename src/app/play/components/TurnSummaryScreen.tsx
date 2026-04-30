"use client";
import { Box, Typography, Button, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { type OCEScore, type CharacterDef } from "@/context/GameContext";
import { REFLECTION_TAGS } from "@/constants/reflectionTags";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

const PRIMARY = "#5A7A65";
const ACCENT = "#E8A838";

interface Props {
  playerName: string;
  char?: CharacterDef;
  charColor: string;
  oceScore: OCEScore; // Peer scores
  selectedTag: string | null; // Self reflection
  onNext: () => void;
}

// Mock Specialists
const SPECIALISTS = [
  { id: 1, name: "นักจิตวิทยาคลินิก", role: "เชี่ยวชาญ: ความวิตกกังวล, ความเครียด", initial: "น" },
  { id: 2, name: "นักบำบัดครอบครัว", role: "เชี่ยวชาญ: ปัญหาครอบครัว, ความสัมพันธ์", initial: "บ" },
  { id: 3, name: "ที่ปรึกษาวัยรุ่น", role: "เชี่ยวชาญ: วัยรุ่น, การค้นหาตัวตน", initial: "ป" }
];

export default function TurnSummaryScreen({ playerName, char, charColor, oceScore, selectedTag, onNext }: Props) {
  const tag = REFLECTION_TAGS.find((t) => t.id === selectedTag);
  
  // Calculate mock "Self" vs "Others" scores
  // Others comes from oceScore
  // Self is mocked just to show the radar chart diff
  const selfScore = {
    openness: Math.max(1, Math.min(6, oceScore.openness + (Math.random() > 0.5 ? 1 : -1))),
    empathy: Math.max(1, Math.min(6, oceScore.empathy + (Math.random() > 0.5 ? 1 : -1))),
    clarity: Math.max(1, Math.min(6, oceScore.clarity + (Math.random() > 0.5 ? 1 : -1))),
  };

  const chartData = [
    { subject: "การเปิดใจ\n(Openness)", self: selfScore.openness || 1, others: oceScore.openness || 1 },
    { subject: "ความชัดเจนในตัวเอง\n(Clarity)", self: selfScore.clarity || 1, others: oceScore.clarity || 1 },
    { subject: "ความเห็นอกเห็นใจ\n(Empathy)", self: selfScore.empathy || 1, others: oceScore.empathy || 1 },
  ];

  return (
    <motion.div key="summary" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.4 }}>
      
      {/* Header */}
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <Typography variant="body2" fontWeight={800} sx={{ color: "#8B7355", letterSpacing: "0.05em", mb: 0.5 }}>
          AFTER GAME - INSIGHT DASHBOARD
        </Typography>
        <Typography variant="h5" fontWeight={800} sx={{ color: PRIMARY }}>
          สรุปผลสำหรับ {playerName}
        </Typography>
        {tag && (
           <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, backgroundColor: tag.bg, borderRadius: 5, px: 2, py: 0.5, mt: 1, border: `1px solid ${tag.color}40` }}>
             <Typography sx={{ fontSize: "1rem" }}>{tag.emoji}</Typography>
             <Typography variant="body2" fontWeight={700} sx={{ color: tag.color }}>{tag.label}</Typography>
           </Box>
        )}
      </Box>

      {/* 1. ภาพรวมของคุณ (Johari Window) */}
      <Box sx={{ backgroundColor: "#fff", borderRadius: 4, p: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={700} align="center" sx={{ mb: 0.5, color: "#374151" }}>ภาพรวมของคุณ</Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>เปรียบเทียบมุมมองตนเอง กับมุมมองของคนอื่น</Typography>
        
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
          <Box sx={{ backgroundColor: "#D8E6D3", borderRadius: 2, p: 1.5, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: 95 }}>
            <Typography variant="caption" fontWeight={700} align="center" sx={{ color: "#3D5A45" }}>สิ่งที่คุณและคนอื่นรู้</Typography>
            <Typography variant="caption" align="center" sx={{ color: "#3D5A45" }}>(Open Area)</Typography>
            <Typography variant="body2" fontWeight={800} sx={{ mt: 1, color: "#3D5A45" }}>สูง</Typography>
          </Box>
          <Box sx={{ backgroundColor: "#F0E1D3", borderRadius: 2, p: 1.5, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: 95 }}>
            <Typography variant="caption" fontWeight={700} align="center" sx={{ color: "#8A6648" }}>สิ่งที่คุณไม่รู้แต่คนอื่นรู้</Typography>
            <Typography variant="caption" align="center" sx={{ color: "#8A6648" }}>(Blind Spot)</Typography>
            <Typography variant="body2" fontWeight={800} sx={{ mt: 1, color: "#8A6648" }}>ปานกลาง</Typography>
          </Box>
          <Box sx={{ backgroundColor: "#F9ECCC", borderRadius: 2, p: 1.5, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: 95 }}>
            <Typography variant="caption" fontWeight={700} align="center" sx={{ color: "#9E7B35" }}>สิ่งที่คุณรู้แต่คนอื่นไม่รู้</Typography>
            <Typography variant="caption" align="center" sx={{ color: "#9E7B35" }}>(Hidden Area)</Typography>
            <Typography variant="body2" fontWeight={800} sx={{ mt: 1, color: "#9E7B35" }}>ปานกลาง</Typography>
          </Box>
          <Box sx={{ backgroundColor: "#F3C5AD", borderRadius: 2, p: 1.5, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: 95 }}>
            <Typography variant="caption" fontWeight={700} align="center" sx={{ color: "#994A2B" }}>สิ่งที่ไม่มีใครรู้</Typography>
            <Typography variant="caption" align="center" sx={{ color: "#994A2B" }}>(Unknown Area)</Typography>
            <Typography variant="body2" fontWeight={800} sx={{ mt: 1, color: "#994A2B" }}>ต่ำ</Typography>
          </Box>
        </Box>
        
        <Typography variant="caption" display="block" align="center" sx={{ mt: 2, color: "#6B7280", lineHeight: 1.5 }}>
          ยิ่งพื้นที่ Open Area มาก ความเข้าใจในตัวเองและผู้อื่นยิ่งดีขึ้น
        </Typography>
        <Button variant="contained" fullWidth disableElevation sx={{ mt: 2, backgroundColor: PRIMARY, borderRadius: 3, fontWeight: 700, py: 1.25 }}>
          ดูรายละเอียด
        </Button>
      </Box>

      {/* 2. Insight ของคุณ */}
      <Box sx={{ backgroundColor: "#fff", borderRadius: 4, p: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={700} align="center" sx={{ mb: 2, color: "#374151" }}>Insight ของคุณ</Typography>
        <Typography variant="body2" align="center" sx={{ mb: 2.5, fontWeight: 500, color: "#4B5563", lineHeight: 1.6 }}>
          คุณมีจุดแข็งด้านความเห็นอกเห็นใจ แต่ควรพัฒนาความชัดเจนในการสื่อสารและการเปิดใจให้มากขึ้น
        </Typography>
        
        <Box sx={{ backgroundColor: "#FDF9F2", p: 2, borderRadius: 3, mb: 2.5, border: "1px solid #F3E5D3" }}>
          <Typography variant="caption" fontWeight={700} sx={{ color: "#8A6648", mb: 1.5, display: "block" }}>คำแนะนำสำหรับคุณ</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography sx={{ color: PRIMARY, fontSize: "1rem", lineHeight: 1 }}>♣</Typography>
              <Typography variant="caption" sx={{ color: "#4B5563", fontWeight: 600 }}>ลองฝึกสื่อสารความต้องการของคุณ</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography sx={{ color: PRIMARY, fontSize: "1rem", lineHeight: 1 }}>♣</Typography>
              <Typography variant="caption" sx={{ color: "#4B5563", fontWeight: 600 }}>เปิดใจรับฟังความคิดเห็นของผู้อื่น</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography sx={{ color: PRIMARY, fontSize: "1rem", lineHeight: 1 }}>♣</Typography>
              <Typography variant="caption" sx={{ color: "#4B5563", fontWeight: 600 }}>แสดงความรู้สึกอย่างตรงไปตรงมา</Typography>
            </Box>
          </Box>
        </Box>
        <Button variant="contained" fullWidth disableElevation sx={{ backgroundColor: PRIMARY, borderRadius: 3, fontWeight: 700, py: 1.25 }}>
          บันทึก Insight
        </Button>
      </Box>

      {/* 3. พัฒนาการของคุณ (Radar Chart) */}
      <Box sx={{ backgroundColor: "#fff", borderRadius: 4, p: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={700} align="center" sx={{ mb: 0.5, color: "#374151" }}>พัฒนาการของคุณ</Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 1 }}>เปรียบเทียบผลจากการเล่นที่ผ่านมา</Typography>
        
        <Box sx={{ width: "100%", height: 260, ml: -2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="65%" data={chartData}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "#6B7280", fontSize: 11, fontWeight: 600 }} />
              <PolarRadiusAxis angle={30} domain={[0, 6]} tick={false} axisLine={false} />
              <Radar name="ตนเอง" dataKey="self" stroke={PRIMARY} strokeWidth={2} fill={PRIMARY} fillOpacity={0.3} />
              <Radar name="คนอื่น" dataKey="others" stroke={ACCENT} strokeWidth={2} fill={ACCENT} fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </Box>
        
        <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mb: 3, mt: -1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: 14, height: 14, backgroundColor: PRIMARY, borderRadius: "50%", opacity: 0.8 }} />
            <Typography variant="caption" fontWeight={700} sx={{ color: "#4B5563" }}>ตนเอง</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: 14, height: 14, backgroundColor: ACCENT, borderRadius: "50%", opacity: 0.8 }} />
            <Typography variant="caption" fontWeight={700} sx={{ color: "#4B5563" }}>คนอื่น</Typography>
          </Box>
        </Box>
        <Button variant="contained" fullWidth disableElevation sx={{ backgroundColor: PRIMARY, borderRadius: 3, fontWeight: 700, py: 1.25 }}>
          ดูประวัติทั้งหมด
        </Button>
      </Box>

      {/* 4. แนะนำผู้เชี่ยวชาญที่เหมาะกับคุณ */}
      <Box sx={{ backgroundColor: "#fff", borderRadius: 4, p: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", mb: 4 }}>
        <Typography variant="subtitle1" fontWeight={700} align="center" sx={{ mb: 0.5, color: "#374151" }}>แนะนำผู้เชี่ยวชาญที่เหมาะกับคุณ</Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2.5 }}>จากผลการประเมินของคุณ</Typography>
        
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 3 }}>
          {SPECIALISTS.map((spec) => (
            <Box key={spec.id} sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 1.5, border: "1px solid #F3E5D3", borderRadius: 3, backgroundColor: "#FAFDF9" }}>
              <Avatar sx={{ width: 44, height: 44, backgroundColor: "#D1E2C4", color: PRIMARY, fontWeight: 700 }}>
                {spec.initial}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight={800} sx={{ color: "#374151" }}>{spec.name}</Typography>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.25, lineHeight: 1.2 }}>{spec.role}</Typography>
              </Box>
              <Button size="small" variant="contained" disableElevation sx={{ backgroundColor: PRIMARY, borderRadius: 2, textTransform: "none", px: 1.5, minWidth: 0, fontWeight: 700, fontSize: "0.75rem" }}>
                ดูโปรไฟล์
              </Button>
            </Box>
          ))}
        </Box>
        <Button variant="contained" fullWidth disableElevation sx={{ backgroundColor: PRIMARY, borderRadius: 3, fontWeight: 700, py: 1.25 }}>
          ดูผู้เชี่ยวชาญทั้งหมด →
        </Button>
      </Box>

      {/* End Turn Action */}
      <Button variant="contained" fullWidth onClick={onNext}
        component={motion.button} whileTap={{ scale: 0.97 }}
        sx={{
          py: 2, borderRadius: 3, fontWeight: 800, fontSize: "1.1rem",
          background: `linear-gradient(135deg, ${PRIMARY}, #7AA880)`,
          boxShadow: `0 8px 24px ${PRIMARY}50`, mb: 4
        }}>
        จบเทิร์น →
      </Button>

    </motion.div>
  );
}
