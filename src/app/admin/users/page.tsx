"use client";

import React, { useState } from "react";
import {
  Box, Typography, Grid, Card, CardContent,
  Avatar, Chip, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Button, TextField,
  InputAdornment, LinearProgress
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Search, Filter, UserX, AlertCircle, CheckCircle2,
  ChevronRight, MoreHorizontal, Download, UserCheck,
  TrendingUp, TrendingDown
} from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip,
  Legend
} from "recharts";
import PageTransition from "@/components/common/PageTransition";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const SEGMENT_STATS = [
  { label: "High Risk", count: 24, icon: <AlertCircle />, color: "#F56565", bg: "#FFF5F5" },
  { label: "Medium", count: 86, icon: <Filter />, color: "#E8A838", bg: "#FFFBEB" },
  { label: "Healthy", count: 346, icon: <CheckCircle2 />, color: "#48BB78", bg: "#F0FFF4" },
];

const USER_TYPE_DATA = [
  { name: "Child", value: 320, color: "#1B7B7E" },
  { name: "Parent", value: 136, color: "#7B68EE" },
];

const AGE_DIST_DATA = [
  { group: "ประถม", count: 180 },
  { group: "ม.ต้น", count: 120 },
  { group: "ม.ปลาย", count: 90 },
  { group: "ทั่วไป", count: 66 },
];

const USERS_LIST = [
  { id: "U-001", name: "Somchai", age: "ประถม", score: 92, risk: "Healthy", lastActive: "10m ago" },
  { id: "U-002", name: "Kanya", age: "ม.ต้น", score: 45, risk: "High Risk", lastActive: "2h ago" },
  { id: "U-003", name: "Vichai", age: "ทั่วไป", score: 68, risk: "Medium", lastActive: "1d ago" },
  { id: "U-004", name: "Ananya", age: "ม.ปลาย", score: 88, risk: "Healthy", lastActive: "30m ago" },
  { id: "U-005", name: "Mana", age: "ประถม", score: 52, risk: "Medium", lastActive: "5h ago" },
];

// ─── Page Component ──────────────────────────────────────────────────────────

export default function UsersAnalytics() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <PageTransition>
      <Box sx={{ width: "100%", flex: 1 }}>
        {/* Header Actions */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4, alignItems: "center" }}>
          <Typography variant="h5" fontWeight={800} color="#2D3748">User Analytics</Typography>
          <Button variant="outlined" startIcon={<Download size={18} />} sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 700 }}>
            Export Report
          </Button>
        </Box>

        {/* Segmentation Cards */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "repeat(3, 1fr)" }, gap: 3, mb: 4 }}>
          {SEGMENT_STATS.map((stat, i) => (
            <Card key={i} sx={{ 
                borderRadius: "20px", 
                border: `1px solid ${stat.color}30`,
                bgcolor: stat.bg,
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": { transform: "translateY(-5px)" }
              }}>
                <CardContent sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ p: 1.5, borderRadius: "12px", bgcolor: stat.color, color: "white" }}>
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight={800} color={stat.color}>{stat.count}</Typography>
                    <Typography variant="body2" fontWeight={600} color={stat.color} sx={{ opacity: 0.8 }}>
                      {stat.label} Users
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
          ))}
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "4fr 8fr" }, gap: 4, mb: 4 }}>
          {/* User Distribution */}
            <Card sx={{ borderRadius: "20px", p: 4, height: "100%", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
              <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3 }}>User Composition</Typography>
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={USER_TYPE_DATA}
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {USER_TYPE_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 3 }}>
                {USER_TYPE_DATA.map((item) => (
                  <Box key={item.name} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: item.color }} />
                    <Typography variant="body2" fontWeight={700}>{item.name}</Typography>
                  </Box>
                ))}
              </Box>
            </Card>

          {/* Age Distribution */}
            <Card sx={{ borderRadius: "20px", p: 4, height: "100%", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
              <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3 }}>Age Distribution</Typography>
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={AGE_DIST_DATA}>
                    <XAxis dataKey="group" axisLine={false} tickLine={false} tick={{ fontSize: 13, fontWeight: 600 }} />
                    <YAxis hide />
                    <RechartsTooltip cursor={{ fill: "#F7FAFC" }} />
                    <Bar dataKey="count" fill="#7B68EE" radius={[10, 10, 0, 0]} barSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Card>
        </Box>

        {/* User Table Card */}
        <Card sx={{ borderRadius: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", overflow: "hidden" }}>
          <Box sx={{ p: 3, borderBottom: "1px solid #F7FAFC", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <TextField
              size="small"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Search size={18} color="#A0AEC0" /></InputAdornment>,
                sx: { borderRadius: "12px", bgcolor: "#F7FAFC", minWidth: 300 }
              }}
            />
            <Button startIcon={<Filter size={18} />} sx={{ color: "#718096", fontWeight: 700 }}>Filters</Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: "#718096" }}>NAME</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#718096" }}>AGE GROUP</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#718096" }}>OVERALL SCORE</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#718096" }}>RISK LEVEL</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#718096" }}>LAST ACTIVITY</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {USERS_LIST.map((user) => (
                  <TableRow key={user.id} hover sx={{ cursor: "pointer" }}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar sx={{ bgcolor: "#E2E8F0", color: "#4A5568", fontWeight: 700, fontSize: "0.8rem" }}>{user.name.charAt(0)}</Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={700}>{user.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{user.id}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell><Chip label={user.age} size="small" sx={{ fontWeight: 600, bgcolor: "#F7FAFC" }} /></TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="body2" fontWeight={700}>{user.score}</Typography>
                        {user.score > 80 ? <TrendingUp size={14} color="#48BB78" /> : user.score < 60 ? <TrendingDown size={14} color="#F56565" /> : null}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={user.risk} 
                        size="small" 
                        icon={<AlertCircle size={14} />}
                        sx={{ 
                          fontWeight: 800, 
                          fontSize: "0.7rem",
                          bgcolor: user.risk === "Healthy" ? "#F0FFF4" : user.risk === "High Risk" ? "#FFF5F5" : "#FFFBEB",
                          color: user.risk === "Healthy" ? "#48BB78" : user.risk === "High Risk" ? "#F56565" : "#E8A838",
                          "& .MuiChip-icon": { color: "inherit" }
                        }} 
                      />
                    </TableCell>
                    <TableCell sx={{ color: "text.secondary", fontSize: "0.85rem" }}>{user.lastActive}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small"><ChevronRight size={20} /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </PageTransition>
  );
}
