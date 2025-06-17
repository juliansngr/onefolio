import Sidebar from "@/components/sidebar";

import { createClient } from "@/lib/supabase/serverClient";

import PortfolioSelector from "./components/PortfolioSelector";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Sidebar user={user}>
      <PortfolioSelector />
    </Sidebar>
  );
}
