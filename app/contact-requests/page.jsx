import Sidebar from "@/components/sidebar";
import { createClient } from "@/lib/supabase/serverClient";
import ContactsSectionClient from "./components/ContactsSectionClient";
import { MessageSquare } from "lucide-react";

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">
                    Contact Requests
                  </h1>
                  <p className="text-slate-600 mt-1">
                    Manage and respond to messages from your portfolio visitors
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ContactsSectionClient user={user} />
        </div>
      </div>
    </Sidebar>
  );
}
