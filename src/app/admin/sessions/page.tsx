"use client";

import React, { useState } from "react";
import {
  Box, Card, Typography, TextField, InputAdornment, MenuItem, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip,
  IconButton, Avatar, AvatarGroup, Tooltip
} from "@mui/material";
import { Search, Filter, ChevronRight, Activity, Users, AlertTriangle, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const KPIS = [
  { label: "Total Sessions", value: "1,284", icon: <Users size={20} />, color: "#1B7B7E" },
  { label: "Avg Score", value: "8.4 / 10", icon: <ShieldCheck size={20} />, color: "#48BB78" },
  { label: "Avg Duration", value: "14m 20s", icon: <Activity size={20} />, color: "#7B68EE" },
  { label: "% High Risk", value: "8.5%", icon: <AlertTriangle size={20} />, color: "#F56565" },
];

const SESSIONS_DATA = [
  { id: "S-5042", players: ["Nong", "Pim"], age: "ประถม", score: 9.1, com: 95, res: 88, status: "Completed", risk: "Healthy", date: "Today, 14:30" },
  { id: "S-5041", players: ["Aek", "Mom"], age: "ม.ต้น", score: 4.5, com: 30, res: 45, status: "Flagged", risk: "High Risk", date: "Today, 13:15" },
  { id: "S-5040", players: ["Fah", "Dad"], age: "ม.ปลาย", score: 7.2, com: 68, res: 70, status: "Analyzing", risk: "Medium", date: "Today, 12:00" },
  { id: "S-5039", players: ["Boy", "Pim"], age: "ประถม", score: 8.8, com: 85, res: 90, status: "Completed", risk: "Healthy", date: "Yesterday" },
  { id: "S-5038", players: ["Jay", "Mom"], age: "ทั่วไป", score: 5.5, com: 50, res: 60, status: "Flagged", risk: "Warning", date: "Yesterday" },
];

export default function AllSessions() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Box sx={{ width: "100%", flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
      
      {/* 1. Filter Bar */}
      <Card sx={{ p: 2, borderRadius: "16px", display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap", border: "1px solid #EDF2F7", boxShadow: "none" }}>
        <TextField
          size="small"
          placeholder="Search by ID or Player..."
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search size={18} color="#A0AEC0" /></InputAdornment>,
            sx: { borderRadius: "12px", bgcolor: "#F7FAFC", minWidth: 250 }
          }}
        />
        <TextField select size="small" defaultValue="all" sx={{ minWidth: 150, "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#F7FAFC" } }}>
          <MenuItem value="all">All Ages</MenuItem>
          <MenuItem value="pri">ประถม</MenuItem>
          <MenuItem value="mid">ม.ต้น</MenuItem>
          <MenuItem value="high">ม.ปลาย</MenuItem>
        </TextField>
        <TextField select size="small" defaultValue="all" sx={{ minWidth: 150, "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#F7FAFC" } }}>
          <MenuItem value="all">Any Risk Level</MenuItem>
          <MenuItem value="high">🔴 High Risk</MenuItem>
          <MenuItem value="med">🟡 Warning</MenuItem>
          <MenuItem value="low">🟢 Healthy</MenuItem>
        </TextField>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="contained" startIcon={<Filter size={18} />} sx={{ borderRadius: "12px", bgcolor: "#2D3748", textTransform: "none", fontWeight: 700 }}>
          Apply Filters
        </Button>
      </Card>

      {/* 2. KPI Summary */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }, gap: 3 }}>
        {KPIS.map((kpi, i) => (
          <Card key={i} sx={{ p: 3, borderRadius: "20px", display: "flex", alignItems: "center", gap: 2, border: "1px solid #EDF2F7", boxShadow: "0 4px 20px rgba(0,0,0,0.02)", cursor: "pointer", "&:hover": { borderColor: kpi.color, bgcolor: kpi.color + "05" } }}>
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

      {/* 3. Sessions Table */}
      <Card sx={{ borderRadius: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", border: "1px solid #EDF2F7", overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: "#F7FAFC" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: "#718096" }}>ID / DATE</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#718096" }}>PLAYERS</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#718096" }}>SCORE</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#718096" }}>COM / RES</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#718096" }}>STATUS</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#718096" }}>RISK</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: "#718096" }}>ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {SESSIONS_DATA.map((row) => (
                <TableRow 
                  key={row.id} 
                  hover 
                  sx={{ cursor: "pointer", transition: "all 0.2s", "&:hover": { bgcolor: "#F0FAFA" } }}
                  onClick={() => router.push(`/admin/sessions/${row.id}`)}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight={800} color="#2D3748">{row.id}</Typography>
                    <Typography variant="caption" color="text.secondary">{row.date}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AvatarGroup max={3} sx={{ "& .MuiAvatar-root": { width: 28, height: 28, fontSize: "0.75rem", fontWeight: 700, border: "2px solid white" } }}>
                        {row.players.map((p, i) => (
                          <Avatar key={i} sx={{ bgcolor: i === 0 ? "#1B7B7E" : "#7B68EE" }}>{p.charAt(0)}</Avatar>
                        ))}
                      </AvatarGroup>
                      <Chip label={row.age} size="small" sx={{ ml: 1, height: 20, fontSize: "0.65rem", fontWeight: 700, bgcolor: "#EDF2F7" }} />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={800} color={row.score >= 8 ? "#48BB78" : row.score <= 5 ? "#F56565" : "#E8A838"}>
                      {row.score}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Communication / Resilience">
                      <Typography variant="body2" fontWeight={600} color="#4A5568">
                        {row.com} <span style={{ opacity: 0.5 }}>/</span> {row.res}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={row.status} size="small" 
                      sx={{ 
                        fontWeight: 700, fontSize: "0.7rem",
                        bgcolor: row.status === "Completed" ? "#E6FFFA" : row.status === "Flagged" ? "#FFF5F5" : "#EBF8FF",
                        color: row.status === "Completed" ? "#2C7A7B" : row.status === "Flagged" ? "#C53030" : "#2B6CB0"
                      }} 
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={row.risk} size="small" 
                      sx={{ 
                        fontWeight: 800, fontSize: "0.7rem",
                        bgcolor: row.risk === "Healthy" ? "#F0FFF4" : row.risk === "High Risk" ? "#FFF5F5" : "#FFFBEB",
                        color: row.risk === "Healthy" ? "#38A169" : row.risk === "High Risk" ? "#E53E3E" : "#D69E2E"
                      }} 
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button size="small" variant="text" endIcon={<ChevronRight size={16} />} sx={{ fontWeight: 700, color: "#1B7B7E", textTransform: "none" }}>
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

    </Box>
  );
}
