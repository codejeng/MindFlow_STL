import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

interface Props {
  x: number; // Peer-Feedback % (0-100)
  y: number; // Self-Assessment % (0-100)
  dimensionName: string;
}

const PRIMARY = "#4E7B5E";

export default function JohariGraph({ x, y, dimensionName }: Props) {
  return (
    <Box sx={{ width: "100%", maxWidth: 300, mx: "auto", display: "flex", flexDirection: "column", gap: 1 }}>
      <Typography fontWeight={700} sx={{ textAlign: "center", color: "#2C2218", mb: 1 }}>
        {dimensionName}
      </Typography>

      {/* Graph Area */}
      <Box sx={{
        position: "relative",
        width: "100%",
        aspectRatio: "1/1",
        backgroundColor: "#F9F5F0",
        border: "2px solid rgba(180,155,120,0.3)",
        borderRadius: 2,
        overflow: "hidden",
      }}>
        {/* Quadrants */}
        <Box sx={{ position: "absolute", top: 0, left: 0, width: "50%", height: "50%", borderRight: "1px dashed rgba(180,155,120,0.5)", borderBottom: "1px dashed rgba(180,155,120,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="caption" sx={{ color: "#9C8B76", fontWeight: 600, opacity: 0.6 }}>Unknown</Typography>
        </Box>
        <Box sx={{ position: "absolute", top: 0, right: 0, width: "50%", height: "50%", borderBottom: "1px dashed rgba(180,155,120,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="caption" sx={{ color: "#9C8B76", fontWeight: 600, opacity: 0.6 }}>Blind Spot</Typography>
        </Box>
        <Box sx={{ position: "absolute", bottom: 0, left: 0, width: "50%", height: "50%", borderRight: "1px dashed rgba(180,155,120,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="caption" sx={{ color: "#9C8B76", fontWeight: 600, opacity: 0.6 }}>Hidden Area</Typography>
        </Box>
        <Box sx={{ position: "absolute", bottom: 0, right: 0, width: "50%", height: "50%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: `${PRIMARY}10` }}>
          <Typography variant="caption" sx={{ color: PRIMARY, fontWeight: 700, opacity: 0.8 }}>Open Area</Typography>
        </Box>

        {/* X and Y Axis Labels */}
        <Typography variant="caption" sx={{ position: "absolute", bottom: 2, right: 8, color: "#9C8B76", fontSize: "0.6rem" }}>Known to Others →</Typography>
        <Typography variant="caption" sx={{ position: "absolute", top: 8, left: 2, color: "#9C8B76", fontSize: "0.6rem", transform: "rotate(-90deg)", transformOrigin: "0 0" }}>Known to Self →</Typography>

        {/* Data Point */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          style={{
            position: "absolute",
            left: `${x}%`,
            bottom: `${y}%`,
            width: 16,
            height: 16,
            backgroundColor: PRIMARY,
            borderRadius: "50%",
            transform: "translate(-50%, 50%)",
            boxShadow: `0 0 0 4px ${PRIMARY}30`,
          }}
        />
      </Box>
    </Box>
  );
}
