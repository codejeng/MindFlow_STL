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
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
      }}>
        {/* Quadrants */}
        <Box sx={{ position: "absolute", top: 0, left: 0, width: "50%", height: "50%", backgroundColor: "#BDCEB4", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRight: "3px solid #FFF", borderBottom: "3px solid #FFF", p: 1, textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "#3B4A3F", fontWeight: 700, lineHeight: 1.3 }}>สิ่งที่คุณและ<br/>คนอื่นรู้</Typography>
          <Typography variant="caption" sx={{ color: "#3B4A3F", fontWeight: 700, fontSize: "0.65rem", mt: 0.5 }}>(Open Area)</Typography>
        </Box>
        <Box sx={{ position: "absolute", top: 0, right: 0, width: "50%", height: "50%", backgroundColor: "#F4D3BC", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderBottom: "3px solid #FFF", p: 1, textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "#6A4A3A", fontWeight: 700, lineHeight: 1.3 }}>สิ่งที่คุณไม่รู้<br/>แต่คนอื่นรู้</Typography>
          <Typography variant="caption" sx={{ color: "#6A4A3A", fontWeight: 700, fontSize: "0.65rem", mt: 0.5 }}>(Blind Spot)</Typography>
        </Box>
        <Box sx={{ position: "absolute", bottom: 0, left: 0, width: "50%", height: "50%", backgroundColor: "#FCE5BC", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRight: "3px solid #FFF", p: 1, textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "#6A5A3A", fontWeight: 700, lineHeight: 1.3 }}>สิ่งที่คุณรู้<br/>แต่คนอื่นไม่รู้</Typography>
          <Typography variant="caption" sx={{ color: "#6A5A3A", fontWeight: 700, fontSize: "0.65rem", mt: 0.5 }}>(Hidden Area)</Typography>
        </Box>
        <Box sx={{ position: "absolute", bottom: 0, right: 0, width: "50%", height: "50%", backgroundColor: "#E4B59D", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 1, textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "#5A3A2A", fontWeight: 700, lineHeight: 1.3 }}>สิ่งที่ไม่มีใครรู้</Typography>
          <Typography variant="caption" sx={{ color: "#5A3A2A", fontWeight: 700, fontSize: "0.65rem", mt: 0.5 }}>(Unknown Area)</Typography>
        </Box>

        {/* Data Point */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          style={{
            position: "absolute",
            left: `${100 - y}%`, // y is Self-Assessment. High y = small left (Left Column)
            top: `${100 - x}%`,  // x is Peer-Feedback. High x = small top (Top Row)
            width: 18,
            height: 18,
            backgroundColor: "#2C2218",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 0 4px rgba(44, 34, 24, 0.2)`,
            zIndex: 10,
          }}
        />
      </Box>
    </Box>
  );
}
