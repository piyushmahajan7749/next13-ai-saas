import {  TestTube2Icon, BarChart2, Users } from "lucide-react";

export const MAX_FREE_COUNTS = 5;

export const tools = [
  {
    label: 'Audiences',
    icon: Users,
    href: '/audience',
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: 'Campaigns',
    icon: TestTube2Icon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: '/campaign',
  },
  {
    label: 'Leads',
    icon: BarChart2,
    href: '/leads',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
];
