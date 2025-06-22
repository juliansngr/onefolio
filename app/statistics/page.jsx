import Sidebar from "@/components/sidebar";
import { createClient } from "@/lib/supabase/serverClient";
import StatisticsPage from "./components/StatisticsPage";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Sidebar user={user}>
      <StatisticsPage />
    </Sidebar>
  );
}
