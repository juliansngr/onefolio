import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/serverClient";
import Link from "next/link";
import PortfolioTitle from "./PortfolioTitle";
import { CreatePortfolioButton } from "./CreatePortfolioButton";
import { Folder } from "lucide-react";

export default async function PortfolioSelector() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: portfolios } = await supabase
    .from("portfolios")
    .select("*")
    .eq("user_id", user.id);

  return (
    <div className="bg-muted min-h-svh p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-6xl mx-auto">
        <div className="flex flex-row gap-2 justify-between items-end">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Your Portfolios
            </h1>

            <p className="text-sm text-gray-500">
              Select a portfolio to edit or create a new one
            </p>
          </div>
          <CreatePortfolioButton />
        </div>
        <hr className="my-8 border-gray-400" />
        <div className="flex flex-row gap-6 flex-wrap">
          {portfolios.map((portfolio) => {
            return (
              <Card key={portfolio.id} className="w-xs p-0 overflow-hidden">
                <CardContent className="flex flex-col h-full w-full p-0">
                  <div
                    className={`flex flex-col gap-2 h-35 w-full ${portfolio.color} justify-center items-center`}
                  >
                    <Folder className="w-10 h-10 text-white fill-white" />
                  </div>
                  <div className="flex flex-row gap-2 w-full justify-between p-4">
                    <PortfolioTitle title={portfolio.title} id={portfolio.id} />
                    <Button
                      className="cursor-pointer bg-slate-900 hover:bg-slate-800 text-white px-6"
                      asChild
                    >
                      <Link href={`/editor/${portfolio.id}`}>Edit</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
