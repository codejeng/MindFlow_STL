export type JohariDimension = "openness" | "empathy" | "selfClarity";

export interface ReflectionTag {
  id: string;
  label: string;
  color: string;
  bg: string;
  dimension: JohariDimension | null;
  weight: number;
}

export const REFLECTION_TAGS: ReflectionTag[] = [
  { id: "open",     label: "เปิดใจ",      color: "#3D8B5E", bg: "#EAF7EE", dimension: "openness", weight: 1 },
  { id: "honest",   label: "ซื่อสัตย์",    color: "#C07A1A", bg: "#FEF6E5", dimension: "selfClarity", weight: 1 },
  { id: "serious",  label: "จริงจัง",      color: "#2C6FAC", bg: "#E8F1FA", dimension: "selfClarity", weight: 1 },
  { id: "empathy",  label: "เข้าใจผู้อื่น",  color: "#D48A5B", bg: "#FDEFEA", dimension: "empathy", weight: 1 },
  { id: "caring",   label: "ห่วงใย",      color: "#D45B90", bg: "#FDEAFA", dimension: "empathy", weight: 1 },
  { id: "oppose",   label: "หักล้าง",      color: "#D45B5B", bg: "#FDECEA", dimension: "empathy", weight: -1 },
  { id: "avoid",    label: "หลีกเลี่ยง",   color: "#8A4E8A", bg: "#F6EDF6", dimension: "openness", weight: -1 },
  { id: "confuse",  label: "สับสน",       color: "#6B7280", bg: "#F3F4F6", dimension: "selfClarity", weight: -1 },
  { id: "other",    label: "อื่นๆ",       color: "#7A6248", bg: "#F9F5F0", dimension: null, weight: 0 },
];
