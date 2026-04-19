"use client";

import React, { use } from "react";
import { Box, Card, Typography, IconButton, Chip, Button, Divider, LinearProgress, AvatarGroup, Avatar } from "@mui/material";
import { ArrowLeft, Brain, Target, AlertTriangle, Zap, GitPullRequest, ArrowRight, Activity } from "lucide-react";
import { useRouter } from "next/navigation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, Cell } from "recharts";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const SUPPORTING_DATA = [
  { group: "10-12 yrs", before: 78, current: 75 },
  { group: "13-15 yrs", before: 82, current: 64 }, // massive drop
  { group: "16-18 yrs", before: 79, current: 76 },
];

export default function InsightDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  return (
    <Box sx={{ width: "100%", pb: 8, display: "flex", flexDirection: "column", gap: 4 }}>
      
      {/* 1. Header & Breadcrumb */}
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <IconButton onClick={() => router.back()} sx={{ bgcolor: "white", border: "1px solid #E2E8F0" }}>
          <ArrowLeft size={20} />
        </IconButton>
        <Box>
          <Typography variant="h5" fontWeight={800} color="#2D3748" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            Insight Detail <Chip label={id} size="small" sx={{ fontWeight: 800, bgcolor: "#EDF2F7", color: "#4A5568" }} />
          </Typography>
        </Box>
      </Box>

      {/* 2. Insight Summary & Root Cause */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "5fr 7fr" }, gap: 4 }}>
        
        {/* Left: Summary */}
        <Card sx={{ p: 4, borderRadius: "24px", border: "1px solid #EDF2F7", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Chip label="High Impact Warning" size="small" icon={<AlertTriangle size={14} />} sx={{ bgcolor: "#FFF5F5", color: "#E53E3E", fontWeight: 800, "& .MuiChip-icon": { color: "inherit" } }} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Brain size={16} color="#4A5568" />
              <Typography variant="body2" fontWeight={800} color="text.secondary">87% CONFIDENCE</Typography>
            </Box>
          </Box>
          <Typography variant="h4" fontWeight={800} sx={{ mb: 2, lineHeight: 1.3, color: "#2D3748" }}>
            Communication ลดลงอย่างมีนัยสำคัญในกลุ่มช่วงวัย 13–15 ปี
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
            การแพทเทิร์นพบว่า Session ที่ผู้เล่นเด็กอยู่ในช่วงวัย 13-15 ปี มีอัตราการใช้ Pass Token หรือให้คำตอบแบบปัดรำคาญ (Avoidance) สูงขึ้น 18% เมื่อเจอคำถามหมวดครอบครัว
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1 }}>Affected Cohort Profile</Typography>
            <Box sx={{ p: 2, bgcolor: "#F7FAFC", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box>
                <Typography variant="h5" fontWeight={800} color="#2D3748">1,240 <span style={{ fontSize: "0.9rem", color: "#718096" }}>Families</span></Typography>
              </Box>
              <AvatarGroup max={4} sx={{ "& .MuiAvatar-root": { width: 32, height: 32, fontSize: "0.8rem", fontWeight: 700 } }}>
                <Avatar>A</Avatar><Avatar>B</Avatar><Avatar>C</Avatar><Avatar>D</Avatar><Avatar>E</Avatar>
              </AvatarGroup>
            </Box>
          </Box>
        </Card>

        {/* Right: Explainable AI - Root Cause */}
        <Card sx={{ p: 4, borderRadius: "24px", background: "linear-gradient(135deg, #1B7B7E, #145E61)", color: "white", boxShadow: "0 10px 40px rgba(27,123,126,0.3)" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
            <Zap size={28} color="#FFD700" />
            <Typography variant="h5" fontWeight={800}>Root Cause Analysis</Typography>
          </Box>
          <Box sx={{ bgcolor: "rgba(255,255,255,0.1)", p: 3, borderRadius: "16px", mb: 4, border: "1px solid rgba(255,255,255,0.2)" }}>
            <Typography variant="body1" sx={{ fontWeight: 600, lineHeight: 1.7 }}>
              "Pattern recognition detects that parents in this demographic often follow up teenager's answers with 'Judgmental' inputs within 5 seconds. This micro-rejection trains teenagers to utilize Pass Tokens proactively in subsequent rounds to avoid conflict."
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Box>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5 }}>Behavioral Trigger</Typography>
              <Typography variant="h6" fontWeight={800}>Parental Judgment</Typography>
            </Box>
            <ArrowRight size={24} color="rgba(255,255,255,0.5)" />
            <Box>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5 }}>Teen Response</Typography>
              <Typography variant="h6" fontWeight={800}>Proactive Avoidance</Typography>
            </Box>
          </Box>
        </Card>
      </Box>

      {/* 3. Supporting Data & Recommendation CTA */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 4 }}>
        
        {/* Data Chart */}
        <Card sx={{ p: 4, borderRadius: "24px", border: "1px solid #EDF2F7", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
          <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>Communication Score (Last 30 Days)</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Comparing previous baseline vs current trend across age groups.</Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SUPPORTING_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EDF2F7" />
                <XAxis dataKey="group" axisLine={false} tickLine={false} tick={{ fontSize: 13, fontWeight: 600 }} dy={10} />
                <YAxis hide domain={[0, 100]} />
                <RechartsTooltip cursor={{ fill: "#F7FAFC" }} />
                <Bar dataKey="before" fill="#E2E8F0" radius={[4, 4, 0, 0]} barSize={30} name="Baseline" />
                <Bar dataKey="current" fill="#F56565" radius={[4, 4, 0, 0]} barSize={30} name="Current" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Card>

        {/* Recommendation Engine */}
        <Card sx={{ p: 4, borderRadius: "24px", border: "1px solid #EDF2F7", boxShadow: "0 4px 20px rgba(0,0,0,0.02)", display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
            <Target size={24} color="#7B68EE" />
            <Typography variant="h6" fontWeight={800}>Recommended Action</Typography>
          </Box>
          <Box sx={{ p: 3, borderRadius: "16px", bgcolor: "#F7F5FF", border: "1px solid #E9E4FF", mb: 4, flex: 1 }}>
            <Typography variant="subtitle1" fontWeight={800} color="#553C9A" sx={{ mb: 1 }}>
              Deploy 'Active Listening' Phase
            </Typography>
            <Typography variant="body2" color="#7B68EE" sx={{ mb: 3 }}>
              Adjust the game algorithm for this segment. Introduce "Gag Rule" cards for parents, forcing them to only reflect instead of judge for the next 3 sessions.
            </Typography>
            <Box sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
              <Typography variant="caption" fontWeight={700} color="#553C9A">Expected Recovery Impact</Typography>
              <Typography variant="caption" fontWeight={800} color="#48BB78">+12% COM</Typography>
            </Box>
            <LinearProgress variant="determinate" value={75} sx={{ height: 6, borderRadius: 3, bgcolor: "rgba(123, 104, 238, 0.2)", "& .MuiLinearProgress-bar": { bgcolor: "#48BB78" } }} />
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" fullWidth startIcon={<GitPullRequest size={18} />} sx={{ py: 1.5, borderRadius: "12px", bgcolor: "#7B68EE", fontWeight: 700, textTransform: "none", "&:hover": { bgcolor: "#6366f1" } }}>
              Apply Optimization Algorithm
            </Button>
          </Box>
        </Card>

      </Box>

    </Box>
  );
}
