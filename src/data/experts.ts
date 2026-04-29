export interface Expert {
  id: string;
  name: string;
  nameEn: string;
  title: string;
  specialty: string[];
  categories: string[];
  rating: number;
  reviewCount: number;
  price: number; // per session (THB)
  image: string;
  experience: number; // years
  languages: string[];
  formats: ("online" | "onsite")[];
  location?: string;
  about: string;
  available: boolean;
  badge?: string;
}

export const EXPERT_CATEGORIES = [
  { id: "stress",       label: "ความเครียด / วิตกกังวล", icon: "🧠" },
  { id: "social",       label: "ภาวะสังคม",               icon: "🤝" },
  { id: "health",       label: "บุคลากรสุขภาพ",           icon: "🏥" },
  { id: "relationship", label: "ความสัมพันธ์",             icon: "💞" },
  { id: "children",     label: "เด็กและวัยรุ่น",           icon: "👧" },
  { id: "work",         label: "การเงิน / การทำงาน",       icon: "💼" },
  { id: "growth",       label: "การพัฒนาตนเอง",            icon: "🌱" },
  { id: "family",       label: "ครอบครัว / สุขภาพจิต",    icon: "🏠" },
];

export const EXPERTS: Expert[] = [
  {
    id: "1",
    name: "คุณณิชาภา วงศ์ไพศาล",
    nameEn: "Nichapa Wongpaisal",
    title: "นักจิตวิทยาคลินิก",
    specialty: ["ความวิตกกังวล", "ความสัมพันธ์", "ความเครียด"],
    categories: ["stress", "relationship"],
    rating: 4.9,
    reviewCount: 128,
    price: 900,
    image: "/images/experts/expert1.png",
    experience: 8,
    languages: ["ไทย", "English"],
    formats: ["online", "onsite"],
    about: "ผู้เชี่ยวชาญด้านจิตวิทยาคลินิกที่มีประสบการณ์กว่า 8 ปี เชี่ยวชาญด้านความวิตกกังวล ความสัมพันธ์ และการพัฒนาตนเอง ช่วยให้คุณค้นพบความสมดุลในชีวิตและเสริมสร้างความเข้มแข็งทางจิตใจ",
    available: true,
    badge: "แนะนำสำหรับคุณ",
  },
  {
    id: "2",
    name: "JaiSabai Center",
    nameEn: "JaiSabai Center",
    title: "ศูนย์ให้คำปรึกษาสุขภาพจิต",
    specialty: ["บำบัดพฤติกรรม", "ครอบครัว", "วัยรุ่น"],
    categories: ["children", "family"],
    rating: 4.7,
    reviewCount: 256,
    price: 1200,
    image: "/images/experts/expert2.png",
    experience: 12,
    languages: ["ไทย"],
    formats: ["online", "onsite"],
    location: "กรุงเทพฯ",
    about: "ศูนย์ให้คำปรึกษาด้านสุขภาพจิตที่มีทีมนักจิตวิทยาและจิตแพทย์ผู้เชี่ยวชาญ พร้อมให้บริการทั้งเด็ก วัยรุ่น และครอบครัว",
    available: true,
  },
  {
    id: "3",
    name: "คุณปรัลณา ศรีชัย",
    nameEn: "Panlana Srichai",
    title: "นักจิตวิทยาเด็กและวัยรุ่น",
    specialty: ["เด็กและวัยรุ่น", "การเรียนรู้", "ครอบครัว"],
    categories: ["children", "family"],
    rating: 4.8,
    reviewCount: 94,
    price: 800,
    image: "/images/experts/expert3.png",
    experience: 6,
    languages: ["ไทย"],
    formats: ["online"],
    about: "เชี่ยวชาญด้านจิตวิทยาเด็กและวัยรุ่น ช่วยเหลือปัญหาพฤติกรรม การเรียนรู้ และความสัมพันธ์ในครอบครัว",
    available: true,
  },
  {
    id: "4",
    name: "ดร.วิชัย สุขใจ",
    nameEn: "Dr. Wichai Sukjai",
    title: "จิตแพทย์",
    specialty: ["โรคซึมเศร้า", "ความวิตกกังวล", "ไบโพลาร์"],
    categories: ["stress", "health"],
    rating: 4.9,
    reviewCount: 312,
    price: 1500,
    image: "/images/experts/expert4.png",
    experience: 15,
    languages: ["ไทย", "English"],
    formats: ["online", "onsite"],
    location: "กรุงเทพฯ",
    about: "จิตแพทย์ผู้เชี่ยวชาญโรคซึมเศร้า วิตกกังวล และไบโพลาร์ ด้วยประสบการณ์กว่า 15 ปี",
    available: false,
    badge: "จิตแพทย์",
  },
  {
    id: "5",
    name: "คุณมินตรา ลีลาวดี",
    nameEn: "Mintra Leelavadee",
    title: "นักจิตวิทยาองค์กร",
    specialty: ["ความเครียดในที่ทำงาน", "การพัฒนาตนเอง", "Burnout"],
    categories: ["work", "growth", "stress"],
    rating: 4.6,
    reviewCount: 67,
    price: 750,
    image: "/images/experts/expert5.png",
    experience: 5,
    languages: ["ไทย", "English"],
    formats: ["online"],
    about: "ผู้เชี่ยวชาญด้านจิตวิทยาองค์กร ช่วยรับมือกับความเครียดในที่ทำงาน และพัฒนาศักยภาพของตัวเอง",
    available: true,
  },
  {
    id: "6",
    name: "ดร.พิมพ์ชนก สุวรรณ",
    nameEn: "Dr. Pimchanok Suwan",
    title: "นักจิตวิทยาคลินิก (ความสัมพันธ์)",
    specialty: ["ความสัมพันธ์คู่รัก", "การสื่อสาร", "ครอบครัว"],
    categories: ["relationship", "family"],
    rating: 4.8,
    reviewCount: 143,
    price: 1100,
    image: "/images/experts/expert6.png",
    experience: 10,
    languages: ["ไทย"],
    formats: ["online", "onsite"],
    location: "กรุงเทพฯ",
    about: "ผู้เชี่ยวชาญด้านความสัมพันธ์และการสื่อสารในครอบครัว เชี่ยวชาญด้านการบำบัดคู่รักและการไกล่เกลี่ยในครอบครัว",
    available: true,
    badge: "ยอดนิยม",
  },
  {
    id: "7",
    name: "คุณสิรีธร ประพันธ์",
    nameEn: "Sireethon Praphan",
    title: "นักบำบัดด้วยศิลปะ",
    specialty: ["Art Therapy", "ความวิตกกังวล", "เด็กพิเศษ"],
    categories: ["children", "stress"],
    rating: 4.7,
    reviewCount: 89,
    price: 850,
    image: "/images/experts/expert7.png",
    experience: 7,
    languages: ["ไทย"],
    formats: ["onsite"],
    location: "เชียงใหม่",
    about: "นักบำบัดด้วยศิลปะที่เชี่ยวชาญในการช่วยเด็กและวัยรุ่นที่มีความวิตกกังวลและเด็กที่มีความต้องการพิเศษ",
    available: true,
  },
  {
    id: "8",
    name: "คุณธนพล วัฒนกิจ",
    nameEn: "Thanaphon Wattanakij",
    title: "นักจิตวิทยาด้านการนอน",
    specialty: ["นอนไม่หลับ", "ความเครียด", "สุขภาพจิต"],
    categories: ["health", "stress"],
    rating: 4.5,
    reviewCount: 52,
    price: 800,
    image: "/images/experts/expert8.png",
    experience: 4,
    languages: ["ไทย", "English"],
    formats: ["online"],
    about: "ผู้เชี่ยวชาญด้านการนอนหลับและสุขภาพจิต ช่วยแก้ปัญหานอนไม่หลับและพัฒนาคุณภาพการนอน",
    available: true,
  },
  {
    id: "9",
    name: "รศ.ดร.อัจฉรา นิรันดร์",
    nameEn: "Assoc. Prof. Ajchara Niran",
    title: "จิตแพทย์เด็กและวัยรุ่น",
    specialty: ["ADHD", "ออทิสติก", "วัยรุ่น", "ครอบครัว"],
    categories: ["children", "family"],
    rating: 4.9,
    reviewCount: 201,
    price: 1800,
    image: "/images/experts/expert9.png",
    experience: 18,
    languages: ["ไทย", "English"],
    formats: ["online", "onsite"],
    location: "กรุงเทพฯ",
    about: "รองศาสตราจารย์และจิตแพทย์เด็กและวัยรุ่นที่มีประสบการณ์กว่า 18 ปี เชี่ยวชาญด้าน ADHD, ออทิสติก และสุขภาพจิตวัยรุ่น",
    available: true,
    badge: "ผู้เชี่ยวชาญพิเศษ",
  },
  {
    id: "10",
    name: "คุณวรัญญา เพชรรัตน์",
    nameEn: "Waranya Petcharat",
    title: "นักจิตวิทยาการเงิน",
    specialty: ["ความเครียดทางการเงิน", "การตัดสินใจ", "Work-Life Balance"],
    categories: ["work", "growth"],
    rating: 4.7,
    reviewCount: 78,
    price: 900,
    image: "/images/experts/expert10.png",
    experience: 6,
    languages: ["ไทย"],
    formats: ["online"],
    about: "นักจิตวิทยาที่เชี่ยวชาญด้านความเครียดทางการเงินและการตัดสินใจ ช่วยให้คุณหาความสมดุลระหว่างชีวิตและการทำงาน",
    available: true,
  },
];

export const MOCK_REVIEWS = [
  { id: "r1", expertId: "1", author: "Ammie", rating: 5, date: "2 สัปดาห์ที่แล้ว", text: "พนักงานดีใจที่ได้มาปรึกษา ไม่ได้เป็นแค่การฟัง แต่ยังให้คำแนะนำที่ปฏิบัติได้จริง ทำให้รู้สึกดีขึ้นมาก", avatar: "A" },
  { id: "r2", expertId: "1", author: "Kritsada", rating: 5, date: "1 เดือนที่แล้ว", text: "ช่วยให้เข้าใจตัวเองและวิธีการจัดการกับความกังวลได้ดีขึ้นมาก แนะนำครับ", avatar: "K" },
  { id: "r3", expertId: "1", author: "Mildd", rating: 4, date: "2 เดือนที่แล้ว", text: "บรรยากาศการพูดคุยดีมาก รู้สึกปลอดภัยที่จะแบ่งปันความรู้สึก", avatar: "M" },
];

export const MOCK_APPOINTMENTS = [
  {
    id: "a1", expertId: "1", date: "14 พ.ค. 2568", time: "14:00 - 15:00 น.",
    format: "ออนไลน์", status: "confirmed", price: 900,
  },
  {
    id: "a2", expertId: "2", date: "28 เม.ย. 2568", time: "19:00 น.",
    format: "ตัวต่อตัว", status: "completed", price: 1200,
    location: "JaiSabai Center",
  },
];

export function getExpertById(id: string): Expert | undefined {
  return EXPERTS.find((e) => e.id === id);
}

export function searchExperts(query: string, category?: string): Expert[] {
  return EXPERTS.filter((e) => {
    const matchQ = !query || e.name.includes(query) || e.specialty.some((s) => s.includes(query));
    const matchC = !category || e.categories.includes(category);
    return matchQ && matchC;
  });
}
