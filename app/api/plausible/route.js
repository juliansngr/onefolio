import { createClient } from "@/lib/supabase/serverClient";
import { getPlausibleStats } from "@/lib/getPlausibleStats";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const range = searchParams.get("range") ?? "7d";

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!profile) {
    return new Response("Profile not found", { status: 404 });
  }

  const stats = await getPlausibleStats({
    userSlug: profile.username,
    metrics: ["pageviews", "visitors", "visit_duration"],
    dateRange: range,
  });

  if (!stats) {
    return new Response("No stats found", { status: 404 });
  }

  let pageViews = 0;
  let visitors = 0;

  let visitDuration = 0;
  let vistiDurationDayIndex = 0;

  for (const metric of stats.data) {
    pageViews += metric.metrics[0];
    visitors += metric.metrics[1];
    visitDuration += metric.metrics[2];
    vistiDurationDayIndex++;
  }

  const avgVisitDuration = visitDuration / vistiDurationDayIndex;
  return NextResponse.json({ pageViews, visitors, avgVisitDuration, stats });
}
