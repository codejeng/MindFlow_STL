"use client";
import { useState } from "react";
import { Box, Typography, Container, Chip, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { MOCK_APPOINTMENTS, getExpertById } from "@/data/experts";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ComputerRoundedIcon from "@mui/icons-material/ComputerRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

const BG = "#FDF6EE";
const PRIMARY = "#5A7A65";

export default function AppointmentsPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  const upcoming = MOCK_APPOINTMENTS.filter((a) => a.status === "confirmed");
  const past = MOCK_APPOINTMENTS.filter((a) => a.status === "completed");
  const items = tab === "upcoming" ? upcoming : past;

  return (
    <Box sx={{ minHeight: "100vh", background: BG, pb: 4 }}>
      <Box sx={{ backgroundColor: "white", px: 2, pt: 3, pb: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <Typography fontWeight={800} sx={{ fontSize: "1.2rem", color: "#1F2937", mb: 2 }}>
          การนัดหมายของฉัน
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          {[
            { key: "upcoming", label: "Upcoming" },
            { key: "past",     label: "ประวัติการนัดหมาย" },
          ].map((t) => (
            <Box key={t.key} onClick={() => setTab(t.key as "upcoming" | "past")}
              sx={{
                px: 2.5, py: 0.75, borderRadius: 5, cursor: "pointer",
                backgroundColor: tab === t.key ? PRIMARY : "transparent",
                border: `1.5px solid ${tab === t.key ? PRIMARY : "#E5E7EB"}`,
                transition: "all 0.2s",
              }}>
              <Typography variant="body2" fontWeight={700}
                sx={{ color: tab === t.key ? "white" : "#6B7280" }}>
                {t.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Container maxWidth="sm" sx={{ pt: 3 }}>
        {items.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <CalendarMonthRoundedIcon sx={{ fontSize: "3.5rem", color: "#D1D5DB", mb: 2 }} />
            <Typography fontWeight={600} sx={{ color: "#374151", mb: 1 }}>ยังไม่มีการนัดหมาย</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              ค้นหาผู้เชี่ยวชาญและนัดหมายได้เลย
            </Typography>
            <Button variant="contained" onClick={() => router.push("/consult")}
              sx={{ borderRadius: 4, textTransform: "none", fontWeight: 700,
                background: `linear-gradient(135deg,${PRIMARY},#7AA880)` }}>
              ค้นหาผู้เชี่ยวชาญ
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {items.map((appt, i) => {
              const expert = getExpertById(appt.expertId);
              if (!expert) return null;
              return (
                <Box key={appt.id} component={motion.div}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  sx={{ backgroundColor: "white", borderRadius: 4, p: 2.5,
                    boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: "1px solid #F0E8DC" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 0.5 }}>
                    <Typography variant="caption" sx={{ color: "#9CA3AF", fontWeight: 700, display: "flex", alignItems: "center", gap: 0.5 }}>
                      <CalendarMonthRoundedIcon sx={{ fontSize: "1.1rem" }} /> {appt.date}
                    </Typography>
                    <Chip
                      label={appt.status === "confirmed" ? "ยืนยันแล้ว" : "เสร็จสิ้น"}
                      size="small"
                      sx={{
                        backgroundColor: appt.status === "confirmed" ? "#D1FAE5" : "#F3F4F6",
                        color: appt.status === "confirmed" ? "#065F46" : "#6B7280",
                        fontWeight: 800, fontSize: "0.75rem", px: 0.5
                      }}
                    />
                  </Box>
                  <Typography fontWeight={900} sx={{ color: "#1F2937", fontSize: "1.15rem", mb: 2.5 }}>
                    {appt.time} น.
                  </Typography>

                  <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
                    <Box sx={{ width: 48, height: 48, borderRadius: "50%",
                      backgroundColor: "#F3F4F6", display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: "1.25rem", fontWeight: 800, color: "#374151", flexShrink: 0 }}>
                      {expert.name.charAt(2)}
                    </Box>
                    <Box>
                      <Typography fontWeight={800} sx={{ color: "#1F2937", fontSize: "1rem" }}>
                        {expert.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#6B7280" }}>{expert.title}</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2.5 }}>
                    <Chip 
                      icon={appt.format === "online" ? <ComputerRoundedIcon sx={{ fontSize: "1rem !important", color: "inherit" }} /> : <BusinessRoundedIcon sx={{ fontSize: "1rem !important", color: "inherit" }} />}
                      label={appt.format === "online" ? "ออนไลน์" : "ตัวต่อตัว"} 
                      size="small"
                      sx={{ fontSize: "0.75rem", fontWeight: 700, backgroundColor: "#F0F9F4", color: PRIMARY, "& .MuiChip-icon": { color: PRIMARY } }} 
                    />
                    {appt.location && (
                      <Chip 
                        icon={<LocationOnRoundedIcon sx={{ fontSize: "1rem !important", color: "inherit" }} />}
                        label={appt.location} 
                        size="small"
                        sx={{ fontSize: "0.75rem", fontWeight: 700, backgroundColor: "#FEF6E5", color: "#C07A1A", "& .MuiChip-icon": { color: "#C07A1A" } }} 
                      />
                    )}
                    <Chip 
                      icon={<PaymentsRoundedIcon sx={{ fontSize: "1rem !important", color: "inherit" }} />}
                      label={`${appt.price.toLocaleString()}.-`} 
                      size="small"
                      sx={{ fontSize: "0.75rem", fontWeight: 700, backgroundColor: "#F3F4F6", color: "#374151", "& .MuiChip-icon": { color: "#374151" } }} 
                    />
                  </Box>

                  {appt.status === "confirmed" && (
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button variant="outlined" size="small" sx={{ flex: 1, borderRadius: 3, textTransform: "none",
                        borderColor: "#E5E7EB", color: "#EF4444", fontWeight: 600, fontSize: "0.8rem" }}>
                        ยกเลิก
                      </Button>
                      <Button variant="contained" size="small" sx={{ flex: 2, borderRadius: 3, textTransform: "none",
                        fontWeight: 700, fontSize: "0.8rem",
                        background: `linear-gradient(135deg,${PRIMARY},#7AA880)` }}>
                        เข้าร่วม
                      </Button>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        )}
      </Container>
    </Box>
  );
}
