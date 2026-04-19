"use client";

import React from "react";
import { Box, Card, Typography, Button, IconButton, Chip } from "@mui/material";
import { CopyPlus, Clock, LibraryBig, FilePieChart, TrendingDown, ArrowRight, Zap, Target } from "lucide-react";
import { useRouter } from "next/navigation";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const KPIS = [
  { label: "Reports Generated", value: "342", sub: "This Month", icon: <FilePieChart size={20} />, color: "#48BB78" },
  { label: "Scheduled Reports", value: "15", sub: "Active Cron Jobs", icon: <Clock size={20} />, color: "#7B68EE" },
  { label: "Archived in Library", value: "1,048", sub: "Available PDFs", icon: <LibraryBig size={20} />, color: "#2D3748" },
];

export default function ReportsOverview() {
  const router = useRouter();

  return (
    <Box sx={{ width: "100%", pb: 8, display: "flex", flexDirection: "column", gap: 4 }}>
      
      {/* 1. KPI Cards */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 4 }}>
        {KPIS.map((kpi, i) => (
          <Card key={i} sx={{ p: 4, borderRadius: "24px", display: "flex", alignItems: "center", gap: 3, border: "1px solid #EDF2F7", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
            <Box sx={{ p: 2, borderRadius: "16px", bgcolor: kpi.color + "15", color: kpi.color }}>
              {kpi.icon}
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ mb: 0.5 }}>{kpi.label}</Typography>
              <Typography variant="h4" fontWeight={800} color="#2D3748" sx={{ mb: 0.5 }}>{kpi.value}</Typography>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>{kpi.sub}</Typography>
            </Box>
          </Card>
        ))}
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "7fr 5fr" }, gap: 4 }}>
        
        {/* 🔥 Insight Summary Highlights */}
        <Card sx={{ 
          borderRadius: "24px", overflow: "hidden", position: "relative",
          background: "linear-gradient(135deg, #1B7B7E, #145E61)", color: "white",
          boxShadow: "0 10px 40px rgba(27,123,126,0.3)"
        }}>
          <Box sx={{ position: "absolute", top: -30, right: -30, opacity: 0.1 }}><Zap size={250} /></Box>
          <Box sx={{ p: 5, position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
            <Box>
              <Chip label="Automated Summary" size="small" icon={<Target size={14} />} sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white", fontWeight: 800, mb: 3, "& .MuiChip-icon": { color: "inherit" } }} />
              <Typography variant="h3" fontWeight={800} sx={{ mb: 2, lineHeight: 1.3 }}>
                "เดือนนี้ ค่าการสื่อสาร (COM) เฉลี่ยลดลง 12% เฉพาะในกลุ่มผู้เล่นวัยรุ่น"
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.6, maxWidth: "80%" }}>
                Based on 1,240 sessions recorded last month. Highly recommended to generate a detailed cohort report to present to stakeholders.
              </Typography>
            </Box>
            
            <Box sx={{ display: "flex", gap: 2, mt: 5 }}>
              <Button 
                variant="contained" 
                onClick={() => router.push("/admin/reports/generate")}
                sx={{ bgcolor: "white", color: "#145E61", fontWeight: 800, borderRadius: "12px", px: 4, py: 1.5, "&:hover": { bgcolor: "#F0FAFA" } }}
              >
                Compile Report for this Cohort
              </Button>
            </Box>
          </Box>
        </Card>

        {/* Quick Generate Panel */}
        <Card sx={{ p: 4, borderRadius: "24px", border: "1px solid #EDF2F7", boxShadow: "0 4px 20px rgba(0,0,0,0.02)", display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" fontWeight={800} sx={{ mb: 3 }}>Quick Generate</Typography>
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            <Button onClick={() => router.push("/admin/reports/generate")} startIcon={<CopyPlus size={20} />} fullWidth sx={{ p: 3, borderRadius: "16px", border: "1px dashed #CBD5E0", color: "#4A5568", display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 2, transition: "all 0.2s", "&:hover": { borderColor: "#1B7B7E", bgcolor: "#1B7B7E05", color: "#1B7B7E" } }}>
              <Box sx={{ textAlign: "left" }}>
                <Typography variant="subtitle1" fontWeight={800}>Generate Monthly Report</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Standard B2B output for schools/clinics.</Typography>
              </Box>
            </Button>
            <Button onClick={() => router.push("/admin/reports/generate")} startIcon={<CopyPlus size={20} />} fullWidth sx={{ p: 3, borderRadius: "16px", border: "1px dashed #CBD5E0", color: "#4A5568", display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 2, transition: "all 0.2s", "&:hover": { borderColor: "#7B68EE", bgcolor: "#7B68EE05", color: "#7B68EE" } }}>
              <Box sx={{ textAlign: "left" }}>
                <Typography variant="subtitle1" fontWeight={800}>Generate Individual Overview</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>For detailed patient/student observation.</Typography>
              </Box>
            </Button>
          </Box>
          <Button endIcon={<ArrowRight size={18} />} sx={{ mt: 3, fontWeight: 700, color: "#1B7B7E" }} onClick={() => router.push("/admin/reports/generate")}>
            Advanced Generator
          </Button>
        </Card>

      </Box>

    </Box>
  );
}
