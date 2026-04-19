"use client";

import React, { useState } from "react";
import { 
  Box, Card, Typography, Stepper, Step, StepLabel, Button, Grid,
  Radio, RadioGroup, FormControlLabel, Checkbox, FormGroup, Divider,
  TextField, MenuItem, CircularProgress, Backdrop
} from "@mui/material";
import { FileText, Users, Sliders, Eye, PlusSquare, CheckCircle2, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

const STEPS = ["Report Type", "Audience", "Metrics Selection", "Document Preview"];

export default function GenerateReportWizard() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleNext = () => {
    if (activeStep === STEPS.length - 1) {
      // Simulate generating PDF/Report
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        router.push("/admin/reports/RPT-103"); // Go to detail map
      }, 2000);
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };
  
  const handleBack = () => setActiveStep((prev) => prev - 1);

  // Partial Views for Steps
  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight={800} sx={{ mb: 4 }}>Select Report Scope</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 3 }}>
              {["Individual Patient", "Family Unit", "Classroom / Group", "School Organization"].map((type, i) => (
                <Box key={i}>
                  <Card sx={{ 
                    p: 3, borderRadius: "16px", border: i === 3 ? "2px solid #1B7B7E" : "1px solid #EDF2F7", 
                    cursor: "pointer", bgcolor: i === 3 ? "#F0FAFA" : "white" 
                  }}>
                    <RadioGroup value={i === 3 ? type : ""}>
                      <FormControlLabel value={type} control={<Radio sx={{color: "#1B7B7E", '&.Mui-checked': {color: '#1B7B7E'}}} />} label={<Typography fontWeight={700}>{type}</Typography>} />
                    </RadioGroup>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>Comprehensive overview for B2B stakeholders.</Typography>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 4 }}>
            <Typography variant="h6" fontWeight={800}>Target Audience Selection</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 4 }}>
              <TextField select label="Age Group" defaultValue="all" fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}>
                <MenuItem value="all">All Ages</MenuItem>
                <MenuItem value="pri">Primary (6-12)</MenuItem>
                <MenuItem value="sec">Secondary (13-18)</MenuItem>
              </TextField>
              <TextField select label="Risk Segmentation" defaultValue="high" fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}>
                <MenuItem value="all">All Users</MenuItem>
                <MenuItem value="high">High Risk Cohort Only</MenuItem>
                <MenuItem value="healthy">Healthy Cohort Only</MenuItem>
              </TextField>
              <TextField label="Date Range" type="date" defaultValue="2026-03-01" fullWidth InputLabelProps={{ shrink: true }} sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }} />
              <TextField label="End Date" type="date" defaultValue="2026-03-31" fullWidth InputLabelProps={{ shrink: true }} sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }} />
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight={800} sx={{ mb: 4 }}>Select Metrics & Analytics to Include</Typography>
            <FormGroup sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
              {["Communication (COM)", "Self-Efficacy (SE)", "Resilience (RES)", "Emotional Regulation (ER)", "Session Frequency Trends", "Flagged Incident Summaries", "AI Root Cause Extraction", "Clinical Recommendations (CTA)"].map((metric, i) => (
                <FormControlLabel key={i} control={<Checkbox defaultChecked={i !== 4} sx={{color: "#1B7B7E", '&.Mui-checked': {color: '#1B7B7E'}}} />} label={<Typography fontWeight={600}>{metric}</Typography>} />
              ))}
            </FormGroup>
          </Box>
        );
      case 3:
        return (
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h6" fontWeight={800}>A4 Print Preview</Typography>
              <Button startIcon={<PlusSquare size={16} />} variant="outlined" sx={{ borderRadius: "10px", fontWeight: 700, textTransform: "none" }}>Add Custom Logo</Button>
            </Box>
            
            {/* 🔥 Full Fidelity A4 Preview Mockup */}
            <Box sx={{ 
              width: "100%", maxWidth: 800, mx: "auto", bgcolor: "white", 
              boxShadow: "0 20px 50px rgba(0,0,0,0.1)", borderRadius: "8px", 
              border: "1px solid #E2E8F0", overflow: "hidden" 
            }}>
              {/* Fake A4 Header */}
              <Box sx={{ p: 4, bgcolor: "#F7FAFC", borderBottom: "2px solid #1B7B7E", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Box>
                  <Typography variant="h3" fontWeight={900} color="#1B7B7E" sx={{ mb: 1, letterSpacing: -1 }}>MindFlow</Typography>
                  <Typography variant="subtitle1" fontWeight={700} color="#4A5568">Organizational Diagnostics Report</Typography>
                  <Typography variant="caption" color="text.secondary">Prepared for: St. John's High School | March 2026</Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Box sx={{ width: 60, height: 60, bgcolor: "#E2E8F0", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", mb: 1, color: "#A0AEC0", fontSize: "0.7rem", fontWeight: 800 }}>LOGO</Box>
                  <Typography variant="caption" color="text.secondary">Confidential</Typography>
                </Box>
              </Box>

              {/* Fake A4 Content */}
              <Box sx={{ p: 5 }}>
                <Typography variant="h5" fontWeight={800} sx={{ mb: 3 }}>1. Executive Summary</Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.8, color: "#4A5568", mb: 4 }}>
                  In March 2026, 120 family units associated with your organization completed an average of 4.2 sessions per week. A critical pattern was identified: <span style={{ color: "#E53E3E", fontWeight: 700 }}>Communication metrics dropped 12% in the Secondary cohort</span>. This report analyzes the root cause and provides tailored interventions.
                </Typography>

                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 4, mb: 4 }}>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 2 }}>Cohort Overview Analysis</Typography>
                    <Box sx={{ height: 200, width: "100%" }}>
                      <ResponsiveContainer>
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                          { subject: "COM", A: 60, fullMark: 100 }, { subject: "SE", A: 85, fullMark: 100 },
                          { subject: "RES", A: 90, fullMark: 100 }, { subject: "ER", A: 65, fullMark: 100 }
                        ]}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#718096" }} />
                          <Radar name="Score" dataKey="A" stroke="#1B7B7E" fill="#1B7B7E" fillOpacity={0.4} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 2 }}>Trend History</Typography>
                    <Box sx={{ height: 200, width: "100%" }}>
                      <ResponsiveContainer>
                        <BarChart data={[{n:"Jan",v:80},{n:"Feb",v:82},{n:"Mar",v:68}]}>
                          <XAxis dataKey="n" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                          <Bar dataKey="v" fill="#7B68EE" radius={[4,4,0,0]} barSize={20} />
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ p: 3, bgcolor: "#F0FAFA", borderLeft: "4px solid #1B7B7E", borderRadius: "0 8px 8px 0" }}>
                  <Typography variant="subtitle2" fontWeight={800} color="#1B7B7E" sx={{ mb: 1 }}>AI Clinical Recommendation</Typography>
                  <Typography variant="body2" color="#2C7A7B">
                    Assign the "Active Listening" module to the Secondary cohort. Prohibit Parents from using Pass Tokens during the next two sessions to force empathetic bridging.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        );
      default: return null;
    }
  };

  const getStepIcon = (index: number) => {
    switch(index) {
      case 0: return <FileText size={20} />;
      case 1: return <Users size={20} />;
      case 2: return <Sliders size={20} />;
      case 3: return <Eye size={20} />;
      default: return <CheckCircle2 size={20} />;
    }
  };

  return (
    <Box sx={{ width: "100%", pb: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
      
      {/* Loading Overlay */}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, display: "flex", flexDirection: "column", gap: 3 }} open={isGenerating}>
        <CircularProgress color="inherit" size={60} thickness={4} />
        <Typography variant="h5" fontWeight={800}>Compiling B2B Report...</Typography>
        <Typography variant="body1" sx={{ opacity: 0.8 }}>Analyzing 1,240 sessions and generating clinical insights.</Typography>
      </Backdrop>

      <Box sx={{ width: "100%", maxWidth: 1000 }}>
        <Typography variant="h4" fontWeight={800} sx={{ mb: 4, color: "#1B7B7E" }}>Report Generator</Typography>
        
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 6 }}>
          {STEPS.map((label, index) => (
            <Step key={label}>
              <StepLabel 
                StepIconComponent={() => (
                  <Box sx={{ 
                    width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                    bgcolor: activeStep >= index ? "#1B7B7E" : "#E2E8F0", color: activeStep >= index ? "white" : "#718096",
                    boxShadow: activeStep === index ? "0 0 0 4px rgba(27,123,126,0.2)" : "none"
                  }}>
                    {getStepIcon(index)}
                  </Box>
                )}
              >
                <Typography fontWeight={activeStep === index ? 800 : 600} color={activeStep === index ? "#2D3748" : "text.secondary"}>
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Card sx={{ borderRadius: "24px", border: "1px solid #EDF2F7", boxShadow: "0 10px 40px rgba(0,0,0,0.03)", mb: 4, overflow: "hidden" }}>
          {renderStepContent(activeStep)}
          
          <Divider sx={{ my: 0 }} />
          
          <Box sx={{ p: 3, bgcolor: "#F7FAFC", display: "flex", justifyContent: "space-between" }}>
            <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined" sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 700, borderColor: "#CBD5E0", color: "#4A5568" }}>
              Back
            </Button>
            <Button 
              onClick={handleNext} 
              variant="contained" 
              endIcon={activeStep === STEPS.length - 1 ? <Download size={18} /> : undefined}
              sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 800, bgcolor: activeStep === STEPS.length - 1 ? "#48BB78" : "#1B7B7E", "&:hover": { bgcolor: activeStep === STEPS.length - 1 ? "#38A169" : "#145E61" } }}
            >
              {activeStep === STEPS.length - 1 ? "Generate Official Report" : "Save & Continue"}
            </Button>
          </Box>
        </Card>

      </Box>
    </Box>
  );
}
