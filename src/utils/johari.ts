import { Player, OCEScore, JohariResults } from "@/context/GameContext";
import { JohariQuadrant } from "@/data/adaptationGuides";
import { REFLECTION_TAGS, JohariDimension } from "@/constants/reflectionTags";

export function computeJohari(
  player: Player,
  peerCoins: OCEScore,
  maxPeerCoins: number
): JohariResults {
  // 1. Calculate Self-Awareness (Y-Axis)
  // Max possible tag score is the number of questions answered by the player.
  // Wait, what if they answered 0 questions? Fallback to 1 to avoid division by zero.
  const maxSelfScore = Math.max(player.stats.questionsAnswered, 1);

  // Calculate self scores for each dimension based on selected tags
  const selfScores = { openness: 0, empathy: 0, selfClarity: 0 };
  
  for (const tagId of player.stats.selfReflectionTags) {
    const tagDef = REFLECTION_TAGS.find((t) => t.id === tagId);
    if (tagDef && tagDef.dimension) {
      selfScores[tagDef.dimension] += tagDef.weight;
    }
  }

  // Calculate percentages (clamped between 0 and 100)
  const calculatePercentage = (actual: number, max: number) => {
    const raw = (actual / max) * 100;
    return Math.max(0, Math.min(100, raw));
  };

  const selfPct = {
    openness: calculatePercentage(selfScores.openness, maxSelfScore),
    empathy: calculatePercentage(selfScores.empathy, maxSelfScore),
    selfClarity: calculatePercentage(selfScores.selfClarity, maxSelfScore),
  };

  // 2. Calculate Peer Perception (X-Axis)
  const peerPct = {
    openness: calculatePercentage(peerCoins.openness, maxPeerCoins),
    empathy: calculatePercentage(peerCoins.empathy, maxPeerCoins),
    selfClarity: calculatePercentage(peerCoins.clarity, maxPeerCoins), // mapping clarity -> selfClarity
  };

  // 3. Map to Quadrants
  // Threshold is 50%
  const getQuadrant = (x: number, y: number): JohariQuadrant => {
    if (x >= 50 && y >= 50) return "open";
    if (x >= 50 && y < 50) return "blind";
    if (x < 50 && y >= 50) return "hidden";
    return "unknown"; // x < 50 && y < 50
  };

  return {
    openness: getQuadrant(peerPct.openness, selfPct.openness),
    empathy: getQuadrant(peerPct.empathy, selfPct.empathy),
    selfClarity: getQuadrant(peerPct.selfClarity, selfPct.selfClarity),
  };
}
