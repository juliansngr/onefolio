import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPortfolio } from "./actions";
import { Plus, ArrowRight, Sparkles } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CreatePortfolioButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group">
          <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-200" />
          Create New Portfolio
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform duration-200" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-slate-200">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-slate-900">
                Create New Portfolio
              </DialogTitle>
              <DialogDescription className="text-slate-600 mt-1">
                Create a new portfolio to start building your online presence.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form action={createPortfolio} className="flex flex-col gap-6 mt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="portfolio-name"
                className="text-sm font-medium text-slate-700"
              >
                Portfolio Name
              </Label>
              <Input
                id="portfolio-name"
                name="portfolio-name"
                placeholder="My Beautiful Portfolio"
                required
                className="border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Theme
              </Label>
              <Select name="theme">
                <SelectTrigger className="border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20">
                  <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="alpha">Alpha</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="px-6 border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-6 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Create Portfolio
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
