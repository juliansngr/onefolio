"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Sidebar({ children, user, isPro }) {
  return (
    <SidebarProvider>
      <AppSidebar user={user} isPro={isPro} />
      <main className="flex-1">
        {/* <SidebarTrigger /> */}
        {children}
      </main>
    </SidebarProvider>
  );
}
