import Sidebar from "@/components/sidebar";

import { createClient } from "@/lib/supabase/serverClient";

import EditorForm from "./components/EditorForm";
import { Toaster } from "@/components/ui/sonner";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: widgets } = await supabase
    .from("widgets")
    .select("*")
    .eq("user_id", user.id)
    .order("position", { ascending: true });

  return (
    <Sidebar user={user}>
      <EditorForm widgets={widgets} user={user} />
    </Sidebar>
  );
}
