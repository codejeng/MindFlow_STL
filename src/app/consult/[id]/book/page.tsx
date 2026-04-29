"use client";
import { useState, use } from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { getExpertById } from "@/data/experts";

const BG = "#FDF6EE";
const PRIMARY = "#5A7A65";

const TIME_SLOTS = ["10:00","11:00","13:00","14:00","15:00","16:00"];
const DAYS = [
  { day: "จ", date: 12 }, { day: "อ", date: 13 }, { day: "พ", date: 14 },
  { day: "พฤ", date: 15 }, { day: "ศ", date: 16 }, { day: "ส", date: 17 }, { day: "อา", date: 18 },
];

export default function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const expert = getExpertById(id);
  const [selectedDay, setSelectedDay] = useState(14);
  const [selectedTime, setSelectedTime] = useState<string | null>("14:00");
  const [format, setFormat] = useState<"online" | "onsite">("online");

  if (!expert) return null;

  return (
    <Box sx={{ minHeight: "100vh", background: BG, pb: 4 }}>
      <Box sx={{ backgroundColor: "white", px: 2, pt: 3, pb: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box onClick={() => router.back()} sx={{ cursor: "pointer", color: "#6B7280", fontSize: "1.3rem" }}>←</Box>
          <Box>
            <Typography fontWeight={700} sx={{ fontSize: "1.05rem", color: "#1F2937" }}>
              นัดหมายกับ
            </Typography>
            <Typography variant="body2" sx={{ color: PRIMARY, fontWeight: 600 }}>{expert.name}</Typography>
          </Box>
        </Box>
      </Box>

      <Container maxWidth="sm" sx={{ pt: 3 }}>
        {/* Day picker */}
        <Box sx={{ backgroundColor: "white", borderRadius: 4, p: 3, mb: 2, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <Typography fontWeight={700} sx={{ color: "#1F2937", mb: 2 }}>เลือกวัน</Typography>
          <Box sx={{ display: "flex", gap: 1, overflowX: "auto", pb: 0.5 }}>
            {DAYS.map((d) => {
              const active = selectedDay === d.date;
              return (
                <Box key={d.date} onClick={() => setSelectedDay(d.date)}
                  component={motion.div} whileTap={{ scale: 0.93 }}
                  sx={{
                    minWidth: 44, height: 64, borderRadius: 3, cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0.25,
                    backgroundColor: active ? PRIMARY : "#F9F5F0",
                    border: `1.5px solid ${active ? PRIMARY : "#EDE3D8"}`,
                    transition: "all 0.2s",
                  }}>
                  <Typography variant="caption" sx={{ color: active ? "white" : "#9CA3AF", fontWeight: 600 }}>{d.day}</Typography>
                  <Typography fontWeight={800} sx={{ color: active ? "white" : "#1F2937", fontSize: "1.1rem" }}>{d.date}</Typography>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Time picker */}
        <Box sx={{ backgroundColor: "white", borderRadius: 4, p: 3, mb: 2, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <Typography fontWeight={700} sx={{ color: "#1F2937", mb: 2 }}>เลือกเวลา</Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1 }}>
            {TIME_SLOTS.map((t) => {
              const active = selectedTime === t;
              return (
                <Box key={t} onClick={() => setSelectedTime(t)}
                  component={motion.div} whileTap={{ scale: 0.95 }}
                  sx={{
                    py: 1.25, borderRadius: 3, cursor: "pointer", textAlign: "center",
                    backgroundColor: active ? PRIMARY : "#F9F5F0",
                    border: `1.5px solid ${active ? PRIMARY : "#EDE3D8"}`,
                    transition: "all 0.2s",
                  }}>
                  <Typography fontWeight={600} sx={{ color: active ? "white" : "#374151", fontSize: "0.9rem" }}>{t}</Typography>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Format */}
        <Box sx={{ backgroundColor: "white", borderRadius: 4, p: 3, mb: 3, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <Typography fontWeight={700} sx={{ color: "#1F2937", mb: 2 }}>รูปแบบการปรึกษา</Typography>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            {(["online", "onsite"] as const).filter((f) => expert.formats.includes(f)).map((f) => {
              const active = format === f;
              return (
                <Box key={f} onClick={() => setFormat(f)}
                  sx={{
                    flex: 1, py: 1.5, borderRadius: 3, cursor: "pointer", textAlign: "center",
                    backgroundColor: active ? PRIMARY + "15" : "#F9F5F0",
                    border: `1.5px solid ${active ? PRIMARY : "#EDE3D8"}`,
                    transition: "all 0.2s",
                  }}>
                  <Typography sx={{ fontSize: "1.2rem", mb: 0.25 }}>{f === "online" ? "💻" : "🏢"}</Typography>
                  <Typography fontWeight={600} sx={{ color: active ? PRIMARY : "#374151", fontSize: "0.85rem" }}>
                    {f === "online" ? "ออนไลน์" : "ตัวต่อตัว (คลิก)"}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>

        <Button variant="contained" fullWidth
          onClick={() => router.push(`/consult/${id}/book/confirm?day=${selectedDay}&time=${selectedTime}&format=${format}`)}
          disabled={!selectedTime}
          sx={{
            py: 1.75, borderRadius: 4, fontWeight: 700, fontSize: "1rem", textTransform: "none",
            background: `linear-gradient(135deg,${PRIMARY},#7AA880)`,
            boxShadow: `0 4px 16px ${PRIMARY}40`,
          }}>
          ยืนยันการนัดหมาย
        </Button>
      </Container>
    </Box>
  );
}
