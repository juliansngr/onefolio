import Sidebar from "@/components/sidebar";
import { createClient } from "@/lib/supabase/serverClient";
import PortfolioSelector from "./components/PortfolioSelector";
import { CreatePortfolioButton } from "./components/CreatePortfolioButton";
import { FolderOpen } from "lucide-react";

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

  // Get user's portfolios to show count
  const { data: portfolios } = await supabase
    .from("portfolios")
    .select("*")
    .eq("user_id", user.id);

  const portfolioCount = portfolios?.length || 0;

  return (
    <Sidebar user={user} isPro={profile.is_pro}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-100 to-violet-200 rounded-2xl flex items-center justify-center">
                    <FolderOpen className="w-6 h-6 text-violet-600" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                      Portfolio Editor
                    </h1>
                    <p className="text-slate-600 mt-1">
                      {portfolioCount > 0
                        ? "Select a portfolio to edit, manage your existing ones or create a brand new one"
                        : "Create your first portfolio to get started"}
                    </p>
                  </div>
                </div>
                <CreatePortfolioButton />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PortfolioSelector />
        </div>
      </div>
    </Sidebar>
  );
}
