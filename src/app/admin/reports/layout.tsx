"use client";

import React from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FileBarChart, MonitorCheck, PlusSquare, Library, CalendarClock, SlidersHorizontal } from "lucide-react";

export default function ReportsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Determine current tab based on pathname
  let tabValue = "overview";
  if (pathname.includes("/generate")) tabValue = "generate";
  else if (pathname.includes("/library")) tabValue = "library";
  else if (pathname.includes("/scheduled")) tabValue = "scheduled";
  else if (pathname.includes("/custom")) tabValue = "custom";
  else if (pathname !== "/admin/reports" && pathname.startsWith("/admin/reports/")) {
     tabValue = "detail"; // for [id]
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue === "overview") router.push("/admin/reports");
    else if (newValue !== "detail") router.push(`/admin/reports/${newValue}`);
  };

  const isDetailView = tabValue === "detail";
  // Determine if it is wizard (hide tabs to focus)
  const isGenerateView = tabValue === "generate";

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", flex: 1 }}>
      {!(isDetailView || isGenerateView) && (
        <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight={800} sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1.5, color: "#1B7B7E" }}>
              <MonitorCheck size={32} color="#1B7B7E" /> Decision Report System
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Generate, schedule, and distribute actionable B2B metrics.
            </Typography>
          </Box>
          <Tabs 
            value={tabValue} 
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTabs-indicator": { backgroundColor: "#1B7B7E", height: 3, borderRadius: "3px 3px 0 0" },
              "& .MuiTab-root": { textTransform: "none", fontWeight: 700, fontSize: "0.95rem", color: "#718096", minHeight: 48 },
              "& .Mui-selected": { color: "#1B7B7E !important" }
            }}
          >
            <Tab icon={<FileBarChart size={16} />} iconPosition="start" label="Overview" value="overview" />
            <Tab icon={<PlusSquare size={16} />} iconPosition="start" label="Generate Report" value="generate" />
            <Tab icon={<Library size={16} />} iconPosition="start" label="Library" value="library" />
            <Tab icon={<CalendarClock size={16} />} iconPosition="start" label="Scheduled" value="scheduled" />
            <Tab icon={<SlidersHorizontal size={16} />} iconPosition="start" label="Custom Builder" value="custom" />
          </Tabs>
        </Box>
      )}

      <Box sx={{ flex: 1, position: "relative" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{ width: "100%", height: "100%" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}
