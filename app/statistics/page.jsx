import Sidebar from "@/components/sidebar";
import { createClient } from "@/lib/supabase/serverClient";
import StatisticsPage from "./components/StatisticsPage";
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

  const data = {};

  return (
    <Sidebar user={user}>
      <div className="bg-muted min-h-svh p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-6xl mx-auto relative">
          {!profile.is_pro && (
            <div className="absolute z-10 flex flex-col justify-center items-center h-full w-full">
              <GetPremium className="" />
            </div>
          )}
          <StatisticsPage
            className={profile.is_pro ? "" : "blur-sm"}
            data={data}
          />
        </div>
      </div>
    </Sidebar>
  );
}
