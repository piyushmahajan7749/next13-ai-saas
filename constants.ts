import {
  TestTube2Icon,
  BarChart2,
  Users,
  MessageSquare,
  MessageCircle,
  Timer,
} from "lucide-react";

export const MAX_FREE_COUNTS = 5;

export const tools = [
  {
    label: "Audiences",
    icon: Users,
    href: "/audience",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Automation",
    icon: Timer,
    href: "/automation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Messages",
    icon: MessageCircle,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/messages",
  },
];
