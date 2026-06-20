"use client";
import { Box, Typography } from "@mui/material";

export default function JohariWindow() {
  return (
    <Box sx={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr 1fr",
      gap: 0.5,
      width: "100%",
      aspectRatio: "1/1",
      maxWidth: 220,
      mx: "auto"
    }}>
      {/* Top Left: Open Area */}
      <Box sx={{ backgroundColor: "#CBE0D1", borderRadius: "12px 4px 4px 4px", display: "flex", alignItems: "center", justifyContent: "center", p: 1 }}>
        <Typography fontWeight={700} sx={{ color: "#2C2218", fontSize: "0.75rem", textAlign: "center" }}>Open Area</Typography>
      </Box>

      {/* Top Right: Blind Spot */}
      <Box sx={{ backgroundColor: "#F0D5B5", borderRadius: "4px 12px 4px 4px", display: "flex", alignItems: "center", justifyContent: "center", p: 1 }}>
        <Typography fontWeight={700} sx={{ color: "#2C2218", fontSize: "0.75rem", textAlign: "center" }}>Blind Spot</Typography>
      </Box>

      {/* Bottom Left: Hidden Area */}
      <Box sx={{ backgroundColor: "#FCE0A6", borderRadius: "4px 4px 4px 12px", display: "flex", alignItems: "center", justifyContent: "center", p: 1 }}>
        <Typography fontWeight={700} sx={{ color: "#2C2218", fontSize: "0.75rem", textAlign: "center" }}>Hidden Area</Typography>
      </Box>

      {/* Bottom Right: Unknown Area */}
      <Box sx={{ backgroundColor: "#F2B8AA", borderRadius: "4px 4px 12px 4px", display: "flex", alignItems: "center", justifyContent: "center", p: 1 }}>
        <Typography fontWeight={700} sx={{ color: "#2C2218", fontSize: "0.75rem", textAlign: "center" }}>Unknown Area</Typography>
      </Box>
    </Box>
  );
}
