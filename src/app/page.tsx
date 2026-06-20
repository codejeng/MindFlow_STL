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

const PRIMARY = "#4E7B5E";
const ACCENT  = "#CF6B3E";
const BG_TOP  = "#FAF0DC";
const BG_BOT  = "#EDE0CA";

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
          sx={{ textAlign: "center", mb: 4 }}>
          <Typography sx={{ color: "#7A6248", fontSize: "1.2rem", lineHeight: 1.5, fontWeight: 700 }}>
            เกมแห่งการเข้าใจตนเอง
            <br />
            และกันและกัน
          </Typography>
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
              background: `linear-gradient(135deg, #4E7B5E 0%, #689E79 100%)`,
              boxShadow: "0 8px 30px rgba(78,123,94,0.35)",
              border: "1px solid rgba(255,255,255,0.15)",
              letterSpacing: "0.02em",
              "& .MuiButton-startIcon": { mr: 1.5, ml: 0 },
              "& .MuiButton-endIcon": { ml: "auto" },
              "&:hover": { 
                background: `linear-gradient(135deg,#3E6B4E 0%,#4E7B5E 100%)`,
                boxShadow: "0 10px 35px rgba(78,123,94,0.45)",
              },
            }}>
            เล่นเกม
          </Button>

          {/* คู่มือการเล่น */}
          <Button variant="contained" fullWidth size="large"
            onClick={() => router.push("")}
            component={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            startIcon={<ImportContactsRoundedIcon sx={{ fontSize: "1.3rem !important", color: "#A88D6F" }} />}
            endIcon={<ChevronRightRoundedIcon sx={{ fontSize: "1.5rem !important", color: "#A88D6F", opacity: 0.7 }} />}
            sx={{
              py: 2, px: 3, borderRadius: "20px",
              fontSize: "1.05rem", fontWeight: 800, textTransform: "none",
              justifyContent: "space-between",
              background: "rgba(255,255,255,0.9)",
              color: "#5A4A36",
              boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
              border: "1px solid rgba(180,155,120,0.3)",
              backdropFilter: "blur(10px)",
              letterSpacing: "0.02em",
              "& .MuiButton-startIcon": { mr: 1.5, ml: 0 },
              "& .MuiButton-endIcon": { ml: "auto" },
              "&:hover": { 
                background: "#FFFFFF",
                boxShadow: "0 8px 25px rgba(0,0,0,0.09)",
                borderColor: "rgba(180,155,120,0.5)",
              },
            }}>
            คู่มือการเล่น
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
              background: `linear-gradient(135deg, #CF6B3E 0%, #DF7E52 100%)`,
              boxShadow: "0 8px 30px rgba(207,107,62,0.35)",
              border: "1px solid rgba(255,255,255,0.15)",
              letterSpacing: "0.02em",
              "& .MuiButton-startIcon": { mr: 1.5, ml: 0 },
              "& .MuiButton-endIcon": { ml: "auto" },
              "&:hover": { 
                background: `linear-gradient(135deg,#BF5B2E 0%,#CF6B3E 100%)`,
                boxShadow: "0 10px 35px rgba(207,107,62,0.45)",
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
