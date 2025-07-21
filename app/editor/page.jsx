import Sidebar from "@/components/sidebar";

import { createClient } from "@/lib/supabase/serverClient";

import PortfolioSelector from "./components/PortfolioSelector";

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
      <PortfolioSelector />
    </Sidebar>
  );
}
