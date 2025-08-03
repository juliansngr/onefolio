import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  TrendingUp,
  Users,
  Clock,
  Target,
  ExternalLink,
  Calendar,
  Home,
  Pencil,
  ChartNoAxesColumn,
  Link as LinkIcon,
  Crown,
  Globe,
  Mail,
  Folder,
  Edit,
} from "lucide-react";
import Image from "next/image";

export default function DashboardDemo() {
  return (
    <section className="py-20 bg-white/50 backdrop-blur-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <Badge className="bg-green-100 text-green-700 border-green-200 mb-4 hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-3 h-3 mr-1" />
            Demo Experience
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Portfolio Management{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Made Simple
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Creating and managing a portfolio has never been easier. Experience
            intuitive design, powerful analytics, and seamless workflow.
          </p>
        </div>

        {/* Dashboard Demo */}
        <div className="h-[400px] md:h-[600px] bg-gradient-to-br from-slate-50 via-white to-slate-100 rounded-2xl border border-slate-200/60 shadow-xl overflow-hidden flex relative">
          {/* Mobile: Hide sidebar on screens smaller than lg */}
          {/* Fade-out Overlay am unteren Rand */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-100 to-transparent z-30 pointer-events-none"></div>
          {/* Demo Sidebar - Hidden on mobile, visible on lg+ */}
          <div className="hidden lg:flex w-64 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-r border-slate-200/60 flex-col">
            {/* Sidebar Header */}
            <div className="border-b border-slate-200/60 bg-white/80 backdrop-blur-sm p-4">
              <div className="flex items-center gap-3">
                <div className="flex aspect-square size-10 items-center justify-center rounded-xl shadow-lg shadow-slate-200/40 overflow-hidden">
                  <Image
                    src="/images/onefolio-main-icon.webp"
                    alt="onefol.io"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="font-bold text-slate-900 text-base">
                    onefol.io
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Portfolio Builder
                  </span>
                </div>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 px-3 py-4 space-y-6">
              {/* Workspace Section */}
              <div>
                <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3 px-3">
                  Workspace
                </div>
                <div className="space-y-1">
                  {/* Dashboard - Active */}
                  <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 border border-indigo-200 shadow-sm rounded-lg relative">
                    <div className="flex items-start gap-3 px-3 py-3">
                      <Home className="size-5 text-indigo-600 mt-0.5" />
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <div className="font-medium text-sm leading-tight">
                          Dashboard
                        </div>
                        <div className="text-xs leading-relaxed text-indigo-600/70">
                          Overview & analytics
                        </div>
                      </div>
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-indigo-600 to-indigo-700 rounded-full" />
                    </div>
                  </div>
                  {/* Editor */}
                  <div className="hover:bg-slate-100/60 text-slate-700 rounded-lg">
                    <div className="flex items-start gap-3 px-3 py-3">
                      <Pencil className="size-5 text-slate-500 mt-0.5" />
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <div className="font-medium text-sm leading-tight">
                          Editor
                        </div>
                        <div className="text-xs leading-relaxed text-slate-500">
                          Build your portfolio
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tools Section */}
              <div>
                <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3 px-3">
                  Tools
                </div>
                <div className="space-y-1">
                  {/* Analytics */}
                  <div className="hover:bg-purple-50/60 text-slate-600 rounded-lg opacity-75">
                    <div className="flex items-start gap-3 px-3 py-3">
                      <ChartNoAxesColumn className="size-5 text-purple-500 mt-0.5" />
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <div className="flex items-center justify-between gap-2 pr-3">
                          <div className="font-medium text-sm leading-tight">
                            Analytics
                          </div>
                          <Badge className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 border-purple-200 text-xs font-medium">
                            <Crown className="w-3 h-3 mr-1" />
                            Pro
                          </Badge>
                        </div>
                        <div className="text-xs leading-relaxed text-purple-500/70">
                          Visitor insights
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Contact Requests */}
                  <div className="hover:bg-slate-100/60 text-slate-700 rounded-lg">
                    <div className="flex items-start gap-3 px-3 py-3">
                      <Mail className="size-5 text-slate-500 mt-0.5" />
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <div className="font-medium text-sm leading-tight">
                          Contact Requests
                        </div>
                        <div className="text-xs leading-relaxed text-slate-500">
                          Messages from visitors
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Tracking */}
                  <div className="hover:bg-purple-50/60 text-slate-600 rounded-lg opacity-75">
                    <div className="flex items-start gap-3 px-3 py-3">
                      <LinkIcon className="size-5 text-purple-500 mt-0.5" />
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <div className="flex items-center justify-between gap-2 pr-3">
                          <div className="font-medium text-sm leading-tight">
                            Tracking
                          </div>
                          <Badge className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 border-purple-200 text-xs font-medium">
                            <Crown className="w-3 h-3 mr-1" />
                            Pro
                          </Badge>
                        </div>
                        <div className="text-xs leading-relaxed text-purple-500/70">
                          Link performance
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Configuration Section */}
              <div>
                <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3 px-3">
                  Configuration
                </div>
                <div className="space-y-1">
                  {/* Domains */}
                  <div className="hover:bg-purple-50/60 text-slate-600 rounded-lg opacity-75">
                    <div className="flex items-start gap-3 px-3 py-3">
                      <Globe className="size-5 text-purple-500 mt-0.5" />
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <div className="flex items-center justify-between gap-2 pr-3">
                          <div className="font-medium text-sm leading-tight">
                            Domains
                          </div>
                          <Badge className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 border-purple-200 text-xs font-medium">
                            <Crown className="w-3 h-3 mr-1" />
                            Pro
                          </Badge>
                        </div>
                        <div className="text-xs leading-relaxed text-purple-500/70">
                          Custom domain setup
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Footer */}
            <div className="border-t border-slate-200/60 bg-white/80 backdrop-blur-sm p-3">
              <div className="flex items-center gap-3 p-2 hover:bg-slate-100/60 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  A
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-slate-900 truncate">
                    Alex Miller
                  </div>
                  <div className="text-xs text-slate-500 truncate">
                    alex@example.com
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="flex-1 flex flex-col">
            {/* Dashboard Header */}
            <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-40">
              <div className="mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-slate-900">
                        Welcome back, Alex! 👋
                      </h1>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1">
                        <p className="text-xs sm:text-sm text-slate-600">
                          Here's how your portfolio is performing.
                        </p>
                        <div className="hidden sm:flex items-center gap-2">
                          <span className="text-xs sm:text-sm text-slate-600">
                            Your site is live at
                          </span>
                          <span className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium transition-colors group text-xs sm:text-sm">
                            onefol.io/u/alex
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Dashboard Content */}
            <div className="mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 xl:py-8 overflow-x-auto">
              <div className="space-y-4 xl:space-y-8">
                {/* Analytics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 xl:gap-6">
                  {/* Total Views Card */}
                  <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/40 hover:-translate-y-1 cursor-default bg-white/80 backdrop-blur-sm border-blue-200/60 border shadow-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-blue-100/50 opacity-50" />
                    <div className="relative">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <CardDescription className="text-sm font-medium text-blue-700">
                              Total Views
                            </CardDescription>
                            <CardTitle className="text-2xl sm:text-3xl font-bold tabular-nums text-blue-900 tracking-tight">
                              2,847
                            </CardTitle>
                          </div>
                          <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-sm transition-transform duration-200 hover:scale-110">
                            <div className="text-blue-600">
                              <TrendingUp className="w-5 h-5" />
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-slate-600 leading-relaxed">
                            Portfolio views for the last 7 days
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>

                  {/* Unique Visitors Card */}
                  <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/40 hover:-translate-y-1 cursor-default bg-white/80 backdrop-blur-sm border-emerald-200/60 border shadow-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 to-emerald-100/50 opacity-50" />
                    <div className="relative">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <CardDescription className="text-sm font-medium text-emerald-700">
                              Unique Visitors
                            </CardDescription>
                            <CardTitle className="text-3xl font-bold tabular-nums text-emerald-900 tracking-tight">
                              1,249
                            </CardTitle>
                          </div>
                          <div className="p-3 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl shadow-sm transition-transform duration-200 hover:scale-110">
                            <div className="text-emerald-600">
                              <Users className="w-5 h-5" />
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-slate-600 leading-relaxed">
                            Visitors for the last 7 days
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>

                  {/* Average View Duration Card */}
                  <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/40 hover:-translate-y-1 cursor-default bg-white/80 backdrop-blur-sm border-purple-200/60 border shadow-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 to-purple-100/50 opacity-50" />
                    <div className="relative">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <CardDescription className="text-sm font-medium text-purple-700">
                              Average View Duration
                            </CardDescription>
                            <CardTitle className="text-3xl font-bold tabular-nums text-purple-900 tracking-tight">
                              2m 34s
                            </CardTitle>
                          </div>
                          <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl shadow-sm transition-transform duration-200 hover:scale-110">
                            <div className="text-purple-600">
                              <Clock className="w-5 h-5" />
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-slate-600 leading-relaxed">
                            Average time spent on your portfolio
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </div>

                {/* Portfolio Status & Premium Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 xl:gap-6">
                  <div className="lg:col-span-2">
                    {/* Portfolio Status Card */}
                    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg shadow-slate-200/20 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/30 py-0">
                      <div className="relative overflow-hidden py-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-50/80 to-amber-100/50 opacity-60" />
                        <CardHeader className="relative">
                          <CardTitle className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 shadow-sm">
                              <Target className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                              <span className="text-slate-900">
                                Portfolio Status
                              </span>
                              <div className="inline-flex items-center ml-3 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200">
                                86% Complete
                              </div>
                            </div>
                          </CardTitle>
                          <CardDescription className="text-slate-600 leading-relaxed">
                            Almost there! Just a few more widgets to go.
                            High-performing portfolios typically contain at
                            least 7 widgets.
                          </CardDescription>
                        </CardHeader>
                      </div>

                      <CardContent className="space-y-6 pb-6">
                        {/* Progress Section */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-sm">
                            <span className="font-medium text-slate-700">
                              Completion Progress
                            </span>
                            <span className="font-bold text-amber-600">
                              86%
                            </span>
                          </div>
                          <div className="relative">
                            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                                style={{ width: "86%" }}
                              ></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                            <span>Target: 7 widgets</span>
                            <span>•</span>
                            <span>Current: 6 widgets</span>
                          </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/60">
                            <div className="flex items-center gap-2 mb-2">
                              <Folder className="w-4 h-4 text-slate-600" />
                              <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                                Total Widgets
                              </span>
                            </div>
                            <span className="text-2xl font-bold text-slate-900">
                              6
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
                              Today
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                          <Button className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-lg shadow-indigo-200/50 transition-all duration-200 hover:scale-[1.02]">
                            <Edit className="w-4 h-4 mr-2" />
                            Continue Editing
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1 bg-white/80 border-slate-300 hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-all duration-200 hover:scale-[1.02]"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Live Site
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="lg:col-span-1">
                    {/* Recent Messages Card */}
                    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg shadow-slate-200/20 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/30 h-fit">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 xl:gap-3">
                            <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 shadow-sm">
                              <Mail className="w-5 h-5 text-indigo-600" />
                            </div>
                            <CardTitle className="text-slate-900 text-md xl:text-lg leading-none">
                              Recent Messages
                            </CardTitle>
                          </div>
                          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200 whitespace-nowrap">
                            3 new
                          </div>
                        </div>
                        <CardDescription className="text-slate-600 leading-relaxed mt-2">
                          Latest contact requests from your portfolio visitors
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Message 1 */}
                        <div className="flex items-start gap-3 p-3 bg-slate-50/80 rounded-xl border border-slate-200/60 hover:bg-slate-100/60 transition-colors">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                            S
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium text-sm text-slate-900 truncate">
                                Sarah Chen
                              </p>
                              <span className="text-xs text-slate-500">
                                2h ago
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 line-clamp-2">
                              Hi! I loved your portfolio. Would you be
                              interested in a freelance project?
                            </p>
                          </div>
                        </div>

                        {/* Message 2 */}
                        <div className="flex items-start gap-3 p-3 bg-slate-50/80 rounded-xl border border-slate-200/60 hover:bg-slate-100/60 transition-colors">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                            M
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium text-sm text-slate-900 truncate">
                                Mike Johnson
                              </p>
                              <span className="text-xs text-slate-500">
                                1d ago
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 line-clamp-2">
                              Great work! Could we schedule a call to discuss a
                              potential collaboration?
                            </p>
                          </div>
                        </div>

                        {/* Message 3 */}
                        <div className="flex items-start gap-3 p-3 bg-slate-50/80 rounded-xl border border-slate-200/60 hover:bg-slate-100/60 transition-colors">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                            L
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium text-sm text-slate-900 truncate">
                                Lisa Martinez
                              </p>
                              <span className="text-xs text-slate-500">
                                3d ago
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 line-clamp-2">
                              Impressive portfolio! We have an opening that
                              might interest you.
                            </p>
                          </div>
                        </div>

                        {/* View All Button */}
                        <Button
                          variant="outline"
                          className="w-full mt-4 bg-white/80 border-slate-300 hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-all duration-200"
                          size="sm"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          View All Messages
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
