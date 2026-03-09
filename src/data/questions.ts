// ─── Relationship Traits ──────────────────────────────────────────────────────
// Each answer maps to a trait dimension that contributes to the family
// relationship profile shown on the summary card.
export type Trait =
  | "communication"  // เปิดใจสื่อสาร
  | "empathy"        // เข้าใจความรู้สึก
  | "trust"          // ความไว้วางใจ
  | "quality_time"   // เวลาคุณภาพ
  | "boundaries"     // เคารพขอบเขต
  | "growth";        // การเติบโตร่วมกัน

export interface QuestionChoice {
  text: string;
  traits: Partial<Record<Trait, number>>; // points added per trait if chosen
}

export interface Question {
  id: number;
  code: string;
  text: string;
  choices: QuestionChoice[];
}

const questions: Question[] = [
  {
    id: 1,
    code: "Q1",
    text: "เมื่อลูกทำผิดพลาด สิ่งที่พ่อแม่ทำมักจะเป็น?",
    choices: [
      { text: "รับฟังก่อนแล้วค่อยพูดคุย", traits: { communication: 3, empathy: 2 } },
      { text: "อธิบายเหตุผลด้วยความเข้าใจ", traits: { communication: 2, trust: 2 } },
      { text: "ว่ากล่าวทันทีเพื่อสอนใจ", traits: { boundaries: 1 } },
      { text: "เงียบและรอให้เวลาผ่านไป", traits: { boundaries: 2, trust: 1 } },
    ],
  },
  {
    id: 2,
    code: "Q2",
    text: "เวลาว่าง ครอบครัวของเรามักจะทำอะไรด้วยกัน?",
    choices: [
      { text: "ทานข้าวและคุยเรื่องชีวิตประจำวัน", traits: { quality_time: 3, communication: 2 } },
      { text: "ดูหนังหรือฟังเพลงร่วมกัน", traits: { quality_time: 2 } },
      { text: "ต่างคนต่างอยู่ในห้องตัวเอง", traits: { boundaries: 2 } },
      { text: "ทำกิจกรรมข้างนอกด้วยกัน", traits: { quality_time: 3, growth: 1 } },
    ],
  },
  {
    id: 3,
    code: "Q3",
    text: "เมื่อรู้สึกเครียด เราบอกคนในครอบครัวหรือไม่?",
    choices: [
      { text: "บอกเสมอ ครอบครัวเป็นที่พึ่งแรก", traits: { trust: 3, communication: 2 } },
      { text: "บางครั้ง ขึ้นอยู่กับเรื่อง", traits: { trust: 2, boundaries: 1 } },
      { text: "ไม่ค่อยบอก กลัวเป็นภาระ", traits: { empathy: 1 } },
      { text: "ไม่เคยบอก ชอบจัดการเอง", traits: { boundaries: 2 } },
    ],
  },
  {
    id: 4,
    code: "Q4",
    text: "ครอบครัวของเราพูดเรื่องความรู้สึกกันบ่อยแค่ไหน?",
    choices: [
      { text: "พูดทุกวัน เปิดใจกันมาก", traits: { communication: 3, empathy: 3 } },
      { text: "พูดบ้าง เมื่อมีเรื่องสำคัญ", traits: { communication: 2, trust: 1 } },
      { text: "นานๆ ครั้ง ไม่ค่อยพูดถึง", traits: { empathy: 1 } },
      { text: "แทบไม่เคยพูดตรงๆ", traits: { boundaries: 1 } },
    ],
  },
  {
    id: 5,
    code: "Q5",
    text: "เมื่อมีความขัดแย้งในบ้าน เราจะ...?",
    choices: [
      { text: "นั่งคุยกันทันทีเพื่อหาทางออก", traits: { communication: 3, trust: 2 } },
      { text: "รอให้บรรยากาศเย็นลงแล้วค่อยคุย", traits: { empathy: 2, boundaries: 1 } },
      { text: "หลีกเลี่ยงและหวังให้มันผ่านไป", traits: { boundaries: 2 } },
      { text: "ให้คนกลางช่วยตัดสิน", traits: { trust: 1, growth: 1 } },
    ],
  },
  {
    id: 6,
    code: "Q6",
    text: "พ่อแม่รับรู้ความฝันหรือเป้าหมายของลูกหรือไม่?",
    choices: [
      { text: "รู้ทุกอย่าง คุยกันเป็นประจำ", traits: { communication: 3, trust: 2, growth: 2 } },
      { text: "รู้บ้าง บางเรื่องลูกไม่บอก", traits: { trust: 1, boundaries: 1 } },
      { text: "รู้เพียงผิวเผิน ไม่ลงลึก", traits: { empathy: 1 } },
      { text: "ส่วนใหญ่ไม่รู้ ต่างคนต่างอยู่", traits: { boundaries: 2 } },
    ],
  },
  {
    id: 7,
    code: "Q7",
    text: "เมื่อลูกต้องการตัดสินใจเรื่องใหญ่ ครอบครัวจะ...?",
    choices: [
      { text: "ให้คำแนะนำและเคารพการตัดสินใจของลูก", traits: { trust: 3, growth: 2, empathy: 1 } },
      { text: "ช่วยชั่งน้ำหนักข้อดีข้อเสียด้วยกัน", traits: { communication: 2, trust: 2, growth: 1 } },
      { text: "ให้ลูกตัดสินใจเองทั้งหมด", traits: { boundaries: 3, growth: 1 } },
      { text: "พ่อแม่ตัดสินใจให้เป็นหลัก", traits: { boundaries: 1 } },
    ],
  },
  {
    id: 8,
    code: "Q8",
    text: "ในบ้านของเรา 'ขอโทษ' พูดกันบ่อยแค่ไหน?",
    choices: [
      { text: "พูดทุกครั้งที่ทำผิด ไม่ว่าใครก็ตาม", traits: { trust: 3, empathy: 2 } },
      { text: "พูดบ้าง แต่ไม่ถนัดนัก", traits: { empathy: 1, trust: 1 } },
      { text: "ส่วนใหญ่แสดงออกแบบอื่นแทนคำพูด", traits: { empathy: 2 } },
      { text: "แทบไม่เคย ถือว่ารู้กันเอง", traits: { communication: 1 } },
    ],
  },
  {
    id: 9,
    code: "Q9",
    text: "เราชื่นชมและบอกรักกันในครอบครัวอย่างไร?",
    choices: [
      { text: "บอกตรงๆ บ่อยๆ ทั้งคำพูดและการกระทำ", traits: { communication: 3, empathy: 3, quality_time: 1 } },
      { text: "แสดงออกผ่านการกระทำมากกว่าคำพูด", traits: { quality_time: 2, empathy: 1 } },
      { text: "นานๆ ครั้งในโอกาสพิเศษ", traits: { quality_time: 1 } },
      { text: "ไม่ค่อยแสดงออก แต่รู้ในใจ", traits: { trust: 1 } },
    ],
  },
  {
    id: 10,
    code: "Q10",
    text: "เมื่อสมาชิกครอบครัวเจ็บป่วยหรือมีปัญหา เราจะ...?",
    choices: [
      { text: "อยู่เคียงข้างและช่วยทุกอย่างที่ทำได้", traits: { quality_time: 3, empathy: 3 } },
      { text: "คอยถามไถ่และให้กำลังใจ", traits: { empathy: 2, communication: 1 } },
      { text: "จัดการให้แต่คงระยะห่างไว้", traits: { boundaries: 2 } },
      { text: "ให้เผชิญด้วยตัวเองเป็นหลัก", traits: { growth: 1, boundaries: 2 } },
    ],
  },
  {
    id: 11,
    code: "Q11",
    text: "กิจกรรมที่ทำร่วมกันในครอบครัว มักจะเป็นอะไร?",
    choices: [
      { text: "ปรุงอาหารและทานข้าวพร้อมกัน", traits: { quality_time: 3, communication: 1 } },
      { text: "ออกไปท่องเที่ยวหรือทำกิจกรรมนอกบ้าน", traits: { quality_time: 3, growth: 2 } },
      { text: "ดูซีรีส์หรือเล่นเกมด้วยกัน", traits: { quality_time: 2 } },
      { text: "แต่ละคนทำสิ่งที่ชอบของตัวเอง", traits: { boundaries: 2, growth: 1 } },
    ],
  },
  {
    id: 12,
    code: "Q12",
    text: "ครอบครัวเราเรียนรู้สิ่งใหม่ร่วมกันอย่างไร?",
    choices: [
      { text: "ทดลองทำสิ่งใหม่ด้วยกันเสมอ", traits: { growth: 3, quality_time: 2 } },
      { text: "แชร์ความรู้และประสบการณ์ให้กัน", traits: { growth: 2, communication: 2 } },
      { text: "ต่างคนต่างเรียนรู้แล้วค่อยบอกกัน", traits: { growth: 1, boundaries: 1 } },
      { text: "ไม่ค่อยได้เรียนรู้ร่วมกัน", traits: { growth: 0 } },
    ],
  },
  {
    id: 13,
    code: "Q13",
    text: "เราให้ความสำคัญกับ 'กฎ' ในบ้านอย่างไร?",
    choices: [
      { text: "ตกลงกฎร่วมกันทุกคน", traits: { trust: 2, communication: 2, boundaries: 1 } },
      { text: "พ่อแม่ตั้งกฎ ลูกทำตาม", traits: { boundaries: 2 } },
      { text: "ยืดหยุ่นตามสถานการณ์", traits: { trust: 1, empathy: 1 } },
      { text: "ไม่ค่อยมีกฎ ทุกคนอิสระ", traits: { boundaries: 1, growth: 1 } },
    ],
  },
  {
    id: 14,
    code: "Q14",
    text: "เวลาลูกมีความสุข พ่อแม่จะ...?",
    choices: [
      { text: "ร่วมยินดีและแสดงออกอย่างอบอุ่น", traits: { empathy: 3, quality_time: 2 } },
      { text: "รับรู้และถามถึงเรื่องนั้น", traits: { communication: 2, empathy: 1 } },
      { text: "ยิ้มและพยักหน้ารับรู้", traits: { trust: 1, empathy: 1 } },
      { text: "ไม่ค่อยแสดงออก แต่ดีใจในใจ", traits: { trust: 1 } },
    ],
  },
  {
    id: 15,
    code: "Q15",
    text: "ในครอบครัว ทุกคนรู้สึกปลอดภัยที่จะพูดความจริงหรือไม่?",
    choices: [
      { text: "ใช่ พูดได้ทุกเรื่องโดยไม่กลัว", traits: { trust: 3, communication: 3 } },
      { text: "ส่วนใหญ่ใช่ แต่บางเรื่องยังลังเล", traits: { trust: 2, communication: 1 } },
      { text: "บางครั้ง ขึ้นกับว่าเรื่องอะไร", traits: { trust: 1, boundaries: 1 } },
      { text: "ไม่ค่อย กลัวการตัดสินหรือโกรธ", traits: { empathy: 1 } },
    ],
  },
  {
    id: 16,
    code: "Q16",
    text: "ครอบครัวเราพักผ่อนด้วยกันบ่อยแค่ไหน?",
    choices: [
      { text: "ทุกสัปดาห์ มีช่วงเวลาครอบครัวประจำ", traits: { quality_time: 3, trust: 1 } },
      { text: "เดือนละครั้ง ออกไปทำกิจกรรม", traits: { quality_time: 2, growth: 1 } },
      { text: "นานๆ ครั้ง ตามโอกาส", traits: { quality_time: 1 } },
      { text: "ไม่ค่อยมีเวลาว่างพร้อมกัน", traits: { growth: 1 } },
    ],
  },
  {
    id: 17,
    code: "Q17",
    text: "เมื่อสมาชิกคนหนึ่งประสบความสำเร็จ ทุกคนจะ...?",
    choices: [
      { text: "ฉลองและแสดงความดีใจร่วมกัน", traits: { empathy: 3, quality_time: 2 } },
      { text: "ชื่นชมและให้กำลังใจต่อไป", traits: { empathy: 2, growth: 1 } },
      { text: "รับรู้และพยักหน้ายอมรับ", traits: { trust: 1 } },
      { text: "ต่างคนต่างรู้สึกในใจ", traits: { trust: 1 } },
    ],
  },
  {
    id: 18,
    code: "Q18",
    text: "ครอบครัวเราวางแผนอนาคตร่วมกันอย่างไร?",
    choices: [
      { text: "คุยและวางแผนด้วยกันเสมอ", traits: { communication: 3, trust: 2, growth: 2 } },
      { text: "บางเรื่องวางแผนร่วม บางเรื่องต่างคนต่างดู", traits: { trust: 1, boundaries: 1, growth: 1 } },
      { text: "แต่ละคนวางแผนชีวิตตัวเอง", traits: { boundaries: 2, growth: 1 } },
      { text: "ไม่ค่อยได้พูดถึงอนาคตร่วมกัน", traits: { communication: 0 } },
    ],
  },
  {
    id: 19,
    code: "Q19",
    text: "เมื่อมีสมาชิกใหม่ (หรือการเปลี่ยนแปลงใหญ่) ครอบครัวปรับตัวอย่างไร?",
    choices: [
      { text: "ช่วยกันปรับ พูดคุยและรับฟังกัน", traits: { communication: 2, empathy: 2, growth: 2 } },
      { text: "ให้เวลาและค่อยๆ ปรับกันเอง", traits: { trust: 2, boundaries: 1 } },
      { text: "แต่ละคนปรับตัวเอง ไม่ค่อยพูดถึง", traits: { boundaries: 2 } },
      { text: "ยากมาก ทุกคนรับมือต่างกัน", traits: { growth: 1 } },
    ],
  },
  {
    id: 20,
    code: "Q20",
    text: "ถ้าให้อธิบายครอบครัวในหนึ่งคำ คำไหนเหมาะที่สุด?",
    choices: [
      { text: "อบอุ่น – รู้สึกปลอดภัยเสมอ", traits: { trust: 2, empathy: 2, quality_time: 1 } },
      { text: "แข็งแกร่ง – ผ่านอะไรมาด้วยกันได้", traits: { growth: 3, trust: 1 } },
      { text: "อิสระ – ต่างคนต่างมีพื้นที่ของตัวเอง", traits: { boundaries: 3, growth: 1 } },
      { text: "เติบโต – เรียนรู้และพัฒนาตลอดเวลา", traits: { growth: 3, communication: 1 } },
    ],
  },
];

export default questions;

export function getQuestionByCode(code: string): Question | undefined {
  return questions.find((q) => q.code.toLowerCase() === code.toLowerCase());
}
