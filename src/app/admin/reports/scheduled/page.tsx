"use client";

import React from "react";
import { Box, Card, Typography, Button, Switch, Chip, Avatar, AvatarGroup } from "@mui/material";
import { CalendarClock, Plus, MoreVertical, Play, Edit3, Trash2 } from "lucide-react";

const SCHEDULED_DATA = [
  { 
    id: 1, name: "Weekly School Report", type: "School Organization", schedule: "Every Monday at 9:00 AM", 
    recipients: ["Dr. Sarah (Principal)", "Counselor Team"], active: true, nextRun: "Tomorrow, 09:00" 
  },
  { 
    id: 2, name: "High-Risk Families Alert", type: "Custom Segment", schedule: "Every Friday at 17:00 PM", 
    recipients: ["Intervention Team"], active: true, nextRun: "Friday, 17:00" 
  },
  { 
    id: 3, name: "Monthly Engagement Summary", type: "System Wide", schedule: "1st of Every Month", 
    recipients: ["Management Board"], active: false, nextRun: "Paused" 
  },
];

export default function ScheduledReports() {
  return (
    <Box sx={{ width: "100%", pb: 8, display: "flex", flexDirection: "column", gap: 4 }}>
      
      {/* 1. Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "#1A202C", color: "white", p: 4, borderRadius: "24px" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Box sx={{ p: 2, borderRadius: "16px", bgcolor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
            <CalendarClock size={32} color="#F6E05E" />
          </Box>
          <Box>
            <Typography variant="h4" fontWeight={800}>Automated Reports</Typography>
            <Typography variant="body1" sx={{ opacity: 0.8 }}>
              Set up recurring reports to be automatically generated and emailed to stakeholders.
            </Typography>
          </Box>
        </Box>
        <Button variant="contained" startIcon={<Plus size={18} />} sx={{ bgcolor: "#F6E05E", color: "#1A202C", fontWeight: 800, px: 3, py: 1.5, borderRadius: "12px", "&:hover": { bgcolor: "#ECC94B" }, textTransform: "none" }}>
          Create New Schedule
        </Button>
      </Box>

      {/* 2. List of Schedules */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" }, gap: 4 }}>
        {SCHEDULED_DATA.map((item) => (
          <Card key={item.id} sx={{ p: 4, borderRadius: "24px", border: "1px solid #EDF2F7", boxShadow: "0 4px 20px rgba(0,0,0,0.02)", display: "flex", flexDirection: "column", opacity: item.active ? 1 : 0.6 }}>
            
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
              <Box>
                <Typography variant="h5" fontWeight={800} color="#2D3748" sx={{ mb: 1 }}>{item.name}</Typography>
                <Chip label={item.type} size="small" sx={{ fontWeight: 700, bgcolor: "#EDF2F7", color: "#4A5568" }} />
              </Box>
              <Switch defaultChecked={item.active} color="primary" />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1, mb: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ width: 40, height: 40, borderRadius: "10px", bgcolor: "#EBF8FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CalendarClock size={18} color="#3182CE" />
                </Box>
                <Box>
                  <Typography variant="caption" fontWeight={700} color="text.secondary" display="block">SCHEDULE</Typography>
                  <Typography variant="body2" fontWeight={800} color="#2D3748">{item.schedule}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ width: 40, height: 40, borderRadius: "10px", bgcolor: "#F0FFF4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Play size={18} color="#38A169" />
                </Box>
                <Box>
                  <Typography variant="caption" fontWeight={700} color="text.secondary" display="block">NEXT RUN</Typography>
                  <Typography variant="body2" fontWeight={800} color={item.active ? "#38A169" : "#A0AEC0"}>{item.nextRun}</Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ pt: 3, borderTop: "1px solid #EDF2F7", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AvatarGroup max={2} sx={{ "& .MuiAvatar-root": { width: 28, height: 28, fontSize: "0.75rem", fontWeight: 700 } }}>
                  {item.recipients.map((r, i) => <Avatar key={i}>{r.charAt(0)}</Avatar>)}
                </AvatarGroup>
                <Typography variant="caption" fontWeight={600} color="text.secondary">
                  Sending to {item.recipients.length} recipients
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 1 }}>
                <Button size="small" variant="outlined" sx={{ minWidth: 0, p: 1, borderRadius: "8px", borderColor: "#E2E8F0", color: "#4A5568" }}><Edit3 size={16} /></Button>
                <Button size="small" variant="outlined" sx={{ minWidth: 0, p: 1, borderRadius: "8px", borderColor: "#FEB2B2", color: "#E53E3E" }}><Trash2 size={16} /></Button>
              </Box>
            </Box>

          </Card>
        ))}
      </Box>

    </Box>
  );
}
