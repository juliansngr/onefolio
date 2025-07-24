import { createClient } from "@/lib/supabase/serverClient";
import Sidebar from "@/components/sidebar";
import TrackingLinksClientTable from "./components/TrackingLinksTabel";
import { cn } from "@/lib/utils";
import GetPremium from "../dashboard/components/GetPremium";
import { Link as LinkIcon } from "lucide-react";

// Statistics Component
function TrackingStatistics({ links, isPro }) {
  const totalLinks = links?.length || 0;
  const clickedLinks = links?.filter((link) => link.was_clicked)?.length || 0;
  const clickRate =
    totalLinks > 0 ? Math.round((clickedLinks / totalLinks) * 100) : 0;
  const recentClicks =
    links?.filter((link) => {
      if (!link.was_clicked_at) return false;
      const clickDate = new Date(link.was_clicked_at);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return clickDate >= weekAgo;
    })?.length || 0;

  const StatCard = ({ title, value, description, color = "blue" }) => {
    const colors = {
      blue: "from-blue-100 to-blue-200 text-blue-600",
      green: "from-emerald-100 to-emerald-200 text-emerald-600",
      purple: "from-purple-100 to-purple-200 text-purple-600",
      orange: "from-orange-100 to-orange-200 text-orange-600",
    };

    return (
      <div className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg shadow-slate-200/20 hover:shadow-xl hover:shadow-slate-200/30 transition-all duration-200 rounded-xl p-6 py-0">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-2xl font-bold text-slate-900 tabular-nums">
                {isPro ? value : "–"}
              </p>
              <p className="text-sm font-medium text-slate-600">{title}</p>
            </div>
            <div
              className={`w-12 h-12 bg-gradient-to-br ${colors[color]} rounded-2xl flex items-center justify-center`}
            >
              <LinkIcon className="w-5 h-5" />
            </div>
          </div>
          {isPro && (
            <p className="text-xs text-slate-500 mt-3">{description}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Links"
        value={totalLinks}
        description="Tracking links created"
        color="blue"
      />
      <StatCard
        title="Clicked Links"
        value={clickedLinks}
        description="Links that were visited"
        color="green"
      />
      <StatCard
        title="Click Rate"
        value={`${clickRate}%`}
        description="Percentage of links clicked"
        color="purple"
      />
      <StatCard
        title="Recent Clicks"
        value={recentClicks}
        description="Clicks in the last 7 days"
        color="orange"
      />
    </div>
  );
}

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

  const { data: links } = await supabase
    .from("tracking_links_with_usernames")
    .select("*")
    .eq("user_id", user.id);

  return (
    <Sidebar user={user} isPro={profile.is_pro}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl flex items-center justify-center">
                  <LinkIcon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">
                    Link Tracking
                  </h1>
                  <p className="text-slate-600 mt-1">
                    {profile.is_pro
                      ? "Monitor and analyze your portfolio link performance"
                      : "Upgrade to Pro to track your portfolio link performance"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="relative">
            {!profile.is_pro && (
              <div className="absolute inset-0 z-10 flex flex-col justify-center items-center bg-white/80 backdrop-blur-sm rounded-2xl">
                <GetPremium />
              </div>
            )}
            <div
              className={cn(
                "space-y-8",
                !profile.is_pro ? "blur-sm pointer-events-none" : ""
              )}
            >
              <TrackingStatistics links={links} isPro={profile.is_pro} />
              <TrackingLinksClientTable
                userId={user.id}
                isPro={profile.is_pro}
              />
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
