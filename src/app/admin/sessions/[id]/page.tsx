"use client";

import React, { use } from "react";
import {
  Box, Typography, Card, Grid, Avatar, Chip, Button, Divider,
  Stepper, Step, StepLabel, StepContent
} from "@mui/material";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Brain, HelpCircle, MessageCircle, AlertTriangle, 
  Lightbulb, PlayCircle, ShieldCheck, HeartPulse
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip as RechartsTooltip
} from "recharts";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const RADAR_DATA = [
  { subject: "Communication", Nong: 80, Mom: 45, fullMark: 100 },
  { subject: "Self-Efficacy", Nong: 65, Mom: 85, fullMark: 100 },
  { subject: "Resilience", Nong: 70, Mom: 75, fullMark: 100 },
  { subject: "Emotional Reg", Nong: 50, Mom: 40, fullMark: 100 },
  { subject: "Connection", Nong: 60, Mom: 55, fullMark: 100 },
];

const TIMELINE_DATA = [
  { 
    time: "02:15", 
    actor: "Mom", 
    action: "Answered Q1: ถ้าลูกทำผิดร้ายแรง แม่จะจัดการยังไง?",
    reaction: "Reaction Time: 12s",
    emotion: "Moderate Stress", 
    icon: <HelpCircle size={20} color="#7B68EE" />,
    color: "#7B68EE"
  },
  { 
    time: "04:30", 
    actor: "Nong", 
    action: "Used [Pass Token] to skip emotional response",
    reaction: "Reaction Time: 4s",
    emotion: "Avoidance", 
    icon: <AlertTriangle size={20} color="#E8A838" />,
    color: "#E8A838",
    isAlert: true
  },
  { 
    time: "08:45", 
    actor: "Mom", 
    action: "Answered Q3: คำพูดไหนของลูกที่ทำให้แม่เสียใจที่สุด?",
    reaction: "Reaction Time: 45s (Long Pause)",
    emotion: "Vulnerability / High ER shift", 
    icon: <HeartPulse size={20} color="#D4607A" />,
    color: "#D4607A"
  },
  { 
    time: "12:10", 
    actor: "Nong", 
    action: "Reflected to Mom: หนูขอโทษที่เคยพูดแบบนั้น",
    reaction: "Bridge Event",
    emotion: "Connection Spike", 
    icon: <MessageCircle size={20} color="#48BB78" />,
    color: "#48BB78"
  }
];

export default function SessionDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  return (
    <Box sx={{ width: "100%", pb: 8 }}>
      
      {/* 1. Header & Breadcrumb */}
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 4 }}>
        <IconButton onClick={() => router.back()} sx={{ bgcolor: "white", border: "1px solid #E2E8F0" }}>
          <ArrowLeft size={20} />
        </IconButton>
        <Box>
          <Typography variant="h5" fontWeight={800} color="#2D3748" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            Session Detail <Chip label={id} size="small" sx={{ fontWeight: 800, bgcolor: "#EDF2F7" }} />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Today, 14:30 • 14m 20s • Completed
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "7fr 5fr" }, gap: 4 }}>
        
        {/* Left Column */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          
          {/* Players Overview */}
          <Card sx={{ borderRadius: "20px", p: 4, border: "1px solid #EDF2F7", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
            <Typography variant="h6" fontWeight={800} sx={{ mb: 3 }}>Players Overview</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
              {/* Player 1 */}
              <Box sx={{ p: 3, borderRadius: "16px", bgcolor: "#F0FAFA", display: "flex", alignItems: "center", gap: 3 }}>
                <Avatar sx={{ width: 60, height: 60, bgcolor: "#1B7B7E", fontSize: "1.5rem", fontWeight: 800 }}>N</Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={800} color="#1B7B7E">Nong (Child)</Typography>
                  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <Chip label="Score: 8.2" size="small" sx={{ bgcolor: "white", fontWeight: 700, color: "#2C7A7B" }} />
                    <Chip label="Warning" size="small" sx={{ bgcolor: "#FFFBEB", fontWeight: 700, color: "#D69E2E" }} />
                  </Box>
                </Box>
              </Box>
              {/* Player 2 */}
              <Box sx={{ p: 3, borderRadius: "16px", bgcolor: "#F7F5FF", display: "flex", alignItems: "center", gap: 3 }}>
                <Avatar sx={{ width: 60, height: 60, bgcolor: "#7B68EE", fontSize: "1.5rem", fontWeight: 800 }}>M</Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={800} color="#7B68EE">Mom (Parent)</Typography>
                  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <Chip label="Score: 5.4" size="small" sx={{ bgcolor: "white", fontWeight: 700, color: "#553C9A" }} />
                    <Chip label="High Risk" size="small" sx={{ bgcolor: "#FFF5F5", fontWeight: 700, color: "#E53E3E" }} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Card>

          {/* Timeline UX */}
          <Card sx={{ borderRadius: "20px", p: 4, border: "1px solid #EDF2F7", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
              <Typography variant="h6" fontWeight={800}>Interaction Timeline</Typography>
              <Button startIcon={<PlayCircle size={18} />} variant="outlined" sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 700 }}>
                Replay Transcript
              </Button>
            </Box>
            
            <Stepper orientation="vertical" sx={{ "& .MuiStepConnector-line": { minHeight: 30 } }}>
              {TIMELINE_DATA.map((step, index) => (
                <Step key={index} active={true} expanded={true}>
                  <StepLabel 
                    icon={
                      <Box sx={{ 
                        width: 40, height: 40, borderRadius: "50%", 
                        display: "flex", alignItems: "center", justifyContent: "center",
                        bgcolor: step.color + "15", border: `2px solid ${step.color}` 
                      }}>
                        {step.icon}
                      </Box>
                    }
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="body1" fontWeight={800} sx={{ color: step.isAlert ? "#E53E3E" : "#2D3748" }}>
                        {step.actor}: {step.action}
                      </Typography>
                      <Typography variant="caption" fontWeight={700} color="text.secondary">{step.time}</Typography>
                    </Box>
                  </StepLabel>
                  <StepContent sx={{ borderLeft: `2px solid ${step.color}50`, ml: "20px", pl: 3 }}>
                    <Box sx={{ p: 2, bgcolor: "#F7FAFC", borderRadius: "12px", my: 1, display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2" color="text.secondary">{step.reaction}</Typography>
                      <Chip label={step.emotion} size="small" sx={{ height: 20, fontSize: "0.65rem", fontWeight: 700, bgcolor: step.color + "20", color: step.color }} />
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Card>
        </Box>

        {/* Right Column */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          
          {/* Emotion Score Radar */}
          <Card sx={{ borderRadius: "20px", p: 4, height: 400, border: "1px solid #EDF2F7", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
            <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>Emotion Diagnostics</Typography>
            <ResponsiveContainer width="100%" height="90%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={RADAR_DATA}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fontWeight: 600, fill: "#718096" }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Nong" dataKey="Nong" stroke="#1B7B7E" fill="#1B7B7E" fillOpacity={0.4} />
                <Radar name="Mom" dataKey="Mom" stroke="#7B68EE" fill="#7B68EE" fillOpacity={0.4} />
                <RechartsTooltip />
              </RadarChart>
            </ResponsiveContainer>
          </Card>

          {/* AI Insight & Recommendations */}
          <Card sx={{ borderRadius: "20px", background: "linear-gradient(135deg, #1B7B7E, #145E61)", color: "white", boxShadow: "0 10px 30px rgba(27,123,126,0.2)" }}>
            <Box sx={{ p: 4, pb: 0, display: "flex", alignItems: "center", gap: 2 }}>
              <Brain size={28} color="#FFD700" />
              <Typography variant="h6" fontWeight={800}>AI Clinical Insight</Typography>
            </Box>
            <Box sx={{ p: 4 }}>
              <Typography variant="body1" sx={{ fontWeight: 500, lineHeight: 1.6, mb: 3 }}>
                "ครอบครัวนี้มี Pattern การหลีกเลี่ยง Conflict อย่างชัดเจน (Nong ใช้ Pass Token เมื่อเจอคำถามยาก) แต่เมื่อฝ่ากำแพงแรกไปได้ที่นาที 08:45 Mom มีการแสดงความเปราะบาง (Vulnerability) ซึ่งนำไปสู่ Connection Spike ในช่วงท้าย"
              </Typography>
              
              <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", my: 3 }} />

              <Box sx={{ display: "flex", gap: 2, alignItems: "start", mb: 3 }}>
                <Lightbulb size={24} color="#F6E05E" />
                <Box>
                  <Typography variant="body2" fontWeight={800} sx={{ color: "#F6E05E", mb: 0.5 }}>Recommendation</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    แนะนำให้ใช้การ์ดหมวด "Empathy" ในเซสชันถัดไป โดยบังคับให้ผู้ใหญ่วาง Pass Token ของตนเองลง 1 เหรียญ
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                <Button fullWidth variant="contained" sx={{ bgcolor: "white", color: "#145E61", fontWeight: 800, borderRadius: "12px", py: 1.5, "&:hover": { bgcolor: "#F0FAFA" } }}>
                  Assign Next Session
                </Button>
                <Button fullWidth sx={{ color: "white", border: "1px solid rgba(255,255,255,0.3)", fontWeight: 700, borderRadius: "12px" }}>
                  Send Report
                </Button>
              </Box>
            </Box>
          </Card>
        </Box>

      </Box>
    </Box>
  );
}

// Ensure IconButton export
import { IconButton } from "@mui/material";
