"use client";
import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import type { Question } from "@/data/questions";
import type { Player } from "@/context/GameContext";
import { CHARACTERS } from "@/context/GameContext";

const BG_CARD = "#FFFFFF";
const PRIMARY = "#3B9AB8"; // Life Event Blue

interface Props {
  question: Question;
  channelName: string;
  onBack: () => void;
  onConfirm: () => void;
  // Extended props for channel-specific flows
  channel?: string;
  players?: Player[];
  currentPlayerId?: string;
  onChallengeResult?: (success: boolean) => void;
  onPassTheHeartTarget?: (targetPlayerId: string) => void;
  onSimpleFinish?: () => void;
}

export default function ScenarioScreen({
  question, channelName, onBack, onConfirm,
  channel, players, currentPlayerId,
  onChallengeResult, onPassTheHeartTarget, onSimpleFinish,
}: Props) {
  const [showResult, setShowResult] = useState(false);
  const [selectedTargetId, setSelectedTargetId] = useState<string | null>(null);

  const isLifeEvent = channel === "life-event" || !channel;
  const isChallenge = channel === "challenge-moments";
  const isPassTheHeart = channel === "pass-the-heart";
  const isGoodMoments = channel === "good-moments";

  // For pass-the-heart: other players
  const otherPlayers = (players ?? []).filter((p) => p.id !== currentPlayerId);

  const handleAction = () => {
    if (isLifeEvent) {
      onConfirm(); // go to reflection -> waiting -> score -> saved
    } else if (isGoodMoments) {
      // Simple: mark as done directly
      onSimpleFinish?.();
    } else if (isChallenge) {
      setShowResult(true); // show YES/NO
    } else if (isPassTheHeart) {
      setShowResult(true); // show player picker
    } else {
      onConfirm();
    }
  };

  // Challenge result view
  if (isChallenge && showResult) {
    return (
      <motion.div key="challenge_result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>

        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Button onClick={() => setShowResult(false)} sx={{ minWidth: 0, p: 1, color: "#7A6248", borderRadius: 3 }}>
            <ArrowBackRoundedIcon />
          </Button>
          <Typography fontWeight={800} sx={{ flex: 1, textAlign: "center", color: "#3D8B5E", fontSize: "0.85rem", mr: 4 }}>
            Challenge Moments
          </Typography>
        </Box>

        <Box sx={{
          backgroundColor: BG_CARD, borderRadius: 2, p: 4,
          boxShadow: "0 4px 24px rgba(100,70,30,0.09)",
          border: "1px solid rgba(180,155,120,0.18)", mb: 3,
          textAlign: "center",
        }}>
          <Typography fontWeight={900} sx={{ color: "#2C2218", fontSize: "1.3rem", mb: 1 }}>
            Challenge สำเร็จหรือไม่?
          </Typography>
          <Typography sx={{ color: "#7A6248", fontSize: "0.9rem", mb: 4 }}>
            สำเร็จ: ทุกคน +2 Coin / ไม่สำเร็จ: ทุกคน -1 Coin
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained" fullWidth
              onClick={() => onChallengeResult?.(true)}
              component={motion.button} whileTap={{ scale: 0.95 }}
              startIcon={<CheckCircleRoundedIcon />}
              sx={{
                py: 2, borderRadius: 4, fontWeight: 800, fontSize: "1.1rem",
                background: `linear-gradient(135deg, ${PRIMARY}, #7AA880)`,
                boxShadow: `0 4px 16px ${PRIMARY}40`,
                textTransform: "none",
              }}
            >
              สำเร็จ
            </Button>
            <Button
              variant="contained" fullWidth
              onClick={() => onChallengeResult?.(false)}
              component={motion.button} whileTap={{ scale: 0.95 }}
              startIcon={<CancelRoundedIcon />}
              sx={{
                py: 2, borderRadius: 4, fontWeight: 800, fontSize: "1.1rem",
                background: "linear-gradient(135deg, #D45B5B, #E07070)",
                boxShadow: "0 4px 16px rgba(212,91,91,0.3)",
                textTransform: "none",
              }}
            >
              ไม่สำเร็จ
            </Button>
          </Box>
        </Box>
      </motion.div>
    );
  }

  // Pass the heart: player picker
  if (isPassTheHeart && showResult) {
    return (
      <motion.div key="pass_heart_pick" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>

        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Button onClick={() => setShowResult(false)} sx={{ minWidth: 0, p: 1, color: "#7A6248", borderRadius: 3 }}>
            <ArrowBackRoundedIcon />
          </Button>
          <Typography fontWeight={800} sx={{ flex: 1, textAlign: "center", color: "#D45B5B", fontSize: "0.85rem", mr: 4 }}>
            Pass The Heart
          </Typography>
        </Box>

        <Box sx={{
          backgroundColor: BG_CARD, borderRadius: 2, p: 3,
          boxShadow: "0 4px 24px rgba(100,70,30,0.09)",
          border: "1px solid rgba(180,155,120,0.18)", mb: 3,
          textAlign: "center",
        }}>
          <Typography fontWeight={900} sx={{ color: "#2C2218", fontSize: "1.15rem", mb: 0.5 }}>
            เลือกผู้เล่นที่จะตอบแทน
          </Typography>
          <Typography sx={{ color: "#7A6248", fontSize: "0.85rem", mb: 3 }}>
            ใครถูกเลือกให้ตอบคำถามนี้?
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {otherPlayers.map((p) => {
              const pChar = CHARACTERS.find((c) => c.id === p.characterId);
              const isSelected = selectedTargetId === p.id;
              return (
                <Box
                  key={p.id}
                  component={motion.div}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedTargetId(p.id)}
                  sx={{
                    display: "flex", alignItems: "center", gap: 2,
                    p: 1.5, borderRadius: 3, cursor: "pointer",
                    backgroundColor: isSelected ? `${PRIMARY}10` : "#FDFAF5",
                    border: `2px solid ${isSelected ? PRIMARY : "rgba(180,155,120,0.2)"}`,
                    transition: "all 0.15s",
                  }}
                >
                  <Box sx={{ width: 44, height: 52, position: "relative", flexShrink: 0 }}>
                    {pChar && (
                      <Image src={pChar.image} alt={pChar.name} fill style={{ objectFit: "contain" }} />
                    )}
                  </Box>
                  <Typography fontWeight={700} sx={{ color: isSelected ? PRIMARY : "#2C2218", fontSize: "1rem" }}>
                    {p.name}
                  </Typography>
                  {isSelected && (
                    <CheckCircleRoundedIcon sx={{ ml: "auto", color: PRIMARY, fontSize: "1.3rem" }} />
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>

        <Button
          variant="contained" fullWidth
          disabled={!selectedTargetId}
          onClick={() => selectedTargetId && onPassTheHeartTarget?.(selectedTargetId)}
          component={motion.button} whileTap={{ scale: 0.97 }}
          sx={{
            py: 1.85, borderRadius: 4, fontWeight: 800, fontSize: "1.1rem",
            background: selectedTargetId ? `linear-gradient(135deg, #D45B5B, #E07070)` : "#ccc",
            boxShadow: selectedTargetId ? "0 6px 20px rgba(212,91,91,0.3)" : "none",
            textTransform: "none",
          }}
        >
          ยืนยัน
        </Button>
      </motion.div>
    );
  }

  // Standard scenario view
  const prefix = question.code.replace(/[0-9]/g, '');
  const imagePath = `/cards/${prefix}/${question.code}.png`;

  const actionLabel = isLifeEvent
    ? "เริ่มตอบคำถาม"
    : isGoodMoments
    ? "เสร็จสิ้น (รับ 1 Heart Coin)"
    : isChallenge
    ? "ทำ Challenge เสร็จแล้ว"
    : isPassTheHeart
    ? "เลือกคนตอบแทน"
    : "ถัดไป";

  return (
    <motion.div key="scenario" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>

      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Button
          onClick={onBack}
          sx={{ minWidth: 0, p: 1, color: "#7A6248", borderRadius: 3 }}
        >
          <ArrowBackRoundedIcon />
        </Button>
        <Typography fontWeight={800} sx={{ flex: 1, textAlign: "center", color: "#3D8B5E", fontSize: "0.85rem", letterSpacing: "0.05em", mr: 4 }}>
          7. คำถาม
        </Typography>
      </Box>

      {/* Card Header Title */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography fontWeight={900} sx={{ color: "#2C2218", fontSize: "1.3rem" }}>
          {channelName} <Typography component="span" fontWeight={700} sx={{ color: "#3B9AB8", fontSize: "1.1rem" }}>({question.code})</Typography>
        </Typography>
      </Box>

      {/* Scenario box */}
      <Box sx={{
        backgroundColor: BG_CARD, borderRadius: 2, p: 4, pt: 5, pb: 3,
        boxShadow: "0 4px 24px rgba(100,70,30,0.09)",
        border: "1px solid rgba(180,155,120,0.18)", mb: 3,
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>
        {/* Question text */}
        <Typography fontWeight={800} sx={{ color: "#2C2218", fontSize: "1.35rem", lineHeight: 1.4, textAlign: "center", mb: 4 }}>
          {question.text}
        </Typography>

        {/* Card Image Container */}
        <Box sx={{
          width: "100%", maxWidth: 280,
          borderRadius: 0.5, overflow: "hidden",
          backgroundColor: "#F9F5F0",
          border: "1.5px dashed rgba(180,155,120,0.4)",
          position: "relative",
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imagePath}
            alt={`ภาพสถานการณ์ ${question.code}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const parent = e.currentTarget.parentElement;
              if (parent) {
                const text = document.createElement("div");
                text.style.cssText = `
                  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                  color: #B0A090; font-size: 0.85rem; font-weight: 600; text-align: center;
                `;
                text.innerHTML = `[รูปภาพจำลอง]<br/>${question.code}`;
                parent.appendChild(text);
              }
            }}
          />
        </Box>
      </Box>

      <Button variant="contained" fullWidth onClick={handleAction}
        component={motion.button} whileTap={{ scale: 0.97 }}
        sx={{
          py: 1.85, borderRadius: 4, fontWeight: 800, fontSize: "1.1rem",
          background: `linear-gradient(135deg, ${PRIMARY}, #7AA880)`,
          boxShadow: `0 6px 20px ${PRIMARY}40`,
          textTransform: "none",
        }}>
        {actionLabel}
      </Button>
    </motion.div>
  );
}
