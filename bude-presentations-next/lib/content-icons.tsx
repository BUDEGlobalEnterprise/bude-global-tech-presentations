import {
  Bot,
  Boxes,
  BookOpen,
  Brain,
  Bug,
  CheckCheck,
  CircuitBoard,
  Clock,
  Cloud,
  Code2,
  Cpu,
  Database,
  Eye,
  FileCode2,
  GitBranch,
  Github,
  Gauge,
  Hammer,
  Handshake,
  Lightbulb,
  Layers,
  Lock,
  Map as MapIcon,
  MessagesSquare,
  Puzzle,
  Radio,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  TriangleAlert,
  Users,
  Wifi,
  Workflow,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Named line icons authors can reference from slide JSON via an `icon`
 * field (on a slide header or a `box.list` item), instead of an emoji.
 * Keep the names short and stable — they're a content API.
 */
const ICONS: Record<string, LucideIcon> = {
  bot: Bot,
  boxes: Boxes,
  book: BookOpen,
  brain: Brain,
  bug: Bug,
  check: CheckCheck,
  "circuit-board": CircuitBoard,
  clock: Clock,
  cloud: Cloud,
  code: Code2,
  cpu: Cpu,
  database: Database,
  eye: Eye,
  file: FileCode2,
  gauge: Gauge,
  "git-branch": GitBranch,
  github: Github,
  hammer: Hammer,
  handshake: Handshake,
  idea: Lightbulb,
  layers: Layers,
  lock: Lock,
  map: MapIcon,
  chat: MessagesSquare,
  puzzle: Puzzle,
  radio: Radio,
  rocket: Rocket,
  search: Search,
  server: Server,
  shield: ShieldCheck,
  sparkles: Sparkles,
  target: Target,
  terminal: Terminal,
  warning: TriangleAlert,
  users: Users,
  wifi: Wifi,
  workflow: Workflow,
  wrench: Wrench,
  zap: Zap,
};

export function hasContentIcon(name?: string): boolean {
  return !!name && Object.prototype.hasOwnProperty.call(ICONS, name.toLowerCase());
}

export function ContentIcon({
  name,
  className,
}: {
  name?: string;
  className?: string;
}) {
  if (!name) return null;
  const Icon = ICONS[name.toLowerCase()];
  if (!Icon) return null;
  return <Icon className={className} aria-hidden strokeWidth={1.75} />;
}
