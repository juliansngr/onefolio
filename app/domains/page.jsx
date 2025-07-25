import Sidebar from "@/components/sidebar";
import { createClient } from "@/lib/supabase/serverClient";
import DomainCenter from "./components/DomainCenter";
import { Badge } from "@/components/ui/badge";
import { Globe, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import GetPremium from "../dashboard/components/GetPremium";

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

  const { data: domainData } = await supabase
    .from("custom_domains")
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center">
                    <Globe className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                      Custom Domain
                    </h1>
                    <p className="text-slate-600 mt-1">
                      {domainData
                        ? "Manage your connected domain and DNS settings"
                        : "Connect your own domain to your portfolio"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div
            className={cn(
              "relative",
              !profile.is_pro
                ? "h-[calc(100vh-200px)] overflow-hidden"
                : "min-h-[calc(100vh-200px)]"
            )}
          >
            {!profile.is_pro && (
              <div className="absolute inset-0 z-10 flex flex-col justify-center items-center bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/60">
                <GetPremium />
              </div>
            )}
            <div
              className={cn(
                "transition-all duration-200",
                !profile.is_pro ? "blur-sm pointer-events-none" : ""
              )}
            >
              <DomainCenter domainData={domainData} isPro={profile.is_pro} />
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
