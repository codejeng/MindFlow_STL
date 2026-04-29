"use client";

import { useState, useCallback } from "react";
import { Box, Typography, Button, Container, Chip, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGame, CHARACTERS, EMPTY_OCE, type OCEScore } from "@/context/GameContext";
import { getQuestionByCode } from "@/data/questions";
import type { Question } from "@/data/questions";
import GlobalTimer from "@/components/common/GlobalTimer";
import PageTransition from "@/components/common/PageTransition";
import TurnStartScreen from "./components/TurnStartScreen";
import LobbyScreen from "./components/LobbyScreen";
import ScenarioScreen from "./components/ScenarioScreen";
import ReflectionScreen from "./components/ReflectionScreen";
import WaitingScreen from "./components/WaitingScreen";
import ScoreScreen from "./components/ScoreScreen";
import TurnSummaryScreen from "./components/TurnSummaryScreen";
import StopCircleRoundedIcon from "@mui/icons-material/StopCircleRounded";

type PlayState = "turn" | "lobby" | "scenario" | "reflection" | "waiting" | "score" | "summary";

const BG = "#FDF6EE";
const PRIMARY = "#5A7A65";

export default function PlayPage() {
  const router = useRouter();
  const {
    players, turnOrder, currentTurnIndex,
    nextTurn, getCurrentPlayer, recordTurnResult, finishGame,
  } = useGame();

  const [playState, setPlayState]         = useState<PlayState>("turn");
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedNumberStr, setSelectedNumberStr] = useState("");
  const [inputError, setInputError]       = useState("");
  const [selectedTag, setSelectedTag]     = useState<string | null>(null);
  const [oceScore, setOceScore]           = useState<OCEScore>(EMPTY_OCE());
  const [confirmFinish, setConfirmFinish] = useState(false);

  const currentPlayer = getCurrentPlayer();
  const char = CHARACTERS.find((c) => c.id === currentPlayer?.characterId);

  const getCardPrefix = useCallback(() => {
    if (!currentPlayer) return "U";
    const map: Record<string, string> = { "ประถม": "P", "ม.ต้น": "M", "ม.ปลาย": "L", "ทั่วไป": "U" };
    const p = map[currentPlayer.ageGroup] || "U";
    return currentPlayer.role === "child" ? p : `${p}${p}`;
  }, [currentPlayer]);

  // Skip turn — player didn't land on card space
  const handleSkipTurn = useCallback(() => {
    nextTurn();
    // state stays "turn" so next player sees TurnStartScreen
  }, [nextTurn]);

  const handleCodeSubmit = useCallback(() => {
    if (!selectedNumberStr) { setInputError("กรุณาใส่หมายเลขการ์ด"); return; }
    const code2 = selectedNumberStr.padStart(2, "0");
    const pre = getCardPrefix();
    let q = getQuestionByCode(`${pre}${code2}`);
    if (!q && pre.length > 1) q = getQuestionByCode(`${pre[0]}${code2}`);
    if (!q) { setInputError("ไม่พบรหัส " + pre + code2); return; }
    setCurrentQuestion(q);
    setInputError("");
    setPlayState("scenario");
  }, [selectedNumberStr, getCardPrefix]);

  const handleFinishTurn = useCallback(() => {
    if (!currentPlayer || !currentQuestion) return;
    recordTurnResult({
      questionCode: currentQuestion.code,
      playerId: currentPlayer.id,
      selfReflectionTag: selectedTag,
      oceScore,
    });
    // Reset and go back to TurnStartScreen for next player
    setPlayState("turn");
    setSelectedNumberStr("");
    setCurrentQuestion(null);
    setSelectedTag(null);
    setOceScore(EMPTY_OCE());
    nextTurn();
  }, [currentPlayer, currentQuestion, selectedTag, oceScore, recordTurnResult, nextTurn]);

  const adjustScore = useCallback((key: keyof OCEScore, delta: number) => {
    setOceScore((prev) => ({ ...prev, [key]: Math.max(0, Math.min(6, prev[key] + delta)) }));
  }, []);

  const handleFinishGame = useCallback(() => { finishGame(); router.push("/summary"); }, [finishGame, router]);

  if (!currentPlayer) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5">ไม่พบข้อมูลเกม</Typography>
        <Button onClick={() => router.push("/")} sx={{ mt: 2 }}>กลับหน้าแรก</Button>
      </Container>
    );
  }

  return (
    <PageTransition>
      <Box sx={{ minHeight: "100vh", background: BG, pb: 6 }}>
        <Container maxWidth="sm" sx={{ py: 3 }}>

          {/* ── Top Bar ── */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Chip
              label={`เทิร์น ${currentTurnIndex + 1} / ${turnOrder.length}`}
              sx={{ backgroundColor: PRIMARY, color: "white", fontWeight: 600 }}
            />
            <GlobalTimer onTimeUp={handleFinishGame} />
            <Button
              variant="outlined" color="error" size="small"
              startIcon={<StopCircleRoundedIcon />}
              onClick={() => setConfirmFinish(true)}
              sx={{ borderRadius: 4 }}
            >
              จบเกม
            </Button>
          </Box>

          {/* ── Step indicator (only shown during card flow) ── */}
          {playState !== "turn" && (
            <Box sx={{ display: "flex", justifyContent: "center", gap: 0.75, mb: 3 }}>
              {(["lobby","scenario","reflection","waiting","score","summary"] as PlayState[]).map((s) => (
                <Box key={s} sx={{
                  width: 28, height: 6, borderRadius: 3,
                  backgroundColor: playState === s ? PRIMARY : "#D1D5DB",
                  transition: "background-color 0.3s",
                }} />
              ))}
            </Box>
          )}

          {/* ── Screens ── */}
          <AnimatePresence mode="wait">
            {/* Step 0: Turn start — land on card space? */}
            {playState === "turn" && (
              <TurnStartScreen
                key="turn"
                currentPlayer={currentPlayer}
                char={char}
                turnIndex={currentTurnIndex}
                totalTurns={turnOrder.length}
                onPlayCard={() => setPlayState("lobby")}
                onSkip={handleSkipTurn}
              />
            )}
            {playState === "lobby" && (
              <LobbyScreen
                key="lobby"
                char={char}
                playerName={currentPlayer.name}
                selectedNumberStr={selectedNumberStr}
                setSelectedNumberStr={setSelectedNumberStr}
                inputError={inputError}
                setInputError={setInputError}
                cardPrefix={getCardPrefix()}
                onSubmit={handleCodeSubmit}
                onBack={() => { setSelectedNumberStr(""); setInputError(""); setPlayState("turn"); }}
              />
            )}
            {playState === "scenario" && currentQuestion && (
              <ScenarioScreen
                key="scenario"
                question={currentQuestion}
                char={char}
                onConfirm={() => setPlayState("reflection")}
              />
            )}
            {playState === "reflection" && (
              <ReflectionScreen
                key="reflection"
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
                onConfirm={() => setPlayState("waiting")}
              />
            )}
            {playState === "waiting" && (
              <WaitingScreen
                key="waiting"
                playerName={currentPlayer.name}
                charColor={char?.baseColor ?? PRIMARY}
                onDone={() => setPlayState("score")}
              />
            )}
            {playState === "score" && (
              <ScoreScreen
                key="score"
                oceScore={oceScore}
                adjustScore={adjustScore}
                onSave={() => setPlayState("summary")}
              />
            )}
            {playState === "summary" && (
              <TurnSummaryScreen
                key="summary"
                playerName={currentPlayer.name}
                char={char}
                charColor={char?.baseColor ?? PRIMARY}
                oceScore={oceScore}
                selectedTag={selectedTag}
                onNext={handleFinishTurn}
              />
            )}
          </AnimatePresence>
        </Container>
      </Box>

      {/* Finish game dialog */}
      <Dialog open={confirmFinish} onClose={() => setConfirmFinish(false)}
        PaperProps={{ sx: { borderRadius: 4, p: 1 } }}>
        <DialogTitle fontWeight={700}>จบเกม?</DialogTitle>
        <DialogContent>
          <Typography>คุณต้องการจบเกมและดูสรุปผลหรือไม่?</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setConfirmFinish(false)} sx={{ borderRadius: 3 }}>ยกเลิก</Button>
          <Button variant="contained" color="error" onClick={handleFinishGame} sx={{ borderRadius: 3 }}>
            จบเกม
          </Button>
        </DialogActions>
      </Dialog>
    </PageTransition>
  );
}
