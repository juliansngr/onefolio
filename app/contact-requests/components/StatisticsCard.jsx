import { Card, CardContent } from "@/components/ui/card";
import { Mail, MailOpen, Clock, CheckCircle } from "lucide-react";

export default function StatisticsCard({ title, value, type, color }) {
  const getIconAndColors = () => {
    switch (type) {
      case "total":
        return {
          icon: <Mail className="w-5 h-5" />,
          gradient: "from-blue-100 to-blue-200",
          iconColor: "text-blue-600",
          bgColor: "bg-blue-50/50",
        };
      case "unread":
        return {
          icon: <MailOpen className="w-5 h-5" />,
          gradient: "from-amber-100 to-amber-200",
          iconColor: "text-amber-600",
          bgColor: "bg-amber-50/50",
        };
      case "needs_reply":
        return {
          icon: <Clock className="w-5 h-5" />,
          gradient: "from-orange-100 to-orange-200",
          iconColor: "text-orange-600",
          bgColor: "bg-orange-50/50",
        };
      case "replied":
        return {
          icon: <CheckCircle className="w-5 h-5" />,
          gradient: "from-emerald-100 to-emerald-200",
          iconColor: "text-emerald-600",
          bgColor: "bg-emerald-50/50",
        };
      default:
        return {
          icon: <Mail className="w-5 h-5" />,
          gradient: "from-slate-100 to-slate-200",
          iconColor: "text-slate-600",
          bgColor: "bg-slate-50/50",
        };
    }
  };

  const { icon, gradient, iconColor, bgColor } = getIconAndColors();

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg shadow-slate-200/20 hover:shadow-xl hover:shadow-slate-200/30 transition-all duration-200 py-0">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-2xl font-bold text-slate-900 tabular-nums">
              {value}
            </p>
            <p className="text-sm font-medium text-slate-600">{title}</p>
          </div>
          <div
            className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center`}
          >
            <div className={iconColor}>{icon}</div>
          </div>
        </div>

        {/* Subtle background pattern */}
        <div
          className={`absolute inset-0 ${bgColor} opacity-20 rounded-xl pointer-events-none`}
        />
      </CardContent>
    </Card>
  );
}
