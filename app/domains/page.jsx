import Sidebar from "@/components/sidebar";
import { createClient } from "@/lib/supabase/serverClient";
import DomainCenter from "./components/DomainCenter";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: domainData } = await supabase
    .from("custom_domains")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return (
    <Sidebar user={user}>
      <div className="bg-muted min-h-svh p-6 md:p-10">
        <div className="flex flex-col w-full max-w-sm md:max-w-6xl mx-auto gap-4">
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
          <DomainCenter domainData={domainData} />
        </div>
      </div>
    </Sidebar>
  );
}
