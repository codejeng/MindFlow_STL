"use client";

import React from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ActivitySquare, Target, Settings, Layers, Brain } from "lucide-react";

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Determine current tab based on pathname
  let tabValue = "overview";
  if (pathname.includes("/feed")) tabValue = "feed";
  else if (pathname.includes("/segments")) tabValue = "segments";
  else if (pathname.includes("/predictive")) tabValue = "predictive";
  else if (pathname.includes("/recommendations")) tabValue = "recommendations";
  else if (pathname.includes("/settings")) tabValue = "settings";
  else if (pathname !== "/admin/insights" && pathname.startsWith("/admin/insights/")) {
     tabValue = "detail";
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue === "overview") router.push("/admin/insights");
    else if (newValue !== "detail") router.push(`/admin/insights/${newValue}`);
  };

  const isDetailView = tabValue === "detail";

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", flex: 1 }}>
      {!isDetailView && (
        <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight={800} sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1.5, background: "linear-gradient(90deg, #1B7B7E, #7B68EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              <Brain size={32} color="#1B7B7E" /> AI Decision Engine
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Transforming psychological data into actionable family interventions.
            </Typography>
          </Box>
          <Tabs 
            value={tabValue} 
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTabs-indicator": { backgroundColor: "#7B68EE", height: 3, borderRadius: "3px 3px 0 0" },
              "& .MuiTab-root": { textTransform: "none", fontWeight: 700, fontSize: "0.95rem", color: "#718096", minHeight: 48 },
              "& .Mui-selected": { color: "#7B68EE !important" }
            }}
          >
            <Tab icon={<Sparkles size={16} />} iconPosition="start" label="Overview" value="overview" />
            <Tab icon={<ActivitySquare size={16} />} iconPosition="start" label="Insight Feed" value="feed" />
            <Tab icon={<Layers size={16} />} iconPosition="start" label="Segmentation" value="segments" />
            <Tab icon={<Target size={16} />} iconPosition="start" label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                Predictive
                <Box sx={{ px: 0.8, py: 0.2, borderRadius: "10px", bgcolor: "#F7F5FF", color: "#7B68EE", fontSize: "0.65rem", border: "1px solid #E9E4FF" }}>PRO</Box>
              </Box>
            } value="predictive" />
            <Tab label="Recommendations" value="recommendations" />
            <Tab icon={<Settings size={16} />} iconPosition="start" label="Settings" value="settings" />
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
