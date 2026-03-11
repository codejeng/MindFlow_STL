"use client";

import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import type { Question } from "@/data/questions";

interface QuestionCardProps {
  question: Question;
  onAnswer: (choiceIndex: number) => void;
  selectedAnswer: number | null;
  disabled: boolean;
}

const CHOICE_LABELS = ["A", "B", "C", "D"];
const CHOICE_COLORS = ["#1B7B7E", "#F0A0B0", "#E8A838", "#7B68EE"];

export default function QuestionCard({
  question, onAnswer, selectedAnswer, disabled,
}: QuestionCardProps) {
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
      <Typography variant="h6" fontWeight={500} sx={{ mb: 3, lineHeight: 1.7 }}>
        {question.text}
      </Typography>

      {/* Choices – no right/wrong, just selection highlight */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {question.choices.map((choice, index) => {
          const isSelected = selectedAnswer === index;
          return (
            <Button
              key={index}
              component={motion.button}
              whileHover={disabled ? {} : { scale: 1.02 }}
              whileTap={disabled ? {} : { scale: 0.98 }}
              onClick={() => !disabled && onAnswer(index)}
              disabled={disabled && !isSelected}
              sx={{
                display: "flex", alignItems: "center", gap: 1.5, p: 1.5,
                borderRadius: 3, textAlign: "left", justifyContent: "flex-start",
                textTransform: "none",
                border: `2px solid ${isSelected ? CHOICE_COLORS[index] : CHOICE_COLORS[index] + "33"}`,
                backgroundColor: isSelected ? CHOICE_COLORS[index] + "15" : "transparent",
                color: "text.primary",
                transition: "all 0.2s ease",
                "&:hover": disabled ? {} : { backgroundColor: CHOICE_COLORS[index] + "10", borderColor: CHOICE_COLORS[index] },
              }}
            >
              {/* Label circle */}
              <Box sx={{
                width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                backgroundColor: isSelected ? CHOICE_COLORS[index] : CHOICE_COLORS[index] + "20",
                color: isSelected ? "white" : CHOICE_COLORS[index],
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: "0.875rem",
              }}>
                {CHOICE_LABELS[index]}
              </Box>
              <Typography variant="body1" fontWeight={isSelected ? 600 : 400} sx={{ flex: 1 }}>
                {choice.text}
              </Typography>
              {isSelected && <Typography fontSize="1.25rem">✓</Typography>}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}
