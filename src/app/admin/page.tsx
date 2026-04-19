"use client";

import React from "react";
import {
  Box, Typography, Grid, Card, CardContent,
  Avatar, Chip, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, LinearProgress, IconButton,
  Tooltip, Button, AvatarGroup
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Users, Timer, Trophy, Activity, TrendingUp,
  Brain, Info, MoreHorizontal, ArrowUpRight,
  ExternalLink, Sparkles, AlertTriangle
} from "lucide-react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip as RechartsTooltip, AreaChart, Area
} from "recharts";
import PageTransition from "@/components/common/PageTransition";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const KPI_CARDS = [
  { label: "Total Sessions", value: "1,284", icon: <Activity />, color: "#1B7B7E", trend: "+12.5%", trendDir: "up" },
  { label: "Avg Time / Question", value: "18.5s", icon: <Timer />, color: "#7B68EE", trend: "-2.4s", trendDir: "down" },
  { label: "Total Score", value: "88.2", icon: <Trophy />, color: "#E8A838", trend: "+4.1%", trendDir: "up" },
  { label: "Active Users", value: "456", icon: <Users />, color: "#D4607A", trend: "+18%", trendDir: "up" },
];

const EMOTION_RADAR_DATA = [
  { subject: "Communication", A: 85, fullMark: 100 },
  { subject: "Self-Efficacy", A: 65, fullMark: 100 },
  { subject: "Resilience", A: 90, fullMark: 100 },
  { subject: "Emotional Reg", A: 75, fullMark: 100 },
  { subject: "Connection", A: 80, fullMark: 100 },
];

const TREND_DATA = [
  { name: "Mon", sessions: 40, active: 24 },
  { name: "Tue", sessions: 30, active: 13 },
  { name: "Wed", sessions: 20, active: 38 },
  { name: "Thu", sessions: 27, active: 39 },
  { name: "Fri", sessions: 18, active: 48 },
  { name: "Sat", sessions: 23, active: 38 },
  { name: "Sun", sessions: 34, active: 43 },
];

const RECENT_SESSIONS = [
  { id: "S-384", users: ["A", "B"], status: "Completed", score: 9.2, time: "12m", date: "2m ago" },
  { id: "S-383", users: ["C", "D"], status: "Active", score: 7.5, time: "8m", date: "5m ago" },
  { id: "S-382", users: ["E", "F", "G"], status: "Analyzing", score: 8.8, time: "15m", date: "15m ago" },
  { id: "S-381", users: ["H", "I"], status: "Completed", score: 6.4, time: "10m", date: "1h ago" },
];

// ─── Styled Components ────────────────────────────────────────────────────────

const ChartCard = ({ title, children, subtitle }: { title: string; children: React.ReactNode; subtitle?: string }) => (
  <Card sx={{ borderRadius: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", height: "100%", border: "1px solid #EDF2F7" }}>
    <CardContent sx={{ p: 4, height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={800} color="#2D3748">{title}</Typography>
        {subtitle && <Typography variant="caption" color="text.secondary">{subtitle}</Typography>}
      </Box>
      <Box sx={{ flex: 1, minHeight: 250 }}>
        {children}
      </Box>
    </CardContent>
  </Card>
);

// ─── Page Component ──────────────────────────────────────────────────────────

export default function AdminOverview() {
  return (
    <PageTransition>
      <Box sx={{ width: "100%", flex: 1 }}>
        {/* KPI Cards Section */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }, gap: 3, mb: 4 }}>
          {KPI_CARDS.map((stat, i) => (
            <Card key={i} sx={{
                borderRadius: "20px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": { transform: "translateY(-5px)" }
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Box sx={{ p: 1.5, borderRadius: "14px", backgroundColor: stat.color + "15", color: stat.color }}>
                      {stat.icon}
                    </Box>
                    <Box sx={{
                      display: "flex", alignItems: "center", gap: 0.5,
                      px: 1, py: 0.5, borderRadius: "20px",
                      backgroundColor: stat.trendDir === "up" ? "#E6FFFA" : "#FFF5F5",
                      color: stat.trendDir === "up" ? "#2C7A7B" : "#C53030"
                    }}>
                      <TrendingUp size={14} style={{ transform: stat.trendDir === "up" ? "none" : "rotate(180deg)" }} />
                      <Typography variant="caption" fontWeight={700}>{stat.trend}</Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary" fontWeight={600}>{stat.label}</Typography>
                  <Typography variant="h5" fontWeight={800} sx={{ mt: 0.5, color: "#2D3748" }}>{stat.value}</Typography>
                </CardContent>
              </Card>
          ))}
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "4fr 8fr" }, gap: 4, mb: 4 }}>
          {/* Emotional Radar */}
            <ChartCard title="Emotional Radar" subtitle="Aggregation of traits across all users">
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={EMOTION_RADAR_DATA}>
                    <PolarGrid stroke="#E2E8F0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fontWeight: 600, fill: "#718096" }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="Overall"
                      dataKey="A"
                      stroke="#1B7B7E"
                      fill="#1B7B7E"
                      fillOpacity={0.2}
                    />
                    <RechartsTooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </Box>
            </ChartCard>

          {/* Trend Graph */}
            <ChartCard title="Activity Trends" subtitle="Daily sessions vs Active users in the last 7 days">
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={TREND_DATA}>
                    <defs>
                      <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1B7B7E" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#1B7B7E" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EDF2F7" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#718096" }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#718096" }} />
                    <RechartsTooltip />
                    <Area type="monotone" dataKey="sessions" stroke="#1B7B7E" strokeWidth={3} fillOpacity={1} fill="url(#colorSessions)" />
                    <Area type="monotone" dataKey="active" stroke="#7B68EE" strokeWidth={3} fillOpacity={0} />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </ChartCard>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "4fr 8fr" }, gap: 4 }}>
          {/* AI Insight Panel */}
            <Card sx={{
              borderRadius: "20px",
              background: "linear-gradient(145deg, #1B7B7E, #145E61)",
              color: "white",
              boxShadow: "0 10px 30px rgba(27,123,126,0.3)",
              height: "100%",
              position: "relative",
              overflow: "hidden"
            }}>
              <Box sx={{
                position: "absolute", top: -20, right: -20,
                width: 150, height: 150, borderRadius: "50%",
                background: "rgba(255,255,255,0.05)"
              }} />
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                  <Sparkles size={24} color="#FFD700" />
                  <Typography variant="h6" fontWeight={800}>Brains Insight</Typography>
                </Box>
                
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6, fontWeight: 500, opacity: 0.9 }}>
                  "กลุ่มประถมที่มี COM ต่ำ มักมีการใช้การ์ดหมวดอารมณ์ถี่ขึ้นในช่วงวันหยุด แนะนำให้เพิ่มเนื้อหาเกี่ยวกับการฟังเชิงลึก"
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Button fullWidth variant="contained" 
                    sx={{ 
                      bgcolor: "rgba(255,255,255,0.2)", 
                      backdropFilter: "blur(10px)",
                      borderRadius: "12px",
                      py: 1.2,
                      fontWeight: 700,
                      "&:hover": { bgcolor: "rgba(255,255,255,0.3)" }
                    }}>
                    View Details
                  </Button>
                  <Button fullWidth 
                    sx={{ 
                      color: "white", 
                      borderRadius: "12px",
                      py: 1,
                      fontWeight: 600,
                      textTransform: "none",
                      "& .MuiButton-endIcon": { ml: 0.5 }
                    }}
                    endIcon={<ArrowUpRight size={16} />}>
                    Generate Action Plan
                  </Button>
                </Box>

                <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>Confidence Score: 92%</Typography>
                  <Chip label="High Impact" size="small" sx={{ bgcolor: "rgba(255,255,255,0.1)", color: "white", fontWeight: 700, fontSize: "0.6rem" }} />
                </Box>
              </CardContent>
            </Card>

          {/* Recent Sessions */}
            <Card sx={{ borderRadius: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", border: "1px solid #EDF2F7" }}>
              <Box sx={{ p: 3, px: 4, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #F7FAFC" }}>
                <Typography variant="h6" fontWeight={800}>Recent Sessions</Typography>
                <Button size="small" sx={{ color: "#1B7B7E", fontWeight: 700 }}>Export CSV</Button>
              </Box>
              <TableContainer sx={{ px: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, color: "#718096", fontSize: "0.75rem" }}>SESSION ID</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: "#718096", fontSize: "0.75rem" }}>PARTICIPANTS</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: "#718096", fontSize: "0.75rem" }}>AVG SCORE</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: "#718096", fontSize: "0.75rem" }}>TIME</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: "#718096", fontSize: "0.75rem" }}>STATUS</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {RECENT_SESSIONS.map((session) => (
                      <TableRow key={session.id} hover sx={{ cursor: "pointer" }}>
                        <TableCell sx={{ fontWeight: 700 }}>
                          <Box sx={{ display: "flex", flexDirection: "column" }}>
                            {session.id}
                            <Typography variant="caption" color="text.secondary">{session.date}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <AvatarGroup max={3} sx={{ "& .MuiAvatar-root": { width: 24, height: 24, fontSize: "0.7rem", border: "1px solid white" } }}>
                            {session.users.map((u, i) => (
                              <Avatar key={i} sx={{ bgcolor: i % 2 === 0 ? "#1B7B7E" : "#7B68EE" }}>{u}</Avatar>
                            ))}
                          </AvatarGroup>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <RatingProgressBar value={session.score} />
                            <Typography variant="body2" fontWeight={700}>{session.score}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ color: "#718096", fontWeight: 600 }}>{session.time}</TableCell>
                        <TableCell>
                          <Chip 
                            label={session.status} 
                            size="small" 
                            sx={{ 
                              fontWeight: 800, fontSize: "0.65rem",
                              bgcolor: 
                                session.status === "Completed" ? "#E6FFFA" : 
                                session.status === "Active" ? "#EBF8FF" : "#FFF5F5",
                              color: 
                                session.status === "Completed" ? "#2C7A7B" : 
                                session.status === "Active" ? "#2B6CB0" : "#C53030"
                            }} 
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Button sx={{ color: "#1B7B7E", fontWeight: 700, fontSize: "0.85rem" }}>View All Sessions</Button>
              </Box>
            </Card>
        </Box>
      </Box>
    </PageTransition>
  );
}

// ─── Subcomponents ──────────────────────────────────────────────────────────

const RatingProgressBar = ({ value }: { value: number }) => (
  <Box sx={{ width: 40, height: 6, borderRadius: 3, bgcolor: "#EDF2F7", overflow: "hidden" }}>
    <Box sx={{ 
      width: `${(value / 10) * 100}%`, 
      height: "100%", 
      background: value > 8 ? "#1B7B7E" : value > 5 ? "#E8A838" : "#D4607A" 
    }} />
  </Box>
);
