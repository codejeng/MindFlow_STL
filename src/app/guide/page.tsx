"use client";

import { Box, Typography, Container, IconButton, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { ReactNode } from "react";
import PageTransition from "@/components/common/PageTransition";
import CSSParticles from "@/components/common/CSSParticles";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import {
  Heart,
  IcDoorCard,
  IcHeartToken,
  IcHeartGate,
  IcBoard,
  IcDice,
  IcPawn,
  IcCardStack,
  IcBanknote,
  IcManual,
  IcFlag,
  IcChat,
  IcGoodMoment,
  IcPuzzle,
  IcHands,
  IcTarget,
  IcSparkle,
  IcCheck,
} from "./icons";

const BG_TOP = "#FAF0DC";
const BG_BOT = "#EDE0CA";
const PRIMARY = "#4E7B5E";
const ACCENT = "#CF6B3E";
const INK = "#2C2218";
const SUB = "#7A6248";

/* ── Section shell: number + title, visual content below ── */
function Section({ n, title, children, delay = 0 }: { n: number; title: string; children: ReactNode; delay?: number }) {
  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay }}
      sx={{
        backgroundColor: "rgba(255,255,255,0.92)",
        borderRadius: "22px",
        border: "1px solid rgba(180,155,120,0.25)",
        boxShadow: "0 6px 22px rgba(120,95,60,0.07)",
        p: { xs: 2.5, sm: 3 },
        backdropFilter: "blur(6px)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.3, mb: 2 }}>
        <Box
          sx={{
            flexShrink: 0,
            width: 30,
            height: 30,
            borderRadius: "10px",
            border: `2px solid ${ACCENT}`,
            color: ACCENT,
            fontSize: "0.9rem",
            fontWeight: 900,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {n}
        </Box>
        <Typography sx={{ fontWeight: 900, color: INK, fontSize: "1.12rem", lineHeight: 1.2 }}>{title}</Typography>
      </Box>
      {children}
    </Box>
  );
}

/* A visual tile: icon on tinted disc + tiny caption */
function Tile({ icon, label, bg }: { icon: ReactNode; label: string; bg: string }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.6 }}>
      <Box
        sx={{
          width: 62,
          height: 62,
          borderRadius: "18px",
          backgroundColor: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>
      <Typography sx={{ color: SUB, fontSize: "0.72rem", fontWeight: 700, textAlign: "center", lineHeight: 1.2 }}>
        {label}
      </Typography>
    </Box>
  );
}

/* Numbered step with its own icon */
function Step({ n, icon, label }: { n: number; icon: ReactNode; label: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.4 }}>
      <Box
        sx={{
          position: "relative",
          flexShrink: 0,
          width: 52,
          height: 52,
          borderRadius: "16px",
          backgroundColor: "#FBF7EE",
          border: "1px solid rgba(180,155,120,0.22)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
        <Box
          sx={{
            position: "absolute",
            top: -6,
            left: -6,
            width: 20,
            height: 20,
            borderRadius: "50%",
            backgroundColor: PRIMARY,
            color: "#fff",
            fontSize: "0.7rem",
            fontWeight: 900,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #fff",
          }}
        >
          {n}
        </Box>
      </Box>
      <Typography sx={{ color: INK, fontSize: "0.95rem", fontWeight: 600, lineHeight: 1.4 }}>{label}</Typography>
    </Box>
  );
}

const NOTES = [
  { label: "Openness", th: "เปิดใจ", color: "#3B9AB8", bg: "#DFF0F5" },
  { label: "Empathy", th: "เข้าใจผู้อื่น", color: "#D45B7A", bg: "#FCE4EC" },
  { label: "Self-Clarity", th: "เข้าใจตนเอง", color: "#C58A2E", bg: "#FBF0D8" },
];

const EXAMPLES = [
  { q: "ช่วงเวลาที่คุณภูมิใจคือเรื่องอะไร?", score: "Openness", color: "#3B9AB8", bg: "#DFF0F5" },
  { q: "ถ้าต้องสลับไปเป็นเพื่อนคุณบ้างล่ะ?", score: "Empathy", color: "#D45B7A", bg: "#FCE4EC" },
  { q: "เรื่องที่คุณเรียนรู้เกี่ยวกับตัวเองมากที่สุด?", score: "Self-Clarity", color: "#C58A2E", bg: "#FBF0D8" },
];

const SPACES = [
  { label: "Life Event", color: "#3B9AB8", bg: "#DFF0F5", icon: <IcChat /> },
  { label: "Good Moments", color: PRIMARY, bg: "#E6F0E9", icon: <IcGoodMoment /> },
  { label: "Challenge", color: "#7C5CBF", bg: "#F1EAFB", icon: <IcPuzzle /> },
  { label: "Pass The Heart", color: "#D45B5B", bg: "#FBE6E6", icon: <IcHands /> },
  { label: "Mission Point", color: "#C58A2E", bg: "#FBF0D8", icon: <IcTarget /> },
];

const CARD_TYPES = [
  { name: "Life Event", color: "#3B9AB8", bg: "#DFF0F5", icon: <IcChat />, note: "คำถามเรื่องราว/ความรู้สึกในชีวิต — แชร์ รับฟัง ให้คะแนน" },
  { name: "Good Moments", color: PRIMARY, bg: "#E6F0E9", icon: <IcGoodMoment />, note: "แบ่งปันช่วงเวลาดี ๆ รับ Heart Token +1" },
  { name: "Challenge Moments", color: "#7C5CBF", bg: "#F1EAFB", icon: <IcPuzzle />, note: "คำถามท้าทาย — สำเร็จ +2 / ไม่สำเร็จ −1 Heart Token" },
  { name: "Pass The Heart", color: "#D45B5B", bg: "#FBE6E6", icon: <IcHands />, note: "ส่งคำถามให้คนอื่นตอบ สร้างมุมมองใหม่" },
  { name: "Mission Point", color: "#C58A2E", bg: "#FBF0D8", icon: <IcTarget />, note: "ทำครบ 3 ภารกิจ รับ Door Card 1 ใบ" },
];

export default function GuidePage() {
  const router = useRouter();

  return (
    <PageTransition>
      <Box
        sx={{
          minHeight: "100vh",
          background: `linear-gradient(170deg, ${BG_TOP} 0%, ${BG_BOT} 100%)`,
          position: "relative",
          overflowX: "hidden",
          pb: 8,
        }}
      >
        <CSSParticles />

        {/* ── Top bar ── */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 20,
            backdropFilter: "blur(10px)",
            background: "rgba(250,240,220,0.82)",
            borderBottom: "1px solid rgba(180,155,120,0.22)",
          }}
        >
          <Container maxWidth="sm" sx={{ display: "flex", alignItems: "center", gap: 1, py: 1.2 }}>
            <IconButton
              onClick={() => router.push("/")}
              sx={{
                color: "#5A4A36",
                backgroundColor: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(180,155,120,0.3)",
                "&:hover": { backgroundColor: "#fff" },
              }}
              aria-label="กลับ"
            >
              <ArrowBackRoundedIcon />
            </IconButton>
            <Typography sx={{ fontWeight: 900, color: INK, fontSize: "1.1rem" }}>คู่มือการเล่น</Typography>
          </Container>
        </Box>

        <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1, pt: 3 }}>
          {/* ── Hero ── */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            sx={{ textAlign: "center", mb: 4 }}
          >
            <Image src="/images/logo.png" alt="MindFlow" width={150} height={150} style={{ objectFit: "contain" }} priority />
            <Typography sx={{ fontWeight: 800, color: ACCENT, fontSize: "0.78rem", letterSpacing: "0.2em", mt: -1 }}>
              BOARD GAME GUIDE
            </Typography>
            <Typography sx={{ color: SUB, fontSize: "0.95rem", fontWeight: 600, fontStyle: "italic", mt: 1 }}>
              Every Journey Begins With A Conversation
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            {/* 1 ── Goal */}
            <Section n={1} title="เป้าหมายของเกม">
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 0.5 }}>
                {[
                  { icon: <IcDoorCard size={54} />, label: "เก็บ\nDoor Card" },
                  { icon: <IcHeartToken size={54} />, label: "สะสม\nHeart Token" },
                  { icon: <IcHeartGate size={54} />, label: "เปิด\nHeart Gate" },
                ].map((s, i) => (
                  <Box key={i} sx={{ display: "contents" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.7, flex: 1 }}>
                      {s.icon}
                      <Typography sx={{ color: SUB, fontSize: "0.78rem", fontWeight: 700, textAlign: "center", whiteSpace: "pre-line", lineHeight: 1.25 }}>
                        {s.label}
                      </Typography>
                    </Box>
                    {i < 2 && (
                      <Box sx={{ color: ACCENT, fontWeight: 900, fontSize: "1.3rem", pb: 2.5 }}>›</Box>
                    )}
                  </Box>
                ))}
              </Box>
              <Box
                sx={{
                  mt: 2,
                  p: 1.3,
                  borderRadius: "13px",
                  backgroundColor: "#FBF0D8",
                  color: "#8A6D3B",
                  fontWeight: 600,
                  fontSize: "0.86rem",
                  fontStyle: "italic",
                  textAlign: "center",
                }}
              >
                เพื่อค้นพบสิ่งที่คุณและเพื่อนร่วมทาง อาจไม่เคยรู้จักมาก่อน
              </Box>
            </Section>

            {/* 2 ── Components */}
            <Section n={2} title="อุปกรณ์ในกล่อง">
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1.5 }}>
                <Tile icon={<IcBoard size={36} />} label="กระดาน" bg="#EAF2EC" />
                <Tile icon={<IcDice size={36} />} label="ลูกเต๋า" bg="#FBF7EE" />
                <Tile icon={<IcPawn size={36} />} label="ตัวเดิน" bg="#F1EAFB" />
                <Tile icon={<IcCardStack size={36} />} label="การ์ดเล่น" bg="#FBE6E6" />
                <Tile icon={<IcDoorCard size={36} />} label="Door Card" bg="#F1EAFB" />
                <Tile icon={<IcHeartToken size={36} />} label="Heart Token" bg="#FBE0E6" />
                <Tile icon={<IcBanknote size={38} color="#C58A2E" />} label="ธนบัตรเปิดใจ" bg="#FBF0D8" />
                <Tile icon={<IcManual size={36} />} label="คู่มือ" bg="#EAF2EC" />
              </Box>
            </Section>

            {/* 3 ── Setup */}
            <Section n={3} title="การเตรียมเกม">
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.6,
                  px: 1.3,
                  py: 0.5,
                  borderRadius: "10px",
                  backgroundColor: "#E6F0E9",
                  color: PRIMARY,
                  fontWeight: 800,
                  fontSize: "0.8rem",
                  mb: 2,
                }}
              >
                <IcPawn size={18} /> ผู้เล่น 2–6 คน
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.4 }}>
                <Step n={1} icon={<IcPawn size={26} />} label="เลือกตัวเดินที่ชอบ" />
                <Step n={2} icon={<IcHeartToken size={30} />} label="รับ Heart Token คนละ 3 เหรียญ" />
                <Step n={3} icon={<IcBanknote size={30} color="#C58A2E" />} label="รับธนบัตรเปิดใจ คนละ 5 ใบ" />
                <Step n={4} icon={<IcCardStack size={28} />} label="วางกองการ์ดไว้กลางโต๊ะ" />
                <Step n={5} icon={<IcFlag size={26} />} label="เริ่มที่ช่อง START" />
              </Box>
            </Section>

            {/* 4 ── Banknotes */}
            <Section n={4} title="ธนบัตรเปิดใจ 3 ด้าน">
              <Typography sx={{ color: SUB, fontSize: "0.88rem", fontWeight: 500, mb: 2 }}>
                ใช้สะท้อนสิ่งที่เราได้รับจากคำตอบของเพื่อนร่วมทาง
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {NOTES.map((nt) => (
                  <Box
                    key={nt.label}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.4,
                      p: 1.2,
                      borderRadius: "14px",
                      backgroundColor: nt.bg,
                    }}
                  >
                    <IcBanknote size={42} color={nt.color} />
                    <Box>
                      <Typography sx={{ fontWeight: 900, color: nt.color, fontSize: "0.95rem" }}>{nt.label}</Typography>
                      <Typography sx={{ color: SUB, fontSize: "0.8rem", fontWeight: 600 }}>{nt.th}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Section>

            {/* 5 ── Scoring */}
            <Section n={5} title="การให้คะแนน">
              <Typography sx={{ color: SUB, fontSize: "0.88rem", fontWeight: 500, mb: 2 }}>
                เพื่อนมอบธนบัตรให้คุณ ตามสิ่งที่ได้รับจากคำตอบ
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                {EXAMPLES.map((ex, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.2,
                      p: 1.4,
                      borderRadius: "14px",
                      backgroundColor: "#FBF7EE",
                      border: "1px solid rgba(180,155,120,0.18)",
                    }}
                  >
                    <Box sx={{ flexShrink: 0, mt: 0.2 }}>
                      <IcChat size={26} color={ex.color} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ color: INK, fontSize: "0.86rem", fontWeight: 600, mb: 0.6 }}>{ex.q}</Typography>
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 0.5,
                          px: 1,
                          py: 0.3,
                          borderRadius: "8px",
                          backgroundColor: ex.bg,
                          color: ex.color,
                          fontWeight: 800,
                          fontSize: "0.76rem",
                        }}
                      >
                        <IcBanknote size={20} color={ex.color} /> {ex.score} ×3
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Typography sx={{ color: SUB, fontSize: "0.78rem", fontStyle: "italic", mt: 1.5, opacity: 0.85 }}>
                ให้ได้มากกว่า 1 ด้านในแต่ละคำตอบ
              </Typography>
            </Section>

            {/* 6 ── Movement */}
            <Section n={6} title="เดินทางบนกระดาน">
              <Box sx={{ display: "flex", justifyContent: "space-between", gap: 0.5, mb: 2 }}>
                {[
                  { icon: <IcDice size={40} />, label: "ทอย\nลูกเต๋า" },
                  { icon: <IcPawn size={38} />, label: "เดินตาม\nแต้ม" },
                  { icon: <IcBoard size={40} />, label: "ทำกิจกรรม\nช่องนั้น" },
                  { icon: <IcHeartToken size={38} />, label: "ส่งต่อ\nคนถัดไป" },
                ].map((s, i) => (
                  <Box key={i} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5, flex: 1 }}>
                    <Box sx={{ position: "relative" }}>
                      {s.icon}
                      <Box
                        sx={{
                          position: "absolute",
                          top: -4,
                          right: -4,
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          backgroundColor: ACCENT,
                          color: "#fff",
                          fontSize: "0.62rem",
                          fontWeight: 900,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {i + 1}
                      </Box>
                    </Box>
                    <Typography sx={{ color: SUB, fontSize: "0.68rem", fontWeight: 700, textAlign: "center", whiteSpace: "pre-line", lineHeight: 1.2 }}>
                      {s.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Typography sx={{ fontWeight: 800, color: INK, fontSize: "0.85rem", mb: 1 }}>ช่องบนกระดาน 5 ประเภท</Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                {SPACES.map((s) => (
                  <Box
                    key={s.label}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.6,
                      px: 1,
                      py: 0.7,
                      borderRadius: "11px",
                      backgroundColor: s.bg,
                    }}
                  >
                    {s.icon}
                    <Typography sx={{ fontWeight: 800, fontSize: "0.76rem", color: s.color }}>{s.label}</Typography>
                  </Box>
                ))}
              </Box>
            </Section>

            {/* 7 ── Card types */}
            <Section n={7} title="การ์ดแต่ละประเภท">
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {CARD_TYPES.map((c) => (
                  <Box key={c.name} sx={{ display: "flex", alignItems: "center", gap: 1.3, p: 1.2, borderRadius: "14px", backgroundColor: c.bg }}>
                    <Box
                      sx={{
                        flexShrink: 0,
                        width: 40,
                        height: 40,
                        borderRadius: "12px",
                        backgroundColor: "rgba(255,255,255,0.7)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {c.icon}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontWeight: 900, color: c.color, fontSize: "0.9rem" }}>{c.name}</Typography>
                      <Typography sx={{ color: SUB, fontSize: "0.78rem", fontWeight: 500, lineHeight: 1.35 }}>{c.note}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Section>

            {/* 8 ── Pass The Heart */}
            <Section n={8} title="Pass The Heart">
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <IcPawn size={44} color="#CF6B3E" />
                  <Box component={motion.div} animate={{ x: [-4, 4, -4] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                    <Heart size={26} color="#D45B5B" />
                  </Box>
                  <IcPawn size={44} color="#7C5CBF" />
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                <Step n={1} icon={<IcHands size={26} />} label="ส่งคำถามให้ผู้เล่นที่คุณเลือก" />
                <Step n={2} icon={<IcChat size={24} color={PRIMARY} />} label="เขาเป็นผู้ตอบแทนคุณ" />
                <Step n={3} icon={<IcBanknote size={28} color="#C58A2E" />} label="รับฟังอย่างตั้งใจ และให้คะแนน" />
              </Box>
              <Box sx={{ mt: 1.6, p: 1.3, borderRadius: "13px", backgroundColor: "#FBE6E6", textAlign: "center" }}>
                <Typography sx={{ color: "#B14A4A", fontWeight: 600, fontSize: "0.85rem", fontStyle: "italic" }}>
                  ช่วยให้เราเห็นมุมมองที่หลากหลาย และเข้าใจกันมากขึ้น
                </Typography>
              </Box>
            </Section>

            {/* 9 ── Heart Token */}
            <Section n={9} title="Heart Token">
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <IcHeartToken size={60} />
              </Box>
              <Typography sx={{ color: SUB, fontSize: "0.86rem", fontWeight: 600, textAlign: "center", mb: 2 }}>
                สิทธิในการดูแลขอบเขตความรู้สึกของตนเอง
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, p: 1.3, borderRadius: "13px", backgroundColor: "#FBE6E6" }}>
                  <IcPuzzle size={26} color="#B14A4A" />
                  <Box>
                    <Typography sx={{ fontWeight: 800, color: "#B14A4A", fontSize: "0.84rem" }}>ข้ามคำถามที่ยังไม่พร้อม</Typography>
                    <Typography sx={{ color: SUB, fontSize: "0.76rem", fontWeight: 500 }}>ใช้ 1 Heart Token ข้าม Challenge ได้ทันที</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, p: 1.3, borderRadius: "13px", backgroundColor: "#E6F0E9" }}>
                  <IcTarget size={26} color={PRIMARY} />
                  <Box>
                    <Typography sx={{ fontWeight: 800, color: PRIMARY, fontSize: "0.84rem" }}>ข้ามภารกิจ (Mission Skip)</Typography>
                    <Typography sx={{ color: SUB, fontSize: "0.76rem", fontWeight: 500 }}>สะสมครบ 7 เหรียญ ข้ามภารกิจได้ 1 ครั้ง</Typography>
                  </Box>
                </Box>
              </Box>
              <Typography sx={{ textAlign: "center", color: ACCENT, fontWeight: 800, fontSize: "0.85rem", mt: 1.6 }}>
                การไม่ตอบ ก็เป็นสิทธิ์ของผู้เล่นเช่นกัน
              </Typography>
            </Section>

            {/* 10 ── Good Moments */}
            <Section n={10} title="Good Moments Card">
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <Box sx={{ position: "relative" }}>
                  <IcCardStack size={56} />
                  <Box sx={{ position: "absolute", top: -8, right: -10 }}>
                    <IcSparkle size={22} color="#C58A2E" />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IcCheck size={20} />
                  <Typography sx={{ color: SUB, fontSize: "0.86rem", fontWeight: 500 }}>ยับยั้งคำถาม Challenge ได้ 1 ครั้ง</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IcCheck size={20} />
                  <Typography sx={{ color: SUB, fontSize: "0.86rem", fontWeight: 500 }}>เก็บสะสมเป็นความทรงจำระหว่างทาง</Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 1.6, p: 1.3, borderRadius: "13px", backgroundColor: "#E6F0E9", textAlign: "center" }}>
                <Typography sx={{ color: PRIMARY, fontSize: "0.82rem", fontWeight: 600, fontStyle: "italic" }}>
                  ความทรงจำที่ง่ายที่สุด ก็เป็นพลังให้ผ่านช่วงท้าทายได้
                </Typography>
              </Box>
            </Section>

            {/* 11 ── Door & Gate */}
            <Section n={11} title="Door Card & Heart Gate">
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: "18px",
                  background: "linear-gradient(135deg, #F3E8FF 0%, #FFF4D2 100%)",
                  textAlign: "center",
                }}
              >
                <Box component={motion.div} animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} sx={{ display: "inline-block" }}>
                  <IcHeartGate size={88} />
                </Box>
                <Typography sx={{ color: INK, fontSize: "0.9rem", fontWeight: 700, mt: 1 }}>
                  เมื่อผู้เล่นทุกคนได้ Door Card คนละ 1 ใบ
                </Typography>
                <Typography sx={{ color: SUB, fontSize: "0.84rem", fontWeight: 500, mt: 0.5 }}>
                  จะเปิด Heart Gate ได้ — เพื่อค้นพบสิ่งที่ทุกคนอาจไม่เคยรู้จักมาก่อน
                </Typography>
              </Box>
            </Section>

            {/* 12 ── Remember */}
            <Section n={12} title="Remember">
              <Typography sx={{ color: SUB, fontSize: "0.88rem", fontWeight: 500, mb: 1.5 }}>
                MindFlow ไม่ใช่เกมที่มีผู้ชนะ แต่ช่วยให้เรา
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {["เข้าใจตัวเองมากขึ้น", "เข้าใจคนรอบข้างมากขึ้น", "สร้างบทสนทนาที่มีความหมายมากขึ้น"].map((t) => (
                  <Box key={t} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Heart size={18} color={PRIMARY} />
                    <Typography sx={{ color: INK, fontSize: "0.92rem", fontWeight: 700 }}>{t}</Typography>
                  </Box>
                ))}
              </Box>
              <Box sx={{ textAlign: "center", mt: 2.5 }}>
                <Typography sx={{ fontWeight: 900, color: PRIMARY, fontSize: "1.35rem" }}>MindFlow</Typography>
                <Typography sx={{ color: ACCENT, fontSize: "0.82rem", fontWeight: 700, fontStyle: "italic" }}>
                  Every Conversation Matters.
                </Typography>
              </Box>
            </Section>

            {/* ── CTA ── */}
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => router.push("/select-deck")}
              component={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              startIcon={<SportsEsportsRoundedIcon sx={{ fontSize: "1.4rem !important" }} />}
              sx={{
                mt: 1,
                py: 1.8,
                borderRadius: "20px",
                fontSize: "1.05rem",
                fontWeight: 800,
                textTransform: "none",
                background: `linear-gradient(135deg, #4E7B5E 0%, #689E79 100%)`,
                boxShadow: "0 8px 30px rgba(78,123,94,0.35)",
                "&:hover": { background: `linear-gradient(135deg,#3E6B4E 0%,#4E7B5E 100%)` },
              }}
            >
              เริ่มเล่นเลย
            </Button>
          </Box>
        </Container>
      </Box>
    </PageTransition>
  );
}
