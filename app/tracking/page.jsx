import { createClient } from "@/lib/supabase/serverClient";
import Sidebar from "@/components/sidebar";
import TrackingLinksClientTable from "./components/TrackingLinksTabel";
import { cn } from "@/lib/utils";
import GetPremium from "../dashboard/components/GetPremium";

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
        <div className="w-full max-w-sm md:max-w-6xl mx-auto relative">
          {!profile.is_pro && (
            <div className="absolute z-10 flex flex-col justify-center items-center h-full w-full">
              <GetPremium className="" />
            </div>
          )}
          <div
            className={cn(
              "flex flex-col w-full max-w-sm md:max-w-6xl mx-auto gap-8",
              !profile.is_pro ? "blur-sm" : ""
            )}
          >
            <TrackingLinksClientTable userId={user.id} isPro={profile.is_pro} />
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
