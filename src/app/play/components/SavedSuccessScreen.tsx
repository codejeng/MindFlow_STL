"use client";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const BG_CARD = "#FFFFFF";
const PRIMARY = "#4E7B5E";

interface Props {
  onBack: () => void;
  onDone: () => void;
}

export default function SavedSuccessScreen({ onBack, onDone }: Props) {
  return (
    <motion.div key="saved" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>

      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton onClick={onBack} sx={{ color: "#7A6248" }}>
          <ArrowBackRoundedIcon />
        </IconButton>
        <Typography fontWeight={800} sx={{ flex: 1, textAlign: "center", color: "#3B9AB8", fontSize: "0.85rem", letterSpacing: "0.05em", mr: 5 }}>
          11. บันทึกสำเร็จ
        </Typography>
      </Box>

      <Box sx={{
        backgroundColor: BG_CARD, borderRadius: 2, p: 4, pt: 6, pb: 4,
        boxShadow: "0 4px 24px rgba(100,70,30,0.09)", mb: 3, textAlign: "center",
        border: "1px solid rgba(180,155,120,0.18)",
      }}>
        <Typography fontWeight={900} sx={{ color: "#2C2218", fontSize: "1.4rem", mb: 4 }}>
          บันทึกเรียบร้อย!
        </Typography>

        {/* Checkmark icon */}
        <Box sx={{
          width: 100, height: 100, borderRadius: "50%", mx: "auto", mb: 5,
          backgroundColor: PRIMARY, display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 8px 24px ${PRIMARY}40`,
        }}>
          <CheckRoundedIcon sx={{ color: "#FFFFFF", fontSize: "4rem" }} />
        </Box>

        <Typography variant="body2" sx={{ color: "#7A6248", mb: 1, fontWeight: 600, lineHeight: 1.6 }}>
          ข้อมูลของคุณถูกบันทึกแล้ว<br />
          ระบบจะอัปเดตภารกิจให้คุณอัตโนมัติ
        </Typography>

        <Box sx={{ mt: 5 }}>
          <Button variant="contained" fullWidth onClick={onDone}
            component={motion.button} whileTap={{ scale: 0.97 }}
            sx={{
              py: 1.85, borderRadius: 4, fontWeight: 800, fontSize: "1.1rem",
              background: `linear-gradient(135deg, ${PRIMARY}, #7AA880)`,
              boxShadow: `0 6px 20px ${PRIMARY}40`,
              textTransform: "none",
            }}>
            ตกลง
          </Button>
        </Box>
      </Box>
    </motion.div>
  );
}
