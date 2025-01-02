import { useCounter } from "./useCounter";
import { Card, CardContent } from "@/components/ui/card";

export function MetricCard({
  value,
  label,
  icon: Icon,
  percentageChange,
  iconColor,
  suffix = "",
}) {
  const count = useCounter(value);

  return (
    <Card className="relative bg-white w-full shadow-md sm:flex-1 overflow-hidden hover:shadow-lg hover:scale-[1.01] transition-all cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1 text-start">
            <h3 className="text-2xl font-bold tracking-tight">
              {count.toLocaleString()}
              {suffix}
            </h3>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-xs text-muted-foreground">
              {percentageChange > 0 ? "+" : ""}
              {percentageChange}% from last month
            </p>
          </div>
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full ${iconColor}`}
          >
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
