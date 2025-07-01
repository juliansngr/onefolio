import Sidebar from "@/components/sidebar";
import { createClient } from "@/lib/supabase/serverClient";
import ContactsStatistics from "./components/ContactsStatistics";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: messages } = await supabase
    .from("contact_form_requests")
    .select("*")
    .eq("user_id", user.id);

  return (
    <Sidebar user={user}>
      <div className="bg-muted min-h-svh p-6 md:p-10">
        <div className="flex flex-col w-full max-w-sm md:max-w-6xl mx-auto gap-8">
          <div className="flex flex-col gap-2 mb-6">
            <h1 className="text-2xl font-bold">Contact Requests</h1>
          </div>
          <ContactsStatistics messages={messages} />
        </div>
      </div>
    </Sidebar>
  );
}
