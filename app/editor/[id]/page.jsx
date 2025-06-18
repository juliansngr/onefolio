import Sidebar from "@/components/sidebar";

import { createClient } from "@/lib/supabase/serverClient";

import EditorForm from "../components/EditorForm";
import { redirect } from "next/navigation";

export default async function Page({ params }) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: portfolio } = await supabase
    .from("portfolios")
    .select("*")
    .eq("id", id)
    .single();

  if (!portfolio) {
    return redirect("/editor?error=not-found");
  }

  if (portfolio.user_id !== user.id) {
    return redirect("/editor?error=not-authorized");
  }

  const { data: widgets } = await supabase
    .from("widgets")
    .select("*")
    .eq("portfolio_id", portfolio.id)
    .order("position", { ascending: true });

  return (
    <Sidebar user={user}>
      <EditorForm widgets={widgets} user={user} portfolioId={id} />
    </Sidebar>
  );
}
