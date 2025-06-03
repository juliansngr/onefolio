import Sidebar from "@/components/sidebar";
import { createClient } from "@/lib/supabase/serverClient";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Sidebar user={user}>
      <h1>Editor</h1>
    </Sidebar>
  );
}
