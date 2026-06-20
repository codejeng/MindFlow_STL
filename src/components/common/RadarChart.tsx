"use client";
import { Box, Typography } from "@mui/material";

interface Props {
  openness: number;
  empathy: number;
  clarity: number;
  maxScore: number;
}

export default function RadarChart({ openness, empathy, clarity, maxScore }: Props) {
  const size = 160;
  const center = size / 2;
  const radius = (size / 2) - 20;

  // Normalized scores (0 to 1)
  const normO = Math.min(Math.max(openness / Math.max(maxScore, 1), 0), 1);
  const normE = Math.min(Math.max(empathy / Math.max(maxScore, 1), 0), 1);
  const normC = Math.min(Math.max(clarity / Math.max(maxScore, 1), 0), 1);

  // Triangle outer vertices
  const pTop = { x: center, y: center - radius };
  const pBotL = { x: center - radius * Math.cos(Math.PI / 6), y: center + radius * Math.sin(Math.PI / 6) };
  const pBotR = { x: center + radius * Math.cos(Math.PI / 6), y: center + radius * Math.sin(Math.PI / 6) };

  // Data vertices
  const dTop = { x: center, y: center - radius * normO };
  const dBotL = { x: center - radius * normE * Math.cos(Math.PI / 6), y: center + radius * normE * Math.sin(Math.PI / 6) };
  const dBotR = { x: center + radius * normC * Math.cos(Math.PI / 6), y: center + radius * normC * Math.sin(Math.PI / 6) };

  const dataPath = `${dTop.x},${dTop.y} ${dBotL.x},${dBotL.y} ${dBotR.x},${dBotR.y}`;

  return (
    <Box sx={{ position: "relative", width: "100%", height: size + 30, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <svg width={size + 40} height={size + 30} viewBox={`-20 -15 ${size + 40} ${size + 30}`} style={{ overflow: "visible" }}>
        {/* Outer Triangle background */}
        <polygon points={`${pTop.x},${pTop.y} ${pBotL.x},${pBotL.y} ${pBotR.x},${pBotR.y}`}
          fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1.5" strokeLinejoin="round" />
        
        {/* Inner grid lines (spokes) */}
        <line x1={center} y1={center} x2={pTop.x} y2={pTop.y} stroke="#E0E0E0" strokeWidth="1" />
        <line x1={center} y1={center} x2={pBotL.x} y2={pBotL.y} stroke="#E0E0E0" strokeWidth="1" />
        <line x1={center} y1={center} x2={pBotR.x} y2={pBotR.y} stroke="#E0E0E0" strokeWidth="1" />
        
        {/* Data polygon */}
        <polygon points={dataPath} fill="rgba(78,123,94,0.35)" stroke="#4E7B5E" strokeWidth="2" strokeLinejoin="round" />
        
        {/* Data points */}
        <circle cx={dBotL.x} cy={dBotL.y} r="3" fill="#4E7B5E" />
        <circle cx={dBotR.x} cy={dBotR.y} r="3" fill="#4E7B5E" />
        <circle cx={dTop.x} cy={dTop.y} r="3" fill="#4E7B5E" />

        {/* Labels inside SVG */}
        <text x={center} y={pTop.y - 10} textAnchor="middle" fill="#2C2218" fontSize="10" fontWeight="bold">Openness</text>
        <text x={pBotL.x - 10} y={pBotL.y + 15} textAnchor="end" fill="#2C2218" fontSize="10" fontWeight="bold">Empathy</text>
        <text x={pBotR.x + 10} y={pBotR.y + 15} textAnchor="start" fill="#2C2218" fontSize="10" fontWeight="bold">Self-Clarity</text>
      </svg>
    </Box>
  );
}
