import Sidebar from "@/components/sidebar";
import { createClient } from "@/lib/supabase/serverClient";
import DomainCenter from "./components/DomainCenter";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
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
      <div className="bg-muted min-h-svh p-6 md:p-10 relative">
        <div className="w-full max-w-sm md:max-w-6xl mx-auto relative">
          {!profile.is_pro && (
            <div className="absolute z-10 flex flex-col justify-center items-center h-full w-full">
              <GetPremium className="" />
            </div>
          )}
          <div
            className={cn(
              "flex flex-col w-full max-w-sm md:max-w-6xl mx-auto gap-4",
              !profile.is_pro ? "blur-sm" : ""
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Custom Domain</h1>
                <p className="text-gray-600 mt-1">
                  Connect your own domain to your portfolio
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-800"
                >
                  <Star className="w-3 h-3 mr-1" />
                  Pro Feature
                </Badge>
              </div>
            </div>
            <DomainCenter domainData={domainData} isPro={profile.is_pro} />
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
