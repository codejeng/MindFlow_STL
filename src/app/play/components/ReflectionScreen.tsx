"use client";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { REFLECTION_TAGS } from "@/constants/reflectionTags";

const PRIMARY = "#5A7A65";

interface Props {
  selectedTag: string | null;
  setSelectedTag: (id: string | null) => void;
  onConfirm: () => void;
}

export default function ReflectionScreen({ selectedTag, setSelectedTag, onConfirm }: Props) {
  return (
    <motion.div key="reflection" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>

      <Box sx={{
        backgroundColor: "#fff", borderRadius: 4, p: 3,
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)", mb: 2,
      }}>
        <Typography fontWeight={700} sx={{ color: "#1F2937", fontSize: "1.05rem", mb: 0.5 }}>
          เมื่อคุณสื่อสาร คุณรู้สึกอย่างไร?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          เลือก 1 คำที่ตรงกับตัวคุณมากที่สุด
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
          {REFLECTION_TAGS.map((tag) => {
            const selected = selectedTag === tag.id;
            return (
              <Box
                key={tag.id}
                component={motion.div}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedTag(selected ? null : tag.id)}
                sx={{
                  p: 1.75, borderRadius: 3, cursor: "pointer", textAlign: "center",
                  backgroundColor: selected ? tag.bg : "#F9FAFB",
                  border: `2px solid ${selected ? tag.color : "#E5E7EB"}`,
                  boxShadow: selected ? `0 4px 12px ${tag.color}30` : "none",
                  transition: "all 0.2s ease",
                }}
              >
                <Typography sx={{ fontSize: "1.4rem", mb: 0.25 }}>{tag.emoji}</Typography>
                <Typography variant="body2" fontWeight={selected ? 700 : 500}
                  sx={{ color: selected ? tag.color : "#4B5563", fontSize: "0.85rem" }}>
                  {tag.label}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Button variant="contained" fullWidth disabled={!selectedTag} onClick={onConfirm}
        sx={{
          py: 1.75, borderRadius: 3, fontWeight: 700, fontSize: "1rem",
          background: `linear-gradient(135deg, ${PRIMARY}, #7AA880)`,
          boxShadow: `0 4px 16px ${PRIMARY}40`,
          "&:disabled": { backgroundColor: "#D1D5DB", color: "#9CA3AF" },
        }}>
        ยืนยันคำตอบ →
      </Button>
    </motion.div>
  );
}
