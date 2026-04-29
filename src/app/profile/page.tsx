"use client";
import { Box, Typography, Container, Button, Avatar, Divider, LinearProgress } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";

const BG = "#FAF5EC";
const PRIMARY = "#4E7B5E";
const ACCENT = "#CF6B3E";

// Mock user profile data
const MOCK_PROFILE = {
  name: "คุณณิชาภา วงศ์ไพศาล",
  role: "นักจิตวิทยาคลินิก",
  title: "Ph.D. จิตวิทยาคลินิก | ม.มหิดล",
  experience: 8,
  rating: 4.9,
  reviewCount: 128,
  sessionsCompleted: 342,
  price: 900,
  image: "/images/experts/expert1.png",
  specialties: ["ความวิตกกังวล", "ความสัมพันธ์", "การพัฒนาตนเอง", "เด็กและวัยรุ่น"],
  about: "ผู้เชี่ยวชาญด้านจิตวิทยาคลินิกกว่า 8 ปี เชี่ยวชาญการช่วยเหลือผู้ที่เผชิญกับความวิตกกังวล ปัญหาความสัมพันธ์ และการพัฒนาตนเอง",
  availableThisWeek: 5,
  languages: ["ไทย", "English"],
};

const MENU_ITEMS = [
  { icon: CalendarMonthRoundedIcon, label: "การนัดหมายของฉัน", sub: "2 การนัดหมายที่กำลังจะมาถึง", path: "/appointments", color: PRIMARY },
  { icon: SportsEsportsRoundedIcon, label: "ประวัติการเล่นเกม", sub: "เล่นไปแล้ว 12 ครั้ง", path: "/game-history", color: "#7B68EE" },
  { icon: ArticleRoundedIcon, label: "บทความที่บันทึกไว้", sub: "5 บทความ", path: "/saved-articles", color: "#E8845A" },
  { icon: NotificationsNoneRoundedIcon, label: "การแจ้งเตือน", sub: "เปิดการแจ้งเตือน", path: "/settings/notifications", color: "#F59E0B" },
  { icon: SecurityRoundedIcon, label: "ความปลอดภัย", sub: "รหัสผ่าน และการยืนยันตัวตน", path: "/settings/security", color: "#6B7280" },
  { icon: HelpOutlineRoundedIcon, label: "ช่วยเหลือ & ติดต่อเรา", sub: "FAQ และการสนับสนุน", path: "/help", color: "#6B7280" },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  return (
    <Box sx={{ minHeight: "100vh", background: BG, pb: 12 }}>

      {/* ── Hero gradient header ── */}
      <Box sx={{
        background: `linear-gradient(160deg, ${PRIMARY} 0%, #3A6048 60%, #2D4D3A 100%)`,
        pt: 5, pb: 10, px: 3, position: "relative", overflow: "hidden",
      }}>
        {/* Decorative circles */}
        <Box sx={{ position: "absolute", top: -30, right: -30, width: 160, height: 160,
          borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.06)" }} />
        <Box sx={{ position: "absolute", top: 30, right: 30, width: 80, height: 80,
          borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.04)" }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
          <Typography fontWeight={800} sx={{ color: "rgba(255,255,255,0.9)", fontSize: "1.1rem" }}>
            โปรไฟล์
          </Typography>
          <Box component={motion.div} whileTap={{ scale: 0.92 }}
            onClick={() => {}}
            sx={{
              backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 3,
              p: 1, cursor: "pointer", backdropFilter: "blur(8px)",
            }}>
            <EditRoundedIcon sx={{ color: "white", fontSize: "1.1rem", display: "block" }} />
          </Box>
        </Box>

        {/* Profile info */}
        <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2.5 }}>
          <Box component={motion.div} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            sx={{ position: "relative", flexShrink: 0 }}>
            <Box sx={{
              width: 88, height: 88, borderRadius: "50%", overflow: "hidden",
              border: "3.5px solid rgba(255,255,255,0.4)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
              position: "relative",
            }}>
              <Image src={MOCK_PROFILE.image} alt={MOCK_PROFILE.name} fill
                style={{ objectFit: "cover" }} />
            </Box>
            {/* Online badge */}
            <Box sx={{
              position: "absolute", bottom: 2, right: 2,
              width: 18, height: 18, borderRadius: "50%",
              backgroundColor: "#4ADE80", border: "2.5px solid white",
            }} />
          </Box>

          <Box sx={{ flex: 1, pb: 0.5 }}>
            <Typography fontWeight={800} sx={{ color: "white", fontSize: "1.15rem", mb: 0.1 }}>
              {MOCK_PROFILE.name}
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.75)", fontSize: "0.82rem", mb: 0.25 }}>
              {MOCK_PROFILE.role}
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: "0.75rem" }}>
              {MOCK_PROFILE.title}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ── Stats card (overlapping header) ── */}
      <Container maxWidth="sm" sx={{ mt: -5, position: "relative", zIndex: 10 }}>
        <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          sx={{
            backgroundColor: "white", borderRadius: 5, p: 2.5,
            boxShadow: "0 8px 32px rgba(100,70,30,0.14)",
            border: "1px solid rgba(180,155,120,0.12)",
            mb: 2.5,
          }}>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0 }}>
            {[
              { value: MOCK_PROFILE.sessionsCompleted, label: "Sessions", sub: "ทั้งหมด" },
              { value: `${MOCK_PROFILE.rating}★`, label: "Rating", sub: `${MOCK_PROFILE.reviewCount} รีวิว` },
              { value: MOCK_PROFILE.availableThisWeek, label: "Slots", sub: "สัปดาห์นี้" },
            ].map((stat, i) => (
              <Box key={stat.label} sx={{
                textAlign: "center", px: 1,
                borderRight: i < 2 ? "1px solid #F0E8DC" : "none",
              }}>
                <Typography fontWeight={800} sx={{ color: PRIMARY, fontSize: "1.5rem", lineHeight: 1.1, mb: 0.25 }}>
                  {stat.value}
                </Typography>
                <Typography variant="caption" fontWeight={700} sx={{ color: "#2C2218", display: "block" }}>
                  {stat.label}
                </Typography>
                <Typography variant="caption" sx={{ color: "#9C8B76", fontSize: "0.65rem" }}>
                  {stat.sub}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ── Specialty tags ── */}
        <Box component={motion.div} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          sx={{ backgroundColor: "white", borderRadius: 2, p: 2.5, mb: 2.5,
            boxShadow: "0 4px 20px rgba(100,70,30,0.07)", border: "1px solid rgba(180,155,120,0.12)" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
            <Typography fontWeight={800} sx={{ color: "#2C2218" }}>ความเชี่ยวชาญ</Typography>
            <Box sx={{
              backgroundColor: `${PRIMARY}15`, borderRadius: 5, px: 1.25, py: 0.35,
              display: "flex", alignItems: "center", gap: 0.5,
            }}>
              <StarRoundedIcon sx={{ color: PRIMARY, fontSize: "0.8rem" }} />
              <Typography variant="caption" fontWeight={700} sx={{ color: PRIMARY }}>
                {MOCK_PROFILE.experience} ปี
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mb: 2 }}>
            {MOCK_PROFILE.specialties.map((s) => (
              <Box key={s} sx={{
                backgroundColor: "#EEF7F1", borderRadius: 2, px: 1.5, py: 0.5,
                border: `1.5px solid ${PRIMARY}25`,
              }}>
                <Typography variant="caption" fontWeight={600} sx={{ color: PRIMARY, fontSize: "0.78rem" }}>{s}</Typography>
              </Box>
            ))}
          </Box>

          {/* Language & price */}
          <Box sx={{ display: "flex", justifyContent: "space-between", pt: 1.5, borderTop: "1px solid #F0E8DC" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <Typography sx={{ fontSize: "0.9rem" }}>🌐</Typography>
              <Typography variant="body2" sx={{ color: "#5A4A36", fontWeight: 500 }}>
                {MOCK_PROFILE.languages.join(", ")}
              </Typography>
            </Box>
            <Typography fontWeight={800} sx={{ color: "#2C2218" }}>
              {MOCK_PROFILE.price.toLocaleString()}.-
              <Box component="span" sx={{ color: "#9C8B76", fontWeight: 400, fontSize: "0.78rem" }}> / ครั้ง</Box>
            </Typography>
          </Box>
        </Box>

        {/* ── About ── */}
        <Box component={motion.div} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          sx={{ backgroundColor: "white", borderRadius: 2, p: 2.5, mb: 2.5,
            boxShadow: "0 4px 20px rgba(100,70,30,0.07)", border: "1px solid rgba(180,155,120,0.12)" }}>
          <Typography fontWeight={800} sx={{ color: "#2C2218", mb: 1 }}>เกี่ยวกับฉัน</Typography>
          <Typography variant="body2" sx={{ color: "#5A4A36", lineHeight: 1.8 }}>{MOCK_PROFILE.about}</Typography>
        </Box>

        {/* ── Review score bar ── */}
        <Box component={motion.div} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          sx={{ backgroundColor: "white", borderRadius: 2, p: 2.5, mb: 2.5,
            boxShadow: "0 4px 20px rgba(100,70,30,0.07)", border: "1px solid rgba(180,155,120,0.12)" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography fontWeight={800} sx={{ color: "#2C2218" }}>คะแนนรีวิว</Typography>
            <Typography variant="caption" onClick={() => router.push(`/consult/1/reviews`)}
              sx={{ color: PRIMARY, fontWeight: 700, cursor: "pointer" }}>ดูทั้งหมด ›</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Typography fontWeight={900} sx={{ fontSize: "3rem", color: "#1F2937", lineHeight: 1 }}>
              {MOCK_PROFILE.rating}
            </Typography>
            <Box>
              <Box sx={{ display: "flex", gap: 0.25, mb: 0.5 }}>
                {[1,2,3,4,5].map((s) => <StarRoundedIcon key={s} sx={{ color: "#F59E0B", fontSize: "1.1rem" }} />)}
              </Box>
              <Typography variant="caption" sx={{ color: "#9C8B76" }}>{MOCK_PROFILE.reviewCount} รีวิว</Typography>
            </Box>
          </Box>
          {[5,4,3].map((star) => {
            const pct = star === 5 ? 78 : star === 4 ? 15 : 7;
            return (
              <Box key={star} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.75 }}>
                <Typography variant="caption" sx={{ width: 12, color: "#6B7280", textAlign: "right" }}>{star}</Typography>
                <StarRoundedIcon sx={{ color: "#F59E0B", fontSize: "0.85rem" }} />
                <LinearProgress variant="determinate" value={pct} sx={{
                  flex: 1, height: 7, borderRadius: 4, backgroundColor: "#F5ECD7",
                  "& .MuiLinearProgress-bar": { backgroundColor: "#F59E0B", borderRadius: 4 },
                }} />
                <Typography variant="caption" sx={{ width: 28, color: "#9C8B76", fontSize: "0.7rem" }}>{pct}%</Typography>
              </Box>
            );
          })}
        </Box>

        {/* ── Menu items ── */}
        <Box component={motion.div} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          sx={{ backgroundColor: "white", borderRadius: 2, overflow: "hidden",
            boxShadow: "0 4px 20px rgba(100,70,30,0.07)", border: "1px solid rgba(180,155,120,0.12)", mb: 2 }}>
          {MENU_ITEMS.map(({ icon: Icon, label, sub, path, color }, i) => (
            <Box key={label}>
              {i > 0 && <Divider sx={{ borderColor: "#F5ECD7" }} />}
              <Box onClick={() => router.push(path)}
                sx={{ display: "flex", alignItems: "center", gap: 1.75, px: 2.5, py: 2,
                  cursor: "pointer", "&:hover": { backgroundColor: "#FDFAF5" }, transition: "background 0.15s" }}>
                <Box sx={{
                  width: 40, height: 40, borderRadius: 3, flexShrink: 0,
                  backgroundColor: color + "15", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon sx={{ color, fontSize: "1.2rem" }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography fontWeight={700} sx={{ color: "#1F2937", fontSize: "0.92rem" }}>{label}</Typography>
                  <Typography variant="caption" sx={{ color: "#9C8B76" }}>{sub}</Typography>
                </Box>
                <ChevronRightRoundedIcon sx={{ color: "#D1C4B4", fontSize: "1.2rem" }} />
              </Box>
            </Box>
          ))}
        </Box>

        {/* ── Logout ── */}
        <Button fullWidth variant="outlined" onClick={async () => { await signOut(); router.push("/"); }}
          startIcon={<LogoutRoundedIcon />}
          sx={{
            py: 1.6, borderRadius: "14px", textTransform: "none", fontWeight: 700,
            color: "#EF4444", borderColor: "#FCA5A5", borderWidth: 1.5,
            "&:hover": { backgroundColor: "#FEF2F2", borderColor: "#EF4444" },
          }}>
          ออกจากระบบ
        </Button>
      </Container>
    </Box>
  );
}
