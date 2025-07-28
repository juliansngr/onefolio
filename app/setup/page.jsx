import SetupCard from "@/components/setup-card";
import ErrorToast from "./ErrorToast";
import { Toaster } from "@/components/ui/sonner";
import { Settings } from "lucide-react";

export default async function SetupPage({ searchParams }) {
  const { error } = await searchParams;
  console.log(error);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Account Setup
                </h1>
                <p className="text-slate-600 mt-1">
                  Complete your profile setup by choosing a unique username for
                  your portfolio
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <SetupCard />
            {error && <ErrorToast error={error} />}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
