
import { ChartNoAxesColumnDecreasing,Video,Calendar } from "lucide-react";

export const metrics = [
    {
      value: 50000,
      suffix: "K",
      label: "Total Sessions",
      icon: Video,
      percentageChange: 2.5,
      iconColor: "bg-purple-600",
    },
    {
      value: 1000,
      suffix: "K",
      label: "Total Events",
      icon: Calendar,
      percentageChange: 3.3,
      iconColor: "bg-orange-400",
    },
    {
      value: 100000,
      suffix: "K",
      label: "Users",
      icon: ChartNoAxesColumnDecreasing,
      percentageChange: 3.1,
      iconColor: "bg-teal-500",
    },
  ];