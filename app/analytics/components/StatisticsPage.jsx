"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  Eye,
  Users,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  MapPin,
  Share2,
  MousePointer,
  Calendar,
  Activity,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function StatisticsPage({ className }) {
  const [timeRange, setTimeRange] = useState("7d");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/plausible?range=${timeRange}`);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch analytics data:", error);
        setData({
          pageViews: 0,
          visitors: 0,
          avgVisitDuration: 0,
          chartData: [],
          deviceData: [],
          browserData: [],
          countryData: [],
          sourceData: [],
          pageData: [],
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  const formatTime = (seconds) => {
    if (!seconds) return "0m 00s";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}m ${sec.toString().padStart(2, "0")}s`;
  };

  const formatNumber = (num) => {
    if (!num) return "0";
    return new Intl.NumberFormat().format(Math.round(num));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-slate-600">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-lg">Loading analytics...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-8", className)}>
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-48 bg-white/80 border-slate-200 focus:border-slate-400 focus:ring-slate-400">
              <Calendar className="w-4 h-4 mr-2 text-slate-500" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white/95 backdrop-blur-md border-slate-200/60">
              <SelectItem value="1d">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="12mo">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg shadow-slate-200/20 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/30 py-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Total Views
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {formatNumber(data?.pageViews)}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <Eye className="w-4 h-4 text-slate-500 mr-2" />
              <span className="text-sm text-slate-600 font-medium">
                total page views
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg shadow-slate-200/20 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/30 py-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Unique Visitors
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {formatNumber(data?.visitors)}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <Users className="w-4 h-4 text-slate-500 mr-2" />
              <span className="text-sm text-slate-600 font-medium">
                unique visitors
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg shadow-slate-200/20 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/30 py-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Avg. Session
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {formatTime(data?.avgVisitDuration)}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <Activity className="w-4 h-4 text-slate-500 mr-2" />
              <span className="text-sm text-slate-600 font-medium">
                engagement time
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="inline-flex h-12 items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-lg shadow-slate-200/20 p-1.5 text-slate-500 w-full">
          <TabsTrigger
            value="overview"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-100 data-[state=active]:to-slate-50 data-[state=active]:text-slate-900 data-[state=active]:shadow-sm data-[state=active]:shadow-slate-200/50 text-slate-600 hover:text-slate-900 hover:bg-slate-50/50 flex-1"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="audience"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-100 data-[state=active]:to-slate-50 data-[state=active]:text-slate-900 data-[state=active]:shadow-sm data-[state=active]:shadow-slate-200/50 text-slate-600 hover:text-slate-900 hover:bg-slate-50/50 flex-1"
          >
            Audience
          </TabsTrigger>
          <TabsTrigger
            value="traffic"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-100 data-[state=active]:to-slate-50 data-[state=active]:text-slate-900 data-[state=active]:shadow-sm data-[state=active]:shadow-slate-200/50 text-slate-600 hover:text-slate-900 hover:bg-slate-50/50 flex-1"
          >
            Traffic
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg shadow-slate-200/20 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl flex items-center justify-center">
                      <Activity className="w-5 h-5 text-indigo-600" />
                    </div>
                    <span className="text-slate-900">Traffic Over Time</span>
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Daily breakdown of views and visitors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={data?.chartData || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "1px solid #e2e8f0",
                          borderRadius: "12px",
                          backdropFilter: "blur(12px)",
                        }}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="views"
                        stackId="1"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.6}
                        name="Page Views"
                      />
                      <Area
                        type="monotone"
                        dataKey="visitors"
                        stackId="2"
                        stroke="#10B981"
                        fill="#10B981"
                        fillOpacity={0.6}
                        name="Unique Visitors"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg shadow-slate-200/20 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="text-slate-900">Device Types</span>
                </CardTitle>
                <CardDescription className="text-slate-600">
                  How visitors access your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data?.deviceData || []}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {(data?.deviceData || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Percentage"]}
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "1px solid #e2e8f0",
                        borderRadius: "12px",
                        backdropFilter: "blur(12px)",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Audience Tab */}
        <TabsContent value="audience" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg shadow-slate-200/20 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-slate-900">
                    Geographic Distribution
                  </span>
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Where your visitors are located
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(data?.countryData || []).map((country, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span className="font-medium text-slate-900">
                          {country.country}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-medium text-slate-900">
                            {formatNumber(country.visitors)}
                          </div>
                          <div className="text-sm text-slate-500">
                            {country.percentage}%
                          </div>
                        </div>
                        <div className="w-20">
                          <Progress
                            value={country.percentage}
                            className="h-2"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg shadow-slate-200/20 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                    <Globe className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-slate-900">Browser Usage</span>
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Which browsers your visitors use
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(data?.browserData || []).map((browser, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-slate-500" />
                        <span className="font-medium text-slate-900">
                          {browser.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-medium text-slate-900">
                            {formatNumber(browser.visitors)}
                          </div>
                          <div className="text-sm text-slate-500">
                            {browser.value}%
                          </div>
                        </div>
                        <div className="w-20">
                          <Progress value={browser.value} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(data?.deviceData || []).map((device, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg shadow-slate-200/20 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/30 py-0"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${device.color}20` }}
                    >
                      {device.name === "Desktop" && (
                        <Monitor
                          className="w-6 h-6"
                          style={{ color: device.color }}
                        />
                      )}
                      {device.name === "Mobile" && (
                        <Smartphone
                          className="w-6 h-6"
                          style={{ color: device.color }}
                        />
                      )}
                      {device.name === "Tablet" && (
                        <MousePointer
                          className="w-6 h-6"
                          style={{ color: device.color }}
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">
                        {device.value}%
                      </p>
                      <p className="text-sm text-slate-600">
                        {device.name} Users
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Traffic Tab */}
        <TabsContent value="traffic" className="space-y-6 mt-6">
          <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg shadow-slate-200/20 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-slate-900">Traffic Sources</span>
              </CardTitle>
              <CardDescription className="text-slate-600">
                Where your visitors are coming from
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(data?.sourceData || []).map((source, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-slate-200/60 rounded-xl bg-slate-50/80 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3">
                      <Share2 className="w-5 h-5 text-slate-500" />
                      <div>
                        <span className="font-medium text-slate-900">
                          {source.source}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-slate-500">
                            {formatNumber(source.visitors)} visitors
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-slate-900">
                        {source.percentage}%
                      </div>
                      <div className="w-24 mt-2">
                        <Progress value={source.percentage} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
