import { JohariDimension } from "@/constants/reflectionTags";

export type JohariQuadrant = "open" | "blind" | "hidden" | "unknown";

export interface AdaptationGuide {
  dimension: JohariDimension;
  quadrant: JohariQuadrant;
  displayTitle: string;
  actionableGuide: string;
}

export const ADAPTATION_GUIDES: AdaptationGuide[] = [
  // --- OPENNESS (การเปิดใจ) ---
  {
    dimension: "openness",
    quadrant: "open",
    displayTitle: "The Open Book (คนเปิดเผย)",
    actionableGuide: "คุณแสดงความรู้สึกและเปิดใจอย่างเป็นธรรมชาติ และคนอื่นก็สัมผัสได้ดีเยี่ยม รักษาความตรงไปตรงมานี้ไว้ เพราะมันสร้างความไว้วางใจในทีมได้ดีมาก",
  },
  {
    dimension: "openness",
    quadrant: "blind",
    displayTitle: "The Unintentional Wall (กำแพงโดยไม่รู้ตัว)",
    actionableGuide: "คุณอาจคิดว่าตัวเองเปิดใจแล้ว แต่เพื่อนๆ ยังรู้สึกว่าคุณเข้าถึงยาก ลองลดกำแพงลงอีกนิด ยอมรับความเปราะบาง (Vulnerability) จะช่วยให้คนอื่นกล้าเข้าหาคุณมากขึ้น",
  },
  {
    dimension: "openness",
    quadrant: "hidden",
    displayTitle: "The Guarded Soul (คนเก็บความรู้สึก)",
    actionableGuide: "คุณพร้อมเปิดใจอยู่ลึกๆ แต่ยังไม่แสดงออกมาให้คนอื่นเห็น ลองเริ่มแชร์ความคิดเห็นส่วนตัว หรือเรื่องเล็กๆ น้อยๆ ในใจดู เพื่อลดระยะห่างระหว่างคุณกับคนรอบข้าง",
  },
  {
    dimension: "openness",
    quadrant: "unknown",
    displayTitle: "The Uncharted Territory (พื้นที่ที่ยังไม่ถูกสำรวจ)",
    actionableGuide: "ทั้งคุณและเพื่อนๆ ยังมีมุมมองเรื่องการเปิดใจที่ไม่ชัดเจนนัก อาจเป็นเพราะบริบทนี้ยังไม่เอื้ออำนวย ลองหากิจกรรมหรือคำถามใหม่ๆ เพื่อกระตุ้นให้เกิดการเปิดใจมากขึ้น",
  },

  // --- EMPATHY (ความเห็นอกเห็นใจ) ---
  {
    dimension: "empathy",
    quadrant: "open",
    displayTitle: "The Warm Embracer (ผู้อบอุ่น)",
    actionableGuide: "คุณมีความใส่ใจและเห็นอกเห็นใจสูงมาก และแสดงออกให้ทุกคนรับรู้ได้ พลังงานบวกของคุณเป็นสิ่งที่คอยประคองเพื่อนร่วมทีมเสมอ ทำต่อไปนะ!",
  },
  {
    dimension: "empathy",
    quadrant: "blind",
    displayTitle: "The Misunderstood Listener (ผู้ฟังที่ถูกเข้าใจผิด)",
    actionableGuide: "คุณอาจคิดว่าคุณเข้าใจเพื่อน แต่การแสดงออกของคุณอาจดูเย็นชาหรือขัดแย้งไปบ้าง ลองเปลี่ยนจากการให้เหตุผล เป็นการพยักหน้ารับฟังและสะท้อนความรู้สึกเพื่อนดูนะ",
  },
  {
    dimension: "empathy",
    quadrant: "hidden",
    displayTitle: "The Unseen Supporter (ผู้สนับสนุนที่ถูกมองข้าม)",
    actionableGuide: "คุณมีความเห็นอกเห็นใจอยู่ข้างใน แต่คนอื่นสัมผัสได้น้อยมาก ลองเปลี่ยนจากการรับฟังเงียบๆ เป็นการพูดความรู้สึกออกมาตรงๆ เช่น 'เราเข้าใจนะว่าเรื่องนี้มันยาก...' ดูสิ",
  },
  {
    dimension: "empathy",
    quadrant: "unknown",
    displayTitle: "The Analytical Mind (นักคิดวิเคราะห์)",
    actionableGuide: "ดูเหมือนว่าคุณและทีมจะเน้นที่เหตุผลมากกว่าอารมณ์ในวงสนทนานี้ ลองฝึกตั้งคำถามที่โฟกัสถึงความรู้สึกของคนพูดบ้าง จะช่วยดึงอารมณ์ร่วมออกมาได้",
  },

  // --- SELF-CLARITY (ความชัดเจนในตัวเอง) ---
  {
    dimension: "selfClarity",
    quadrant: "open",
    displayTitle: "The Grounded Compass (เข็มทิศที่มั่นคง)",
    actionableGuide: "คุณรู้ตัวว่าตัวเองต้องการอะไร และคนอื่นก็เห็นความชัดเจนนี้ในตัวคุณ เป็นเรื่องที่ดีมากที่คุณสามารถถ่ายทอดตัวตนของคุณออกมาให้คนอื่นเข้าใจได้ตรงกัน",
  },
  {
    dimension: "selfClarity",
    quadrant: "blind",
    displayTitle: "The Hidden Signal (สัญญาณที่สับสน)",
    actionableGuide: "คุณคิดว่าตัวเองสื่อสารตัวตนชัดเจนแล้ว แต่คนอื่นกลับยังสับสนในสิ่งที่คุณเป็น ลองกลับมาทบทวนว่าสิ่งที่คุณสื่อสารกับสิ่งที่คุณทำ สอดคล้องกันจริงๆ หรือไม่",
  },
  {
    dimension: "selfClarity",
    quadrant: "hidden",
    displayTitle: "The Quiet Observer (ผู้สังเกตการณ์เงียบ)",
    actionableGuide: "คุณเข้าใจตัวเองดีอยู่ลึกๆ แต่ยังไม่กล้าแสดงจุดยืนให้คนอื่นเห็น ลองแสดงความคิดเห็น หรือบอกสิ่งที่ตัวเองต้องการให้ชัดเจนขึ้น เพื่อให้ทีมเข้าใจคุณมากขึ้น",
  },
  {
    dimension: "selfClarity",
    quadrant: "unknown",
    displayTitle: "The Explorer (นักสำรวจ)",
    actionableGuide: "ดูเหมือนคุณยังอยู่ในช่วงค้นหาความต้องการของตัวเอง และคนอื่นก็ยังมองไม่ค่อยออกเช่นกัน ไม่ต้องรีบ ลองสำรวจความรู้สึกตัวเองจากกิจกรรมที่ทำดูนะ",
  },
];
