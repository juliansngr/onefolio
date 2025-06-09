import { createClient } from "@/lib/supabase/serverClient";
import DefaultPortfolio from "@/components/templates/DefaultPortfolio/DefaultPortfolio";
export default async function PortfolioPage({ params }) {
  const supabase = await createClient();

  const { username } = await params;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (!profile) {
    return <div>Profile not found</div>;
  }

  const { data: widgets } = await supabase
    .from("widgets")
    .select("*")
    .eq("user_id", profile.user_id);

  return <DefaultPortfolio data={widgets} />;
}
