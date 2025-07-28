import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setUsername } from "@/app/setup/actions";
import { Label } from "./ui/label";
import { User, Globe } from "lucide-react";

export default function SetupCard() {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/60 shadow-xl shadow-slate-200/20">
        <CardHeader className="text-center pb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900 mb-2">
            Almost there! 🎉
          </CardTitle>
          <p className="text-slate-600 leading-relaxed">
            Choose a unique username for your portfolio. This will be displayed
            in your URL and uniquely identifies you.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* URL Preview */}
          <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 border border-slate-200/60 rounded-xl p-4">
            <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
              <Globe className="w-4 h-4" />
              <span className="font-medium">Your portfolio URL will be:</span>
            </div>
            <div className="bg-white/80 rounded-lg px-3 py-2 border border-slate-200/40 font-mono text-sm text-slate-700">
              https://
              <span className="font-bold text-indigo-600">username</span>
              .onefol.io
            </div>
          </div>

          {/* Form */}
          <form className="space-y-5">
            <div className="space-y-3">
              <Label
                htmlFor="username"
                className="text-sm font-semibold text-slate-700"
              >
                Choose Username
              </Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="e.g. john-doe"
                required
                className="bg-white/80 border-slate-200/60 focus:border-indigo-300 focus:ring-indigo-200/50 h-12 text-base"
              />
              <p className="text-xs text-slate-500 leading-relaxed">
                5-20 characters, only letters and numbers allowed
              </p>
            </div>

            <Button
              type="submit"
              formAction={setUsername}
              className="w-full h-12 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200/50 hover:shadow-indigo-300/50 transition-all duration-200 transform hover:scale-[1.02]"
            >
              Set Username
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
