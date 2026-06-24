"use client";

import { useState, useEffect, useCallback } from "react";
import { Box, Typography, Container, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import PageTransition from "@/components/common/PageTransition";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
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
  IcLeaf,
  IcBurst,
  IcEnvelope,
  IcDoorSimple,
  IcPeople,
  IcMirror,
  IcSparkle,
  IcCheck,
  HeroDoor,
} from "./icons";

/* ── Poster palette ── */
const PAGE_BG = "#E9F1E3";
const PANEL_BG = "#FCFEFB";
const PANEL_BORDER = "#CBE0CB";
const BADGE = "#5BA081";
const TITLE = "#2F6B57";
const SUB = "#5E6B62";
const PINK = "#E89AAB";

/* ── Card heading (number + title) ── */
function Head({ n, title }: { n: number; title: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
      <Box
        sx={{
          flexShrink: 0,
          width: 30,
          height: 30,
          borderRadius: "9px",
          backgroundColor: BADGE,
          color: "#fff",
          fontSize: "1rem",
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {n}
      </Box>
      <Typography sx={{ fontWeight: 800, color: TITLE, fontSize: "1.25rem", lineHeight: 1.2 }}>{title}</Typography>
    </Box>
  );
}

const Body = ({ children, sx }: { children: ReactNode; sx?: object }) => (
  <Typography sx={{ color: SUB, fontSize: "0.92rem", lineHeight: 1.6, fontWeight: 500, ...sx }}>{children}</Typography>
);

function Pill({ children, color = TITLE, bg = "#E3F0E6" }: { children: ReactNode; color?: string; bg?: string }) {
  return (
    <Box sx={{ display: "inline-block", px: 1.5, py: 0.5, borderRadius: "10px", backgroundColor: bg, color, fontWeight: 800, fontSize: "0.88rem" }}>
      {children}
    </Box>
  );
}

function NumLine({ n, children }: { n: number; children: ReactNode }) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.2, mb: 1.4 }}>
      <Box
        sx={{
          flexShrink: 0,
          width: 24,
          height: 24,
          borderRadius: "50%",
          backgroundColor: BADGE,
          color: "#fff",
          fontSize: "0.8rem",
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 0.1,
        }}
      >
        {n}
      </Box>
      <Box sx={{ flex: 1 }}>{children}</Box>
    </Box>
  );
}

const NOTES = [
  { label: "Openness", th: "เปิดใจ", color: "#3B9AB8", bg: "#E1F1F6", icon: <IcChat size={34} color="#3B9AB8" />, desc: "กล้าเปิดเผยความรู้สึก ความคิด หรือประสบการณ์ของตนเอง" },
  { label: "Empathy", th: "เข้าใจผู้อื่น", color: "#D45B7A", bg: "#FBE5EC", icon: <IcPeople size={36} color="#D45B7A" />, desc: "แสดงความเข้าใจ เห็นอกเห็นใจ และรับฟังมุมมองของผู้อื่น" },
  { label: "Self-Clarity", th: "เข้าใจตนเอง", color: "#C58A2E", bg: "#FBF1D9", icon: <IcMirror size={34} color="#C58A2E" />, desc: "ตระหนักรู้ในตนเอง เห็นคุณค่า จุดเด่น และสิ่งที่เรียนรู้" },
];

const EXAMPLES = [
  { t: "ตัวอย่างที่ 1", q: "ช่วงเวลาที่คุณภูมิใจในชีวิตคือเรื่องอะไร?", a: "ตอน ม.ปลาย ผมเป็นตัวแทนแข่งวิชาการ แม้ไม่ได้เข้ารอบ 4 ผมก็ภูมิใจ", feel: "คุณเปิดเผยความยากลำบากและความภูมิใจ", score: "Openness 3 ใบ", color: "#3B9AB8", bg: "#E1F1F6" },
  { t: "ตัวอย่างที่ 2", q: "ถ้าต้องสลับไปเป็นเพื่อนคุณบ้างล่ะ?", a: "ผมชอบถ้ามีคนเข้าใจตอนเหนื่อย เพราะตอนนั้นไม่กล้าขอความช่วยเหลือ", feel: "คุณเข้าใจความรู้สึกผู้อื่น และใส่ใจเขา", score: "Empathy 3 ใบ", color: "#D45B7A", bg: "#FBE5EC" },
  { t: "ตัวอย่างที่ 3", q: "เรื่องที่คุณเรียนรู้เกี่ยวกับตัวเองมากที่สุด?", a: "ผมรู้ว่าผมกลัวความล้มเหลวมาก แต่ก็ยังก้าวต่อไปเหมือนเดิม", feel: "คุณเข้าใจตัวเองมากขึ้น และเห็นจุดที่ต้องพัฒนา", score: "Self-Clarity 3 ใบ", color: "#C58A2E", bg: "#FBF1D9" },
];

const SPACES = [
  { label: "Life Event", color: "#3B9AB8", bg: "#E1F1F6", icon: <Heart size={22} color="#3B9AB8" /> },
  { label: "Good Moments", color: "#4E9E7E", bg: "#E3F0E6", icon: <IcLeaf size={24} color="#4E9E7E" /> },
  { label: "Challenge Moments", color: "#D45B5B", bg: "#FBE6E6", icon: <IcBurst size={24} color="#D45B5B" /> },
  { label: "Pass The Heart", color: "#B08CC8", bg: "#F1EAF8", icon: <IcEnvelope size={24} color="#B08CC8" /> },
  { label: "Mission Point", color: "#7C5CBF", bg: "#EEE8FA", icon: <IcDoorSimple size={24} color="#7C5CBF" /> },
];

const CARD_TYPES = [
  { name: "Life Event Card", color: "#3B9AB8", icon: <Heart size={22} color="#3B9AB8" />, note: "คำถามเกี่ยวกับเหตุการณ์หรือความรู้สึกในชีวิต แชร์ รับฟัง และให้คะแนน" },
  { name: "Good Moments Card", color: "#4E9E7E", icon: <IcLeaf size={24} color="#4E9E7E" />, note: "แบ่งปันช่วงเวลาดี ๆ ที่ทำให้คุณยิ้ม ทุกครั้งรับ Heart Token 1 เหรียญ" },
  { name: "Challenge Moments Card", color: "#D45B5B", icon: <IcBurst size={24} color="#D45B5B" />, note: "คำถามที่ท้าทายขึ้น สำเร็จได้ +2 / ไม่สำเร็จ เสีย 1 Heart Token" },
  { name: "Pass The Heart Card", color: "#B08CC8", icon: <IcEnvelope size={24} color="#B08CC8" />, note: "ส่งคำถามหรือสิ่งดี ๆ ให้ผู้เล่นอื่นตอบ สร้างมุมมองใหม่และความเชื่อมโยง" },
  { name: "Mission Point", color: "#7C5CBF", icon: <IcDoorSimple size={24} color="#7C5CBF" />, note: "ตรวจความคืบหน้าการ์ดของคุณ ทำครบ 3 ภารกิจ รับ Door Card 1 ใบ" },
];

const PAWN_COLORS = ["#3B9AB8", "#4E9E7E", "#D45B5B", "#C58A2E", "#B08CC8"];

/* ── Page contents (index 0 = cover, 1..12 = sections) ── */
function buildPages(startGame: () => void): ReactNode[] {
  return [
    /* 0 — COVER */
    <Box key="cover" sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
      <Typography sx={{ fontWeight: 900, color: TITLE, fontSize: "2.6rem", lineHeight: 1 }}>MindFlow</Typography>
      <Typography sx={{ fontWeight: 800, color: "#7BA98A", fontSize: "0.8rem", letterSpacing: "0.24em", mt: 0.7 }}>
        BOARD GAME GUIDE
      </Typography>
      <Typography sx={{ color: SUB, fontSize: "0.92rem", fontWeight: 600, fontStyle: "italic", mt: 1.4, lineHeight: 1.5 }}>
        Every Journey
        <br />
        Begins With A Conversation
      </Typography>
      <Box sx={{ my: 1 }}>
        <HeroDoor width={240} />
      </Box>
      <Pill bg="#E3F0E6">คู่มือการเล่นเกม</Pill>
      <Typography sx={{ color: SUB, fontSize: "0.8rem", fontWeight: 600, mt: 2.5, opacity: 0.8 }}>
        แตะการ์ดเพื่อเริ่มอ่าน
      </Typography>
    </Box>,

    /* 1 — Welcome */
    <Box key="p1">
      <Head n={1} title="ยินดีต้อนรับสู่ MindFlow" />
      <Body sx={{ mb: 2 }}>
        เกมที่ออกแบบมาเพื่อสร้างพื้นที่ปลอดภัยในการพูดคุย รับฟัง และทำความเข้าใจตนเองและผู้อื่น ผ่านการเดินทางร่วมกันบนกระดาน
      </Body>
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Pill>เป้าหมายของเกม</Pill>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        {[
          { icon: <IcDoorCard size={56} />, label: "เก็บ\nDoor Card" },
          { icon: <IcHeartToken size={56} />, label: "สะสม\nHeart Token" },
          { icon: <IcHeartGate size={56} />, label: "เปิด\nHeart Gate" },
        ].map((s, i) => (
          <Box key={i} sx={{ display: "contents" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.7, flex: 1 }}>
              {s.icon}
              <Typography sx={{ color: SUB, fontSize: "0.76rem", fontWeight: 700, textAlign: "center", whiteSpace: "pre-line", lineHeight: 1.2 }}>
                {s.label}
              </Typography>
            </Box>
            {i < 2 && <Box sx={{ color: PINK, fontWeight: 900, fontSize: "1.3rem", pb: 2.5 }}>›</Box>}
          </Box>
        ))}
      </Box>
      <Box sx={{ p: 1.4, borderRadius: "13px", backgroundColor: "#EAF4EC", textAlign: "center" }}>
        <Typography sx={{ color: TITLE, fontSize: "0.86rem", fontWeight: 600, fontStyle: "italic" }}>
          เพื่อค้นพบสิ่งที่คุณและเพื่อนร่วมทาง อาจไม่เคยรู้จักมาก่อน
        </Typography>
      </Box>
    </Box>,

    /* 2 — Components */
    <Box key="p2">
      <Head n={2} title="อุปกรณ์ภายในกล่อง" />
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
        {[
          { icon: <IcBoard size={40} />, label: "กระดาน" },
          { icon: <IcDice size={40} />, label: "ลูกเต๋า" },
          { icon: <IcPawn size={38} />, label: "ตัวเดิน 6 สี" },
          { icon: <IcCardStack size={38} />, label: "การ์ดเล่น" },
          { icon: <IcDoorCard size={38} />, label: "Door Card" },
          { icon: <IcHeartToken size={38} />, label: "Heart Token" },
          { icon: <IcBanknote size={42} color="#C58A2E" />, label: "ธนบัตรเปิดใจ" },
          { icon: <IcManual size={38} />, label: "คู่มือ" },
        ].map((t) => (
          <Box key={t.label} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.6 }}>
            <Box sx={{ height: 44, display: "flex", alignItems: "center" }}>{t.icon}</Box>
            <Typography sx={{ color: SUB, fontSize: "0.72rem", fontWeight: 700, textAlign: "center", lineHeight: 1.15 }}>
              {t.label}
            </Typography>
          </Box>
        ))}
      </Box>
      <Body sx={{ mt: 2, fontSize: "0.72rem", fontStyle: "italic", opacity: 0.8 }}>*จำนวนอุปกรณ์อาจต่างกันตามเวอร์ชันเกม</Body>
    </Box>,

    /* 3 — Setup */
    <Box key="p3">
      <Head n={3} title="การเตรียมเกม" />
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Pill>ผู้เล่น 2–6 คน</Pill>
      </Box>
      <NumLine n={1}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
          <Body>เลือกตัวเดินที่ชอบ</Body>
          <Box sx={{ display: "flex", gap: 0.3 }}>
            {PAWN_COLORS.map((c) => (
              <IcPawn key={c} size={20} color={c} />
            ))}
          </Box>
        </Box>
      </NumLine>
      <NumLine n={2}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
          <Body>รับ Heart Token คนละ 3 เหรียญ</Body>
          <IcHeartToken size={22} />
        </Box>
      </NumLine>
      <NumLine n={3}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
          <Body>รับธนบัตรเปิดใจ คนละ 5 ใบ</Body>
          <IcBanknote size={26} color="#C58A2E" />
        </Box>
      </NumLine>
      <NumLine n={4}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
          <Body>วางกองการ์ดไว้กลางโต๊ะ</Body>
          <IcCardStack size={24} />
        </Box>
      </NumLine>
      <NumLine n={5}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
          <Body>เริ่มที่ช่อง</Body>
          <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
            <IcFlag size={22} />
            <Pill bg={BADGE} color="#fff">START</Pill>
          </Box>
        </Box>
      </NumLine>
    </Box>,

    /* 4 — Banknotes */
    <Box key="p4">
      <Head n={4} title="ธนบัตรเปิดใจคืออะไร?" />
      <Body sx={{ mb: 2 }}>ใช้สะท้อนสิ่งที่เราได้รับจากคำตอบของเพื่อนร่วมทาง — แบ่งเป็น 3 ด้าน</Body>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
        {NOTES.map((nt) => (
          <Box key={nt.label} sx={{ display: "flex", gap: 1.4, p: 1.4, borderRadius: "14px", backgroundColor: nt.bg }}>
            <Box sx={{ flexShrink: 0, width: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>{nt.icon}</Box>
            <Box>
              <Typography sx={{ fontWeight: 800, color: nt.color, fontSize: "0.95rem" }}>
                {nt.label} <span style={{ color: SUB, fontWeight: 700 }}>({nt.th})</span>
              </Typography>
              <Typography sx={{ color: SUB, fontSize: "0.8rem", fontWeight: 500, lineHeight: 1.4 }}>{nt.desc}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>,

    /* 5 — Scoring */
    <Box key="p5">
      <Head n={5} title="ตัวอย่างการให้คะแนน" />
      <Body sx={{ mb: 1.8 }}>เพื่อนมอบธนบัตรเปิดใจให้คุณ ตามสิ่งที่ได้รับจากคำตอบของคุณ</Body>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
        {EXAMPLES.map((ex, i) => (
          <Box key={i} sx={{ p: 1.4, borderRadius: "13px", backgroundColor: "#F7FBF5", border: `1px solid ${PANEL_BORDER}` }}>
            <Box sx={{ mb: 0.8 }}>
              <Pill bg={ex.bg} color={ex.color}>{ex.t}</Pill>
            </Box>
            <Typography sx={{ color: TITLE, fontSize: "0.84rem", fontWeight: 700, mb: 0.5 }}>
              <span style={{ color: ex.color }}>ถาม: </span>{ex.q}
            </Typography>
            <Typography sx={{ color: SUB, fontSize: "0.82rem", fontWeight: 500, mb: 0.7, lineHeight: 1.45 }}>
              <span style={{ color: TITLE, fontWeight: 700 }}>ตอบ: </span>{ex.a}
            </Typography>
            <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, px: 1, py: 0.4, borderRadius: "8px", backgroundColor: ex.bg, color: ex.color, fontWeight: 800, fontSize: "0.78rem" }}>
              <IcBanknote size={20} color={ex.color} /> {ex.score}
            </Box>
          </Box>
        ))}
      </Box>
      <Body sx={{ mt: 1.4, fontSize: "0.72rem", fontStyle: "italic", opacity: 0.8 }}>*เพื่อนให้ได้มากกว่า 1 ด้าน ในแต่ละคำตอบ</Body>
    </Box>,

    /* 6 — Movement */
    <Box key="p6">
      <Head n={6} title="เดินทางบนกระดาน" />
      <Box sx={{ textAlign: "center", mb: 1.6 }}>
        <Pill>1 เทิร์น ประกอบด้วย</Pill>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 0.5, mb: 2 }}>
        {[
          { icon: <IcDice size={40} />, label: "ทอย\nลูกเต๋า" },
          { icon: <IcPawn size={38} />, label: "เดินตาม\nแต้ม" },
          { icon: <IcBoard size={40} />, label: "ทำกิจกรรม\nช่องนั้น" },
          { icon: <IcPeople size={34} color="#7BA98A" />, label: "ส่งต่อ\nคนถัดไป" },
        ].map((s, i) => (
          <Box key={i} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5, flex: 1 }}>
            <Box sx={{ position: "relative", height: 42, display: "flex", alignItems: "center" }}>
              {s.icon}
              <Box sx={{ position: "absolute", top: -3, right: -3, width: 16, height: 16, borderRadius: "50%", backgroundColor: BADGE, color: "#fff", fontSize: "0.62rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {i + 1}
              </Box>
            </Box>
            <Typography sx={{ color: SUB, fontSize: "0.68rem", fontWeight: 700, textAlign: "center", whiteSpace: "pre-line", lineHeight: 1.15 }}>
              {s.label}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ textAlign: "center", mb: 1.2 }}>
        <Pill>ช่องบนกระดานมี 5 ประเภท</Pill>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8, justifyContent: "center" }}>
        {SPACES.map((s) => (
          <Box key={s.label} sx={{ display: "flex", alignItems: "center", gap: 0.5, px: 1, py: 0.6, borderRadius: "11px", backgroundColor: s.bg }}>
            {s.icon}
            <Typography sx={{ fontWeight: 800, fontSize: "0.74rem", color: s.color }}>{s.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>,

    /* 7 — Card types */
    <Box key="p7">
      <Head n={7} title="การ์ดแต่ละประเภท" />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.1 }}>
        {CARD_TYPES.map((c) => (
          <Box key={c.name} sx={{ display: "flex", gap: 1.2 }}>
            <Box sx={{ flexShrink: 0, width: 36, height: 36, borderRadius: "10px", backgroundColor: "#F2F8F1", display: "flex", alignItems: "center", justifyContent: "center", mt: 0.2 }}>
              {c.icon}
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 800, color: c.color, fontSize: "0.9rem", lineHeight: 1.25 }}>{c.name}</Typography>
              <Typography sx={{ color: SUB, fontSize: "0.78rem", fontWeight: 500, lineHeight: 1.35 }}>{c.note}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>,

    /* 8 — Pass The Heart */
    <Box key="p8">
      <Head n={8} title="Pass The Heart" />
      <Body sx={{ mb: 1.8 }}>การ์ดพิเศษที่ช่วยให้เราเรียนรู้จากมุมมองของคนอื่นมากขึ้น</Body>
      <NumLine n={1}><Body>ส่งต่อคำถามหรือหัวข้อให้ผู้เล่นที่คุณเลือก</Body></NumLine>
      <NumLine n={2}><Body>เขาจะเป็นผู้ตอบแทนคุณ</Body></NumLine>
      <NumLine n={3}><Body>รับฟังอย่างตั้งใจ และให้คะแนน</Body></NumLine>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.4, mt: 1 }}>
        <Box sx={{ flexShrink: 0, p: 1.2, borderRadius: "12px", backgroundColor: "#F7FBF5", border: `1px solid ${PANEL_BORDER}`, textAlign: "center", maxWidth: 170 }}>
          <Typography sx={{ color: TITLE, fontSize: "0.78rem", fontWeight: 600, fontStyle: "italic", lineHeight: 1.4 }}>
            “ถ้าคุณได้กำลังใจจากใครในวันนี้ เขาคือใคร และทำไม?”
          </Typography>
        </Box>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <IcPeople size={56} color={PINK} />
        </Box>
      </Box>
      <Body sx={{ mt: 1.6, fontSize: "0.78rem", fontStyle: "italic" }}>ช่วยให้เราเห็นมุมมองที่หลากหลาย และเข้าใจกันมากขึ้น</Body>
    </Box>,

    /* 9 — Heart Token */
    <Box key="p9">
      <Head n={9} title="Heart Token" />
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1.8 }}>
        <IcHeartToken size={46} />
        <Body>“สิทธิในการดูแลขอบเขตความรู้สึกของตนเอง”</Body>
      </Box>
      <Box sx={{ p: 1.3, borderRadius: "13px", backgroundColor: "#FBE6EC", mb: 1.2 }}>
        <Typography sx={{ fontWeight: 800, color: "#C25B7A", fontSize: "0.88rem", mb: 0.3 }}>ยับยั้งคำถามจาก Challenge</Typography>
        <Typography sx={{ color: SUB, fontSize: "0.8rem", fontWeight: 500 }}>ยังไม่พร้อมตอบ? ใช้ 1 Heart Token ข้ามได้ทันที</Typography>
      </Box>
      <Box sx={{ p: 1.3, borderRadius: "13px", backgroundColor: "#FBE6EC" }}>
        <Typography sx={{ fontWeight: 800, color: "#C25B7A", fontSize: "0.88rem", mb: 0.3 }}>สะสมเพื่อข้ามภารกิจ (Mission Skip)</Typography>
        <Typography sx={{ color: SUB, fontSize: "0.8rem", fontWeight: 500 }}>ครบ 7 เหรียญ ใช้ข้ามภารกิจที่ยากได้ 1 ภารกิจ</Typography>
      </Box>
      <Box sx={{ mt: 1.6, textAlign: "center" }}>
        <Pill bg="#FBE6EC" color="#C25B7A">การไม่ตอบ ก็เป็นสิทธิ์ของผู้เล่นเช่นกัน</Pill>
      </Box>
    </Box>,

    /* 10 — Good Moments */
    <Box key="p10">
      <Head n={10} title="Good Moments Card" />
      <Body sx={{ mb: 1.8 }}>การ์ดพิเศษที่ได้รับจากการแบ่งปันช่วงเวลาดี ๆ ระหว่างการเล่น</Body>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1.2 }}>
        <IcCheck size={22} />
        <Body>ยับยั้งคำถามจาก Challenge Moments ได้ 1 ครั้ง</Body>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1.8 }}>
        <IcCheck size={22} />
        <Body>เก็บสะสมเป็นความทรงจำระหว่างการเดินทาง</Body>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 1.6 }}>
        <Box sx={{ position: "relative" }}>
          <IcCardStack size={58} />
          <Box sx={{ position: "absolute", top: -10, right: -12 }}>
            <IcSparkle size={24} color="#C58A2E" />
          </Box>
        </Box>
      </Box>
      <Box sx={{ p: 1.3, borderRadius: "13px", backgroundColor: "#EAF4EC", textAlign: "center" }}>
        <Typography sx={{ color: TITLE, fontSize: "0.8rem", fontWeight: 600, fontStyle: "italic" }}>
          ความทรงจำที่ง่ายที่สุด ก็เป็นพลังให้ผ่านช่วงท้าทายได้
        </Typography>
      </Box>
    </Box>,

    /* 11 — Door & Gate */
    <Box key="p11">
      <Head n={11} title="Door Card & Heart Gate" />
      <Body sx={{ mb: 2 }}>เมื่อผู้เล่นทุกคนได้รับ Door Card คนละ 1 ใบ</Body>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mb: 2 }}>
        <IcDoorCard size={58} />
        <Box sx={{ color: PINK, fontWeight: 900, fontSize: "1.6rem" }}>›</Box>
        <Box component={motion.div} animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          <IcHeartGate size={72} />
        </Box>
      </Box>
      <Box sx={{ textAlign: "center", mb: 1.4 }}>
        <Pill>สามารถเปิด Heart Gate ได้</Pill>
      </Box>
      <Box sx={{ p: 1.3, borderRadius: "13px", backgroundColor: "#EAF4EC", textAlign: "center" }}>
        <Typography sx={{ color: TITLE, fontSize: "0.8rem", fontWeight: 600, fontStyle: "italic" }}>
          เพื่อค้นพบสิ่งที่คุณและเพื่อนร่วมทาง อาจไม่เคยรู้จักมาก่อน
        </Typography>
      </Box>
    </Box>,

    /* 12 — Remember */
    <Box key="p12">
      <Head n={12} title="Remember" />
      <Body sx={{ mb: 1.8 }}>MindFlow ไม่ใช่เกมที่มีผู้ชนะ แต่เป็นเกมที่จะช่วยให้เรา</Body>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2, mb: 2.5 }}>
        {["เข้าใจตัวเองมากขึ้น", "เข้าใจคนรอบข้างมากขึ้น", "สร้างบทสนทนาที่มีความหมายมากขึ้น"].map((t) => (
          <Box key={t} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Heart size={18} color="#9CC9A8" />
            <Typography sx={{ color: TITLE, fontSize: "0.92rem", fontWeight: 700 }}>{t}</Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ textAlign: "center", mb: 2.5 }}>
        <Typography sx={{ fontWeight: 900, color: TITLE, fontSize: "1.5rem" }}>MindFlow</Typography>
        <Typography sx={{ color: "#7BA98A", fontSize: "0.78rem", fontWeight: 700, fontStyle: "italic" }}>
          Every Conversation Matters.
        </Typography>
      </Box>
      <Box
        component={motion.button}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          startGame();
        }}
        sx={{
          width: "100%",
          border: "none",
          cursor: "pointer",
          py: 1.6,
          borderRadius: "16px",
          color: "#fff",
          fontWeight: 800,
          fontSize: "1rem",
          fontFamily: "inherit",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          background: "linear-gradient(135deg, #4E9E7E 0%, #6FB892 100%)",
          boxShadow: "0 8px 24px rgba(78,158,126,0.35)",
        }}
      >
        <SportsEsportsRoundedIcon sx={{ fontSize: "1.3rem" }} /> เริ่มเล่นเลย
      </Box>
    </Box>,
  ];
}

/* ── Card-flip variants ── */
const flip: Variants = {
  enter: (dir: number) => ({ rotateY: dir > 0 ? -75 : 75, opacity: 0, scale: 0.92 }),
  center: { rotateY: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ rotateY: dir > 0 ? 75 : -75, opacity: 0, scale: 0.92 }),
};

export default function GuidePage() {
  const router = useRouter();
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const pages = buildPages(() => router.push("/select-deck"));
  const total = pages.length;

  const paginate = useCallback(
    (delta: number) => {
      setState(([i]) => {
        const next = i + delta;
        if (next < 0 || next >= total) return [i, 0];
        return [next, delta];
      });
    },
    [total]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paginate]);

  const isLast = index === total - 1;

  return (
    <PageTransition>
      <Box sx={{ minHeight: "100vh", backgroundColor: PAGE_BG, position: "relative", display: "flex", flexDirection: "column" }}>
        {/* ── Top bar ── */}
        <Box sx={{ position: "sticky", top: 0, zIndex: 20, backdropFilter: "blur(10px)", background: "rgba(233,241,227,0.85)", borderBottom: `1px solid ${PANEL_BORDER}` }}>
          <Container maxWidth="sm" sx={{ display: "flex", alignItems: "center", gap: 1, py: 1.2 }}>
            <IconButton
              onClick={() => router.push("/")}
              sx={{ color: TITLE, backgroundColor: "#fff", border: `1px solid ${PANEL_BORDER}`, "&:hover": { backgroundColor: "#fff" } }}
              aria-label="กลับ"
            >
              <ArrowBackRoundedIcon />
            </IconButton>
            <Typography sx={{ fontWeight: 800, color: TITLE, fontSize: "1.1rem" }}>คู่มือการเล่นเกม</Typography>
            <Typography sx={{ ml: "auto", color: SUB, fontWeight: 700, fontSize: "0.85rem" }}>
              {index === 0 ? "ปก" : `${index} / ${total - 1}`}
            </Typography>
          </Container>
        </Box>

        {/* ── Card stage ── */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", px: 2, py: 3 }}>
          <Box sx={{ width: "100%", maxWidth: 440, perspective: "1600px" }}>
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <Box
                component={motion.div}
                key={index}
                custom={dir}
                variants={flip}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.4, 0.0, 0.2, 1] }}
                onClick={() => {
                  if (!isLast) paginate(1);
                }}
                style={{ transformStyle: "preserve-3d", transformOrigin: "center" }}
                sx={{
                  position: "relative",
                  backgroundColor: PANEL_BG,
                  borderRadius: "24px",
                  border: `1.5px solid ${PANEL_BORDER}`,
                  boxShadow: "0 16px 40px rgba(90,140,110,0.18)",
                  p: { xs: 2.8, sm: 3.4 },
                  minHeight: 460,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: index === 0 ? "center" : "flex-start",
                  cursor: isLast ? "default" : "pointer",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {pages[index]}
              </Box>
            </AnimatePresence>
          </Box>

          {/* ── Controls ── */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3, width: "100%", maxWidth: 440, justifyContent: "space-between" }}>
            <IconButton
              onClick={() => paginate(-1)}
              disabled={index === 0}
              sx={{
                color: TITLE,
                backgroundColor: "#fff",
                border: `1px solid ${PANEL_BORDER}`,
                "&:hover": { backgroundColor: "#fff" },
                "&.Mui-disabled": { opacity: 0.35 },
              }}
              aria-label="ก่อนหน้า"
            >
              <ChevronLeftRoundedIcon />
            </IconButton>

            {/* dots */}
            <Box sx={{ display: "flex", gap: 0.6, flexWrap: "wrap", justifyContent: "center", flex: 1 }}>
              {pages.map((_, i) => (
                <Box
                  key={i}
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  sx={{
                    width: i === index ? 18 : 8,
                    height: 8,
                    borderRadius: 4,
                    cursor: "pointer",
                    backgroundColor: i === index ? BADGE : "rgba(91,160,129,0.3)",
                    transition: "all 0.3s",
                  }}
                />
              ))}
            </Box>

            <IconButton
              onClick={() => paginate(1)}
              disabled={isLast}
              sx={{
                color: "#fff",
                backgroundColor: BADGE,
                "&:hover": { backgroundColor: "#4E9070" },
                "&.Mui-disabled": { opacity: 0.35 },
              }}
              aria-label="ถัดไป"
            >
              <ChevronRightRoundedIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </PageTransition>
  );
}
