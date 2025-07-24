import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/serverClient";
import Link from "next/link";
import PortfolioTitle from "./PortfolioTitle";
import { CreatePortfolioButton } from "./CreatePortfolioButton";
import { Folder, Edit3, Calendar } from "lucide-react";

export default async function PortfolioSelector() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: portfolios } = await supabase
    .from("portfolios")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (!portfolios || portfolios.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mb-6">
          <Folder className="w-12 h-12 text-slate-400" />
        </div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">
          No Portfolios Yet
        </h2>
        <p className="text-slate-600 text-center mb-8 max-w-md">
          Get started by creating your first portfolio. It only takes a few
          minutes to set up your professional presence online.
        </p>
        <CreatePortfolioButton />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {portfolios.map((portfolio) => {
        const formatDate = (dateString) => {
          return new Date(dateString).toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
        };

        return (
          <Card
            key={portfolio.id}
            className="group overflow-hidden border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-200 bg-white/60 backdrop-blur-sm py-0"
          >
            <CardContent className="p-0 flex flex-col">
              {/* Portfolio Color Header */}
              <div
                className={`flex flex-col gap-3 h-40 w-full ${portfolio.color} justify-center items-center relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                <Folder className="w-12 h-12 text-white fill-white/20 relative z-10" />
                {portfolio.is_main && (
                  <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium">
                    Main
                  </div>
                )}
              </div>

              {/* Portfolio Info */}
              <div className="p-6 h-40 flex flex-col justify-between">
                <div className="space-y-2">
                  <PortfolioTitle title={portfolio.title} id={portfolio.id} />
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar className="w-4 h-4" />
                    <span>Created {formatDate(portfolio.created_at)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-sm text-slate-600">
                    <span className="capitalize">{portfolio.theme}</span> Theme
                  </div>
                  <Button
                    className="bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white px-6 group-hover:shadow-md transition-all duration-200"
                    asChild
                  >
                    <Link
                      href={`/editor/${portfolio.id}`}
                      className="flex items-center gap-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
