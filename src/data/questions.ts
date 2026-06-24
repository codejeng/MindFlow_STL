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

// ─── Life Event Questions — Family Cards (PC01-PC18) ──────────────────────────
// 18 family-focused reflection questions for the Family (ครอบครัว) deck

const RAW_QUESTIONS: Omit<Question, "id">[] = [
  { code: "PC01", ageGroup: "ครอบครัว", channel: "life-event", text: "อะไรคือสิ่งที่ทำให้คุณภูมิใจในตัวเองมากที่สุด เพราะอะไร?" },
  { code: "PC02", ageGroup: "ครอบครัว", channel: "life-event", text: "ถ้าคุณอธิบายตัวเองด้วย 3 คำ จะเป็นคำว่าอะไร?" },
  { code: "PC03", ageGroup: "ครอบครัว", channel: "life-event", text: "คุณคิดว่าจุดแข็งที่สุดของคุณคืออะไร? เพราะอะไร?" },
  { code: "PC04", ageGroup: "ครอบครัว", channel: "life-event", text: "ถ้ามีวันหยุดพิเศษ 1 วัน คุณอยากใช้เวลาทำอะไร?" },
  { code: "PC05", ageGroup: "ครอบครัว", channel: "life-event", text: "มีเรื่องอะไรที่คุณอยากให้ผู้ใหญ่เข้าใจเกี่ยวกับตัวคุณมากขึ้น?" },
  { code: "PC06", ageGroup: "ครอบครัว", channel: "life-event", text: "เวลาคุณรู้สึกเสียใจ คุณมักทำอย่างไร?" },
  { code: "PC07", ageGroup: "ครอบครัว", channel: "life-event", text: "เรื่องไหนที่คุณไม่ค่อยกล้าพูดกับคนอื่น?" },
  { code: "PC08", ageGroup: "ครอบครัว", channel: "life-event", text: "เคยมีเรื่องที่คุณอยากบอกใครสักคนแต่ไม่กล้าพูดไหม?" },
  { code: "PC09", ageGroup: "ครอบครัว", channel: "life-event", text: "ช่วงนี้มีเรื่องอะไรที่อยู่ในใจคุณบ้าง?" },
  { code: "PC10", ageGroup: "ครอบครัว", channel: "life-event", text: "ถ้าเพื่อนถูกล้อจนเสียใจ คุณจะทำอย่างไร?" },
  { code: "PC11", ageGroup: "ครอบครัว", channel: "life-event", text: "มีใครที่คุณคิดว่าเขาเก่ง แต่ไม่ค่อยมีคนเห็นบ้าง?" },
  { code: "PC12", ageGroup: "ครอบครัว", channel: "life-event", text: "ถ้าเพื่อนทำผิดพลาด คุณอยากพูดอะไรกับเขา?" },
  { code: "PC13", ageGroup: "ครอบครัว", channel: "life-event", text: "คุณเคยช่วยใครแล้วรู้สึกดีมาก ๆ ไหม?" },
  { code: "PC14", ageGroup: "ครอบครัว", channel: "life-event", text: "ช่วงเวลาไหนที่คุณมีความสุขที่สุดกับครอบครัว?" },
  { code: "PC15", ageGroup: "ครอบครัว", channel: "life-event", text: "ถ้าวันนี้คุณขออะไรจากคนในบ้านได้ 1 อย่าง คุณจะขออะไร?" },
  { code: "PC16", ageGroup: "ครอบครัว", channel: "life-event", text: "มีเรื่องอะไรที่คุณอยากทำกับครอบครัวมากขึ้น?" },
  { code: "PC17", ageGroup: "ครอบครัว", channel: "life-event", text: "เวลาคุณมีปัญหา คุณอยากคุยกับใครก่อน?" },
  { code: "PC18", ageGroup: "ครอบครัว", channel: "life-event", text: "ถ้าครอบครัวของคุณเป็นทีมกีฬา คุณคิดว่าตัวเองมีหน้าที่อะไรในทีม?" },

  // ─── Life Event Questions — Primary Cards (PP01-PP18) ──────────────────────
  // 18 reflection questions for the Primary (ประถมศึกษา) deck
  { code: "PP01", ageGroup: "ประถม", channel: "life-event", text: "ตอนอายุเท่าลูก คุณเป็นเด็กแบบไหน?" },
  { code: "PP02", ageGroup: "ประถม", channel: "life-event", text: "อะไรคือสิ่งที่คุณอยากให้ลูกเรียนรู้จากตัวคุณ? เพราะอะไร?" },
  { code: "PP03", ageGroup: "ประถม", channel: "life-event", text: "เรื่องไหนที่คุณภูมิใจในตัวเองมากที่สุดในชีวิต?" },
  { code: "PP04", ageGroup: "ประถม", channel: "life-event", text: "มีครั้งไหนที่ลูกสอนอะไรคุณโดยที่เขาไม่รู้ตัว?" },
  { code: "PP05", ageGroup: "ประถม", channel: "life-event", text: "มีเรื่องอะไรที่คุณอยากบอกลูก แต่ยังไม่เคยพูด?" },
  { code: "PP06", ageGroup: "ประถม", channel: "life-event", text: "อะไรคือความกังวลที่คุณมีต่อลูกมากที่สุด?" },
  { code: "PP07", ageGroup: "ประถม", channel: "life-event", text: "มีเรื่องไหนที่คุณคิดว่าลูกอาจเข้าใจคุณผิด?" },
  { code: "PP08", ageGroup: "ประถม", channel: "life-event", text: "มีเรื่องอะไรที่คุณอยากให้คนในครอบครัวรับฟังมากขึ้น?" },
  { code: "PP09", ageGroup: "ประถม", channel: "life-event", text: "ถ้าลูกกำลังเสียใจ คุณคิดว่าคำพูดแบบไหนช่วยเขาได้มากที่สุด?" },
  { code: "PP10", ageGroup: "ประถม", channel: "life-event", text: "มีครั้งไหนที่ลูกสอนอะไรคุณโดยที่เขาไม่รู้ตัว?" },
  { code: "PP11", ageGroup: "ประถม", channel: "life-event", text: "คุณคิดว่าเด็กยุคนี้เจอเรื่องยากอะไรที่ต่างจากสมัยคุณ?" },
  { code: "PP12", ageGroup: "ประถม", channel: "life-event", text: "ถ้าคุณกลับไปเป็นเด็กอีกครั้ง คุณอยากให้ผู้ใหญ่เข้าใจอะไรเกี่ยวกับคุณ?" },
  { code: "PP13", ageGroup: "ประถม", channel: "life-event", text: "คุณคิดว่าลูกต้องการอะไรจากคุณมากกว่าที่คุณให้ในตอนนี้?" },
  { code: "PP14", ageGroup: "ประถม", channel: "life-event", text: "ช่วงเวลาไหนที่คุณมีความสุขที่สุดกับลูก?" },
  { code: "PP15", ageGroup: "ประถม", channel: "life-event", text: "ถ้ามีเวลาอยู่กับลูกเพิ่มอีก 1 ชั่วโมงต่อวัน คุณอยากทำอะไร?" },
  { code: "PP16", ageGroup: "ประถม", channel: "life-event", text: "คุณอยากให้ลูกจดจำครอบครัวนี้ในแบบไหน?" },
  { code: "PP17", ageGroup: "ประถม", channel: "life-event", text: "มีเรื่องอะไรที่คุณอยากทำร่วมกับลูกก่อนที่เขาจะโต?" },
  { code: "PP18", ageGroup: "ประถม", channel: "life-event", text: "ถ้าครอบครัวของคุณเป็นทีมกีฬา คุณคิดว่าลูกมีบทบาทอะไรในทีม?" },

  // ─── Life Event Questions — Secondary Cards (SC01-SC18) ──────────────────────
  // 18 reflection questions for the Secondary (มัธยมศึกษา) deck
  { code: "SC01", ageGroup: "มัธยม", channel: "life-event", text: "ตอนนี้ในกลุ่มเพื่อน คุณคิดว่าตัวเองเป็นคนแบบไหน? เพราะอะไร?" },
  { code: "SC02", ageGroup: "มัธยม", channel: "life-event", text: "อะไรคือเหตุผลที่ทำให้คุณสนิทกับเพื่อนคนหนึ่งมากเป็นพิเศษ? เพราะอะไร?" },
  { code: "SC03", ageGroup: "มัธยม", channel: "life-event", text: "คุณเคยรู้สึกว่าไม่เข้าพวกกับคนรอบตัวไหม? เพราะอะไร?" },
  { code: "SC04", ageGroup: "มัธยม", channel: "life-event", text: "เวลาคุณมีปัญหากับเพื่อน คุณมักเป็นฝ่ายคุยก่อนหรือเงียบไป? เพราะอะไร?" },
  { code: "SC05", ageGroup: "มัธยม", channel: "life-event", text: "ถ้าถามเพื่อนสนิท เขาจะบอกว่าคุณเป็นคนแบบไหน? เพราะอะไร?" },
  { code: "SC06", ageGroup: "มัธยม", channel: "life-event", text: "ช่วงนี้เรื่องอะไรที่ทำให้คุณเครียดที่สุด? เพราะอะไร?" },
  { code: "SC07", ageGroup: "มัธยม", channel: "life-event", text: "มีวิชาไหนที่คุณรู้สึกกดดันเป็นพิเศษ เพราะอะไร?" },
  { code: "SC08", ageGroup: "มัธยม", channel: "life-event", text: "คุณเคยเปรียบเทียบตัวเองกับคนอื่นเรื่องอะไรบ้าง? เพราะอะไร?" },
  { code: "SC09", ageGroup: "มัธยม", channel: "life-event", text: "อะไรคือสิ่งที่คนรอบตัวมักเข้าใจคุณผิด? เพราะอะไร?" },
  { code: "SC10", ageGroup: "มัธยม", channel: "life-event", text: "มีเรื่องอะไรที่ผู้ใหญ่คิดว่าง่าย แต่สำหรับคุณมันยากมาก?" },
  { code: "SC11", ageGroup: "มัธยม", channel: "life-event", text: "ตอนนี้คุณรู้สึกว่าตัวเองเป็นคนแบบที่อยากเป็นแล้วหรือยัง? เพราะอะไร?" },
  { code: "SC12", ageGroup: "มัธยม", channel: "life-event", text: "ถ้าอีก 5 ปีข้างหน้า คุณอยากเห็นตัวเองเป็นแบบไหน? เพราะอะไร?" },
  { code: "SC13", ageGroup: "มัธยม", channel: "life-event", text: "มีเรื่องอะไรที่คุณอยากลองทำ แต่ยังไม่กล้า? เพราะอะไร?" },
  { code: "SC14", ageGroup: "มัธยม", channel: "life-event", text: "ถ้าพรุ่งนี้ไม่มีใครตัดสินคุณเลย คุณจะทำอะไรแตกต่างจากเดิม? เพราะอะไร?" },
  { code: "SC15", ageGroup: "มัธยม", channel: "life-event", text: "คุณคิดว่าจุดแข็งที่คนอื่นอาจมองไม่เห็นในตัวคุณคืออะไร? เพราะอะไร?" },
  { code: "SC16", ageGroup: "มัธยม", channel: "life-event", text: "มีเรื่องอะไรที่คุณอยากให้พ่อแม่เข้าใจเกี่ยวกับคุณมากขึ้น? เพราะอะไร?" },
  { code: "SC17", ageGroup: "มัธยม", channel: "life-event", text: "เวลาที่คุณมีปัญหา คุณอยากให้พ่อแม่ทำอะไรมากที่สุด? เพราะอะไร?" },
  { code: "SC18", ageGroup: "มัธยม", channel: "life-event", text: "มีเรื่องอะไรที่คุณแกล้งทำเป็นโอเค ทั้งที่จริงไม่โอเค?" },

  // ─── Life Event Questions — University Cards (SP01-SP18) ──────────────────────
  // 18 reflection questions for the University/General (นักศึกษา) deck
  { code: "SP01", ageGroup: "นักศึกษา", channel: "life-event", text: "เมื่อคุณเป็นวัยรุ่น คุณเป็นคนแบบไหน?" },
  { code: "SP02", ageGroup: "นักศึกษา", channel: "life-event", text: "อะไรคือบทเรียนสำคัญที่สุดที่คุณเรียนรู้จากชีวิตจนถึงวันนี้? เพราะอะไร?" },
  { code: "SP03", ageGroup: "นักศึกษา", channel: "life-event", text: "คุณคิดว่าค่านิยมใดสำคัญที่สุดที่อยากส่งต่อให้ลูก? เพราะอะไร?" },
  { code: "SP04", ageGroup: "นักศึกษา", channel: "life-event", text: "ถ้าย้อนเวลากลับไปได้ คุณอยากบอกอะไรกับตัวเองตอนอายุเท่าลูก?" },
  { code: "SP05", ageGroup: "นักศึกษา", channel: "life-event", text: "มีเรื่องอะไรที่คุณกำลังพยายามพัฒนาตัวเองอยู่ในปัจจุบัน?" },
  { code: "SP06", ageGroup: "นักศึกษา", channel: "life-event", text: "คุณคิดว่าจุดแข็งที่สุดของตัวเองในบทบาทพ่อแม่คืออะไร? เพราะอะไร?" },
  { code: "SP07", ageGroup: "นักศึกษา", channel: "life-event", text: "เรื่องอะไรเกี่ยวกับลูกที่ทำให้คุณภูมิใจที่สุด? เพราะอะไร?" },
  { code: "SP08", ageGroup: "นักศึกษา", channel: "life-event", text: "เรื่องอะไรเกี่ยวกับลูกที่คุณเป็นห่วงมากที่สุดในตอนนี้? เพราะอะไร?" },
  { code: "SP09", ageGroup: "นักศึกษา", channel: "life-event", text: "มีเรื่องอะไรที่คุณอยากบอกลูก แต่ยังไม่เคยพูด?" },
  { code: "SP10", ageGroup: "นักศึกษา", channel: "life-event", text: "ช่วงไหนที่คุณรู้สึกว่าการเป็นพ่อแม่เป็นเรื่องท้าทายที่สุด? เพราะอะไร?" },
  { code: "SP11", ageGroup: "นักศึกษา", channel: "life-event", text: "มีครั้งไหนที่ลูกทำให้คุณมองโลกต่างไปจากเดิม? เพราะอะไร?" },
  { code: "SP12", ageGroup: "นักศึกษา", channel: "life-event", text: "อะไรคือสิ่งที่คุณอยากให้ลูกเข้าใจเกี่ยวกับตัวคุณมากขึ้น? เพราะอะไร?" },
  { code: "SP13", ageGroup: "นักศึกษา", channel: "life-event", text: "คุณคิดว่าลูกต้องการอะไรจากคุณมากที่สุดในช่วงวัยนี้? เพราะอะไร?" },
  { code: "SP14", ageGroup: "นักศึกษา", channel: "life-event", text: "เวลาลูกมีปัญหา คุณอยากเป็นคนแบบไหนสำหรับเขา? เพราะอะไร?" },
  { code: "SP15", ageGroup: "นักศึกษา", channel: "life-event", text: "คุณคิดว่าครอบครัวของคุณมีจุดแข็งเรื่องอะไร? เพราะอะไร?" },
  { code: "SP16", ageGroup: "นักศึกษา", channel: "life-event", text: "มีเรื่องอะไรที่คุณอยากทำร่วมกับลูกก่อนที่เขาจะโตเป็นผู้ใหญ่? เพราะอะไร?" },
  { code: "SP17", ageGroup: "นักศึกษา", channel: "life-event", text: "คุณคิดว่าวัยรุ่นในปัจจุบันต้องเผชิญแรงกดดันอะไรที่ต่างจากสมัยคุณ?" },
  { code: "SP18", ageGroup: "นักศึกษา", channel: "life-event", text: "ถ้าคุณเป็นลูกของตัวเอง คุณคิดว่าคุณอยากให้พ่อแม่คนนี้ปรับอะไรบ้าง?" },

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
