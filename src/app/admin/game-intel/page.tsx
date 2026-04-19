"use client";

import React from "react";
import {
  Box, Typography, Grid, Card, CardContent,
  Avatar, Chip, Button, IconButton, LinearProgress,
  List, ListItem, ListItemAvatar, ListItemText,
  Divider, Tooltip
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Brain, Zap, MessageSquare, TrendingUp,
  Award, Globe, Sparkles, MousePointer2,
  BarChart3, Heart, Target, Lightbulb
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer,
  Cell
} from "recharts";
import PageTransition from "@/components/common/PageTransition";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const CARD_ENGAGEMENT_DATA = [
  { card: "P05", engagement: 88, impact: 92, color: "#1B7B7E" },
  { card: "P12", engagement: 74, impact: 85, color: "#7B68EE" },
  { card: "P02", engagement: 65, impact: 40, color: "#E8A838" },
  { card: "P08", engagement: 42, impact: 95, color: "#D4607A" },
  { card: "P15", engagement: 91, impact: 80, color: "#48BB78" },
];

const ANALYTICS_CARDS = [
  { 
    title: "Card Performance", 
    desc: "Card P05 (Conflict) remains the most impactful card for relationship rebuilding.",
    stat: "88%",
    label: "Reach Rate",
    color: "#1B7B7E" 
  },
  { 
    title: "User Retention", 
    desc: "Gamification logic improved 30-day retention by 22% in the 'Parent' group.",
    stat: "+22%",
    label: "MoM Growth",
    color: "#7B68EE" 
  },
];

// ─── Components ─────────────────────────────────────────────────────────────

export default function GameIntelligence() {
  return (
    <PageTransition>
      <Box sx={{ width: "100%", flex: 1 }}>
        <Typography variant="h5" fontWeight={800} color="#2D3748" sx={{ mb: 4 }}>Game Intelligence</Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "8fr 4fr" }, gap: 4, mb: 4 }}>
          {/* Main Chart */}
            <Card sx={{ borderRadius: "24px", p: 4, height: "100%", boxShadow: "0 4px 25px rgba(0,0,0,0.04)" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4, alignItems: "center" }}>
                <Box>
                  <Typography variant="h6" fontWeight={800}>Content Engagement Analysis</Typography>
                  <Typography variant="body2" color="text.secondary">Engagement Rate vs Emotional Impact Score</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Chip label="High Impact" size="small" variant="outlined" sx={{ fontWeight: 700 }} />
                  <Chip label="Needs Improvement" size="small" variant="outlined" sx={{ fontWeight: 700 }} />
                </Box>
              </Box>
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CARD_ENGAGEMENT_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EDF2F7" />
                    <XAxis dataKey="card" axisLine={false} tickLine={false} tick={{ fontSize: 13, fontWeight: 700, fill: "#718096" }} />
                    <YAxis hide />
                    <RechartsTooltip cursor={{ fill: "#F7FAFC" }} />
                    <Bar dataKey="engagement" radius={[8, 8, 8, 8]} barSize={35}>
                      {CARD_ENGAGEMENT_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Card>

          {/* Quick Stats */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3, height: "100%" }}>
              {ANALYTICS_CARDS.map((item, i) => (
                <Card key={i} sx={{ borderRadius: "24px", p: 4, border: `1px solid ${item.color}20`, flex: 1 }}>
                  <Typography variant="subtitle1" fontWeight={800} color={item.color} sx={{ mb: 1 }}>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>{item.desc}</Typography>
                  <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1 }}>
                    <Typography variant="h3" fontWeight={800} color={item.color}>{item.stat}</Typography>
                    <Typography variant="caption" fontWeight={700} sx={{ pb: 1, opacity: 0.7 }}>{item.label}</Typography>
                  </Box>
                </Card>
              ))}
            </Box>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" }, gap: 4 }}>
          <Card sx={{ borderRadius: "24px", p: 4, position: "relative", overflow: "hidden" }}>
              <Box sx={{ position: "absolute", top: -30, right: -30, opacity: 0.05 }}><TrendingUp size={150} /></Box>
              <Typography variant="h6" fontWeight={800} sx={{ mb: 3 }}>Conversation Depth Metric</Typography>
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2" fontWeight={700}>Average Interaction Depth</Typography>
                  <Typography variant="body2" fontWeight={800} color="#1B7B7E">8.4 / 10</Typography>
                </Box>
                <LinearProgress variant="determinate" value={84} sx={{ height: 10, borderRadius: 5, bgcolor: "#E6FFFA", "& .MuiLinearProgress-bar": { bgcolor: "#1B7B7E" } }} />
              </Box>
              <Typography variant="body2" color="#718096" sx={{ lineHeight: 1.6 }}>
                Our research shows that players who bridge beyond 8.0 on Depth score are 3x more likely to resolve household conflicts.
              </Typography>
            </Card>

          <Card sx={{ 
              borderRadius: "24px", p: 4, 
              background: "linear-gradient(135deg, #7B68EE, #6366f1)", 
              color: "white" 
            }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                <Sparkles size={24} />
                <Typography variant="h6" fontWeight={800}>AB Test Recommendation</Typography>
              </Box>
              <Typography variant="body1" sx={{ mb: 4, fontWeight: 500, opacity: 0.9 }}>
                "Changing the CTA color from Green to Teal on Card P02 might increase engagement by 15% based on latest behavioral clusters."
              </Typography>
              <Button variant="contained" sx={{ bgcolor: "white", color: "#6366f1", fontWeight: 800, borderRadius: "12px", "&:hover": { bgcolor: "#f1f1f1" } }}>
                Apply Optimization
              </Button>
            </Card>
        </Box>
      </Box>
    </PageTransition>
  );
}
