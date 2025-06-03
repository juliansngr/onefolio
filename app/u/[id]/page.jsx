import { createClient } from "@/lib/supabase/serverClient";

export default async function PortfolioPage() {
  const supabase = await createClient();

  return <div>PortfolioPage </div>;
}
