import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { TrendingUp, Users, Clock, Eye, BarChart3 } from "lucide-react";

export default function MetricCard({
  title,
  value,
  description,
  type,
  color,
  disabled,
  icon,
}) {
  const getColorClasses = (color, disabled) => {
    if (disabled) {
      return {
        bg: "bg-slate-100",
        iconBg: "bg-slate-200/60",
        iconColor: "text-slate-400",
        border: "border-slate-200/60",
        value: "text-slate-500",
        title: "text-slate-500",
      };
    }

    const colorMap = {
      blue: {
        bg: "bg-gradient-to-br from-blue-50/80 to-blue-100/50",
        iconBg: "bg-gradient-to-br from-blue-100 to-blue-200",
        iconColor: "text-blue-600",
        border: "border-blue-200/60",
        value: "text-blue-900",
        title: "text-blue-700",
      },
      green: {
        bg: "bg-gradient-to-br from-emerald-50/80 to-emerald-100/50",
        iconBg: "bg-gradient-to-br from-emerald-100 to-emerald-200",
        iconColor: "text-emerald-600",
        border: "border-emerald-200/60",
        value: "text-emerald-900",
        title: "text-emerald-700",
      },
      purple: {
        bg: "bg-gradient-to-br from-purple-50/80 to-purple-100/50",
        iconBg: "bg-gradient-to-br from-purple-100 to-purple-200",
        iconColor: "text-purple-600",
        border: "border-purple-200/60",
        value: "text-purple-900",
        title: "text-purple-700",
      },
    };

    return colorMap[color] || colorMap.blue;
  };

  const getIcon = (type) => {
    const iconMap = {
      visitors: <Users className="w-5 h-5" />,
      visit_duration: <Clock className="w-5 h-5" />,
      pageviews: <TrendingUp className="w-5 h-5" />,
    };
    return icon || iconMap[type] || <BarChart3 className="w-5 h-5" />;
  };

  const colorClasses = getColorClasses(color, disabled);

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-300 ${
        disabled
          ? "opacity-60 cursor-not-allowed"
          : "hover:shadow-lg hover:shadow-slate-200/40 hover:-translate-y-1 cursor-default"
      } bg-white/80 backdrop-blur-sm ${colorClasses.border} border shadow-sm`}
    >
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 ${colorClasses.bg} opacity-50`} />

      {/* Content */}
      <div className="relative">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardDescription
                className={`text-sm font-medium ${colorClasses.title}`}
              >
                {title}
              </CardDescription>
              <CardTitle
                className={`text-3xl font-bold tabular-nums ${colorClasses.value} tracking-tight`}
              >
                {disabled ? "—" : value}
              </CardTitle>
            </div>
            <div
              className={`p-3 ${
                colorClasses.iconBg
              } rounded-xl shadow-sm transition-transform duration-200 ${
                !disabled ? "hover:scale-110" : ""
              }`}
            >
              <div className={colorClasses.iconColor}>{getIcon(type)}</div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-2">
          <div className="flex items-center gap-2">
            <div
              className={`text-sm ${
                disabled ? "text-slate-400" : "text-slate-600"
              } leading-relaxed`}
            >
              {description}
            </div>
          </div>

          {disabled && (
            <div className="mt-3 px-3 py-2 bg-slate-100/80 rounded-lg border border-slate-200/60">
              <p className="text-xs text-slate-500 text-center">
                Create your portfolio to see analytics
              </p>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}
