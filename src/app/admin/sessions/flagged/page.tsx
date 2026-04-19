"use client";

import React from "react";
import {
  Box, Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Button, Avatar, AvatarGroup
} from "@mui/material";
import { AlertOctagon, Flame, ArrowRight, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const FLAGGED_SESSIONS = [
  { id: "S-5041", players: ["Aek", "Mom"], issue: "Critical ER Drop (30)", time: "10 mins ago", severity: "High" },
  { id: "S-5012", players: ["May", "Dad"], issue: "High Conflict Frequency", time: "2 hours ago", severity: "High" },
  { id: "S-4980", players: ["Win", "Mom"], issue: "Total Avoidance Pattern", time: "Yesterday", severity: "Medium" },
];

export default function FlaggedSessions() {
  const router = useRouter();

  return (
    <Box sx={{ width: "100%", pb: 8, display: "flex", flexDirection: "column", gap: 4 }}>
      
      {/* 1. Header & Summary */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "#FFF5F5", p: 4, borderRadius: "20px", border: "1px solid #FEB2B2" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Box sx={{ p: 2, borderRadius: "50%", bgcolor: "#E53E3E", color: "white", boxShadow: "0 0 0 10px rgba(229,62,62,0.1)" }}>
            <AlertOctagon size={32} />
          </Box>
          <Box>
            <Typography variant="h4" fontWeight={800} color="#C53030">Attention Required</Typography>
            <Typography variant="body1" color="#E53E3E" fontWeight={600}>
              These sessions exhibited high conflict or extremely low emotional resilience scores.
            </Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: "center", bgcolor: "white", p: 2, px: 4, borderRadius: "16px", boxShadow: "0 4px 12px rgba(229,62,62,0.15)" }}>
          <Typography variant="h3" fontWeight={800} color="#E53E3E">3</Typography>
          <Typography variant="body2" fontWeight={700} color="text.secondary">Flagged Sessions</Typography>
        </Box>
      </Box>

      {/* 2. Flagged Table */}
      <Card sx={{ borderRadius: "20px", boxShadow: "0 10px 30px rgba(229,62,62,0.05)", border: "1px solid #FEB2B2", overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: "#FFF5F5" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 800, color: "#C53030" }}>SESSION ID</TableCell>
                <TableCell sx={{ fontWeight: 800, color: "#C53030" }}>PLAYERS</TableCell>
                <TableCell sx={{ fontWeight: 800, color: "#C53030" }}>IDENTIFIED ISSUE</TableCell>
                <TableCell sx={{ fontWeight: 800, color: "#C53030" }}>SEVERITY</TableCell>
                <TableCell sx={{ fontWeight: 800, color: "#C53030" }}>TIME</TableCell>
                <TableCell align="right" sx={{ fontWeight: 800, color: "#C53030" }}>ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {FLAGGED_SESSIONS.map((row) => (
                <TableRow key={row.id} hover sx={{ cursor: "pointer", "&:hover": { bgcolor: "#FFF5F5" } }}>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body2" fontWeight={800} color="#2D3748">{row.id}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <AvatarGroup max={2} sx={{ "& .MuiAvatar-root": { width: 32, height: 32, fontSize: "0.85rem", fontWeight: 700 } }}>
                      {row.players.map((p, i) => (
                        <Avatar key={i}>{p.charAt(0)}</Avatar>
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={700} color="#C53030">
                      {row.issue}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      icon={row.severity === "High" ? <Flame size={14} /> : <ShieldAlert size={14} />} 
                      label={row.severity} size="small" 
                      sx={{ 
                        fontWeight: 800, bgcolor: row.severity === "High" ? "#E53E3E" : "#DD6B20", color: "white",
                        "& .MuiChip-icon": { color: "white" }
                      }} 
                    />
                  </TableCell>
                  <TableCell sx={{ color: "text.secondary", fontWeight: 500 }}>{row.time}</TableCell>
                  <TableCell align="right">
                    <Button 
                      variant="contained" size="small" endIcon={<ArrowRight size={16} />} 
                      sx={{ bgcolor: "#E53E3E", textTransform: "none", fontWeight: 700, borderRadius: "8px", "&:hover": { bgcolor: "#C53030" } }}
                      onClick={() => router.push(`/admin/sessions/${row.id}`)}
                    >
                      Resolve
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
