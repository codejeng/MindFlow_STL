"use client";

import { useState, useCallback } from "react";
import { Box, Typography, Button, Container, Chip, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGame, CHARACTERS, EMPTY_OCE, type OCEScore, type MissionType } from "@/context/GameContext";
import { getQuestionByCode } from "@/data/questions";
import type { Question } from "@/data/questions";
import GlobalTimer from "@/components/common/GlobalTimer";
import PageTransition from "@/components/common/PageTransition";
import CSSParticles from "@/components/common/CSSParticles";
import TurnStartScreen from "./components/TurnStartScreen";
import LobbyScreen from "./components/LobbyScreen";
import ScenarioScreen from "./components/ScenarioScreen";
import ReflectionScreen from "./components/ReflectionScreen";
import WaitingScreen from "./components/WaitingScreen";
import ScoreScreen from "./components/ScoreScreen";
import SavedSuccessScreen from "./components/SavedSuccessScreen";
import MissionGateProgressScreen from "./components/MissionGateProgressScreen";
import MissionGateUnlockScreen from "./components/MissionGateUnlockScreen";
import MissionUpdateScreen from "./components/MissionUpdateScreen";
import OpinionScreen from "./components/OpinionScreen";
import PassTheHeartActionScreen from "./components/PassTheHeartActionScreen";
import HeartGateWaitingScreen from "./components/HeartGateWaitingScreen";
import HeartGateReadyScreen from "./components/HeartGateReadyScreen";
import FinalReflectionScreen from "./components/FinalReflectionScreen";
import StopCircleRoundedIcon from "@mui/icons-material/StopCircleRounded";
import GoodMomentActionScreen from "./components/GoodMomentActionScreen";
import ChallengeMomentActionScreen from "./components/ChallengeMomentActionScreen";
import TargetPlayerSelectScreen from "./components/TargetPlayerSelectScreen";

type PlayState =
  | "turn" | "lobby" | "scenario" | "opinion" | "reflection" | "waiting" | "score" | "saved"
  | "pass_the_heart_action" | "mission_update" | "pass_the_heart_target"
  | "good_moment_action" | "challenge_moment_action"
  | "mission_gate_progress" | "mission_gate_unlock" | "mission_gate_not_ready"
  | "heart_gate_waiting" | "heart_gate_ready" | "final_reflection";

const BG = "#FDF6EE";
const PRIMARY = "#5A7A65";

// Map channel IDs to mission types for tracking
const CHANNEL_TO_MISSION: Record<string, MissionType> = {
  "life-event": "life-event",
  "good-moments": "good-moments",
  "challenge-moments": "challenge",
  "pass-the-heart": "pass-the-heart",
};

export default function PlayPage() {
  const router = useRouter();
  const {
    players, turnOrder, currentTurnIndex,
    nextTurn, getCurrentPlayer, recordTurnResult, finishGame,
    updateMissionProgress, addHeartCoins, addHeartCoinsToAll,
    randomizeTurnOrder,
    areAllDoorsUnlocked,
    recordChannelPlay,
    selectedDeck,
  } = useGame();

  const [playState, setPlayState]         = useState<PlayState>("turn");
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [selectedNumberStr, setSelectedNumberStr] = useState("");
  const [inputError, setInputError]       = useState("");
  const [selectedTag, setSelectedTag]     = useState<string | null>(null);
  const [oceScore, setOceScore]           = useState<OCEScore>(EMPTY_OCE());
  const [confirmFinish, setConfirmFinish] = useState(false);
  const [finalReflectIndex, setFinalReflectIndex] = useState(0);
  const [targetUpdatePlayerId, setTargetUpdatePlayerId] = useState<string | null>(null);
  const [earnedCoins, setEarnedCoins] = useState(0);

  const currentPlayer = getCurrentPlayer();
  const char = CHARACTERS.find((c) => c.id === currentPlayer?.characterId);

  const getCardPrefix = useCallback(() => {
    const isChild = currentPlayer?.role === "child";

    if (selectedDeck === "primary") {
      return isChild ? "PC" : "PP";
    } else if (selectedDeck === "secondary") {
      return isChild ? "SC" : "SP";
    }

    // Legacy fallbacks
    switch (selectedDeck) {
      case "family": return "PC";
      case "university": return "SP";
      default: return isChild ? "PC" : "PP";
    }
  }, [selectedDeck, currentPlayer?.role]);

  // Get the appropriate code prefix for non-life-event channels
  const getChannelCodePrefix = useCallback((channelId: string) => {
    switch (channelId) {
      case "good-moments": return "GM";
      case "challenge-moments": return "CH";
      case "pass-the-heart": return "PH";
      default: return getCardPrefix(); // life-event uses player prefix
    }
  }, [getCardPrefix]);

  // Player selected a channel
  const handleSelectChannel = useCallback((channelId: string) => {
    setSelectedChannel(channelId);
    const ch = channelId;
    if (ch === "mission-gate") {
      setPlayState("mission_gate_progress");
    } else if (ch === "good-moments") {
      setPlayState("good_moment_action");
    } else if (ch === "challenge-moments") {
      setPlayState("challenge_moment_action");
    } else if (ch === "pass-the-heart") {
      setPlayState("pass_the_heart_target");
    } else {
      // life-event goes through lobby for card code entry
      setPlayState("lobby");
    }
  }, [players, currentPlayer]);

  const handleCodeSubmit = useCallback(() => {
    const isLifeEvent = selectedChannel === "life-event";
    const prefix = isLifeEvent ? getCardPrefix() : getChannelCodePrefix(selectedChannel ?? "");
    const expectedDigits = ["PC", "PP", "SC", "SP"].includes(prefix) ? 2 : 3;

    if (!selectedNumberStr || selectedNumberStr.length !== expectedDigits) {
      setInputError(`กรุณาใส่ตัวเลข ${expectedDigits} หลัก`);
      return;
    }

    const fullCode = `${prefix}${selectedNumberStr}`;

    let q = getQuestionByCode(fullCode);

    // Fallback for life-event codes
    if (!q && isLifeEvent) {
      // Try with generic PC/PP/SC/SP prefix
      q = getQuestionByCode(`${prefix}${selectedNumberStr}`);
      if (!q && prefix.length > 1) {
        q = getQuestionByCode(`${prefix[0]}${selectedNumberStr}`);
      }
    }

    if (!q) { setInputError("ไม่พบรหัส " + fullCode); return; }

    setCurrentQuestion(q);
    setInputError("");
    setPlayState("scenario");
  }, [selectedNumberStr, selectedChannel, getCardPrefix, getChannelCodePrefix]);

  // Handle finishing a turn with mission progress tracking
  const handleFinishTurnWithTracking = useCallback(() => {
    if (!currentPlayer || !selectedChannel) return;

    let effectiveChannel = selectedChannel;

    if (selectedChannel === "life-event" && targetUpdatePlayerId) {
      effectiveChannel = "pass-the-heart"; // The active player technically played Pass the Heart
    }

    const missionType = CHANNEL_TO_MISSION[effectiveChannel];

    // Record channel play for ACTIVE player
    recordChannelPlay({
      playerId: currentPlayer.id,
      channel: effectiveChannel,
      turnIndex: currentTurnIndex,
      questionCode: currentQuestion?.code,
    });

    // Update mission progress for ACTIVE player based on effective channel
    if (missionType) {
      updateMissionProgress(currentPlayer.id, missionType);
    }

    // Channel-specific bonuses
    if (effectiveChannel === "good-moments") {
      addHeartCoins(currentPlayer.id, 1); // +1 Heart Coin for sharing
      setEarnedCoins(1);
    } else {
      setEarnedCoins(0);
    }

    // Record question result if life-event
    if (selectedChannel === "life-event" && currentQuestion) {
      const actualPlayerId = targetUpdatePlayerId || currentPlayer.id;
      recordTurnResult({
        questionCode: currentQuestion.code,
        playerId: actualPlayerId,
        selfReflectionTag: selectedTag,
        oceScore,
      });

      // If it was triggered by Pass The Heart, TARGET player gets "life-event" mission progress!
      if (targetUpdatePlayerId) {
        updateMissionProgress(targetUpdatePlayerId, "life-event");
      }
    }

    // Reset state and advance to mission update screen
    setSelectedNumberStr("");
    setCurrentQuestion(null);
    setSelectedTag(null);
    setSelectedChannel(null);
    setOceScore(EMPTY_OCE());
    setTargetUpdatePlayerId(null);
    setPlayState("mission_update");
  }, [currentPlayer, selectedChannel, currentQuestion, selectedTag, oceScore,
      recordTurnResult, updateMissionProgress, addHeartCoins,
      recordChannelPlay, currentTurnIndex]);

  // Handle challenge result (success/fail)
  const handleChallengeResult = useCallback((success: boolean) => {
    if (!currentPlayer) return;

    recordChannelPlay({
      playerId: currentPlayer.id,
      channel: "challenge-moments",
      turnIndex: currentTurnIndex,
      questionCode: currentQuestion?.code,
      success,
    });

    if (success) {
      // Update mission progress for challenge
      updateMissionProgress(currentPlayer.id, "challenge");
      // Everyone gets +2 coins
      addHeartCoinsToAll(2);
      setEarnedCoins(2);
    } else {
      // Everyone loses -1 coin
      addHeartCoinsToAll(-1);
      setEarnedCoins(-1);
    }

    // Reset state and advance to mission update screen
    setSelectedNumberStr("");
    setCurrentQuestion(null);
    setSelectedTag(null);
    setSelectedChannel(null);
    setOceScore(EMPTY_OCE());
    setTargetUpdatePlayerId(null);
    setPlayState("mission_update");
  }, [currentPlayer, currentQuestion, currentTurnIndex,
      updateMissionProgress, addHeartCoinsToAll, recordChannelPlay]);

  // Handle pass the heart target selection
  const handlePassTheHeartTargetSelected = useCallback((targetPlayerId: string) => {
    if (!currentPlayer) return;
    
    // We record the target, then pretend we are doing a Life Event
    setTargetUpdatePlayerId(targetPlayerId);
    setSelectedChannel("life-event"); // Switch channel so they play Life Event
    setPlayState("lobby");
  }, [currentPlayer]);

  // Good Moments simple finish
  const handleGoodMomentFinish = useCallback(() => {
    if (!currentPlayer) return;
    recordChannelPlay({ playerId: currentPlayer.id, channel: "good-moments", turnIndex: currentTurnIndex });
    updateMissionProgress(currentPlayer.id, "good-moments");
    addHeartCoins(currentPlayer.id, 1);
    setEarnedCoins(1);
    setPlayState("mission_update");
  }, [currentPlayer, currentTurnIndex, updateMissionProgress, addHeartCoins, recordChannelPlay]);

  const handleFinishPassTheHeart = useCallback(() => {
    setSelectedNumberStr("");
    setCurrentQuestion(null);
    setSelectedTag(null);
    setSelectedChannel(null);
    setOceScore(EMPTY_OCE());
    setPlayState("mission_update");
  }, []);

  // Mission gate: just end turn (no question recorded)
  const handleMissionGateDone = useCallback(() => {
    setPlayState("turn");
    setSelectedChannel(null);
    nextTurn();
  }, [nextTurn]);

  const adjustScore = useCallback((key: keyof OCEScore, delta: number) => {
    setOceScore((prev) => ({ ...prev, [key]: Math.max(0, Math.min(6, prev[key] + delta)) }));
  }, []);

  const handleEnterHeartGate = useCallback(() => {
    setConfirmFinish(false);
    setFinalReflectIndex(0);
    setPlayState("heart_gate_waiting");
  }, []);

  const handleFinalFinish = useCallback(() => {
    finishGame();
    router.push("/summary");
  }, [finishGame, router]);

  if (!currentPlayer) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5">ไม่พบข้อมูลเกม</Typography>
        <Button onClick={() => router.push("/")} sx={{ mt: 2 }}>กลับหน้าแรก</Button>
      </Container>
    );
  }

  // Determine the correct flow after scenario based on channel
  const getPostScenarioAction = () => {
    if (selectedChannel === "life-event") {
      return () => setPlayState("opinion");
    }
    if (selectedChannel === "challenge-moments") {
      // Go to challenge result YES/NO
      return () => setPlayState("waiting"); // reuse waiting as challenge result
    }
    if (selectedChannel === "pass-the-heart") {
      // Go to player picker (reuse waiting screen concept)
      return () => setPlayState("waiting");
    }
    // good-moments: simple flow, just finish
    return () => setPlayState("waiting");
  };

  return (
    <PageTransition>
      <Box sx={{ minHeight: "100vh", background: BG, pb: 6, position: "relative", overflowX: "hidden" }}>
        <CSSParticles />
        <Container maxWidth="sm" sx={{ py: 3, position: "relative", zIndex: 1 }}>

          {/* Top Bar */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Chip
              label={`เทิร์น ${currentTurnIndex + 1} / ${turnOrder.length}`}
              sx={{ backgroundColor: PRIMARY, color: "white", fontWeight: 600 }}
            />
            <Button
              variant="outlined" color="error" size="small"
              startIcon={<StopCircleRoundedIcon />}
              onClick={() => setConfirmFinish(true)}
              sx={{ borderRadius: 2 }}
            >
              จบเกม
            </Button>
          </Box>

          {/* Screens */}
          <AnimatePresence mode="wait">
            {playState === "turn" && (
              <TurnStartScreen
                key="turn"
                currentPlayer={currentPlayer}
                char={char}
                turnIndex={currentTurnIndex}
                totalTurns={turnOrder.length}
                onSelectChannel={handleSelectChannel}
                onSkip={() => nextTurn()}
              />
            )}
            {playState === "lobby" && (
              <LobbyScreen
                key="lobby"
                channelName={
                  selectedChannel === "life-event" ? "Life Event"
                  : selectedChannel === "good-moments" ? "Good Moments"
                  : selectedChannel === "challenge-moments" ? "Challenge Moments"
                  : selectedChannel === "pass-the-heart" ? "Pass The Heart"
                  : "Mission Gate"
                }
                prefix={getChannelCodePrefix(selectedChannel ?? "")}
                selectedNumberStr={selectedNumberStr}
                setSelectedNumberStr={setSelectedNumberStr}
                inputError={inputError}
                setInputError={setInputError}
                onSubmit={handleCodeSubmit}
                onBack={() => { setSelectedNumberStr(""); setInputError(""); setPlayState("turn"); }}
              />
            )}
            {playState === "scenario" && currentQuestion && (
              <ScenarioScreen
                key="scenario"
                question={currentQuestion}
                channelName={
                  selectedChannel === "life-event" ? "Life Event"
                  : selectedChannel === "good-moments" ? "Good Moments"
                  : selectedChannel === "challenge-moments" ? "Challenge Moments"
                  : selectedChannel === "pass-the-heart" ? "Pass The Heart"
                  : "Mission Gate"
                }
                onBack={() => setPlayState("lobby")}
                onConfirm={getPostScenarioAction()}
                channel={selectedChannel ?? undefined}
                players={players}
                currentPlayerId={targetUpdatePlayerId || currentPlayer.id}
                onChallengeResult={handleChallengeResult}
                onPassTheHeartTarget={() => {}} // Deprecated
                onSimpleFinish={handleFinishTurnWithTracking}
              />
            )}
            {playState === "opinion" && (
              <OpinionScreen
                key="opinion"
                onBack={() => setPlayState("scenario")}
                onNext={() => setPlayState("reflection")}
              />
            )}
            {playState === "reflection" && currentQuestion && (
              <ReflectionScreen
                key="reflection"
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
                onBack={() => setPlayState("opinion")}
                onConfirm={() => setPlayState("waiting")}
              />
            )}
            {playState === "good_moment_action" && (
              <GoodMomentActionScreen
                key="good_moment_action"
                currentPlayer={currentPlayer}
                onDone={handleGoodMomentFinish}
                onBack={() => setPlayState("turn")}
              />
            )}
            {playState === "challenge_moment_action" && (
              <ChallengeMomentActionScreen
                key="challenge_moment_action"
                currentPlayer={currentPlayer}
                onResult={handleChallengeResult}
                onBack={() => setPlayState("turn")}
              />
            )}
            {playState === "pass_the_heart_target" && (
              <TargetPlayerSelectScreen
                key="pass_the_heart_target"
                currentPlayer={currentPlayer}
                players={players}
                onSelectTarget={handlePassTheHeartTargetSelected}
                onBack={() => setPlayState("turn")}
              />
            )}
            {playState === "pass_the_heart_action" && currentQuestion && (
              <PassTheHeartActionScreen
                key="pass_the_heart_action"
                question={currentQuestion}
                currentPlayer={currentPlayer}
                targetPlayer={players.find((p) => p.id === targetUpdatePlayerId)}
                onBack={() => setPlayState("scenario")}
                onNext={handleFinishPassTheHeart}
              />
            )}
            {playState === "waiting" && (
              <WaitingScreen
                key="waiting"
                onBack={() => setPlayState("reflection")}
                onDone={() => setPlayState("score")}
              />
            )}
            {playState === "score" && (
              <ScoreScreen
                key="score"
                oceScore={oceScore}
                adjustScore={adjustScore}
                onBack={() => setPlayState("waiting")}
                onSave={() => setPlayState("saved")}
              />
            )}
            {playState === "saved" && (
              <SavedSuccessScreen
                key="saved"
                onBack={() => setPlayState("score")}
                onDone={handleFinishTurnWithTracking}
              />
            )}
            {playState === "mission_update" && (
              <MissionUpdateScreen
                key="mission_update"
                targetPlayerId={targetUpdatePlayerId ?? undefined}
                earnedCoins={earnedCoins}
                onNext={() => {
                  setPlayState("turn");
                  setTargetUpdatePlayerId(null);
                  setEarnedCoins(0);
                  nextTurn();
                }}
              />
            )}
            {playState === "mission_gate_progress" && (
              <MissionGateProgressScreen
                key="mission_gate_progress"
                onBack={() => { setPlayState("turn"); setSelectedChannel(null); }}
                onUnlock={() => setPlayState("mission_gate_unlock")}
                onNotReady={() => { 
                  setPlayState("turn"); 
                  setSelectedChannel(null); 
                  nextTurn();
                }}
              />
            )}
            {playState === "mission_gate_unlock" && (
              <MissionGateUnlockScreen
                key="mission_gate_unlock"
                onBack={() => setPlayState("mission_gate_progress")}
                onDone={handleMissionGateDone}
                onAllUnlocked={() => {
                  setPlayState("heart_gate_waiting");
                  setFinalReflectIndex(0);
                }}
              />
            )}
            {playState === "heart_gate_waiting" && (
              <HeartGateWaitingScreen
                key="heart_gate_waiting"
                players={players}
                onBack={() => {
                  setPlayState("turn");
                  setSelectedChannel(null);
                  nextTurn();
                }}
                onReady={() => setPlayState("heart_gate_ready")}
              />
            )}
            {playState === "heart_gate_ready" && (
              <HeartGateReadyScreen
                key="heart_gate_ready"
                onBack={() => setPlayState("heart_gate_waiting")}
                onNext={() => setPlayState("final_reflection")}
              />
            )}
            {playState === "final_reflection" && players[finalReflectIndex] && (
              <FinalReflectionScreen
                key={`final_reflection_${finalReflectIndex}`}
                players={players}
                answeringPlayer={players[finalReflectIndex]}
                onBack={() => {
                  if (finalReflectIndex > 0) {
                    setFinalReflectIndex((prev) => prev - 1);
                  } else {
                    setPlayState("heart_gate_ready");
                  }
                }}
                onDone={() => {
                  if (finalReflectIndex < players.length - 1) {
                    setFinalReflectIndex((prev) => prev + 1);
                  } else {
                    handleFinalFinish();
                  }
                }}
              />
            )}
          </AnimatePresence>
        </Container>
      </Box>

      {/* Finish game dialog */}
      <Dialog open={confirmFinish} onClose={() => setConfirmFinish(false)}
        PaperProps={{ sx: { borderRadius: 2, p: 1 } }}>
        <DialogTitle fontWeight={700}>
          จบเกม?
        </DialogTitle>
        <DialogContent>
          <Typography>
            คุณต้องการเข้าเช็คสถานะของผู้เล่นที่หน้า Heart Gate หรือไม่?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setConfirmFinish(false)} sx={{ color: "#7A6248" }}>
            ยกเลิก
          </Button>
          <Button variant="contained" color="error" sx={{ borderRadius: 2 }}
            onClick={handleEnterHeartGate}>
            เข้าสู่ Heart Gate
          </Button>
        </DialogActions>
      </Dialog>
    </PageTransition>
  );
}
