"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Sidebar({ children, user }) {
  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <main>
        {/* <SidebarTrigger /> */}
        {children}
      </main>
    </SidebarProvider>
  );
}
