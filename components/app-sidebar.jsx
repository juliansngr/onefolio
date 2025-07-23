import {
  ChartNoAxesColumn,
  Home,
  Pencil,
  Folder,
  Link,
  Mail,
  Globe,
  Crown,
  Sparkles,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";
import { usePathname } from "next/navigation";
import { Badge } from "./ui/badge";

const workspaceItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    description: "Overview & analytics",
  },
  {
    title: "Editor",
    url: "/editor",
    icon: Pencil,
    description: "Build your portfolio",
  },
];

const toolsItems = [
  {
    title: "Analytics",
    url: "/analytics",
    icon: ChartNoAxesColumn,
    description: "Visitor insights",
    isPro: true,
  },
  {
    title: "Contact Requests",
    url: "/contact-requests",
    icon: Mail,
    description: "Messages from visitors",
    isPro: false,
  },
  {
    title: "Tracking",
    url: "/tracking",
    icon: Link,
    description: "Link performance",
    isPro: true,
  },
];

const configurationItems = [
  {
    title: "Domains",
    url: "/domains",
    icon: Globe,
    description: "Custom domain setup",
    isPro: true,
  },
];

export function AppSidebar({ user, isPro }) {
  const pathname = usePathname();

  const ProBadge = () => (
    <Badge className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 border-purple-200 hover:from-purple-200 hover:to-indigo-200 transition-all duration-200 text-xs font-medium">
      <Crown className="w-3 h-3 mr-1" />
      Pro
    </Badge>
  );

  return (
    <Sidebar className="bg-gradient-to-b from-slate-50 via-white to-slate-50 border-r border-slate-200/60">
      <SidebarHeader className="border-b border-slate-200/60 bg-white/80 backdrop-blur-sm">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="hover:bg-slate-100/60 transition-all duration-200"
            >
              <div className="group cursor-pointer">
                <div className="flex aspect-square size-10 items-center justify-center rounded-xl shadow-lg shadow-slate-200/40 group-hover:shadow-slate-200/60 group-hover:scale-105 transition-all duration-200 overflow-hidden">
                  <img
                    src="/images/icon_bg.jpg"
                    alt="onefol.io"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid flex-1 text-left leading-tight ml-2">
                  <span className="font-bold text-slate-900 text-base">
                    onefol.io
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Portfolio Builder
                  </span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3 px-3">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {workspaceItems.map((item) => {
                const isActive = item.url === pathname;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`group relative transition-all duration-200 h-auto ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 border border-indigo-200 shadow-sm"
                          : "hover:bg-slate-100/60 text-slate-700 hover:text-slate-900"
                      }`}
                    >
                      <a
                        href={item.url}
                        className="flex items-start gap-3 px-3 py-3 rounded-lg w-full"
                      >
                        <div
                          className={`flex-shrink-0 transition-all duration-200 mt-0.5 ${
                            isActive
                              ? "text-indigo-600"
                              : "text-slate-500 group-hover:text-slate-700"
                          }`}
                        >
                          <item.icon className="size-5" />
                        </div>
                        <div className="flex-1 min-w-0 space-y-0.5">
                          <div className="font-medium text-sm leading-tight">
                            {item.title}
                          </div>
                          <div
                            className={`text-xs leading-relaxed transition-colors duration-200 ${
                              isActive
                                ? "text-indigo-600/70"
                                : "text-slate-500 group-hover:text-slate-600"
                            }`}
                          >
                            {item.description}
                          </div>
                        </div>
                        {isActive && (
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-indigo-600 to-indigo-700 rounded-full" />
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3 px-3">
            Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {toolsItems.map((item) => {
                const isActive = item.url === pathname;
                const needsPro = item.isPro && !isPro;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`group relative transition-all duration-200 h-auto ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 border border-indigo-200 shadow-sm"
                          : needsPro
                          ? "hover:bg-purple-50/60 text-slate-600 hover:text-purple-700"
                          : "hover:bg-slate-100/60 text-slate-700 hover:text-slate-900"
                      } ${needsPro ? "opacity-75" : ""}`}
                    >
                      <a
                        href={item.url}
                        className="flex items-start gap-3 px-3 py-3 rounded-lg w-full"
                      >
                        <div
                          className={`flex-shrink-0 transition-all duration-200 mt-0.5 ${
                            isActive
                              ? "text-indigo-600"
                              : needsPro
                              ? "text-purple-500 group-hover:text-purple-600"
                              : "text-slate-500 group-hover:text-slate-700"
                          }`}
                        >
                          <item.icon className="size-5" />
                        </div>
                        <div className="flex-1 min-w-0 space-y-0.5">
                          <div className="flex items-center justify-between gap-2 pr-3">
                            <div className="font-medium text-sm leading-tight">
                              {item.title}
                            </div>
                            {needsPro && <ProBadge />}
                          </div>
                          <div
                            className={`text-xs leading-relaxed transition-colors duration-200 ${
                              isActive
                                ? "text-indigo-600/70"
                                : needsPro
                                ? "text-purple-500/70 group-hover:text-purple-600/70"
                                : "text-slate-500 group-hover:text-slate-600"
                            }`}
                          >
                            {item.description}
                          </div>
                        </div>
                        {isActive && (
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-indigo-600 to-indigo-700 rounded-full" />
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3 px-3">
            Configuration
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {configurationItems.map((item) => {
                const isActive = item.url === pathname;
                const needsPro = item.isPro && !isPro;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`group relative transition-all duration-200 h-auto ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 border border-indigo-200 shadow-sm"
                          : needsPro
                          ? "hover:bg-purple-50/60 text-slate-600 hover:text-purple-700"
                          : "hover:bg-slate-100/60 text-slate-700 hover:text-slate-900"
                      } ${needsPro ? "opacity-75" : ""}`}
                    >
                      <a
                        href={item.url}
                        className="flex items-start gap-3 px-3 py-3 rounded-lg w-full"
                      >
                        <div
                          className={`flex-shrink-0 transition-all duration-200 mt-0.5 ${
                            isActive
                              ? "text-indigo-600"
                              : needsPro
                              ? "text-purple-500 group-hover:text-purple-600"
                              : "text-slate-500 group-hover:text-slate-700"
                          }`}
                        >
                          <item.icon className="size-5" />
                        </div>
                        <div className="flex-1 min-w-0 space-y-0.5">
                          <div className="flex items-center justify-between gap-2 pr-3">
                            <div className="font-medium text-sm leading-tight">
                              {item.title}
                            </div>
                            {needsPro && <ProBadge />}
                          </div>
                          <div
                            className={`text-xs leading-relaxed transition-colors duration-200 ${
                              isActive
                                ? "text-indigo-600/70"
                                : needsPro
                                ? "text-purple-500/70 group-hover:text-purple-600/70"
                                : "text-slate-500 group-hover:text-slate-600"
                            }`}
                          >
                            {item.description}
                          </div>
                        </div>
                        {isActive && (
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-indigo-600 to-indigo-700 rounded-full" />
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200/60 bg-white/80 backdrop-blur-sm p-3">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
