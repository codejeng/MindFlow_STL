"use client";

import React from "react";
import { Box, Card, Typography, TextField, InputAdornment, MenuItem, Button, Chip, LinearProgress } from "@mui/material";
import { Search, Filter, Brain, ArrowRight, TrendingUp as TrendingUpIcon, TrendingDown } from "lucide-react";
import { useRouter } from "next/navigation";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const FEED_DATA = [
  {
    id: "IN-704",
    headline: "Communication ลดลงในกลุ่มวัย 13–15",
    detail: "เกิดจาก session ที่มี conflict สูง",
    confidence: 87,
    impact: "High",
    tags: ["COM ↓", "Teen", "Family Conflict"],
    color: "#F56565"
  },
  {
    id: "IN-703",
    headline: "ผู้ปกครองมีการใช้ Empathy เพิ่มขึ้น 20%",
    detail: "สืบเนื่องจากการใช้คำถามหมวดอดีตที่ช่วยละลายพฤติกรรมการตัดสินลูก",
    confidence: 94,
    impact: "Positive",
    tags: ["Empathy ↑", "Parent", "Past Story"],
    color: "#48BB78"
  },
  {
    id: "IN-702",
    headline: "สัญญาณความซึมเศร้าแฝงในกลุ่มเด็กประถมปลาย",
    detail: "พบรูปแบบการเลือกคำตอบแบบ Avoidance ต่อเนื่อง 3 Session",
    confidence: 76,
    impact: "Medium",
    tags: ["Risk Warning", "Pre-teen", "Avoidance"],
    color: "#E8A838"
  }
];

export default function InsightFeed() {
  const router = useRouter();

  return (
    <Box sx={{ width: "100%", pb: 8, display: "flex", flexDirection: "column", gap: 4 }}>
      
      {/* Filter Bar */}
      <Card sx={{ p: 2, borderRadius: "16px", display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap", border: "1px solid #EDF2F7", boxShadow: "none" }}>
        <TextField
          size="small"
          placeholder="Search Insights..."
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search size={18} color="#A0AEC0" /></InputAdornment>,
            sx: { borderRadius: "12px", bgcolor: "#F7FAFC", minWidth: 250 }
          }}
        />
        <TextField select size="small" defaultValue="all" sx={{ minWidth: 150, "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#F7FAFC" } }}>
          <MenuItem value="all">All Ages</MenuItem>
          <MenuItem value="teen">Teens</MenuItem>
          <MenuItem value="child">Children</MenuItem>
        </TextField>
        <TextField select size="small" defaultValue="all" sx={{ minWidth: 150, "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#F7FAFC" } }}>
          <MenuItem value="all">All Risks</MenuItem>
          <MenuItem value="high">High Impact</MenuItem>
        </TextField>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="contained" startIcon={<Filter size={18} />} sx={{ borderRadius: "12px", bgcolor: "#2D3748", textTransform: "none", fontWeight: 700 }}>
          Filter
        </Button>
      </Card>

      {/* Insight Pipeline */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }, gap: 4 }}>
        {FEED_DATA.map((item) => (
          <Card key={item.id} sx={{ borderRadius: "24px", p: 4, display: "flex", flexDirection: "column", border: "1px solid #EDF2F7", boxShadow: "0 4px 20px rgba(0,0,0,0.02)", transition: "transform 0.2s", "&:hover": { transform: "translateY(-5px)", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" } }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
              <Chip label={item.id} size="small" sx={{ fontWeight: 800, bgcolor: "#F7FAFC" }} />
              <Chip icon={<Brain size={14} />} label={`${item.confidence}% AI Confidence`} size="small" sx={{ fontWeight: 800, bgcolor: item.color + "15", color: item.color, "& .MuiChip-icon": { color: "inherit" } }} />
            </Box>
            
            <Typography variant="h6" fontWeight={800} sx={{ mb: 1, lineHeight: 1.4 }}>
              {item.headline}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, flex: 1 }}>
              {item.detail}
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                {item.tags.map((tag, i) => (
                  <Chip key={i} label={tag} size="small" sx={{ fontWeight: 700, fontSize: "0.65rem", bgcolor: "#EDF2F7", color: "#4A5568" }} />
                ))}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {item.impact === "Positive" ? <TrendingUpIcon size={16} color="#48BB78" /> : <TrendingDown size={16} color="#F56565" />}
                <Typography variant="caption" fontWeight={800} sx={{ color: item.impact === "Positive" ? "#48BB78" : "#F56565" }}>
                  Impact: {item.impact}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button 
                variant="outlined" 
                fullWidth 
                onClick={() => router.push(`/admin/insights/${item.id}`)}
                sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 700, borderColor: "#E2E8F0", color: "#4A5568" }}
              >
                View Detail
              </Button>
              <Button 
                variant="contained" 
                fullWidth
                endIcon={<ArrowRight size={16} />}
                sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 700, bgcolor: "#7B68EE", "&:hover": { bgcolor: "#6366f1" } }}
              >
                Apply
              </Button>
            </Box>
          </Card>
        ))}
      </Box>

    </Box>
  );
}
