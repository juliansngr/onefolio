import { createClient } from "@/lib/supabase/serverClient";
import Sidebar from "@/components/sidebar";
import TrackingLinksClientTable from "./components/TrackingLinksTabel";

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
    .from("tracking_links")
    .select("*")
    .eq("user_id", user.id);

  return (
    <Sidebar user={user} isPro={profile.is_pro}>
      <div className="bg-muted min-h-svh p-6 md:p-10">
        <div className="flex flex-col w-full max-w-sm md:max-w-6xl mx-auto gap-8">
          <TrackingLinksClientTable userId={user.id} />
        </div>
      </div>
    </Sidebar>
  );
}
