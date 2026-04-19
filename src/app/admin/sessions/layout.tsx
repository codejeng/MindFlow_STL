"use client";

import React from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/common/PageTransition";

export default function SessionsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Determine current tab based on pathname
  let tabValue = "all";
  if (pathname.includes("/live")) tabValue = "live";
  else if (pathname.includes("/queue")) tabValue = "queue";
  else if (pathname.includes("/completed")) tabValue = "completed";
  else if (pathname.includes("/flagged")) tabValue = "flagged";
  else if (pathname !== "/admin/sessions" && pathname.startsWith("/admin/sessions/")) {
     // If it's a detail page (/admin/sessions/[id]), we can either hide tabs or highlight 'all'
     tabValue = "detail";
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue === "all") router.push("/admin/sessions");
    else router.push(`/admin/sessions/${newValue}`);
  };

  const isDetailView = tabValue === "detail";

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", flex: 1 }}>
      {!isDetailView && (
        <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight={800} color="#2D3748" sx={{ mb: 1 }}>
              Sessions Hub
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Monitor, analyze, and manage all Mindflow family sessions.
            </Typography>
          </Box>
          <Tabs 
            value={tabValue} 
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTabs-indicator": { backgroundColor: "#1B7B7E", height: 3, borderRadius: "3px 3px 0 0" },
              "& .MuiTab-root": { textTransform: "none", fontWeight: 700, fontSize: "0.95rem", color: "#718096" },
              "& .Mui-selected": { color: "#1B7B7E !important" }
            }}
          >
            <Tab label="All Sessions" value="all" />
            <Tab label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                Live Sessions
                <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#48BB78", animation: "pulse 2s infinite" }} />
              </Box>
            } value="live" />
            <Tab label="Analysis Queue" value="queue" />
            <Tab label="Completed" value="completed" />
            <Tab label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                Flagged
                <Box sx={{ px: 1, py: 0.2, borderRadius: "10px", bgcolor: "#FFF5F5", color: "#E53E3E", fontSize: "0.7rem", border: "1px solid #FEB2B2" }}>
                  ⚠️
                </Box>
              </Box>
            } value="flagged" />
          </Tabs>
        </Box>
      )}

      {/* Embedded CSS for pulse animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(72, 187, 120, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(72, 187, 120, 0); }
          100% { box-shadow: 0 0 0 0 rgba(72, 187, 120, 0); }
        }
      `}} />

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
