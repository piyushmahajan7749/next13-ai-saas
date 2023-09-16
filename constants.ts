import {
  TestTube2Icon,
  BarChart2,
  Users,
  Timer,
  MessageCircle,
  TestTubeIcon,
} from "lucide-react";

export const MAX_FREE_COUNTS = 5;

export const tools = [
  {
    label: "Superfan Screener",
    icon: Users,
    href: "/audience",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Automated Outreach",
    icon: Timer,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/campaign",
  },
  {
    label: "Response insights",
    icon: MessageCircle,
    href: "/leads",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Interview insights",
    icon: TestTube2Icon,
    href: "/leads",
    color: "text-zinc-500",
    bgColor: "text-zinc-500/10",
  },
];
