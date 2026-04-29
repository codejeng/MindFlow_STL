"use client";
import { useState } from "react";
import { Box, Typography, Container, InputBase, IconButton } from "@mui/material";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { EXPERTS, EXPERT_CATEGORIES, searchExperts, type Expert } from "@/data/experts";

const BG = "#FAF5EC";
const PRIMARY = "#4E7B5E";
const ACCENT = "#CF6B3E";

const CATEGORY_COLORS = [
  { bg: "#FDEBD0", icon: "#E8845A" },
  { bg: "#D6EAF8", icon: "#2E86C1" },
  { bg: "#D5F5E3", icon: "#1E8449" },
  { bg: "#FADBD8", icon: "#C0392B" },
  { bg: "#E8DAEF", icon: "#7D3C98" },
  { bg: "#D6EAF8", icon: "#1F618D" },
  { bg: "#D5F5E3", icon: "#1A5276" },
  { bg: "#FDEBD0", icon: "#784212" },
];

export default function ConsultPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const results = searchExperts(query, activeCategory ?? undefined);
  const isSearching = !!query || !!activeCategory;

  return (
    <Box sx={{ minHeight: "100vh", background: BG, pb: 10 }}>

      {/* ── Sticky header ── */}
      <Box sx={{
        position: "sticky", top: 0, zIndex: 20,
        background: "rgba(250,245,236,0.97)", backdropFilter: "blur(10px)",
        px: 2, pt: 3, pb: 1.5,
        borderBottom: "1px solid rgba(180,155,120,0.12)",
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <IconButton size="small" onClick={() => router.back()}
            sx={{ backgroundColor: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", mr: 0.5 }}>
            <ArrowBackRoundedIcon sx={{ fontSize: "1.1rem", color: "#4B3D2E" }} />
          </IconButton>
          <Typography fontWeight={800} sx={{ fontSize: "1.15rem", color: "#2C2218", flex: 1, textAlign: "center" }}>
            ปรึกษาผู้เชี่ยวชาญ
          </Typography>
          <Box sx={{ width: 32 }} />
        </Box>

        {/* Search bar */}
        <Box sx={{
          display: "flex", alignItems: "center", gap: 1,
          backgroundColor: "white", borderRadius: 12, px: 2, py: 1.25,
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
          border: "1.5px solid rgba(180,155,120,0.15)",
        }}>
          <Box sx={{ color: "#B0A090", fontSize: "1rem", display: "flex" }}>🔍</Box>
          <InputBase fullWidth placeholder="ค้นหาด้วยคีย์เวิร์ด หรือปัญหาที่คุณสนใจ..."
            value={query} onChange={(e) => { setQuery(e.target.value); setActiveCategory(null); }}
            sx={{ fontSize: "0.88rem", color: "#374151" }} />
          {query
            ? <Box onClick={() => setQuery("")} sx={{ cursor: "pointer", color: "#B0A090", lineHeight: 1, display: "flex" }}>✕</Box>
            : <TuneRoundedIcon sx={{ color: "#B0A090", fontSize: "1.1rem" }} />}
        </Box>
      </Box>

      <Container maxWidth="sm" sx={{ pt: 3 }}>
        <AnimatePresence mode="wait">
          {!isSearching ? (
            <motion.div key="browse" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Category grid — circular icons */}
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, mb: 4 }}>
                {EXPERT_CATEGORIES.map((cat, i) => {
                  const c = CATEGORY_COLORS[i % CATEGORY_COLORS.length];
                  return (
                    <Box key={cat.id}
                      component={motion.div} whileTap={{ scale: 0.92 }}
                      onClick={() => setActiveCategory(cat.id)}
                      sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, py: 1.5, cursor: "pointer" }}>
                      <Box sx={{
                        width: 68, height: 68, borderRadius: "50%",
                        backgroundColor: c.bg,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "1.75rem",
                        boxShadow: `0 4px 12px ${c.icon}25`,
                        border: `2px solid ${c.bg}`,
                        transition: "transform 0.2s",
                        "&:hover": { transform: "scale(1.06)" },
                      }}>
                        {cat.icon}
                      </Box>
                      <Typography variant="caption" sx={{
                        color: "#5A4A36", fontWeight: 600, textAlign: "center",
                        fontSize: "0.72rem", lineHeight: 1.35, maxWidth: 80,
                      }}>
                        {cat.label}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>

              {/* Recommended */}
              <Typography fontWeight={800} sx={{ color: "#2C2218", mb: 2, fontSize: "1rem" }}>
                แนะนำสำหรับคุณ
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {EXPERTS.slice(0, 2).map((e, i) => (
                  <ExpertCard key={e.id} expert={e} index={i} onClick={() => router.push(`/consult/${e.id}`)} />
                ))}
              </Box>
            </motion.div>
          ) : (
            <motion.div key="results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography fontWeight={700} sx={{ color: "#2C2218" }}>
                  ผลการค้นหา{" "}
                  <Box component="span" sx={{ color: PRIMARY }}>{results.length} รายการ</Box>
                </Typography>
                <Box sx={{
                  display: "flex", alignItems: "center", gap: 0.5,
                  backgroundColor: "white", borderRadius: 5, px: 1.5, py: 0.5,
                  border: "1px solid #EDE3D8", cursor: "pointer",
                }}>
                  <Typography variant="caption" fontWeight={600} sx={{ color: "#5A4A36" }}>แนะนำ</Typography>
                  <Typography variant="caption" sx={{ color: "#9CA3AF" }}>▾</Typography>
                </Box>
              </Box>
              {results.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 8 }}>
                  <Typography sx={{ fontSize: "2.5rem", mb: 1 }}>🔍</Typography>
                  <Typography fontWeight={600} sx={{ color: "#374151" }}>ไม่พบผลลัพธ์</Typography>
                  <Typography variant="body2" color="text.secondary">ลองค้นหาด้วยคำอื่น</Typography>
                </Box>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {results.map((e, i) => (
                    <ExpertCard key={e.id} expert={e} index={i} onClick={() => router.push(`/consult/${e.id}`)} />
                  ))}
                </Box>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
}


function ExpertCard({ expert: e, index, onClick }: { expert: Expert; index: number; onClick: () => void }) {
  const hasPhoto = e.image && !e.image.includes("expert2");
  return (
    <Box component={motion.div}
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      onClick={onClick}
      sx={{
        backgroundColor: "white", borderRadius: 2, overflow: "hidden",
        boxShadow: "0 4px 20px rgba(100,70,30,0.08)",
        border: "1px solid rgba(180,155,120,0.15)",
        cursor: "pointer", transition: "transform 0.18s, box-shadow 0.18s",
        "&:hover": { transform: "translateY(-2px)", boxShadow: "0 8px 28px rgba(100,70,30,0.13)" },
      }}>
      {/* Badge */}
      {e.badge && (
        <Box sx={{ px: 2, py: 0.6, backgroundColor: `${ACCENT}18`, borderBottom: `1px solid ${ACCENT}20` }}>
          <Typography variant="caption" fontWeight={700} sx={{ color: ACCENT }}>⭐ {e.badge}</Typography>
        </Box>
      )}
      <Box sx={{ display: "flex", gap: 2, p: 2.5 }}>
        {/* Avatar */}
        <Box sx={{
          width: 64, height: 64, borderRadius: "50%", overflow: "hidden", flexShrink: 0,
          backgroundColor: PRIMARY + "20",
          boxShadow: `0 4px 12px rgba(0,0,0,0.12)`,
          border: "2.5px solid white",
          position: "relative",
        }}>
          {hasPhoto ? (
            <Image src={e.image} alt={e.name} fill style={{ objectFit: "cover" }} />
          ) : (
            <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "1.6rem", fontWeight: 800,
              color: PRIMARY, background: `${PRIMARY}18` }}>
              {e.name.charAt(2)}
            </Box>
          )}
        </Box>

        {/* Info */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography fontWeight={800} sx={{ color: "#1F2937", fontSize: "0.97rem", mb: 0.1 }}>
            {e.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "#6B5B45", fontSize: "0.8rem", mb: e.experience ? 0.1 : 0.5 }}>
            {e.title}
          </Typography>
          {e.experience && (
            <Typography variant="caption" sx={{ color: "#9C8B76", display: "block", mb: 0.5 }}>
              ประสบการณ์ {e.experience} ปี
            </Typography>
          )}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
            <StarRoundedIcon sx={{ color: "#F59E0B", fontSize: "0.95rem" }} />
            <Typography variant="body2" fontWeight={700} sx={{ color: "#1F2937", fontSize: "0.82rem" }}>
              {e.rating}
            </Typography>
            <Typography variant="caption" sx={{ color: "#9C8B76" }}>({e.reviewCount} รีวิว)</Typography>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1.25 }}>
            {e.specialty.slice(0, 2).map((s) => (
              <Box key={s} sx={{
                backgroundColor: "#EEF7F1", borderRadius: 5, px: 1.25, py: 0.2,
                border: `1px solid ${PRIMARY}22`,
              }}>
                <Typography variant="caption" sx={{ color: PRIMARY, fontWeight: 600, fontSize: "0.7rem" }}>{s}</Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography fontWeight={800} sx={{ color: "#2C2218", fontSize: "0.9rem" }}>
              {e.price.toLocaleString()}.-
              <Box component="span" sx={{ color: "#9C8B76", fontWeight: 400, fontSize: "0.75rem" }}> / ครั้ง</Box>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
