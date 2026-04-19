"use client";

import React, { use, useState } from "react";
import { Box, Card, Typography, Grid, Button, IconButton, Chip, Divider, Snackbar, Alert } from "@mui/material";
import { ArrowLeft, Download, Mail, Printer, BrainCircuit, ActivitySquare, Target, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, RadarChart, Radar, PolarGrid, PolarAngleAxis } from "recharts";

export default function ReportDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [showToast, setShowToast] = useState(false);

  const handleExport = () => {
    setShowToast(true);
  };

  return (
    <Box sx={{ width: "100%", pb: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
      
      {/* Export Toast */}
      <Snackbar open={showToast} autoHideDuration={4000} onClose={() => setShowToast(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setShowToast(false)} severity="success" sx={{ width: '100%', fontWeight: 700, borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
          Report exported and sent to School Admin successfully!
        </Alert>
      </Snackbar>

      <Box sx={{ width: "100%", maxWidth: 1000 }}>
        
        {/* Action Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton onClick={() => router.back()} sx={{ bgcolor: "white", border: "1px solid #E2E8F0" }}>
              <ArrowLeft size={20} />
            </IconButton>
            <Typography variant="h5" fontWeight={800} color="#2D3748">Report Viewer</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="outlined" startIcon={<Printer size={18} />} sx={{ borderRadius: "10px", borderColor: "#CBD5E0", color: "#4A5568", textTransform: "none", fontWeight: 700 }}>Print</Button>
            <Button variant="outlined" startIcon={<Mail size={18} />} sx={{ borderRadius: "10px", borderColor: "#CBD5E0", color: "#4A5568", textTransform: "none", fontWeight: 700 }}>Email Client</Button>
            <Button onClick={handleExport} variant="contained" startIcon={<Download size={18} />} sx={{ borderRadius: "10px", bgcolor: "#1B7B7E", textTransform: "none", fontWeight: 800 }}>Export PDF</Button>
          </Box>
        </Box>

        {/* The Report Document View */}
        <Box sx={{ bgcolor: "white", boxShadow: "0 10px 40px rgba(0,0,0,0.05)", borderRadius: "16px", border: "1px solid #E2E8F0", overflow: "hidden" }}>
          
          {/* Header Branding */}
          <Box sx={{ p: { xs: 4, md: 6 }, pb: 4, display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "4px solid #1B7B7E" }}>
            <Box>
              <Typography variant="h3" fontWeight={900} color="#1B7B7E" sx={{ mb: 1, letterSpacing: -1 }}>MindFlow Analytics</Typography>
              <Typography variant="h5" fontWeight={800} color="#2D3748" sx={{ mb: 1 }}>Organization Diagnostics Report</Typography>
              <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 2 }}>
                <Chip label={`ID: ${id}`} size="small" sx={{ fontWeight: 800, bgcolor: "#EDF2F7", borderRadius: "6px" }} />
                <Chip label="Generated: March 2026" size="small" sx={{ fontWeight: 700, bgcolor: "transparent", border: "1px solid #E2E8F0", borderRadius: "6px" }} />
              </Box>
            </Box>
            <Box sx={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <Box sx={{ width: 80, height: 80, bgcolor: "#F7FAFC", borderRadius: "16px", border: "1px dashed #CBD5E0", display: "flex", alignItems: "center", justifyContent: "center", mb: 2, color: "#A0AEC0", fontWeight: 800 }}>CLIENT LOGO</Box>
              <Typography variant="body2" fontWeight={700} color="text.secondary">Prepared for:</Typography>
              <Typography variant="body1" fontWeight={800} color="#2D3748">St. John's High School</Typography>
            </Box>
          </Box>

          <Box sx={{ p: { xs: 4, md: 6 } }}>
            
            {/* Executive Summary */}
            <Box sx={{ mb: 6 }}>
              <Typography variant="h5" fontWeight={800} sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2, color: "#2D3748" }}>
                <Target size={24} color="#1B7B7E" /> 1. Executive Summary
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#4A5568", fontSize: "1.05rem" }}>
                Based on the analysis of 1,240 active family sessions conducted during March 2026, the overall mental wellness score of the student body remains stable. However, a critical behavioral pattern was identified: <span style={{ color: "#E53E3E", fontWeight: 700, backgroundColor: "#FFF5F5", padding: "0 4px" }}>Communication (COM) metrics dropped 12% specifically within the Secondary cohort (13-15 yrs)</span>. This report analyzes this phenomenon and prescribes interventions.
              </Typography>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 6, mb: 6 }}>
              {/* Radar Chart */}
              <Box>
                <Card sx={{ p: 3, borderRadius: "16px", border: "1px solid #EDF2F7", boxShadow: "none", height: "100%" }}>
                  <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 2 }}>Cohort Performance Radar</Typography>
                  <Box sx={{ height: 250, width: "100%" }}>
                    <ResponsiveContainer>
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                        { subject: "COM", Score: 60, fullMark: 100 }, { subject: "SE", Score: 85, fullMark: 100 },
                        { subject: "RES", Score: 90, fullMark: 100 }, { subject: "ER", Score: 65, fullMark: 100 }
                      ]}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fontWeight: 700, fill: "#4A5568" }} />
                        <Radar name="Score" dataKey="Score" stroke="#1B7B7E" strokeWidth={2} fill="#1B7B7E" fillOpacity={0.2} />
                        <RechartsTooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </Box>
                </Card>
              </Box>

              {/* Bar Chart */}
              <Box>
                <Card sx={{ p: 3, borderRadius: "16px", border: "1px solid #EDF2F7", boxShadow: "none", height: "100%" }}>
                  <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 2 }}>COM Metric Trend</Typography>
                  <Box sx={{ height: 250, width: "100%" }}>
                    <ResponsiveContainer>
                      <BarChart data={[{n:"Jan",v:80},{n:"Feb",v:82},{n:"Mar",v:68}]} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EDF2F7" />
                        <XAxis dataKey="n" tick={{ fontSize: 12, fontWeight: 600 }} axisLine={false} tickLine={false} dy={10} />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "#A0AEC0" }} axisLine={false} tickLine={false} />
                        <RechartsTooltip cursor={{ fill: "#F7FAFC" }} />
                        <Bar dataKey="v" fill="#7B68EE" radius={[6,6,0,0]} barSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </Card>
              </Box>
            </Box>

            {/* Deep Analysis & Recommendation */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="h5" fontWeight={800} sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3, color: "#2D3748" }}>
                <BrainCircuit size={24} color="#7B68EE" /> 2. Clinical Findings & Strategy
              </Typography>
              
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 4 }}>
                <Box>
                  <Box sx={{ p: 3, border: "1px solid #E9E4FF", borderRadius: "16px", bgcolor: "#F7F5FF", height: "100%" }}>
                    <Typography variant="subtitle2" fontWeight={800} color="#553C9A" sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}><ActivitySquare size={16}/> Root Cause Extraction</Typography>
                    <Typography variant="body2" color="#4A5568" sx={{ lineHeight: 1.7 }}>
                      Pattern recognition indicates that parental figures in this demographic group have increased their tendency to offer immediate judgment following vulnerability exposure by the teenager. This micro-rejection cycle causes the teenager to preemptively utilize 'Pass Tokens' in subsequent sessions, registering as a sharp decline in Communication flow.
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Box sx={{ p: 3, border: "1px solid #C6F6D5", borderRadius: "16px", bgcolor: "#F0FFF4", height: "100%" }}>
                    <Typography variant="subtitle2" fontWeight={800} color="#276749" sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}><CheckCircle2 size={16}/> Proposed Intervention</Typography>
                    <Typography variant="body2" color="#2F855A" sx={{ lineHeight: 1.7, mb: 2 }}>
                      It is recommended that the school counselor activates the <strong>"Active Listening Module"</strong> for this specific cohort. This algorithm update will inject specific constraints into their next 3 sessions.
                    </Typography>
                    <Button variant="contained" size="small" sx={{ bgcolor: "#38A169", fontWeight: 700, borderRadius: "8px", textTransform: "none", boxShadow: "none" }}>Activate Module</Button>
                  </Box>
                </Box>
              </Box>
            </Box>

          </Box>
        </Box>
      </Box>
    </Box>
  );
}
