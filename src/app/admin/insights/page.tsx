"use client";

import React from "react";
import { Box, Card, Typography, Button, IconButton } from "@mui/material";
import { Brain, TrendingUp, AlertTriangle, CheckCircle2, ChevronRight, Zap, Target, Download } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { useRouter } from "next/navigation";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const KPIS = [
  { label: "Insights Generated", value: "8,432", icon: <Brain size={20} />, color: "#7B68EE" },
  { label: "High Risk Signals", value: "124", icon: <AlertTriangle size={20} />, color: "#F56565" },
  { label: "Avg Confidence", value: "92.5%", icon: <Target size={20} />, color: "#48BB78" },
  { label: "Actions Applied", value: "1,053", icon: <CheckCircle2 size={20} />, color: "#1B7B7E" },
];

const TREND_DATA = [
  { name: "Mon", risk: 24, positive: 45 },
  { name: "Tue", risk: 28, positive: 50 },
  { name: "Wed", risk: 22, positive: 48 },
  { name: "Thu", risk: 35, positive: 52 },
  { name: "Fri", risk: 18, positive: 60 },
  { name: "Sat", risk: 15, positive: 70 },
  { name: "Sun", risk: 12, positive: 85 },
];

export default function AIOverview() {
  const router = useRouter();

  return (
    <Box sx={{ width: "100%", pb: 8, display: "flex", flexDirection: "column", gap: 4 }}>
      
      {/* 1. Insight KPI Cards */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }, gap: 3 }}>
        {KPIS.map((kpi, i) => (
          <Card key={i} sx={{ p: 3, borderRadius: "20px", display: "flex", alignItems: "center", gap: 2, border: "1px solid #EDF2F7", boxShadow: "0 4px 20px rgba(0,0,0,0.02)", cursor: "pointer", transition: "transform 0.2s", "&:hover": { transform: "translateY(-4px)", borderColor: kpi.color, bgcolor: kpi.color + "05" } }}>
            <Box sx={{ p: 1.5, borderRadius: "12px", bgcolor: kpi.color + "15", color: kpi.color }}>
              {kpi.icon}
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" fontWeight={600}>{kpi.label}</Typography>
              <Typography variant="h5" fontWeight={800} color="#2D3748">{kpi.value}</Typography>
            </Box>
          </Card>
        ))}
      </Box>

      {/* 2. Top Insight Highlight & Operations */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "8fr 4fr" }, gap: 4 }}>
        
        {/* 🔥 Top Insight Highlight */}
        <Card sx={{ 
          borderRadius: "24px", overflow: "hidden", position: "relative",
          background: "linear-gradient(135deg, #1B7B7E, #145E61)", color: "white",
          boxShadow: "0 10px 40px rgba(27,123,126,0.3)"
        }}>
          <Box sx={{ position: "absolute", top: -50, right: -50, opacity: 0.1 }}><Zap size={300} /></Box>
          <Box sx={{ p: 5, position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                <Box sx={{ px: 1.5, py: 0.5, borderRadius: "8px", bgcolor: "rgba(255,255,255,0.2)", display: "inline-flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="caption" fontWeight={800} sx={{ letterSpacing: 1 }}>KEY INSIGHT OF THE WEEK</Typography>
                </Box>
                <Typography variant="body2" fontWeight={700} sx={{ opacity: 0.8, display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Target size={14} /> Confidence: 91%
                </Typography>
              </Box>
              <Typography variant="h3" fontWeight={800} sx={{ mb: 2, lineHeight: 1.2 }}>
                "กลุ่มเด็ก ม.ต้น มี Resilience (RES) สูงขึ้น แต่ Communication (COM) ลดลงถึง 18%"
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: "80%", lineHeight: 1.6 }}>
                AI Analysis ตรวจพบว่าวัยรุ่นช่วง 13-15 ปีมักข้ามการ์ดคำถามหมวดครอบครัวและเก็บความรู้สึกเก่งขึ้น นำไปสู่การสื่อสารที่ลดลงอย่างมีนัยสำคัญ
              </Typography>
            </Box>
            
            <Box sx={{ display: "flex", gap: 2, mt: 5 }}>
              <Button 
                variant="contained" 
                onClick={() => router.push("/admin/insights/feed/IN-704")}
                sx={{ bgcolor: "white", color: "#145E61", fontWeight: 800, borderRadius: "12px", px: 4, py: 1.5, "&:hover": { bgcolor: "#F0FAFA" } }}
              >
                View Detail & Root Cause
              </Button>
              <Button 
                sx={{ color: "white", border: "1px solid rgba(255,255,255,0.3)", fontWeight: 700, borderRadius: "12px", px: 4 }}
              >
                Apply Recommendation
              </Button>
            </Box>
          </Box>
        </Card>

        {/* Quick Actions & Trend Pattern */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Quick Actions */}
          <Card sx={{ p: 4, borderRadius: "24px", border: "1px solid #EDF2F7", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
            <Typography variant="h6" fontWeight={800} sx={{ mb: 3 }}>Quick Actions</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Button startIcon={<Brain size={18} />} variant="outlined" fullWidth sx={{ justifyContent: "flex-start", borderRadius: "12px", py: 1.5, color: "#7B68EE", borderColor: "#E9E4FF", bgcolor: "#F7F5FF", fontWeight: 700, textTransform: "none" }}>
                Generate New Insight Report
              </Button>
              <Button startIcon={<Download size={18} />} variant="outlined" fullWidth sx={{ justifyContent: "flex-start", borderRadius: "12px", py: 1.5, color: "#4A5568", borderColor: "#EDF2F7", fontWeight: 700, textTransform: "none" }}>
                Export Monthly Analysis (.CSV)
              </Button>
            </Box>
          </Card>

          {/* Trend Pattern */}
          <Card sx={{ p: 4, borderRadius: "24px", flex: 1, border: "1px solid #EDF2F7", boxShadow: "0 4px 20px rgba(0,0,0,0.02)", display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>Pattern Detection Over Time</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Positive vs Risk signals mapped daily.</Typography>
            <Box sx={{ flex: 1, minHeight: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TREND_DATA}>
                  <defs>
                    <linearGradient id="colorPos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#48BB78" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#48BB78" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F56565" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#F56565" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EDF2F7" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: "#A0AEC0" }} dy={10} />
                  <RechartsTooltip />
                  <Area type="monotone" dataKey="positive" stroke="#48BB78" strokeWidth={3} fill="url(#colorPos)" />
                  <Area type="monotone" dataKey="risk" stroke="#F56565" strokeWidth={3} fill="url(#colorRisk)" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Box>

      </Box>

    </Box>
  );
}
