"use client";

import { Box } from "@mui/material";
import { motion } from "framer-motion";

export default function CSSParticles() {
  // Use deterministic pseudo-random values based on index to prevent SSR hydration mismatch
  const colors = [
    "rgba(255, 255, 255, 0.9)", // Bright white
    "rgba(207, 107, 62, 0.6)",  // Accent orange
    "rgba(78, 123, 94, 0.5)",   // Primary green
    "rgba(255, 215, 0, 0.6)"    // Golden yellow
  ];

  const particles = [...Array(35)].map((_, i) => {
    const size = (i * 7) % 20 + 6; // Larger sizes: 6 to 26
    const startX = (i * 13) % 100;
    const duration = (i * 5) % 15 + 12; // 12 to 27
    const delay = (i * 3) % 5;
    const offset = (i * 11) % 30 - 15; // More horizontal drift
    const color = colors[i % colors.length];
    return { id: i, size, startX, duration, delay, offset, color };
  });

  return (
    <Box sx={{ position: "absolute", width: "100%", height: "100%", overflow: "hidden", zIndex: 0, pointerEvents: "none", top: 0, left: 0 }}>
      {particles.map((p) => (
        <Box
          key={p.id}
          component={motion.div}
          initial={{ y: "110vh", x: `${p.startX}vw`, opacity: 0, rotate: 0 }}
          animate={{ y: "-10vh", x: `${p.startX + p.offset}vw`, opacity: [0, 0.8, 1, 0], rotate: 360 }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
          sx={{
            position: "absolute",
            width: p.size, height: p.size,
            backgroundColor: p.color,
            borderRadius: p.id % 4 === 0 ? "3px" : "50%",
            boxShadow: `0 0 ${p.size * 1.5}px ${p.color}`,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </Box>
  );
}
