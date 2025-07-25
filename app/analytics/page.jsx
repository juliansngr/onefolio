import Sidebar from "@/components/sidebar";
import { createClient } from "@/lib/supabase/serverClient";
import StatisticsPage from "./components/StatisticsPage";
import GetPremium from "../dashboard/components/GetPremium";
import { BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return (
    <Sidebar user={user} isPro={profile.is_pro}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">
                    Portfolio Analytics
                  </h1>
                  <p className="text-slate-600 mt-1">
                    Comprehensive insights into your portfolio performance and
                    visitor behavior
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div
            className={cn(
              "relative",
              !profile.is_pro
                ? "h-[calc(100vh-200px)] overflow-hidden"
                : "min-h-[calc(100vh-200px)]"
            )}
          >
            {!profile.is_pro && (
              <div className="absolute inset-0 z-10 flex flex-col justify-center items-center bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/60">
                <GetPremium />
              </div>
            )}
            <div
              className={profile.is_pro ? "" : "blur-sm pointer-events-none"}
            >
              <StatisticsPage />
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
