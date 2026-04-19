"use client";

import React from "react";
import { Box, Card, Typography, Avatar, AvatarGroup, Button, LinearProgress, Chip } from "@mui/material";
import { TrendingDown, Users, Activity, Target, Zap } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from "recharts";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const PREDICTIVE_TREND = [
  { month: "Jan", actual: 85, forecasted: 85 },
  { month: "Feb", actual: 82, forecasted: 82 },
  { month: "Mar", actual: 79, forecasted: 79 },
  { month: "Apr", actual: 75, forecasted: 75 }, // current point
  { month: "May", forecasted: 68 }, // dropped
  { month: "Jun", forecasted: 65 },
];

const AT_RISK_COHORT = [
  { id: "C-101", group: "Teens (14-16)", probability: 88, issue: "Severe Withdrawal" },
  { id: "C-102", group: "Single Parents", probability: 74, issue: "Burnout / Patience Drop" },
  { id: "C-103", group: "Pre-teens (9-12)", probability: 62, issue: "Increased Sibling Conflict" },
];

export default function PredictiveInsights() {
  return (
    <Box sx={{ width: "100%", pb: 8, display: "flex", flexDirection: "column", gap: 4 }}>

      {/* 1. Header Banner */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "#1A202C", color: "white", p: 4, borderRadius: "24px" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Box sx={{ p: 2, borderRadius: "16px", bgcolor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
            <Activity size={32} color="#F6E05E" />
          </Box>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
              <Typography variant="h4" fontWeight={800}>Predictive Forecasting</Typography>
              <Chip label="PRO" size="small" sx={{ bgcolor: "#7B68EE", color: "white", fontWeight: 800, fontSize: "0.7rem", height: 20 }} />
            </Box>
            <Typography variant="body1" sx={{ opacity: 0.8 }}>
              AI models predict future relationship strain based on current passive behaviors.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* 2. Main Simulation Area */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "8fr 4fr" }, gap: 4 }}>
        
        {/* Forecast Chart */}
        <Card sx={{ p: 4, borderRadius: "24px", border: "1px solid #EDF2F7", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
            <Box>
              <Typography variant="h6" fontWeight={800}>Communication Trajectory Simulation</Typography>
              <Typography variant="body2" color="text.secondary">Projected 3-month outcome if no intervention is applied.</Typography>
            </Box>
            <Chip icon={<TrendingDown size={14} />} label="-10% Predicted Drop" sx={{ bgcolor: "#FFF5F5", color: "#E53E3E", fontWeight: 800, "& .MuiChip-icon": { color: "inherit" } }} />
          </Box>
          
          <Box sx={{ height: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PREDICTIVE_TREND} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A0AEC0" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#A0AEC0" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F6AD55" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#F6AD55" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EDF2F7" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 13, fontWeight: 600, fill: "#718096" }} dy={10} />
                <YAxis hide domain={[0, 100]} />
                <RechartsTooltip />
                <Area type="monotone" dataKey="actual" stroke="#A0AEC0" strokeWidth={3} fill="url(#colorActual)" />
                <Area type="monotone" dataKey="forecasted" strokeDasharray="5 5" stroke="#ED8936" strokeWidth={3} fill="url(#colorForecast)" />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Card>

        {/* At-Risk Users */}
        <Card sx={{ p: 4, borderRadius: "24px", border: "1px solid #EDF2F7", boxShadow: "0 4px 20px rgba(0,0,0,0.02)", display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
            <Users size={24} color="#2D3748" />
            <Typography variant="h6" fontWeight={800}>Cohorts Most at Risk</Typography>
          </Box>

          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
            {AT_RISK_COHORT.map((cohort) => (
              <Box key={cohort.id}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2" fontWeight={800} color="#2D3748">{cohort.group}</Typography>
                  <Typography variant="caption" fontWeight={800} color={cohort.probability > 80 ? "#E53E3E" : "#DD6B20"}>{cohort.probability}% Probability</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={cohort.probability} 
                  sx={{ 
                    height: 8, borderRadius: 4, mb: 1,
                    bgcolor: cohort.probability > 80 ? "#FFF5F5" : "#FFFBEB",
                    "& .MuiLinearProgress-bar": { bgcolor: cohort.probability > 80 ? "#E53E3E" : "#DD6B20" }
                  }} 
                />
                <Typography variant="caption" color="text.secondary">Predicted: {cohort.issue}</Typography>
              </Box>
            ))}
          </Box>

          <Button variant="contained" fullWidth startIcon={<Target size={18} />} sx={{ mt: 4, py: 1.5, borderRadius: "12px", bgcolor: "#2D3748", fontWeight: 700, textTransform: "none" }}>
            Generate Mitigation Plan
          </Button>
        </Card>
      </Box>

    </Box>
  );
}
