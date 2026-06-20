// ─── Trait Dimensions ─────────────────────────────────────────────────────────
export type Trait = "SE" | "COM" | "RES" | "ER";

export const TRAIT_LABELS: Record<Trait, string> = {
  SE:  "ความเชื่อมั่นในตนเอง",
  COM: "การสื่อสาร",
  RES: "ความยืดหยุ่น",
  ER:  "การจัดการอารมณ์",
};

export const TRAIT_COLORS: Record<Trait, string> = {
  SE:  "#7B68EE",
  COM: "#1B7B7E",
  RES: "#E8A838",
  ER:  "#D4607A",
};

// ─── Question Channel ─────────────────────────────────────────────────────────

export type QuestionChannel =
  | "life-event"
  | "good-moments"
  | "challenge"
  | "pass-the-heart";

export interface Question {
  id:       number;
  code:     string;
  ageGroup: string;
  text:     string;
  channel:  QuestionChannel;
}

// ─── Life Event Questions (P001-P015) ─────────────────────────────────────────
// 15 emotional/social scenario questions for ประถม level

const RAW_QUESTIONS: Omit<Question, "id">[] = [
  { code: "P001", ageGroup: "ประถม", channel: "life-event", text: "คะแนนสอบออกมาแย่กว่าที่คาดไว้มาก คุณรู้สึกอย่างไรและจะจัดการกับสิ่งนี้อย่างไร?" },
  { code: "P002", ageGroup: "ประถม", channel: "life-event", text: "เพื่อนสนิทโกรธและหยุดคุยกับคุณโดยไม่บอกเหตุผล คุณจะทำอย่างไร?" },
  { code: "P003", ageGroup: "ประถม", channel: "life-event", text: "คุณทำโปรเจกต์กลุ่มเสร็จแล้ว แต่เพื่อนในกลุ่มไม่ช่วยเลย คุณรู้สึกอย่างไร?" },
  { code: "P004", ageGroup: "ประถม", channel: "life-event", text: "ผู้ปกครองสัญญาจะพาไปเที่ยว แต่ต้องยกเลิกกะทันหัน คุณรู้สึกอย่างไร?" },
  { code: "P005", ageGroup: "ประถม", channel: "life-event", text: "คุณกำลังนำเสนองานหน้าห้องและลืมสิ่งที่จะพูด คุณจะทำอย่างไร?" },
  { code: "P006", ageGroup: "ประถม", channel: "life-event", text: "เพื่อนในห้องนินทาคุณและคุณได้ยินมาเอง คุณจะทำอย่างไร?" },
  { code: "P007", ageGroup: "ประถม", channel: "life-event", text: "คุณอยากลองกิจกรรมใหม่ แต่กลัวว่าจะทำได้ไม่ดีเท่าคนอื่น คุณจะตัดสินใจอย่างไร?" },
  { code: "P008", ageGroup: "ประถม", channel: "life-event", text: "คุณเห็นเพื่อนถูกแกล้งในโรงเรียน แต่กลัวว่าจะโดนแกล้งด้วยถ้าเข้าไปช่วย คุณจะทำอย่างไร?" },
  { code: "P009", ageGroup: "ประถม", channel: "life-event", text: "คุณพยายามฝึกทักษะใหม่มาสามอาทิตย์แล้ว แต่ยังรู้สึกว่าไม่ก้าวหน้า คุณจะทำอย่างไร?" },
  { code: "P010", ageGroup: "ประถม", channel: "life-event", text: "ผู้ปกครองคุณทะเลาะกันที่บ้านและคุณรู้สึกเครียดมาก คุณจะจัดการกับความรู้สึกนี้อย่างไร?" },
  { code: "P011", ageGroup: "ประถม", channel: "life-event", text: "คุณถูกเลือกให้เป็นตัวแทนห้องในการแข่งขัน แต่รู้สึกไม่มั่นใจในตัวเอง คุณจะทำอย่างไร?" },
  { code: "P012", ageGroup: "ประถม", channel: "life-event", text: "คุณอยากบอกเพื่อนว่าพฤติกรรมบางอย่างของเขาทำให้คุณเจ็บปวด แต่กลัวทะเลาะกัน คุณจะทำอย่างไร?" },
  { code: "P013", ageGroup: "ประถม", channel: "life-event", text: "คุณทำผิดพลาดต่อหน้าเพื่อนหลายคน และรู้สึกอับอายมาก คุณจะรับมืออย่างไร?" },
  { code: "P014", ageGroup: "ประถม", channel: "life-event", text: "คุณรู้สึกว่าตนเองไม่มีเพื่อนที่แท้จริงและรู้สึกโดดเดี่ยว คุณจะทำอย่างไร?" },
  { code: "P015", ageGroup: "ประถม", channel: "life-event", text: "คุณกำลังช่วยเพื่อนแก้ปัญหา แต่เพื่อนไม่รับฟังคำแนะนำของคุณเลย คุณจะทำอย่างไร?" },

  // ─── Good Moments Questions (GM001-GM005) ───────────────────────────────────
  { code: "GM001", ageGroup: "all", channel: "good-moments", text: "เล่าเรื่องที่คุณภูมิใจที่สุดในสัปดาห์นี้" },
  { code: "GM002", ageGroup: "all", channel: "good-moments", text: "บอกสิ่งที่คุณรู้สึกขอบคุณในวันนี้" },
  { code: "GM003", ageGroup: "all", channel: "good-moments", text: "เล่าช่วงเวลาที่คุณรู้สึกมีความสุขที่สุดเมื่อเร็ว ๆ นี้" },
  { code: "GM004", ageGroup: "all", channel: "good-moments", text: "บอกสิ่งดี ๆ ที่เกิดขึ้นกับคุณในเดือนนี้" },
  { code: "GM005", ageGroup: "all", channel: "good-moments", text: "เล่าเรื่องที่ทำให้คุณยิ้มได้ในวันที่ผ่านมา" },

  // ─── Challenge Questions (CH001-CH005) ──────────────────────────────────────
  { code: "CH001", ageGroup: "all", channel: "challenge", text: "บอกข้อดีของคนทางขวา 3 ข้อ" },
  { code: "CH002", ageGroup: "all", channel: "challenge", text: "หาความเหมือนกัน 3 ข้อกับคนในกลุ่ม" },
  { code: "CH003", ageGroup: "all", channel: "challenge", text: "บอกสิ่งที่คุณชื่นชมเพื่อนแต่ละคนในกลุ่ม" },
  { code: "CH004", ageGroup: "all", channel: "challenge", text: "เล่าสิ่งที่คุณเรียนรู้จากความผิดพลาดครั้งล่าสุด" },
  { code: "CH005", ageGroup: "all", channel: "challenge", text: "บอกเป้าหมายของคุณหนึ่งข้อและขอคำแนะนำจากกลุ่ม" },

  // ─── Pass The Heart Questions (PH001-PH005) ────────────────────────────────
  { code: "PH001", ageGroup: "all", channel: "pass-the-heart", text: "เลือกคนที่คุณคิดว่าเข้าใจคนอื่นมากที่สุด ให้ตอบคำถามนี้แทน" },
  { code: "PH002", ageGroup: "all", channel: "pass-the-heart", text: "เลือกคนที่คุณอยากรู้จักมากขึ้น ให้เล่าเรื่องเกี่ยวกับตัวเอง" },
  { code: "PH003", ageGroup: "all", channel: "pass-the-heart", text: "เลือกคนที่คุณคิดว่ามีพลังบวก ให้เล่าสิ่งดี ๆ ที่เกิดขึ้นในวันนี้" },
  { code: "PH004", ageGroup: "all", channel: "pass-the-heart", text: "เลือกคนที่คุณชื่นชม ให้บอกสิ่งที่ทำให้เขาเป็นคนพิเศษ" },
  { code: "PH005", ageGroup: "all", channel: "pass-the-heart", text: "เลือกคนที่คุณอยากขอบคุณ ให้บอกเหตุผลที่คุณรู้สึกขอบคุณ" },
];

const questions: Question[] = RAW_QUESTIONS.map((q, i) => ({ ...q, id: i + 1 }));

export default questions;

/** Look up a question by its code (case-insensitive). */
export function getQuestionByCode(code: string): Question | undefined {
  return questions.find((q) => q.code.toLowerCase() === code.toLowerCase());
}

/** Get all unique question codes. */
export function getAllQuestionCodes(): string[] {
  return questions.map((q) => q.code);
}

/** Get all questions for a specific channel. */
export function getQuestionsByChannel(channel: QuestionChannel): Question[] {
  return questions.filter((q) => q.channel === channel);
}
