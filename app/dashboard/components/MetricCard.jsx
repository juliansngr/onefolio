import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MousePointer, UserRound, ClockPlus, Eye } from "lucide-react";

export default function MetricCard({
  title,
  value,
  description,
  type,
  color,
  disabled,
}) {
  return (
    <Card className={`@container/card gap-2 ${disabled ? "opacity-50" : ""}`}>
      <CardHeader className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <CardDescription className="flex items-center gap-1">
            {title}
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {value}
          </CardTitle>
        </div>
        <div
          className={`p-3 bg-${color}-50 rounded-full ${
            disabled ? "opacity-50" : ""
          }`}
        >
          {type === "visitors" ? (
            <Eye className={`w-6 h-6 text-${color}-600`} />
          ) : type === "visit_duration" ? (
            <ClockPlus className={`w-6 h-6 text-${color}-600`} />
          ) : (
            <Eye className={`w-6 h-6 text-${color}-600`} />
          )}
        </div>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="text-muted-foreground">{description}</div>
      </CardFooter>
    </Card>
  );
}
