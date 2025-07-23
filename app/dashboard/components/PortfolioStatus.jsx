import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  CheckCircle,
  ExternalLink,
  Edit,
  Target,
  Calendar,
  Layers3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export default function PortfolioStatus({
  progress,
  totalWidgets,
  lastUpdated,
  portfolioId,
  username,
}) {
  const getStatusColor = (progress) => {
    if (progress >= 100) return "emerald";
    if (progress >= 70) return "amber";
    return "slate";
  };

  const getStatusMessage = (progress) => {
    if (progress >= 100) return "Your portfolio is complete! 🎉";
    if (progress >= 70) return "Almost there! Just a few more widgets to go.";
    return "Keep adding widgets to improve your portfolio.";
  };

  const statusColor = getStatusColor(progress);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg shadow-slate-200/20 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/30">
      {/* Header with gradient background */}
      <div className="relative overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${
            statusColor === "emerald"
              ? "from-emerald-50/80 to-emerald-100/50"
              : statusColor === "amber"
              ? "from-amber-50/80 to-amber-100/50"
              : "from-slate-50/80 to-slate-100/50"
          } opacity-60`}
        />

        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl ${
                statusColor === "emerald"
                  ? "bg-gradient-to-br from-emerald-100 to-emerald-200"
                  : statusColor === "amber"
                  ? "bg-gradient-to-br from-amber-100 to-amber-200"
                  : "bg-gradient-to-br from-slate-100 to-slate-200"
              } shadow-sm`}
            >
              <Target
                className={`w-5 h-5 ${
                  statusColor === "emerald"
                    ? "text-emerald-600"
                    : statusColor === "amber"
                    ? "text-amber-600"
                    : "text-slate-600"
                }`}
              />
            </div>
            <div>
              <span className="text-slate-900">Portfolio Status</span>
              <div
                className={`inline-flex items-center ml-3 px-2.5 py-1 rounded-full text-xs font-medium ${
                  statusColor === "emerald"
                    ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                    : statusColor === "amber"
                    ? "bg-amber-100 text-amber-700 border border-amber-200"
                    : "bg-slate-100 text-slate-700 border border-slate-200"
                }`}
              >
                {progress}% Complete
              </div>
            </div>
          </CardTitle>
          <CardDescription className="text-slate-600 leading-relaxed">
            {getStatusMessage(progress)} High-performing portfolios typically
            contain at least 7 widgets.
          </CardDescription>
        </CardHeader>
      </div>

      <CardContent className="space-y-6">
        {/* Progress Section */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-slate-700">
              Completion Progress
            </span>
            <span
              className={`font-bold ${
                statusColor === "emerald"
                  ? "text-emerald-600"
                  : statusColor === "amber"
                  ? "text-amber-600"
                  : "text-slate-600"
              }`}
            >
              {progress}%
            </span>
          </div>
          <div className="relative">
            <Progress
              value={progress}
              className={`h-3 bg-slate-100 ${
                statusColor === "emerald"
                  ? "[&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:to-emerald-600"
                  : statusColor === "amber"
                  ? "[&>div]:bg-gradient-to-r [&>div]:from-amber-500 [&>div]:to-amber-600"
                  : "[&>div]:bg-gradient-to-r [&>div]:from-slate-400 [&>div]:to-slate-500"
              }`}
            />
            {progress >= 100 && (
              <CheckCircle className="absolute -right-1 -top-0.5 w-4 h-4 text-emerald-600" />
            )}
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <span>Target: 7 widgets</span>
            <span>•</span>
            <span>Current: {totalWidgets} widgets</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/60">
            <div className="flex items-center gap-2 mb-2">
              <Layers3 className="w-4 h-4 text-slate-600" />
              <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                Total Widgets
              </span>
            </div>
            <span className="text-2xl font-bold text-slate-900">
              {totalWidgets}
            </span>
          </div>
          <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/60">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-slate-600" />
              <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                Last Updated
              </span>
            </div>
            <span className="text-sm font-semibold text-slate-900">
              {lastUpdated}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-lg shadow-indigo-200/50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            asChild
          >
            <Link href={`/editor/${portfolioId}`}>
              <Edit className="w-4 h-4 mr-2" />
              Continue Editing
            </Link>
          </Button>
          <Button
            variant="outline"
            className="flex-1 bg-white/80 border-slate-300 hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            asChild
          >
            <Link
              href={`https://onefol.io/u/${username}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Live Site
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
