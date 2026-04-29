"use client";
import { Box, Typography, Container, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const BG = "#FDF6EE";
const PRIMARY = "#5A7A65";

const ARTICLES = [
  { id: "1", emoji: "🧠", title: "5 วิธีดูแลตัวเองเมื่อมีอยากอยู่คนเดียว", tag: "ความเครียด", readMin: 5, color: PRIMARY },
  { id: "2", emoji: "🌿", title: "จัดการความวิตกกังวลง่ายๆ 5 นาที", tag: "ความวิตกกังวล", readMin: 3, color: "#7B68EE" },
  { id: "3", emoji: "👨‍👩‍👧", title: "เข้าใจวัยรุ่น: ตัวต่อตัวโลกกลับโลก", tag: "ครอบครัว", readMin: 7, color: "#E8845A" },
];

const TOOLS = [
  { icon: "🌬️", label: "นับเวลาหายใจ",    desc: "หายใจลึกๆ ลดความเครียด",    color: PRIMARY,    path: "/tools/breathing" },
  { icon: "📍", label: "หาตำแหน่งคลินิก", desc: "ค้นหาสถานที่ใกล้คุณ",         color: "#2C6FAC",   path: "/tools/clinic" },
  { icon: "📔", label: "จดบันทึกอารมณ์",   desc: "บันทึกความรู้สึกประจำวัน",    color: "#C07A1A",   path: "/tools/mood" },
  { icon: "🧘", label: "สติการณ์",          desc: "ฝึกสติด้วยเทคนิคง่ายๆ",      color: "#8A4E8A",   path: "/tools/mindful" },
];

export default function ArticlesPage() {
  const router = useRouter();
  return (
    <Box sx={{ minHeight: "100vh", background: BG, pb: 4 }}>
      <Box sx={{ backgroundColor: "white", px: 2, pt: 3, pb: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <Typography fontWeight={800} sx={{ fontSize: "1.2rem", color: "#1F2937" }}>บทความ & เครื่องมือ</Typography>
      </Box>

      <Container maxWidth="sm" sx={{ pt: 3 }}>
        {/* Articles */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography fontWeight={700} sx={{ color: "#1F2937" }}>📰 บทความแนะนำ</Typography>
          <Typography variant="caption" sx={{ color: PRIMARY, fontWeight: 600, cursor: "pointer" }}>ดูทั้งหมด ›</Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 4 }}>
          {ARTICLES.map((a, i) => (
            <Box key={a.id} component={motion.div}
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              sx={{
                display: "flex", gap: 2, alignItems: "center",
                backgroundColor: "white", borderRadius: 4, p: 2.5, cursor: "pointer",
                boxShadow: "0 2px 12px rgba(0,0,0,0.05)", border: `1px solid ${a.color}18`,
                "&:hover": { boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }, transition: "box-shadow 0.2s",
              }}>
              <Box sx={{ width: 52, height: 52, borderRadius: 3, backgroundColor: a.color + "15",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", flexShrink: 0 }}>
                {a.emoji}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: "flex", gap: 0.75, alignItems: "center", mb: 0.5 }}>
                  <Box sx={{ backgroundColor: a.color + "15", borderRadius: 5, px: 1, py: 0.2 }}>
                    <Typography variant="caption" sx={{ color: a.color, fontWeight: 700, fontSize: "0.68rem" }}>
                      {a.tag}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: "#9CA3AF" }}>{a.readMin} นาที</Typography>
                </Box>
                <Typography fontWeight={600} sx={{ color: "#1F2937", fontSize: "0.9rem", lineHeight: 1.4 }}>
                  {a.title}
                </Typography>
              </Box>
              <Typography sx={{ color: "#D1D5DB" }}>›</Typography>
            </Box>
          ))}
        </Box>

        {/* Tools */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography fontWeight={700} sx={{ color: "#1F2937" }}>🛠️ เครื่องมือช่วยใจ</Typography>
          <Typography variant="caption" sx={{ color: PRIMARY, fontWeight: 600, cursor: "pointer" }}>ดูทั้งหมด ›</Typography>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
          {TOOLS.map((tool, i) => (
            <Box key={tool.label} component={motion.div}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              onClick={() => router.push(tool.path)}
              sx={{
                backgroundColor: "white", borderRadius: 2, p: 2.5, cursor: "pointer",
                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                border: `1.5px solid ${tool.color}20`,
                "&:hover": { boxShadow: `0 4px 20px ${tool.color}25` }, transition: "box-shadow 0.2s",
              }}>
              <Typography sx={{ fontSize: "1.8rem", mb: 1 }}>{tool.icon}</Typography>
              <Typography fontWeight={700} sx={{ color: "#1F2937", fontSize: "0.9rem", mb: 0.25 }}>
                {tool.label}
              </Typography>
              <Typography variant="caption" sx={{ color: "#6B7280" }}>{tool.desc}</Typography>
            </Box>
          ))}
        </Box>

        {/* CTA consult */}
        <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          sx={{
            mt: 4, p: 3, borderRadius: 4, textAlign: "center",
            background: `linear-gradient(135deg, ${PRIMARY}15, ${PRIMARY}08)`,
            border: `1.5px solid ${PRIMARY}25`,
          }}>
          <Typography sx={{ fontSize: "1.8rem", mb: 1 }}>💬</Typography>
          <Typography fontWeight={700} sx={{ color: "#1F2937", mb: 0.5 }}>
            ต้องการพูดคุยกับผู้เชี่ยวชาญ?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            ค้นหาและนัดหมายผู้เชี่ยวชาญที่เหมาะกับคุณ
          </Typography>
          <Button variant="contained" onClick={() => router.push("/consult")}
            sx={{ borderRadius: 4, textTransform: "none", fontWeight: 700, px: 3,
              background: `linear-gradient(135deg,${PRIMARY},#7AA880)` }}>
            ค้นหาผู้เชี่ยวชาญ
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
