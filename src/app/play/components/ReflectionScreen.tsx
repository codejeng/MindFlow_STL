"use client";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { REFLECTION_TAGS } from "@/constants/reflectionTags";

const BG_CARD = "#FFFFFF";
const PRIMARY = "#4E7B5E";

interface Props {
  selectedTag: string | null;
  setSelectedTag: (id: string | null) => void;
  onBack: () => void;
  onConfirm: () => void;
}

export default function ReflectionScreen({ selectedTag, setSelectedTag, onBack, onConfirm }: Props) {
  // Separate the last tag ("อื่นๆ") to make it span full width at the bottom if we want,
  // or just put it in the grid. The mockup shows it centered at the bottom.
  const mainTags = REFLECTION_TAGS.slice(0, 6);
  const otherTag = REFLECTION_TAGS[6];

  return (
    <motion.div key="reflection" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>

      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Button
          onClick={onBack}
          sx={{ minWidth: 0, p: 1, color: "#7A6248", borderRadius: 3 }}
        >
          <ArrowBackRoundedIcon />
        </Button>
        <Typography fontWeight={800} sx={{ flex: 1, textAlign: "center", color: "#3B9AB8", fontSize: "0.85rem", letterSpacing: "0.05em", mr: 4 }}>
          8. Reflection (ตัวเอง)
        </Typography>
      </Box>

      {/* Main Card */}
      <Box sx={{
        backgroundColor: BG_CARD, borderRadius: 2, p: 4, pt: 5, pb: 4,
        boxShadow: "0 4px 24px rgba(100,70,30,0.09)", mb: 3, textAlign: "center",
        border: "1px solid rgba(180,155,120,0.18)",
      }}>
        <Typography fontWeight={900} sx={{ color: "#2C2218", fontSize: "1.4rem", mb: 2 }}>
          สะท้อนตัวเอง
        </Typography>
        <Typography variant="body2" sx={{ color: "#7A6248", mb: 4, lineHeight: 1.5, px: 2 }}>
          คำตอบของคุณสะท้อนตัวคุณ<br />ในด้านใดมากที่สุด
        </Typography>

        {/* 2-Column Grid for main tags */}
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5, mb: 1.5 }}>
          {mainTags.map((tag) => {
            const selected = selectedTag === tag.id;
            return (
              <Box
                key={tag.id}
                component={motion.div}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedTag(selected ? null : tag.id)}
                sx={{
                  p: 1.5, borderRadius: 3, cursor: "pointer",
                  backgroundColor: selected ? tag.color : "#F9F5F0",
                  border: selected ? `2px solid ${tag.color}` : "2px solid #EDE3D8",
                  boxShadow: selected ? `0 4px 12px ${tag.color}40` : "none",
                  transition: "all 0.2s ease",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <Typography fontWeight={700}
                  sx={{ color: selected ? "#FFFFFF" : "#2C2218", fontSize: "0.95rem" }}>
                  {tag.label}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {/* Other Tag (centered) */}
        {otherTag && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              component={motion.div}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSelectedTag(selectedTag === otherTag.id ? null : otherTag.id)}
              sx={{
                width: "50%", p: 1.5, borderRadius: 3, cursor: "pointer",
                backgroundColor: selectedTag === otherTag.id ? otherTag.color : "#F9F5F0",
                border: selectedTag === otherTag.id ? `2px solid ${otherTag.color}` : "2px solid #EDE3D8",
                boxShadow: selectedTag === otherTag.id ? `0 4px 12px ${otherTag.color}40` : "none",
                transition: "all 0.2s ease",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <Typography fontWeight={700}
                sx={{ color: selectedTag === otherTag.id ? "#FFFFFF" : "#2C2218", fontSize: "0.95rem" }}>
                {otherTag.label}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      {/* Button */}
      <Button variant="contained" fullWidth disabled={!selectedTag} onClick={onConfirm}
        component={motion.button} whileTap={{ scale: 0.97 }}
        sx={{
          py: 1.85, borderRadius: 4, fontWeight: 800, fontSize: "1.1rem",
          background: `linear-gradient(135deg, ${PRIMARY}, #7AA880)`,
          boxShadow: `0 6px 20px ${PRIMARY}40`,
          textTransform: "none",
          "&:disabled": { backgroundColor: "#E5E7EB", color: "#9CA3AF", boxShadow: "none", background: "#E5E7EB" },
        }}>
        บันทึก
      </Button>
    </motion.div>
  );
}
