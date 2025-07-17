import Sidebar from "@/components/sidebar";
import { createClient } from "@/lib/supabase/serverClient";
import ContactsSectionClient from "./components/ContactsSectionClient";

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
      <div className="bg-muted min-h-svh p-6 md:p-10">
        <div className="flex flex-col w-full max-w-sm md:max-w-6xl mx-auto gap-4">
          <div className="flex flex-col gap-2 mb-6">
            <h1 className="text-2xl font-bold">Contact Requests</h1>
          </div>
          <ContactsSectionClient user={user} />
        </div>
      </div>
    </Sidebar>
  );
}
