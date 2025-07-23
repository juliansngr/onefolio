import Sidebar from "@/components/sidebar";
import { createClient } from "@/lib/supabase/serverClient";
import { getPlausibleStats } from "@/lib/getPlausibleStats";
import MetricCard from "./components/MetricCard";
import Link from "next/link";
import PortfolioStatus from "./components/PortfolioStatus";
import GettingStarted from "./components/GettingStarted";
import GetPremium from "./components/GetPremium";
import { Sparkles, TrendingUp, Users, Clock, ExternalLink } from "lucide-react";

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

  if (!profile) {
    return <div>No profile found</div>;
  }

  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return `${min}m ${sec.toString().padStart(2, "0")}`;
  }

  const { data: stats } = await getPlausibleStats({
    userSlug: profile.username,
    metrics: ["pageviews", "visitors", "visit_duration"],
    dateRange: "day",
  });

  const pageviews = stats[0]?.metrics[0] || 0;
  const count = stats[0]?.metrics[1] || 0;
  const visitDurationSeconds = stats[0]?.metrics[2] || 0;
  const visitDuration = formatTime(visitDurationSeconds);

  // get the number of widgets in the portfolio
  const { data: portfolio } = await supabase
    .from("portfolios")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_main", true)
    .single();

  let widgets = [];
  let totalWidgets = 0;
  let progress = 0;

  if (portfolio) {
    const { data: loadedWidgets } = await supabase
      .from("widgets")
      .select("*")
      .eq("user_id", user.id)
      .eq("portfolio_id", portfolio.id);

    widgets = loadedWidgets || [];
    totalWidgets = widgets.length;
    progress = Math.round((totalWidgets / 7) * 100);
  }

  return (
    <Sidebar user={user} isPro={profile.is_pro}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col gap-3">
              {!portfolio && (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-slate-900">
                        Welcome on board, {profile.username}! 🎉
                      </h1>
                      <p className="text-slate-600 mt-1">
                        You're just a few steps away from creating your
                        professional portfolio. Let's get started!
                      </p>
                    </div>
                  </div>
                </>
              )}
              {portfolio && (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-slate-900">
                        Welcome back, {profile.username}! 👋
                      </h1>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-slate-600">
                          Here's how your portfolio is performing. Your site is
                          live at{" "}
                        </p>
                        <Link
                          href={`https://onefol.io/u/${profile.username}`}
                          className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium transition-colors group"
                          target="_blank"
                        >
                          onefol.io/u/{profile.username}
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MetricCard
                title="Total Views"
                value={pageviews}
                color="blue"
                description="Portfolio views for the last 7 days"
                type="pageviews"
                disabled={!portfolio}
                icon={<TrendingUp className="w-5 h-5" />}
              />
              <MetricCard
                title="Unique Visitors"
                value={count}
                color="green"
                description="Visitors for the last 7 days"
                type="visitors"
                disabled={!portfolio}
                icon={<Users className="w-5 h-5" />}
              />
              <MetricCard
                title="Average View Duration"
                color="purple"
                value={visitDuration}
                description="Average time spent on your portfolio"
                type="visit_duration"
                disabled={!portfolio}
                icon={<Clock className="w-5 h-5" />}
              />
            </div>

            {/* Portfolio Status & Premium */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {portfolio ? (
                  <PortfolioStatus
                    progress={progress}
                    totalWidgets={totalWidgets}
                    lastUpdated="2025-06-18"
                    portfolioId={portfolio.id}
                    username={profile.username}
                  />
                ) : (
                  <GettingStarted />
                )}
              </div>
              {!profile.is_pro && (
                <div className="lg:col-span-1">
                  <GetPremium />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
