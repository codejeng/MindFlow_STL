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

export interface Question {
  id:       number;
  code:     string;
  ageGroup: string;
  text:     string;
}

// ─── Scenario Questions ───────────────────────────────────────────────────────
// 15 emotional/social scenario questions for ประถม level

const RAW_QUESTIONS: Omit<Question, "id">[] = [
  { code: "P01", ageGroup: "ประถม", text: "คะแนนสอบออกมาแย่กว่าที่คาดไว้มาก คุณรู้สึกอย่างไรและจะจัดการกับสิ่งนี้อย่างไร?" },
  { code: "P02", ageGroup: "ประถม", text: "เพื่อนสนิทโกรธและหยุดคุยกับคุณโดยไม่บอกเหตุผล คุณจะทำอย่างไร?" },
  { code: "P03", ageGroup: "ประถม", text: "คุณทำโปรเจกต์กลุ่มเสร็จแล้ว แต่เพื่อนในกลุ่มไม่ช่วยเลย คุณรู้สึกอย่างไร?" },
  { code: "P04", ageGroup: "ประถม", text: "ผู้ปกครองสัญญาจะพาไปเที่ยว แต่ต้องยกเลิกกะทันหัน คุณรู้สึกอย่างไร?" },
  { code: "P05", ageGroup: "ประถม", text: "คุณกำลังนำเสนองานหน้าห้องและลืมสิ่งที่จะพูด คุณจะทำอย่างไร?" },
  { code: "P06", ageGroup: "ประถม", text: "เพื่อนในห้องนินทาคุณและคุณได้ยินมาเอง คุณจะทำอย่างไร?" },
  { code: "P07", ageGroup: "ประถม", text: "คุณอยากลองกิจกรรมใหม่ แต่กลัวว่าจะทำได้ไม่ดีเท่าคนอื่น คุณจะตัดสินใจอย่างไร?" },
  { code: "P08", ageGroup: "ประถม", text: "คุณเห็นเพื่อนถูกแกล้งในโรงเรียน แต่กลัวว่าจะโดนแกล้งด้วยถ้าเข้าไปช่วย คุณจะทำอย่างไร?" },
  { code: "P09", ageGroup: "ประถม", text: "คุณพยายามฝึกทักษะใหม่มาสามอาทิตย์แล้ว แต่ยังรู้สึกว่าไม่ก้าวหน้า คุณจะทำอย่างไร?" },
  { code: "P10", ageGroup: "ประถม", text: "ผู้ปกครองคุณทะเลาะกันที่บ้านและคุณรู้สึกเครียดมาก คุณจะจัดการกับความรู้สึกนี้อย่างไร?" },
  { code: "P11", ageGroup: "ประถม", text: "คุณถูกเลือกให้เป็นตัวแทนห้องในการแข่งขัน แต่รู้สึกไม่มั่นใจในตัวเอง คุณจะทำอย่างไร?" },
  { code: "P12", ageGroup: "ประถม", text: "คุณอยากบอกเพื่อนว่าพฤติกรรมบางอย่างของเขาทำให้คุณเจ็บปวด แต่กลัวทะเลาะกัน คุณจะทำอย่างไร?" },
  { code: "P13", ageGroup: "ประถม", text: "คุณทำผิดพลาดต่อหน้าเพื่อนหลายคน และรู้สึกอับอายมาก คุณจะรับมืออย่างไร?" },
  { code: "P14", ageGroup: "ประถม", text: "คุณรู้สึกว่าตนเองไม่มีเพื่อนที่แท้จริงและรู้สึกโดดเดี่ยว คุณจะทำอย่างไร?" },
  { code: "P15", ageGroup: "ประถม", text: "คุณกำลังช่วยเพื่อนแก้ปัญหา แต่เพื่อนไม่รับฟังคำแนะนำของคุณเลย คุณจะทำอย่างไร?" },
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
