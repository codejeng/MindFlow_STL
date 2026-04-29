"use client";
import { use } from "react";
import { Box, Typography, Container, Button, Chip, Divider, IconButton } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import TranslateRoundedIcon from "@mui/icons-material/TranslateRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { getExpertById, MOCK_REVIEWS } from "@/data/experts";

const BG = "#FAF5EC";
const PRIMARY = "#4E7B5E";
const ACCENT = "#CF6B3E";

export default function ExpertDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const expert = getExpertById(id);

  if (!expert) return (
    <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
      <Typography>ไม่พบผู้เชี่ยวชาญ</Typography>
      <Button onClick={() => router.push("/consult")}>← กลับ</Button>
    </Container>
  );

  const reviews = MOCK_REVIEWS.filter((r) => r.expertId === id);
  const hasPhoto = expert.image && !expert.image.includes("expert2");

  return (
    <Box sx={{ minHeight: "100vh", background: BG }}>

      {/* ── Sticky Header ── */}
      <Box sx={{
        position: "sticky", top: 0, zIndex: 20,
        background: "rgba(250,245,236,0.95)", backdropFilter: "blur(10px)",
        px: 2, pt: 2.5, pb: 2,
        borderBottom: "1px solid rgba(180,155,120,0.12)",
      }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <IconButton size="small" onClick={() => router.back()}
            sx={{ backgroundColor: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <ArrowBackRoundedIcon sx={{ fontSize: "1.1rem", color: "#4B3D2E" }} />
          </IconButton>
          <Typography fontWeight={800} sx={{ fontSize: "1.05rem", color: "#2C2218" }}>
            รายละเอียดผู้เชี่ยวชาญ
          </Typography>
          <IconButton size="small" sx={{ backgroundColor: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <FavoriteBorderRoundedIcon sx={{ fontSize: "1.1rem", color: "#CF6B3E" }} />
          </IconButton>
        </Box>
      </Box>

      <Container maxWidth="sm" sx={{ pt: 3, pb: 16 }}>

        {/* ── Profile card ── */}
        <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          sx={{
            backgroundColor: "white", borderRadius: 2, p: 3, mb: 2.5,
            boxShadow: "0 4px 24px rgba(100,70,30,0.08)",
            border: "1px solid rgba(180,155,120,0.12)",
          }}>

          {expert.badge && (
            <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, mb: 2,
              backgroundColor: `${ACCENT}15`, borderRadius: 2, px: 1.5, py: 0.35,
              border: `1px solid ${ACCENT}30` }}>
              <StarRoundedIcon sx={{ color: ACCENT, fontSize: "0.85rem" }} />
              <Typography variant="caption" fontWeight={700} sx={{ color: ACCENT }}>{expert.badge}</Typography>
            </Box>
          )}

          <Box sx={{ display: "flex", gap: 2.5, mb: 2.5 }}>
            {/* Photo */}
            <Box sx={{
              width: 88, height: 88, borderRadius: "50%", overflow: "hidden", flexShrink: 0,
              backgroundColor: PRIMARY + "18", position: "relative",
              boxShadow: `0 6px 20px rgba(0,0,0,0.14)`,
              border: "3px solid white",
            }}>
              {hasPhoto ? (
                <Image src={expert.image} alt={expert.name} fill style={{ objectFit: "cover" }} />
              ) : (
                <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center",
                  justifyContent: "center", fontWeight: 800, fontSize: "2rem", color: PRIMARY }}>
                  {expert.name.charAt(2)}
                </Box>
              )}
            </Box>

            {/* Info */}
            <Box>
              <Typography fontWeight={800} sx={{ color: "#1F2937", fontSize: "1.1rem", mb: 0.2 }}>
                {expert.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "#6B5B45", mb: 0.2 }}>{expert.title}</Typography>
              <Typography variant="caption" sx={{ color: "#9C8B76", display: "block", mb: 0.75 }}>
                ประสบการณ์ {expert.experience} ปี
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                <StarRoundedIcon sx={{ color: "#F59E0B", fontSize: "1rem" }} />
                <Typography fontWeight={800} sx={{ color: "#1F2937", fontSize: "0.9rem" }}>{expert.rating}</Typography>
                <Typography variant="caption" sx={{ color: "#9C8B76" }}>({expert.reviewCount} รีวิว)</Typography>
              </Box>
            </Box>
          </Box>

          {/* Specialty chips */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mb: 2 }}>
            {expert.specialty.map((s) => (
              <Chip key={s} label={s} size="small"
                sx={{ backgroundColor: "#EEF7F1", color: PRIMARY, fontWeight: 600, fontSize: "0.75rem",
                  border: `1px solid ${PRIMARY}25`, borderRadius: "8px" }} />
            ))}
          </Box>

          {/* Info icons */}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {expert.formats.includes("online") && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <VideocamOutlinedIcon sx={{ fontSize: "0.95rem", color: PRIMARY }} />
                <Typography variant="caption" sx={{ color: "#5A4A36", fontWeight: 500 }}>ออนไลน์</Typography>
              </Box>
            )}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <TranslateRoundedIcon sx={{ fontSize: "0.95rem", color: PRIMARY }} />
              <Typography variant="caption" sx={{ color: "#5A4A36", fontWeight: 500 }}>
                {expert.languages.join(", ")}
              </Typography>
            </Box>
            {expert.location && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Typography sx={{ fontSize: "0.8rem" }}>📍</Typography>
                <Typography variant="caption" sx={{ color: "#5A4A36", fontWeight: 500 }}>{expert.location}</Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* ── About ── */}
        <Box component={motion.div} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          sx={{ backgroundColor: "white", borderRadius: 2, p: 3, mb: 2.5,
            boxShadow: "0 4px 20px rgba(100,70,30,0.06)", border: "1px solid rgba(180,155,120,0.12)" }}>
          <Typography fontWeight={800} sx={{ color: "#2C2218", mb: 1.5 }}>เกี่ยวกับฉัน</Typography>
          <Typography variant="body2" sx={{ color: "#5A4A36", lineHeight: 1.85 }}>{expert.about}</Typography>
        </Box>

        {/* ── Price ── */}
        <Box component={motion.div} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          sx={{
            background: `linear-gradient(135deg,${PRIMARY}14,${PRIMARY}08)`,
            borderRadius: 2, p: 2.5, mb: 2.5,
            border: `1.5px solid ${PRIMARY}25`,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
          <Box>
            <Typography variant="caption" sx={{ color: "#6B5B45" }}>ราคาต่อครั้ง</Typography>
            <Typography fontWeight={800} sx={{ color: PRIMARY, fontSize: "1.5rem", lineHeight: 1.2 }}>
              {expert.price.toLocaleString()}.-
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap", justifyContent: "flex-end" }}>
            {expert.formats.map((f) => (
              <Chip key={f} label={f === "online" ? "ออนไลน์" : "ตัวต่อตัว"} size="small"
                sx={{ backgroundColor: "white", color: PRIMARY, border: `1px solid ${PRIMARY}40`, fontWeight: 600 }} />
            ))}
          </Box>
        </Box>

        {/* ── Reviews ── */}
        {reviews.length > 0 && (
          <Box component={motion.div} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            sx={{ backgroundColor: "white", borderRadius: 2, p: 3, mb: 2.5,
              boxShadow: "0 4px 20px rgba(100,70,30,0.06)", border: "1px solid rgba(180,155,120,0.12)" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography fontWeight={800} sx={{ color: "#2C2218" }}>รีวิว</Typography>
              <Typography onClick={() => router.push(`/consult/${id}/reviews`)}
                variant="caption" sx={{ color: PRIMARY, fontWeight: 700, cursor: "pointer" }}>ดูทั้งหมด ›</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
              <Typography fontWeight={900} sx={{ fontSize: "2.5rem", color: "#1F2937", lineHeight: 1 }}>
                {expert.rating}
              </Typography>
              <Box>
                <Box sx={{ display: "flex", gap: 0.25 }}>
                  {[1,2,3,4,5].map((s) => (
                    <StarRoundedIcon key={s} sx={{ color: "#F59E0B", fontSize: "1rem" }} />
                  ))}
                </Box>
                <Typography variant="caption" sx={{ color: "#9C8B76" }}>{expert.reviewCount} รีวิว</Typography>
              </Box>
            </Box>
            {reviews.slice(0, 2).map((r, i) => (
              <Box key={r.id}>
                {i > 0 && <Divider sx={{ my: 1.5, borderColor: "#F0E8DC" }} />}
                <Box sx={{ display: "flex", gap: 1.5 }}>
                  <Box sx={{
                    width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                    backgroundColor: PRIMARY + "20", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontWeight: 800, fontSize: "0.85rem", color: PRIMARY,
                  }}>{r.avatar}</Box>
                  <Box>
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 0.2 }}>
                      <Typography variant="body2" fontWeight={700} sx={{ color: "#1F2937" }}>{r.author}</Typography>
                      <Typography variant="caption" sx={{ color: "#9C8B76" }}>{r.date}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", mb: 0.5 }}>
                      {[1,2,3,4,5].slice(0, r.rating).map((s) => (
                        <StarRoundedIcon key={s} sx={{ color: "#F59E0B", fontSize: "0.75rem" }} />
                      ))}
                    </Box>
                    <Typography variant="body2" sx={{ color: "#5A4A36", lineHeight: 1.7 }}>{r.text}</Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Container>

      {/* ── Fixed bottom CTA ── */}
      <Box sx={{
        position: "fixed", bottom: 64, left: 0, right: 0,
        px: 3, pb: 2, pt: 1.5,
        background: "linear-gradient(180deg, transparent 0%, rgba(250,245,236,0.98) 30%)",
      }}>
      <Box sx={{ maxWidth: 600, mx: "auto", display: "flex", gap: 1.5 }}>
        <Button variant="contained" onClick={() => router.push(`/consult/${id}/book`)}
          disabled={!expert.available}
          startIcon={<CalendarMonthRoundedIcon />}
          sx={{
            flex: 2.5, py: 1.6, borderRadius: "14px", textTransform: "none",
            fontWeight: 800, fontSize: "1rem",
            background: expert.available ? `linear-gradient(135deg,${PRIMARY},#5E8F6E)` : undefined,
            boxShadow: expert.available ? `0 6px 20px ${PRIMARY}50` : undefined,
          }}>
          {expert.available ? "นัดหมาย / ปรึกษา" : "ไม่ว่างในขณะนี้"}
        </Button>
      </Box>
      </Box>
    </Box>
  );
}
