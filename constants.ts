import {
  TestTube2Icon,
  BarChart2,
  Users,
  Timer,
  MessageCircle,
  TestTubeIcon,
  Target,
  Presentation,
  LayoutDashboard,
  Scroll,
} from "lucide-react";

export const MAX_FREE_COUNTS = 5;

export const tools = [
  {
    label: "Superfan Screener",
    icon: Users,
    href: "/screener",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Habit Designer",
    icon: Target,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/habit",
  },
  {
    label: "Storyboard Crafter",
    icon: Presentation,
    href: "/storyboard",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Playtest Planner",
    icon: LayoutDashboard,
    href: "/playtest",
    color: "text-zinc-500",
    bgColor: "text-zinc-500/10",
  },
  {
    label: "Brief Builder",
    icon: Scroll,
    href: "/brief",
    color: "text-zinc-500",
    bgColor: "text-zinc-500/10",
  },
];
