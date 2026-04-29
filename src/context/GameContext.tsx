"use client";

import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";

// ─── Character Definitions ────────────────────────────────────────────────────

export interface CharacterDef {
  id: string;
  name: string;
  image: string;
  baseColor: string;
}

export const CHARACTERS: CharacterDef[] = [
  { id: "grandpa",  name: "A", image: "/characters/grandpa.png",  baseColor: "#7A9E7E" },
  { id: "grandma",  name: "B", image: "/characters/grandma.png",  baseColor: "#E8A030" },
  { id: "daughter", name: "C", image: "/characters/daughter.png", baseColor: "#D4607A" },
  { id: "mom",      name: "D", image: "/characters/mom.png",      baseColor: "#5BB8A8" },
  { id: "dad",      name: "E", image: "/characters/dad.png",      baseColor: "#4A7AAE" },
];

// ─── OEC Score (Openness / Empathy / Clarity) ─────────────────────────────────

export interface OCEScore {
  openness: number;  // 0-6
  empathy:  number;  // 0-6
  clarity:  number;  // 0-6
}

export const EMPTY_OCE = (): OCEScore => ({ openness: 0, empathy: 0, clarity: 0 });

export const OCE_META = {
  openness: { label: "การเปิดใจ",      labelEn: "Openness", icon: "💚", color: "#3D8B5E", bg: "#EAF7EE" },
  empathy:  { label: "ความเข้าอกเข้าใจ", labelEn: "Empathy",  icon: "💛", color: "#C07A1A", bg: "#FEF6E5" },
  clarity:  { label: "ความชัดเจนในตัวเอง", labelEn: "Clarity",  icon: "💙", color: "#2C6FAC", bg: "#E8F1FA" },
} as const;

// ─── Types ────────────────────────────────────────────────────────────────────

export type PlayerRole = "parent" | "child";
export type AgeGroup   = "ประถม" | "ม.ต้น" | "ม.ปลาย" | "ทั่วไป";

export interface Player {
  id: string;
  name: string;
  role: PlayerRole;
  ageGroup: AgeGroup;
  characterId: string;
  stats: {
    questionsAnswered: number;
    oceTotal: OCEScore;           // running total of peer-given scores
    selfReflectionTags: string[]; // tags selected each turn
    passTokens: number;
  };
}

export interface QuestionResult {
  questionCode: string;
  playerId: string;
  selfReflectionTag: string | null;
  oceScore: OCEScore;             // peer scores for this turn
}

export type GamePhase = "setup" | "ordering" | "playing" | "finished";

interface GameState {
  players:          Player[];
  turnOrder:        string[];
  currentTurnIndex: number;
  gamePhase:        GamePhase;
  questionHistory:  QuestionResult[];
  oceTotal:         OCEScore;   // aggregate across all players/turns
  timeLimit:        number;     // minutes
  gameStartTime:    number | null;
}

interface GameContextType extends GameState {
  addPlayer:         (name: string, role: PlayerRole, ageGroup: AgeGroup, characterId: string) => void;
  removePlayer:      (id: string) => void;
  updatePlayer:      (id: string, updates: Partial<Pick<Player, "name" | "role" | "characterId">>) => void;
  setTurnOrder:      (order: string[]) => void;
  randomizeTurnOrder: () => void;
  setGamePhase:      (phase: GamePhase) => void;
  setTimeLimit:      (minutes: number) => void;
  setGameStartTime:  (time: number) => void;
  usePassToken:      (playerId: string) => void;
  nextTurn:          () => void;
  prevTurn:          () => void;
  getCurrentPlayer:  () => Player | null;
  recordTurnResult:  (result: QuestionResult) => void;
  finishGame:        () => void;
  resetGame:         () => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function addOCE(a: OCEScore, b: OCEScore): OCEScore {
  return {
    openness: a.openness + b.openness,
    empathy:  a.empathy  + b.empathy,
    clarity:  a.clarity  + b.clarity,
  };
}

// ─── Context ──────────────────────────────────────────────────────────────────

const GameContext = createContext<GameContextType | null>(null);

export function useGame(): GameContextType {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within a GameProvider");
  return ctx;
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>({
    players:          [],
    turnOrder:        [],
    currentTurnIndex: 0,
    gamePhase:        "setup",
    questionHistory:  [],
    oceTotal:         EMPTY_OCE(),
    timeLimit:        60,
    gameStartTime:    null,
  });

  const addPlayer = useCallback((name: string, role: PlayerRole, ageGroup: AgeGroup, characterId: string) => {
    setState((prev) => {
      if (prev.players.length >= 5) return prev;
      const char = CHARACTERS.find((c) => c.id === characterId) ?? CHARACTERS[prev.players.length % CHARACTERS.length];
      const newPlayer: Player = {
        id: `player-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        name, role, ageGroup,
        characterId: char.id,
        stats: {
          questionsAnswered: 0,
          oceTotal: EMPTY_OCE(),
          selfReflectionTags: [],
          passTokens: 2,
        },
      };
      return { ...prev, players: [...prev.players, newPlayer] };
    });
  }, []);

  const removePlayer = useCallback((id: string) => {
    setState((prev) => ({ ...prev, players: prev.players.filter((p) => p.id !== id) }));
  }, []);

  const updatePlayer = useCallback(
    (id: string, updates: Partial<Pick<Player, "name" | "role" | "characterId">>) => {
      setState((prev) => ({
        ...prev,
        players: prev.players.map((p) => (p.id === id ? { ...p, ...updates } : p)),
      }));
    }, []);

  const setTurnOrder = useCallback((order: string[]) => {
    setState((prev) => ({ ...prev, turnOrder: order }));
  }, []);

  const randomizeTurnOrder = useCallback(() => {
    setState((prev) => {
      const ids = prev.players.map((p) => p.id);
      for (let i = ids.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ids[i], ids[j]] = [ids[j], ids[i]];
      }
      return { ...prev, turnOrder: ids };
    });
  }, []);

  const setGamePhase    = useCallback((phase: GamePhase) => setState((prev) => ({ ...prev, gamePhase: phase })), []);
  const setTimeLimit    = useCallback((minutes: number) => setState((prev) => ({ ...prev, timeLimit: minutes })), []);
  const setGameStartTime = useCallback((time: number)   => setState((prev) => ({ ...prev, gameStartTime: time })), []);

  const usePassToken = useCallback((playerId: string) => {
    setState((prev) => ({
      ...prev,
      players: prev.players.map((p) =>
        p.id === playerId && p.stats.passTokens > 0
          ? { ...p, stats: { ...p.stats, passTokens: p.stats.passTokens - 1 } }
          : p
      ),
    }));
  }, []);

  const nextTurn = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentTurnIndex: (prev.currentTurnIndex + 1) % prev.turnOrder.length,
    }));
  }, []);

  const prevTurn = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentTurnIndex:
        prev.currentTurnIndex === 0 ? prev.turnOrder.length - 1 : prev.currentTurnIndex - 1,
    }));
  }, []);

  const getCurrentPlayer = useCallback((): Player | null => {
    const id = state.turnOrder[state.currentTurnIndex];
    return state.players.find((p) => p.id === id) ?? null;
  }, [state.turnOrder, state.currentTurnIndex, state.players]);

  const recordTurnResult = useCallback((result: QuestionResult) => {
    setState((prev) => ({
      ...prev,
      questionHistory: [...prev.questionHistory, result],
      oceTotal: addOCE(prev.oceTotal, result.oceScore),
      players: prev.players.map((p) =>
        p.id === result.playerId
          ? {
              ...p,
              stats: {
                ...p.stats,
                questionsAnswered: p.stats.questionsAnswered + 1,
                oceTotal: addOCE(p.stats.oceTotal, result.oceScore),
                selfReflectionTags: result.selfReflectionTag
                  ? [...p.stats.selfReflectionTags, result.selfReflectionTag]
                  : p.stats.selfReflectionTags,
              },
            }
          : p
      ),
    }));
  }, []);

  const finishGame = useCallback(() => {
    setState((prev) => ({ ...prev, gamePhase: "finished" }));
  }, []);

  const resetGame = useCallback(() => {
    setState({
      players: [], turnOrder: [], currentTurnIndex: 0,
      gamePhase: "setup", questionHistory: [], oceTotal: EMPTY_OCE(),
      timeLimit: 60, gameStartTime: null,
    });
  }, []);

  return (
    <GameContext.Provider value={{
      ...state,
      addPlayer, removePlayer, updatePlayer,
      setTurnOrder, randomizeTurnOrder,
      setGamePhase, setTimeLimit, setGameStartTime,
      usePassToken, nextTurn, prevTurn, getCurrentPlayer,
      recordTurnResult, finishGame, resetGame,
    }}>
      {children}
    </GameContext.Provider>
  );
}
