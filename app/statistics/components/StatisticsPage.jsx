"use client";

import { useState } from "react";
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
  BarChart,
  LineChart,
  PieChart,
  Line,
  Bar,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  Mail,
  Globe,
  Smartphone,
  Monitor,
  MapPin,
  Clock,
  Download,
  MousePointer,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for comprehensive analytics
const timeRangeData = {
  "7d": {
    views: [
      { date: "Dec 11", views: 245, visitors: 189, contacts: 3 },
      { date: "Dec 12", views: 312, visitors: 234, contacts: 5 },
      { date: "Dec 13", views: 189, visitors: 145, contacts: 2 },
      { date: "Dec 14", views: 423, visitors: 298, contacts: 7 },
      { date: "Dec 15", views: 378, visitors: 267, contacts: 4 },
      { date: "Dec 16", views: 456, visitors: 334, contacts: 8 },
      { date: "Dec 17", views: 389, visitors: 289, contacts: 6 },
    ],
    totalViews: 2392,
    totalVisitors: 1756,
    totalContacts: 35,
    avgSessionDuration: "2m 34s",
    bounceRate: 34.2,
  },
  "30d": {
    views: [
      { date: "Week 1", views: 1245, visitors: 889, contacts: 15 },
      { date: "Week 2", views: 1567, visitors: 1123, contacts: 23 },
      { date: "Week 3", views: 1389, visitors: 967, contacts: 18 },
      { date: "Week 4", views: 1823, visitors: 1234, contacts: 29 },
    ],
    totalViews: 6024,
    totalVisitors: 4213,
    totalContacts: 85,
    avgSessionDuration: "2m 18s",
    bounceRate: 31.8,
  },
};

const deviceData = [
  { name: "Desktop", value: 45, color: "#3B82F6" },
  { name: "Mobile", value: 38, color: "#10B981" },
  { name: "Tablet", value: 17, color: "#F59E0B" },
];

const browserData = [
  { name: "Chrome", value: 52, visitors: 1247 },
  { name: "Safari", value: 23, visitors: 551 },
  { name: "Firefox", value: 15, visitors: 359 },
  { name: "Edge", value: 7, visitors: 168 },
  { name: "Other", value: 3, visitors: 72 },
];

const geographicData = [
  { country: "United States", visitors: 1234, percentage: 35.2 },
  { country: "United Kingdom", visitors: 567, percentage: 16.2 },
  { country: "Canada", visitors: 432, percentage: 12.3 },
  { country: "Germany", visitors: 298, percentage: 8.5 },
  { country: "Australia", visitors: 234, percentage: 6.7 },
  { country: "France", visitors: 189, percentage: 5.4 },
  { country: "Netherlands", visitors: 156, percentage: 4.4 },
  { country: "Other", visitors: 390, percentage: 11.1 },
];

const trafficSources = [
  { source: "Direct", visitors: 1456, percentage: 41.5, change: 12.3 },
  { source: "LinkedIn", visitors: 892, percentage: 25.4, change: 8.7 },
  { source: "GitHub", visitors: 567, percentage: 16.2, change: -2.1 },
  { source: "Google", visitors: 334, percentage: 9.5, change: 15.6 },
  { source: "Twitter", visitors: 189, percentage: 5.4, change: 4.2 },
  { source: "Other", visitors: 72, percentage: 2.1, change: -1.8 },
];

const pagePerformance = [
  { page: "/", views: 1456, avgTime: "3m 12s", bounceRate: 28.5 },
  { page: "/projects", views: 1234, avgTime: "4m 23s", bounceRate: 22.1 },
  { page: "/about", views: 892, avgTime: "2m 45s", bounceRate: 35.7 },
  { page: "/contact", views: 567, avgTime: "1m 56s", bounceRate: 45.2 },
  { page: "/skills", views: 334, avgTime: "2m 18s", bounceRate: 38.9 },
];

const contactAnalytics = [
  { date: "Dec 11", submissions: 3, opens: 12, clicks: 8 },
  { date: "Dec 12", submissions: 5, opens: 18, clicks: 14 },
  { date: "Dec 13", submissions: 2, opens: 9, clicks: 6 },
  { date: "Dec 14", submissions: 7, opens: 24, clicks: 19 },
  { date: "Dec 15", submissions: 4, opens: 15, clicks: 11 },
  { date: "Dec 16", submissions: 8, opens: 28, clicks: 22 },
  { date: "Dec 17", submissions: 6, opens: 21, clicks: 16 },
];

export default function StatisticsPage({ className }) {
  const [timeRange, setTimeRange] = useState("7d");
  const currentData = timeRangeData[timeRange];

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const formatPercentage = (num) => {
    return `${num > 0 ? "+" : ""}${num.toFixed(1)}%`;
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Statistics</h1>
          <p className="text-gray-600 mt-1">
            Comprehensive analytics for your portfolio performance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold">
                  {formatNumber(currentData.totalViews)}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-3">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">+12.5%</span>
              <span className="text-sm text-gray-500 ml-2">
                vs previous period
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Unique Visitors
                </p>
                <p className="text-2xl font-bold">
                  {formatNumber(currentData.totalVisitors)}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <Users className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-3">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">+8.3%</span>
              <span className="text-sm text-gray-500 ml-2">
                vs previous period
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Contact Submissions
                </p>
                <p className="text-2xl font-bold">
                  {currentData.totalContacts}
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-full">
                <Mail className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-3">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">+15.2%</span>
              <span className="text-sm text-gray-500 ml-2">
                vs previous period
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg. Session Duration
                </p>
                <p className="text-2xl font-bold">
                  {currentData.avgSessionDuration}
                </p>
              </div>
              <div className="p-3 bg-orange-50 rounded-full">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <div className="flex items-center mt-3">
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              <span className="text-sm text-red-600 font-medium">-2.1%</span>
              <span className="text-sm text-gray-500 ml-2">
                vs previous period
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Views & Visitors Over Time</CardTitle>
                <CardDescription>
                  Daily breakdown of portfolio traffic
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={currentData.views}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="views"
                      stackId="1"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="visitors"
                      stackId="2"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>
                  How visitors access your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Percentage"]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Contact Form Performance</CardTitle>
              <CardDescription>
                Submissions, opens, and click-through rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={contactAnalytics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="submissions"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="opens"
                    stroke="#06B6D4"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="clicks"
                    stroke="#F59E0B"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audience Tab */}
        <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>
                  Where your visitors are located
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {geographicData.map((country, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{country.country}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-medium">
                            {formatNumber(country.visitors)}
                          </div>
                          <div className="text-sm text-gray-500">
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

            <Card>
              <CardHeader>
                <CardTitle>Browser Usage</CardTitle>
                <CardDescription>
                  Which browsers your visitors use
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {browserData.map((browser, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{browser.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-medium">
                            {formatNumber(browser.visitors)}
                          </div>
                          <div className="text-sm text-gray-500">
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
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Monitor className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">45%</p>
                    <p className="text-sm text-gray-600">Desktop Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">38%</p>
                    <p className="text-sm text-gray-600">Mobile Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <MousePointer className="w-8 h-8 text-orange-500" />
                  <div>
                    <p className="text-2xl font-bold">
                      {currentData.bounceRate}%
                    </p>
                    <p className="text-sm text-gray-600">Bounce Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Traffic Tab */}
        <TabsContent value="traffic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>
                Where your visitors are coming from
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficSources.map((source, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Share2 className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="font-medium">{source.source}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-500">
                            {formatNumber(source.visitors)} visitors
                          </span>
                          <Badge
                            variant={
                              source.change > 0 ? "default" : "secondary"
                            }
                            className="text-xs"
                          >
                            {formatPercentage(source.change)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{source.percentage}%</div>
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

        {/* Pages Tab */}
        <TabsContent value="pages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Page Performance</CardTitle>
              <CardDescription>
                How individual pages are performing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pagePerformance.map((page, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="font-medium">{page.page}</span>
                        <div className="text-sm text-gray-500 mt-1">
                          {formatNumber(page.views)} views • {page.avgTime} avg
                          time
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{page.bounceRate}%</div>
                      <div className="text-sm text-gray-500">bounce rate</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contacts Tab */}
        <TabsContent value="contacts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Mail className="w-8 h-8 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">
                      {currentData.totalContacts}
                    </p>
                    <p className="text-sm text-gray-600">Total Submissions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Eye className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">127</p>
                    <p className="text-sm text-gray-600">Form Views</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">27.6%</p>
                    <p className="text-sm text-gray-600">Conversion Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Contact Form Analytics</CardTitle>
              <CardDescription>
                Detailed breakdown of contact form performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={contactAnalytics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="submissions" fill="#8B5CF6" />
                  <Bar dataKey="opens" fill="#06B6D4" />
                  <Bar dataKey="clicks" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
