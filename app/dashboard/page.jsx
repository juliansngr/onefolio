import Sidebar from "@/components/sidebar";
import { createClient } from "@/lib/supabase/serverClient";
import { getPlausibleStats } from "@/lib/getPlausibleStats";
import MetricCard from "./components/MetricCard";

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

  console.log(profile);

  const stats = await getPlausibleStats({
    userSlug: profile.username,
    metrics: ["visitors"],
    dateRange: "day",
  });

  const count = stats?.results[0]?.metrics[0] || 0;

  return (
    <Sidebar user={user}>
      <div className="bg-muted min-h-svh p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard
              title="Portfolio Views"
              value={count}
              trend="Trending up this week"
              description="Portfolio views for the last 7 days"
            />
            <MetricCard
              title="Visitors"
              value={count}
              trend="Trending up this week"
              description="Portfolio views for the last 7 days"
            />
            <MetricCard
              title="View Duration"
              value={count}
              trend="Trending up this week"
              description="Portfolio views for the last 7 days"
            />
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
