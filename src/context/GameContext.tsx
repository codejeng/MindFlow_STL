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

export type PlayerRole = "parent" | "child" | "friend";
export type AgeGroup   = "ประถม" | "ม.ต้น" | "ม.ปลาย" | "ทั่วไป";
export type DeckCategory = "family" | "primary" | "secondary" | "university";
export type MissionType = "life-event" | "challenge" | "good-moments" | "pass-the-heart" | "coin";

// ─── Mission Types ────────────────────────────────────────────────────────────

export interface MissionGoalProgress {
  type: MissionType;
  target: number;
  progress: number;
}

export interface PlayerMission {
  missionId: string;
  label: string;
  goals: MissionGoalProgress[];
}

// ─── Channel Play Record ──────────────────────────────────────────────────────

export interface ChannelPlayRecord {
  playerId: string;
  channel: string;
  turnIndex: number;
  questionCode?: string;
  success?: boolean;         // for challenge: did it succeed?
  targetPlayerId?: string;   // for pass-the-heart: who was chosen?
}

import { JohariQuadrant } from "@/data/adaptationGuides";

export interface JohariResults {
  openness: JohariQuadrant;
  empathy: JohariQuadrant;
  selfClarity: JohariQuadrant;
}

export interface Player {
  id: string;
  name: string;
  role: PlayerRole;
  ageGroup: AgeGroup;
  characterId: string;
  missions: PlayerMission[];     // 3 missions assigned at game start
  doorUnlocked: boolean;         // true when all missions completed at Mission Gate
  heartCoins: number;            // tracked for display/dashboard
  stats: {
    questionsAnswered: number;
    oceTotal: OCEScore;           // running total of peer-given scores
    selfReflectionTags: string[]; // tags selected each turn
    passTokens: number;
  };
  peerCoins?: OCEScore;
  johariResults?: JohariResults;
  contextTag?: string;
}

export interface QuestionResult {
  questionCode: string;
  playerId:     string;
  selfReflectionTag: string | null;
  oceScore:     OCEScore;         // peer scores for this turn
}

export type GamePhase = "setup" | "ordering" | "playing" | "finished";

interface GameState {
  players:          Player[];
  turnOrder:        string[];
  currentTurnIndex: number;
  gamePhase:        GamePhase;
  questionHistory:  QuestionResult[];
  channelHistory:   ChannelPlayRecord[];  // tracks every channel play
  oceTotal:         OCEScore;   // aggregate across all players/turns
  timeLimit:        number;     // minutes
  gameStartTime:    number | null;
  selectedDeck:     DeckCategory | null;
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
  setSelectedDeck:   (deck: DeckCategory) => void;
  usePassToken:      (playerId: string) => void;
  nextTurn:          () => void;
  prevTurn:          () => void;
  getCurrentPlayer:  () => Player | null;
  recordTurnResult:  (result: QuestionResult) => void;
  finishGame:        () => void;
  resetGame:         () => void;
  // ── Mission system ──
  assignMissions:        (playerId: string, missions: PlayerMission[]) => void;
  updateMissionProgress: (playerId: string, missionType: MissionType, delta?: number) => void;
  addHeartCoins:         (playerId: string, amount: number) => void;
  addHeartCoinsToAll:    (amount: number) => void;
  unlockDoor:            (playerId: string) => void;
  areAllDoorsUnlocked:   () => boolean;
  getPlayerMissions:     (playerId: string) => PlayerMission[];
  checkAllMissionsComplete: (playerId: string) => boolean;
  recordChannelPlay:     (record: ChannelPlayRecord) => void;
  // ── Johari ──
  setPlayerJohariData:   (playerId: string, peerCoins: OCEScore, contextTag: string, johariResults: JohariResults) => void;
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
    channelHistory:   [],
    oceTotal:         EMPTY_OCE(),
    timeLimit:        60,
    gameStartTime:    null,
    selectedDeck:     null,
  });

  const addPlayer = useCallback((name: string, role: PlayerRole, ageGroup: AgeGroup, characterId: string) => {
    setState((prev) => {
      if (prev.players.length >= 5) return prev;
      const char = CHARACTERS.find((c) => c.id === characterId) ?? CHARACTERS[prev.players.length % CHARACTERS.length];
      const newPlayer: Player = {
        id: `player-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        name, role, ageGroup,
        characterId: char.id,
        missions: [],
        doorUnlocked: false,
        heartCoins: 0,
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

  const setGamePhase    = useCallback((phase: GamePhase)    => setState((prev) => ({ ...prev, gamePhase: phase })), []);
  const setTimeLimit    = useCallback((minutes: number)     => setState((prev) => ({ ...prev, timeLimit: minutes })), []);
  const setGameStartTime = useCallback((time: number)       => setState((prev) => ({ ...prev, gameStartTime: time })), []);
  const setSelectedDeck  = useCallback((deck: DeckCategory) => setState((prev) => ({ ...prev, selectedDeck: deck })), []);

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
    setState((prev) => ({
      players: [], turnOrder: [], currentTurnIndex: 0,
      gamePhase: "setup", questionHistory: [], channelHistory: [],
      oceTotal: EMPTY_OCE(),
      timeLimit: 60, gameStartTime: null, selectedDeck: prev.selectedDeck,
    }));
  }, []);

  // ── Mission System Functions ──────────────────────────────────────────────

  const assignMissions = useCallback((playerId: string, missions: PlayerMission[]) => {
    setState((prev) => ({
      ...prev,
      players: prev.players.map((p) =>
        p.id === playerId ? { ...p, missions } : p
      ),
    }));
  }, []);

  const updateMissionProgress = useCallback((playerId: string, missionType: MissionType, delta: number = 1) => {
    setState((prev) => ({
      ...prev,
      players: prev.players.map((p) => {
        if (p.id !== playerId) return p;
        return {
          ...p,
          missions: p.missions.map((m) => ({
            ...m,
            goals: m.goals.map((g) =>
              g.type === missionType
                ? { ...g, progress: Math.max(0, g.progress + delta) }
                : g
            ),
          })),
        };
      }),
    }));
  }, []);

  const addHeartCoins = useCallback((playerId: string, amount: number) => {
    setState((prev) => ({
      ...prev,
      players: prev.players.map((p) => {
        if (p.id !== playerId) return p;
        const newCoins = Math.max(0, p.heartCoins + amount);
        return {
          ...p,
          heartCoins: newCoins,
          missions: p.missions.map((m) => ({
            ...m,
            goals: m.goals.map((g) =>
              g.type === "coin" ? { ...g, progress: newCoins } : g
            ),
          })),
        };
      }),
    }));
  }, []);

  const addHeartCoinsToAll = useCallback((amount: number) => {
    setState((prev) => ({
      ...prev,
      players: prev.players.map((p) => {
        const newCoins = Math.max(0, p.heartCoins + amount);
        return {
          ...p,
          heartCoins: newCoins,
          missions: p.missions.map((m) => ({
            ...m,
            goals: m.goals.map((g) =>
              g.type === "coin" ? { ...g, progress: newCoins } : g
            ),
          })),
        };
      }),
    }));
  }, []);

  const unlockDoor = useCallback((playerId: string) => {
    setState((prev) => ({
      ...prev,
      players: prev.players.map((p) =>
        p.id === playerId ? { ...p, doorUnlocked: true } : p
      ),
    }));
  }, []);

  const areAllDoorsUnlocked = useCallback((): boolean => {
    return state.players.length > 0 && state.players.some((p) => p.doorUnlocked);
  }, [state.players]);

  const getPlayerMissions = useCallback((playerId: string): PlayerMission[] => {
    const player = state.players.find((p) => p.id === playerId);
    return player?.missions ?? [];
  }, [state.players]);

  const checkAllMissionsComplete = useCallback((playerId: string): boolean => {
    const player = state.players.find((p) => p.id === playerId);
    if (!player || player.missions.length === 0) return false;
    return player.missions.every((m) =>
      m.goals.every((g) => g.progress >= g.target)
    );
  }, [state.players]);

  const recordChannelPlay = useCallback((record: ChannelPlayRecord) => {
    setState((prev) => ({
      ...prev,
      channelHistory: [...prev.channelHistory, record],
    }));
  }, []);

  const setPlayerJohariData = useCallback((playerId: string, peerCoins: OCEScore, contextTag: string, johariResults: JohariResults) => {
    setState((prev) => ({
      ...prev,
      players: prev.players.map((p) =>
        p.id === playerId ? { ...p, peerCoins, contextTag, johariResults } : p
      ),
    }));
  }, []);

  return (
    <GameContext.Provider value={{
      ...state,
      addPlayer, removePlayer, updatePlayer,
      setTurnOrder, randomizeTurnOrder,
      setGamePhase, setTimeLimit, setGameStartTime, setSelectedDeck,
      usePassToken, nextTurn, prevTurn, getCurrentPlayer,
      recordTurnResult, finishGame, resetGame,
      assignMissions, updateMissionProgress,
      addHeartCoins, addHeartCoinsToAll,
      unlockDoor, areAllDoorsUnlocked,
      getPlayerMissions, checkAllMissionsComplete,
      recordChannelPlay,
      setPlayerJohariData,
    }}>
      {children}
    </GameContext.Provider>
  );
}
