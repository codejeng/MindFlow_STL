"use client";
import { Box, Typography, Button, CircularProgress, Avatar, Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import ImportContactsRoundedIcon from "@mui/icons-material/ImportContactsRounded";
import FeedbackFAB from "@/components/common/FeedbackFAB";
import CSSParticles from "@/components/common/CSSParticles";

const PRIMARY = "#4E7B5E"; // Old brand green
const ACCENT  = "#CF6B3E"; // Warm orange accent
const BG_TOP  = "#FDFBF7"; // Return to warm cream for pastel theme
const BG_BOT  = "#F5EFE6";

export default function Home() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <Box sx={{
      minHeight: "100vh",
      background: `linear-gradient(170deg, ${BG_TOP} 0%, ${BG_BOT} 100%)`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      overflowX: "hidden",
    }}>

      <CSSParticles />

      {/* ── Top right: Auth ── */}
      <Box sx={{ position: "absolute", top: 18, right: 18, zIndex: 10 }}>
        {loading ? (
          <CircularProgress size={20} sx={{ color: PRIMARY }} />
        ) : user ? (
          <>
            <Avatar onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{ width: 34, height: 34, background: `linear-gradient(135deg,${PRIMARY},#7AA880)`,
                cursor: "pointer", fontSize: "0.85rem", fontWeight: 700 }}>
              {user.email?.charAt(0).toUpperCase()}
            </Avatar>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}
              PaperProps={{ sx: { borderRadius: 3, mt: 1, minWidth: 180 } }}>
              <MenuItem disabled sx={{ opacity: 1 }}>
                <PersonOutlineRoundedIcon sx={{ mr: 1, fontSize: 17, color: "#999" }} />
                <Typography variant="body2" noWrap sx={{ maxWidth: 140, color: "#555" }}>{user.email}</Typography>
              </MenuItem>
              <MenuItem onClick={async () => { setAnchorEl(null); await signOut(); router.refresh(); }}
                sx={{ color: "#E05A7A" }}>
                <LogoutRoundedIcon sx={{ mr: 1, fontSize: 17 }} />ออกจากระบบ
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button size="small" onClick={() => router.push("/login")}
            sx={{
              color: "#5A4A36", fontWeight: 700, textTransform: "none", borderRadius: 6,
              backgroundColor: "rgba(255,255,255,0.75)", px: 2, fontSize: "0.82rem",
              border: "1.5px solid rgba(90,74,54,0.2)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
            }}>
            เข้าสู่ระบบ
          </Button>
        )}
      </Box>

      {/* ── Main content ── */}
      <Box sx={{
        width: "100%", maxWidth: 400,
        display: "flex", flexDirection: "column", alignItems: "center",
        px: 3, pt: 5, pb: 12,
      }}>

        {/* Logo */}
        <Box component={motion.div}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, type: "spring", stiffness: 180 }}
          sx={{ mb: -4 }}>
          <Image src="/images/logo.png" alt="Mindflow" width={260} height={260}
            style={{ objectFit: "contain" }} priority />
        </Box>

        {/* Subtitle */}
        <Box component={motion.div}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.22 }}
          sx={{ textAlign: "center", mb: 4, px: 1 }}>
          <Typography sx={{ color: "#D1868B", fontSize: "1.15rem", lineHeight: 1.4, fontWeight: 800, mb: 1 }}>
            The Path to Understanding Ecosystem
          </Typography>
          <Typography sx={{ color: "#7A6248", fontSize: "1rem", lineHeight: 1.6, fontWeight: 400 }}>
            ที่สร้างโอกาสให้เด็กและเยาวชน
          </Typography>
          <Typography sx={{ color: "#7A6248", fontSize: "1rem", lineHeight: 1.6, fontWeight: 400 }}>
            ผ่านจุดเริ่มต้นเล็กๆ จากการเล่น
          </Typography>
        </Box>

        {/* Hero Image */}
        <Box component={motion.div}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          sx={{
            width: "100%",
            maxWidth: 380,
            mb: 5,
            px: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image
            src="/images/hero-board.png"
            alt="Mindflow Board Game"
            width={1024}
            height={736}
            style={{ 
              objectFit: "contain", 
              width: "100%", 
              height: "auto",
              borderRadius: "16px",
              boxShadow: "0 12px 35px rgba(100,70,30,0.12)",
            }}
            priority
          />
        </Box>

        {/* Buttons */}
        <Box component={motion.div}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.42 }}
          sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2, position: "relative", zIndex: 5 }}>

          {/* เล่นเกม */}
          <Button variant="contained" fullWidth size="large"
            onClick={() => router.push("/select-deck")}
            component={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            startIcon={<SportsEsportsRoundedIcon sx={{ fontSize: "1.4rem !important" }} />}
            endIcon={<ChevronRightRoundedIcon sx={{ fontSize: "1.5rem !important", opacity: 0.85 }} />}
            sx={{
              py: 2, px: 3, borderRadius: "20px",
              fontSize: "1.1rem", fontWeight: 800, textTransform: "none",
              justifyContent: "space-between",
              background: `linear-gradient(135deg, ${PRIMARY} 0%, #7AA880 100%)`,
              color: "#FFFFFF",
              boxShadow: `0 8px 30px rgba(78,123,94,0.35)`,
              border: "1px solid rgba(255,255,255,0.25)",
              letterSpacing: "0.02em",
              "& .MuiButton-startIcon": { mr: 1.5, ml: 0, color: "#FFFFFF" },
              "& .MuiButton-endIcon": { ml: "auto", color: "#FFFFFF" },
              "&:hover": { 
                background: `linear-gradient(135deg, #3C634A 0%, ${PRIMARY} 100%)`,
                boxShadow: `0 10px 35px rgba(78,123,94,0.45)`,
              },
            }}>
            เล่นเกม
          </Button>



          {/* ปรึกษาผู้เชี่ยวชาญ */}
          <Button variant="contained" fullWidth size="large"
            onClick={() => router.push("/consult")}
            component={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            startIcon={<ForumRoundedIcon sx={{ fontSize: "1.4rem !important" }} />}
            endIcon={<ChevronRightRoundedIcon sx={{ fontSize: "1.5rem !important", opacity: 0.85 }} />}
            sx={{
              py: 2, px: 3, borderRadius: "20px",
              fontSize: "1.1rem", fontWeight: 800, textTransform: "none",
              justifyContent: "space-between",
              background: `linear-gradient(135deg, ${ACCENT} 0%, #E08A63 100%)`,
              color: "#FFFFFF",
              boxShadow: `0 8px 30px rgba(207,107,62,0.35)`,
              border: "1px solid rgba(255,255,255,0.6)",
              letterSpacing: "0.02em",
              "& .MuiButton-startIcon": { mr: 1.5, ml: 0, color: "#FFFFFF" },
              "& .MuiButton-endIcon": { ml: "auto", color: "#FFFFFF" },
              "&:hover": { 
                background: `linear-gradient(135deg, #B5582F 0%, ${ACCENT} 100%)`,
                boxShadow: `0 10px 35px rgba(207,107,62,0.45)`,
              },
            }}>
            ปรึกษาผู้เชี่ยวชาญ
          </Button>
        </Box>
      </Box>

      <FeedbackFAB />
    </Box>
  );
}
