"use client";

import React, { useState, useEffect } from "react";
import {
  Box, Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, AvatarGroup, Avatar, Button, IconButton
} from "@mui/material";
import { Activity, Clock, PlayCircle, Eye, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const LIVE_SESSIONS = [
  { id: "L-901", players: ["Jay", "Dad"], question: "Q4: ช่วงเวลาไหนที่รู้สึกอบอุ่นที่สุด?", time: "12m 45s", status: "Active" },
  { id: "L-902", players: ["Nong", "Mom"], question: "Q2: ถ้าเลือกเปลี่ยนนิสัยแม่ได้ 1 อย่าง?", time: "05m 12s", status: "Waiting Answer", alert: true },
  { id: "L-903", players: ["Tee", "Grandma"], question: "Q6: เล่าความลับตอนเด็กให้ฟังหน่อย", time: "28m 30s", status: "Active" },
];

const INITIAL_FEED = [
  { id: 1, text: "Session L-901 started answering Q4", time: "Just now", type: "info" },
  { id: 2, text: "L-902: Nong hesitated for 45s, Mom requested skip.", time: "1m ago", type: "warning" },
  { id: 3, text: "Session L-903 achieved 'Connection' milestone.", time: "3m ago", type: "success" },
];

export default function LiveSessions() {
  const [feed, setFeed] = useState(INITIAL_FEED);

  // Mock realtime feed effect
  useEffect(() => {
    const timer = setInterval(() => {
      setFeed(prev => {
        const newEvent = {
          id: Date.now(),
          text: `[Live] L-901: Dad reacted positively to Jay's answer.`,
          time: "Just now",
          type: "success"
        };
        const updated = [newEvent, ...prev].slice(0, 5);
        return updated;
      });
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ width: "100%", pb: 8, display: "flex", flexDirection: "column", gap: 4 }}>
      
      {/* 1. Header & Counter */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ p: 1.5, borderRadius: "12px", bgcolor: "#48BB7820" }}>
            <Activity size={24} color="#48BB78" />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={800} color="#2D3748">Active Live Sessions</Typography>
            <Typography variant="body2" color="text.secondary">Real-time monitoring of ongoing family games</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, px: 3, py: 1.5, bgcolor: "#2D3748", color: "white", borderRadius: "12px" }}>
          <Typography variant="body1" fontWeight={700}>Concurrent Players</Typography>
          <Typography variant="h4" fontWeight={800} color="#48BB78">12</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "8fr 4fr" }, gap: 4 }}>
        
        {/* Left Column: Live Table */}
        <Card sx={{ borderRadius: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", border: "1px solid #EDF2F7", overflow: "hidden" }}>
          <Typography variant="h6" fontWeight={800} sx={{ p: 3, pb: 0 }}>Live Board</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: "#718096" }}>SESSION ID</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#718096" }}>PLAYERS</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#718096" }}>CURRENT QUESTION</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#718096" }}>ELAPSED</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, color: "#718096" }}>MONITOR</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {LIVE_SESSIONS.map((row) => (
                  <TableRow key={row.id} hover sx={{ bgcolor: row.alert ? "#FFF5F5" : "inherit" }}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <PlayCircle size={16} color="#48BB78" />
                        <Typography variant="body2" fontWeight={800} color="#2D3748">{row.id}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <AvatarGroup max={2} sx={{ "& .MuiAvatar-root": { width: 28, height: 28, fontSize: "0.75rem", fontWeight: 700 } }}>
                        {row.players.map((p, i) => (
                          <Avatar key={i}>{p.charAt(0)}</Avatar>
                        ))}
                      </AvatarGroup>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={700} color={row.alert ? "#C53030" : "#4A5568"}>
                        {row.question}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip icon={<Clock size={14} />} label={row.time} size="small" sx={{ fontWeight: 700, bgcolor: "transparent" }} />
                    </TableCell>
                    <TableCell align="right">
                      <Button variant="contained" size="small" startIcon={<Eye size={16} />} sx={{ bgcolor: "#2D3748", textTransform: "none", fontWeight: 700, borderRadius: "8px" }}>
                        Watch
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        {/* Right Column: Activity Feed */}
        <Card sx={{ borderRadius: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", border: "1px solid #EDF2F7", p: 3, display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h6" fontWeight={800}>Activity Stream</Typography>
            <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#48BB78", animation: "pulse 2s infinite" }} />
          </Box>
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            <AnimatePresence>
              {feed.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <Box sx={{ p: 2, borderRadius: "12px", bgcolor: item.type === "warning" ? "#FFF5F5" : item.type === "success" ? "#F0FFF4" : "#F7FAFC", borderLeft: `4px solid ${item.type === "warning" ? "#F56565" : item.type === "success" ? "#48BB78" : "#A0AEC0"}` }}>
                    <Typography variant="body2" fontWeight={600} color="#2D3748" sx={{ mb: 0.5 }}>{item.text}</Typography>
                    <Typography variant="caption" color="text.secondary">{item.time}</Typography>
                  </Box>
                </motion.div>
              ))}
            </AnimatePresence>
          </Box>
        </Card>
      </Box>

    </Box>
  );
}
