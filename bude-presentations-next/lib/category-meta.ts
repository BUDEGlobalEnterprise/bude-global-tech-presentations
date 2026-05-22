import {
  BookOpen,
  Boxes,
  Brain,
  Briefcase,
  Building2,
  Cloud,
  Code2,
  Cog,
  Database,
  Film,
  Gamepad2,
  Globe2,
  GraduationCap,
  Heart,
  Layers,
  Layout,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export interface CategoryMeta {
  label: string;
  icon: LucideIcon;
  hue: string; // tailwind gradient stops
}

const DEFAULT: CategoryMeta = {
  label: "More",
  icon: Sparkles,
  hue: "from-slate-500 to-zinc-500",
};

const REGISTRY: Record<string, CategoryMeta> = {
  frontend: { label: "Frontend", icon: Layout, hue: "from-sky-500 to-cyan-500" },
  backend: { label: "Backend", icon: Server, hue: "from-emerald-500 to-teal-500" },
  database: { label: "Databases", icon: Database, hue: "from-amber-500 to-orange-500" },
  programming: { label: "Languages", icon: Code2, hue: "from-fuchsia-500 to-pink-500" },
  devops: { label: "DevOps", icon: Cog, hue: "from-indigo-500 to-violet-500" },
  cloud: { label: "Cloud", icon: Cloud, hue: "from-sky-400 to-blue-500" },
  business: { label: "Business", icon: Building2, hue: "from-rose-500 to-red-500" },
  enterprise: { label: "Enterprise", icon: Briefcase, hue: "from-stone-500 to-zinc-500" },
  tools: { label: "Tools", icon: Wrench, hue: "from-yellow-500 to-amber-500" },
  security: { label: "Security", icon: ShieldCheck, hue: "from-red-500 to-rose-500" },
  "ai-data": { label: "AI & Data", icon: Brain, hue: "from-purple-500 to-fuchsia-500" },
  mobile: { label: "Mobile", icon: Smartphone, hue: "from-teal-500 to-cyan-500" },
  "app-development": { label: "App Dev", icon: Layers, hue: "from-cyan-500 to-sky-500" },
  "cross-platform": { label: "Cross-platform", icon: Boxes, hue: "from-violet-500 to-purple-500" },
  "web-development": { label: "Web", icon: Globe2, hue: "from-blue-500 to-indigo-500" },
  movie: { label: "Movies", icon: Film, hue: "from-pink-500 to-rose-500" },
  games: { label: "Games", icon: Gamepad2, hue: "from-lime-500 to-emerald-500" },
  personal: { label: "Personal", icon: Heart, hue: "from-rose-500 to-pink-500" },
  education: { label: "Education", icon: GraduationCap, hue: "from-indigo-500 to-purple-500" },
  research: { label: "Research", icon: BookOpen, hue: "from-fuchsia-500 to-violet-500" },
};

export function categoryMeta(key: string): CategoryMeta {
  return REGISTRY[key.toLowerCase()] ?? { ...DEFAULT, label: titlecase(key) };
}

function titlecase(s: string) {
  return s
    .split(/[-_\s]/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
    .join(" ");
}

/** Stable display order for category sections on the home page. */
export const CATEGORY_ORDER = [
  "programming",
  "frontend",
  "backend",
  "database",
  "devops",
  "cloud",
  "ai-data",
  "tools",
  "security",
  "mobile",
  "app-development",
  "cross-platform",
  "web-development",
  "business",
  "enterprise",
  "games",
  "movie",
  "education",
  "research",
  "personal",
];

export function sortCategories(keys: string[]) {
  const set = new Set(keys.map((k) => k.toLowerCase()));
  const ordered = CATEGORY_ORDER.filter((k) => set.has(k));
  const extras = [...set].filter((k) => !CATEGORY_ORDER.includes(k)).sort();
  return [...ordered, ...extras];
}
