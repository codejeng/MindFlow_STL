"use client";

import React from "react";
import { Box, Card, Typography, TextField, InputAdornment, MenuItem, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton } from "@mui/material";
import { Search, Filter, Download, Eye, FileText, Forward } from "lucide-react";
import { useRouter } from "next/navigation";

const LIBRARY_DATA = [
  { id: "RPT-103", name: "Monthly Secondary Cohort Analysis", type: "School Report", date: "April 1, 2026", users: 1240, status: "Ready" },
  { id: "RPT-102", name: "Family Unit Interaction Summary", type: "Family Unit", date: "March 28, 2026", users: 4, status: "Ready" },
  { id: "RPT-101", name: "Q1 Organizational Insight Overview", type: "Organization", date: "March 15, 2026", users: 3800, status: "Ready" },
  { id: "RPT-100", name: "High Conflict Families Watchlist", type: "Custom List", date: "March 10, 2026", users: 85, status: "Archived" },
];

export default function ReportLibrary() {
  const router = useRouter();

  return (
    <Box sx={{ width: "100%", pb: 8, display: "flex", flexDirection: "column", gap: 4 }}>
      
      {/* 1. Header & Filter */}
      <Card sx={{ p: 2, borderRadius: "16px", display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap", border: "1px solid #EDF2F7", boxShadow: "none" }}>
        <TextField
          size="small"
          placeholder="Search by Report Name or ID..."
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search size={18} color="#A0AEC0" /></InputAdornment>,
            sx: { borderRadius: "12px", bgcolor: "#F7FAFC", minWidth: 300 }
          }}
        />
        <TextField select size="small" defaultValue="all" sx={{ minWidth: 150, "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#F7FAFC" } }}>
          <MenuItem value="all">All Types</MenuItem>
          <MenuItem value="school">School Report</MenuItem>
          <MenuItem value="family">Family Unit</MenuItem>
        </TextField>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="contained" startIcon={<Filter size={18} />} sx={{ borderRadius: "12px", bgcolor: "#2D3748", textTransform: "none", fontWeight: 700 }}>
          Apply Filters
        </Button>
      </Card>

      {/* 2. Library Table */}
      <Card sx={{ borderRadius: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", border: "1px solid #EDF2F7", overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: "#F7FAFC" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: "#718096" }}>REPORT NAME</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#718096" }}>TYPE / COHORT</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#718096", whiteSpace: "nowrap" }}>DATE CREATED</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#718096" }}>STATUS</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: "#718096" }}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {LIBRARY_DATA.map((row) => (
                <TableRow key={row.id} hover sx={{ cursor: "pointer", transition: "all 0.2s", "&:hover": { bgcolor: "#F0FAFA" } }}>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box sx={{ p: 1, borderRadius: "8px", bgcolor: "#EBF8FF", color: "#3182CE" }}><FileText size={18}/></Box>
                      <Box>
                        <Typography variant="body2" fontWeight={800} color="#2D3748">{row.name}</Typography>
                        <Typography variant="caption" color="text.secondary">ID: {row.id}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip label={row.type} size="small" sx={{ fontWeight: 700, bgcolor: "#EDF2F7", color: "#4A5568", mb: 0.5 }} />
                    <Typography variant="caption" display="block" color="text.secondary">{row.users} Users Covered</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600} color="#4A5568">{row.date}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={row.status} size="small" 
                      sx={{ 
                        fontWeight: 800, fontSize: "0.7rem",
                        bgcolor: row.status === "Ready" ? "#F0FFF4" : "#EDF2F7",
                        color: row.status === "Ready" ? "#38A169" : "#718096"
                      }} 
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                      <IconButton onClick={() => router.push(`/admin/reports/${row.id}`)} size="small" sx={{ bgcolor: "#F7FAFC", "&:hover": { bgcolor: "#E2E8F0" } }}>
                        <Eye size={16} color="#4A5568" />
                      </IconButton>
                      <IconButton size="small" sx={{ bgcolor: "#F7FAFC", "&:hover": { bgcolor: "#E2E8F0" } }}>
                        <Download size={16} color="#4A5568" />
                      </IconButton>
                      <IconButton size="small" sx={{ bgcolor: "#F7FAFC", "&:hover": { bgcolor: "#E2E8F0" } }}>
                        <Forward size={16} color="#4A5568" />
                      </IconButton>
                    </Box>
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
