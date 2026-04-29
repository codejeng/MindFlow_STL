export interface ReflectionTag {
  id: string;
  label: string;
  emoji: string;
  color: string;
  bg: string;
}

export const REFLECTION_TAGS: ReflectionTag[] = [
  { id: "open",       label: "เปิดใจ",           emoji: "💚", color: "#3D8B5E", bg: "#EAF7EE" },
  { id: "serious",    label: "จริงจัง",           emoji: "💙", color: "#2C6FAC", bg: "#E8F1FA" },
  { id: "moderate",   label: "ประมาณตัวเอง",      emoji: "🌿", color: "#5A7A45", bg: "#EDF4E6" },
  { id: "honest",     label: "ซื่อสัตย์",         emoji: "⭐", color: "#C07A1A", bg: "#FEF6E5" },
  { id: "expressive", label: "แสดงความรู้สึก",    emoji: "💛", color: "#B07A15", bg: "#FDF6DF" },
  { id: "avoidant",   label: "หลีกเลี่ยง",        emoji: "🌸", color: "#8A4E8A", bg: "#F6EDF6" },
  { id: "unsure",     label: "ไม่แน่ใจ",          emoji: "🌫️", color: "#6B7280", bg: "#F3F4F6" },
  { id: "curious",    label: "อยากรู้อยากเห็น",   emoji: "🔍", color: "#2E7D9A", bg: "#E6F3F8" },
];
