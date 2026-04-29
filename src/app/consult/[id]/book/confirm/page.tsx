"use client";
import { use } from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { getExpertById } from "@/data/experts";
import { Suspense } from "react";

const PRIMARY = "#5A7A65";

function ConfirmContent({ id }: { id: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const expert = getExpertById(id);
  const day = params.get("day") ?? "14";
  const time = params.get("time") ?? "14:00";
  const format = params.get("format") ?? "online";

  if (!expert) return null;

  return (
    <Box sx={{ minHeight: "100vh", background: "#FDF6EE", display: "flex", alignItems: "center" }}>
      <Container maxWidth="sm">
        <Box component={motion.div} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          sx={{ textAlign: "center", mb: 3 }}>
          {/* Checkmark */}
          <Box component={motion.div}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            sx={{
              width: 80, height: 80, borderRadius: "50%", mx: "auto", mb: 2,
              backgroundColor: "#D1FAE5", display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 0 0 16px #D1FAE540`,
            }}>
            <Typography sx={{ fontSize: "2.5rem" }}>✅</Typography>
          </Box>
          <Typography variant="h5" fontWeight={800} sx={{ color: "#1F2937", mb: 0.5 }}>สรุปการนัดหมาย</Typography>
          <Typography variant="body2" color="text.secondary">ระบบได้บันทึกและเชื่อมไปยังอีเมลของคุณแล้ว</Typography>
        </Box>

        {/* Summary card */}
        <Box sx={{ backgroundColor: "white", borderRadius: 4, p: 3, mb: 3, boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2.5, pb: 2, borderBottom: "1px solid #F0E8DC" }}>
            <Box sx={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: PRIMARY + "20",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0 }}>
              {expert.name.charAt(0)}
            </Box>
            <Box>
              <Typography fontWeight={700} sx={{ color: "#1F2937" }}>{expert.name}</Typography>
              <Typography variant="body2" sx={{ color: "#6B7280" }}>{expert.title}</Typography>
            </Box>
          </Box>

          {[
            { icon: "📅", label: "วันที่", value: `วันพุธที่ ${day} พฤษภาคม 2568` },
            { icon: "🕐", label: "เวลา", value: `${time} - ${String(Number(time.split(":")[0]) + 1).padStart(2, "0")}:00 น.` },
            { icon: "💻", label: "รูปแบบ", value: format === "online" ? "ออนไลน์" : "ตัวต่อตัว" },
            { icon: "💰", label: "ราคา", value: `${expert.price.toLocaleString()}.-` },
          ].map((item) => (
            <Box key={item.label} sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
              <Typography sx={{ fontSize: "1.1rem", width: 24 }}>{item.icon}</Typography>
              <Box>
                <Typography variant="caption" sx={{ color: "#9CA3AF" }}>{item.label}</Typography>
                <Typography fontWeight={600} sx={{ color: "#1F2937" }}>{item.value}</Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Button variant="contained" fullWidth onClick={() => router.push("/appointments")}
          sx={{
            py: 1.75, borderRadius: 4, fontWeight: 700, fontSize: "1rem", textTransform: "none", mb: 1.5,
            background: `linear-gradient(135deg,${PRIMARY},#7AA880)`,
            boxShadow: `0 4px 16px ${PRIMARY}40`,
          }}>
          ดูการนัดหมายของฉัน →
        </Button>
        <Button fullWidth onClick={() => router.push("/")}
          sx={{ color: "#6B7280", textTransform: "none", fontWeight: 500 }}>
          กลับหน้าแรก
        </Button>
      </Container>
    </Box>
  );
}

export default function ConfirmPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <Suspense fallback={<Box sx={{ py: 8, textAlign: "center" }}><Typography>กำลังโหลด...</Typography></Box>}>
      <ConfirmContent id={id} />
    </Suspense>
  );
}
