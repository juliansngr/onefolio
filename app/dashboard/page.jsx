import Sidebar from "@/components/sidebar";
import { createClient } from "@/lib/supabase/serverClient";
import { getPlausibleStats } from "@/lib/getPlausibleStats";
import MetricCard from "./components/MetricCard";
import Link from "next/link";
import PortfolioStatus from "./components/PortfolioStatus";
import GettingStarted from "./components/GettingStarted";

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

  const stats = await getPlausibleStats({
    userSlug: profile.username,
    metrics: ["visitors", "visit_duration", "pageviews"],
    dateRange: "day",
  });

  const count = stats?.results[0]?.metrics[0] || 0;
  const visitDurationSeconds = stats?.results[0]?.metrics[1] || 0;
  const visitDuration = formatTime(visitDurationSeconds);
  const pageviews = stats?.results[0]?.metrics[2] || 0;

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
    <Sidebar user={user}>
      <div className="bg-muted min-h-svh p-6 md:p-10">
        <div className="flex flex-col w-full max-w-sm md:max-w-6xl mx-auto gap-8">
          <div className="flex flex-col gap-2 mb-6">
            {!portfolio && (
              <>
                <h1 className="text-4xl font-semibold">
                  Welcome on board, {profile.username}! 🎉
                </h1>
                <p className="text-md">
                  You're just a few steps away from creating your professional
                  portfolio. Let's get started!
                </p>
              </>
            )}
            {portfolio && (
              <>
                <h1 className="text-4xl font-semibold">
                  Welcome back, {profile.username}! 👋
                </h1>
                <p className="text-md">
                  Here's how your portfolio is performing. Your site is live at
                  <Link
                    href={`https://onefol.io/u/${profile.username}`}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                  >
                    onefol.io/u/{profile.username}
                  </Link>
                </p>
              </>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <MetricCard
              title="Total Views"
              value={pageviews}
              color="blue"
              description="Portfolio views for the last 7 days"
              type="pageviews"
              disabled={!portfolio}
            />
            <MetricCard
              title="Unique Visitors"
              value={count}
              color="green"
              description="Visitors for the last 7 days"
              type="visitors"
              disabled={!portfolio}
            />
            <MetricCard
              title="Average View Duration"
              color="purple"
              value={visitDuration}
              description="Average time spent on your portfolios"
              type="visit_duration"
              disabled={!portfolio}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="col-span-1 md:col-span-2 lg:col-span-2">
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
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
