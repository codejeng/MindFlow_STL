"use client";

import React from "react";
import {
  Box, Typography, Grid, Card, CardContent,
  Avatar, Chip, Button, IconButton, LinearProgress,
  List, ListItem, ListItemAvatar, ListItemText,
  Divider, Alert, AlertTitle
} from "@mui/material";
import { motion } from "framer-motion";
import {
  AlertCircle, ShieldAlert, TrendingUp, Users,
  MessageCircle, Heart, Zap, ChevronRight,
  ShieldCheck, BellRing
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer
} from "recharts";
import PageTransition from "@/components/common/PageTransition";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const RISK_TREND = [
  { day: "01", riskCount: 12 },
  { day: "02", riskCount: 15 },
  { day: "03", riskCount: 14 },
  { day: "04", riskCount: 20 },
  { day: "05", riskCount: 24 },
  { day: "06", riskCount: 22 },
  { day: "07", riskCount: 24 },
];

const HIGH_RISK_USERS = [
  { id: "U-002", name: "Kanya", concern: "Low COM / Low ER (Sudden Drop)", lastPlayed: "2h ago", avatar: "K" },
  { id: "U-015", name: "Somsak", concern: "High Avoidance Pattern", lastPlayed: "4h ago", avatar: "S" },
  { id: "U-042", name: "Porntip", concern: "Negative Interaction Spike", lastPlayed: "6h ago", avatar: "P" },
  { id: "U-089", name: "Teerawat", concern: "Consistent Low SE in Primary", lastPlayed: "1d ago", avatar: "T" },
];

// ─── Components ─────────────────────────────────────────────────────────────

const PulseCircle = () => (
  <Box sx={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <motion.div
      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
      style={{
        position: "absolute", width: "100%", height: "100%",
        borderRadius: "50%", backgroundColor: "#F56565"
      }}
    />
    <Box sx={{
      width: 48, height: 48, borderRadius: "50%",
      bgcolor: "#F56565", color: "white", zIndex: 1,
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <AlertCircle size={28} />
    </Box>
  </Box>
);

export default function RiskMonitor() {
  return (
    <PageTransition>
      <Box sx={{ width: "100%", flex: 1 }}>
        {/* Risk Banner */}
        <Box sx={{ 
          display: "flex", justifyContent: "space-between", alignItems: "center", 
          mb: 4, p: 4, borderRadius: "24px",
          background: "linear-gradient(135deg, #FFF5F5, #FED7D7)",
          border: "1px solid #FEB2B2"
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <PulseCircle />
            <Box>
              <Typography variant="h4" fontWeight={800} color="#C53030">24 Users at Risk</Typography>
              <Typography variant="body1" fontWeight={500} color="#9B2C2C">
                Immediate clinical attention or intervention suggested for these segments.
              </Typography>
            </Box>
          </Box>
          <Button 
            variant="contained" 
            startIcon={<BellRing size={18} />}
            sx={{ 
              bgcolor: "#C53030", borderRadius: "14px", 
              py: 1.5, px: 3, fontWeight: 700,
              "&:hover": { bgcolor: "#9B2C2C" }
            }}>
            Alert Support Team
          </Button>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "7fr 5fr" }, gap: 4, mb: 4 }}>
          {/* Trend Analysis */}
            <Card sx={{ borderRadius: "20px", p: 4, height: "100%", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
                <Typography variant="h6" fontWeight={800}>Risk Population Trend</Typography>
                <Chip label="+12% from last week" size="small" sx={{ fontWeight: 700, bgcolor: "#FFF5F5", color: "#C53030" }} />
              </Box>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={RISK_TREND}>
                    <defs>
                      <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F56565" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#F56565" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EDF2F7" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
                    <YAxis hide />
                    <RechartsTooltip />
                    <Area type="monotone" dataKey="riskCount" stroke="#F56565" strokeWidth={3} fill="url(#colorRisk)" />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </Card>

          {/* High Risk List */}
            <Card sx={{ borderRadius: "20px", height: "100%", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
              <Box sx={{ p: 4, pb: 2 }}>
                <Typography variant="h6" fontWeight={800} sx={{ mb: 3 }}>Priority Users</Typography>
                <List disablePadding>
                  {HIGH_RISK_USERS.map((user, i) => (
                    <React.Fragment key={user.id}>
                      <ListItem 
                        disablePadding 
                        sx={{ 
                          py: 2, cursor: "pointer", 
                          "&:hover .MuiIconButton-root": { bgcolor: "#F7FAFC", transform: "translateX(5px)" } 
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "#FED7D7", color: "#C53030", fontWeight: 700 }}>{user.avatar}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                              <Typography variant="body2" fontWeight={800}>{user.name}</Typography>
                              <Typography variant="caption" color="text.secondary">{user.lastPlayed}</Typography>
                            </Box>
                          }
                          secondary={
                            <Typography variant="caption" sx={{ color: "#E53E3E", fontWeight: 600, display: "block", mt: 0.5 }}>
                              {user.concern}
                            </Typography>
                          }
                        />
                        <IconButton size="small" sx={{ transition: "all 0.2s" }}>
                          <ChevronRight size={20} />
                        </IconButton>
                      </ListItem>
                      {i < HIGH_RISK_USERS.length - 1 && <Divider sx={{ opacity: 0.5 }} />}
                    </React.Fragment>
                  ))}
                </List>
                <Button fullWidth sx={{ mt: 2, py: 1.5, color: "#C53030", fontWeight: 700, borderRadius: "12px" }}>
                  View All Risk Indicators
                </Button>
              </Box>
            </Card>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "repeat(3, 1fr)" }, gap: 4 }}>
          {/* Insight Cards */}
            <Card sx={{ borderRadius: "20px", p: 4, height: "100%", bgcolor: "#F0F4FF", border: "1px solid #D1DCFF" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                <Zap size={24} color="#3182CE" />
                <Typography variant="subtitle1" fontWeight={800} color="#2B6CB0">Conflict Pattern</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "#4A5568", mb: 3, lineHeight: 1.6 }}>
                Users in the "High Risk" group show a 35% higher tendency to use the "Pass Token" during emotional cards.
              </Typography>
              <Button size="small" sx={{ color: "#3182CE", fontWeight: 700 }}>Deep Dive Analysis</Button>
            </Card>

          <Card sx={{ borderRadius: "20px", p: 4, height: "100%", bgcolor: "#F0FFF4", border: "1px solid #C6F6D5" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                <ShieldCheck size={24} color="#38A169" />
                <Typography variant="subtitle1" fontWeight={800} color="#2F855A">Protective Factors</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "#4A5568", mb: 3, lineHeight: 1.6 }}>
                85% of at-risk users who maintain a session once a week show improvement in COM scores within 1 month.
              </Typography>
              <Button size="small" sx={{ color: "#38A169", fontWeight: 700 }}>Review Program</Button>
            </Card>

          <Card sx={{ borderRadius: "20px", p: 4, height: "100%", bgcolor: "#FFF5F5", border: "1px solid #FED7D7" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                <ShieldAlert size={24} color="#E53E3E" />
                <Typography variant="subtitle1" fontWeight={800} color="#C53030">Alert Status</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "#4A5568", mb: 3, lineHeight: 1.6 }}>
                Critical threshold reached for "Age: ม.ต้น" segment regarding Emotional Regulation drops.
              </Typography>
              <Button size="small" sx={{ color: "#E53E3E", fontWeight: 700 }}>Adjust Content</Button>
            </Card>
        </Box>
      </Box>
    </PageTransition>
  );
}
