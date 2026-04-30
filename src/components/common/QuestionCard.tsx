"use client";

import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import type { Question } from "@/data/questions";

interface QuestionCardProps {
  question: Question;
}

export default function QuestionCard({ question }: QuestionCardProps) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      sx={{ backgroundColor: "white", borderRadius: 4, p: 3, boxShadow: "0 8px 30px rgba(0,0,0,0.08)", maxWidth: 520, width: "100%", mx: "auto" }}
    >
      {/* Code badge + Age group badge */}
      <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
        <Box sx={{ display: "inline-block", backgroundColor: "#1B7B7E", color: "white", borderRadius: 2, px: 2, py: 0.5, fontWeight: 600, fontSize: "0.875rem" }}>
          {question.code}
        </Box>
        <Box sx={{ display: "inline-block", backgroundColor: "#E8A838", color: "white", borderRadius: 2, px: 2, py: 0.5, fontWeight: 600, fontSize: "0.875rem" }}>
          {question.ageGroup}
        </Box>
      </Box>

      {/* Question text */}
      <Typography variant="h6" fontWeight={500} sx={{ lineHeight: 1.7 }}>
        {question.text}
      </Typography>
    </Box>
  );
}
