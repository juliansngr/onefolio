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
import { ArrowRight } from "lucide-react";
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
        <Button className="cursor-pointer bg-slate-900 hover:bg-slate-800 text-white px-6">
          Create New Portfolio
          <ArrowRight className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Portfolio</DialogTitle>
          <DialogDescription>
            Create a new portfolio to start building your online presence.
          </DialogDescription>
        </DialogHeader>
        <form action={createPortfolio} className="flex flex-col gap-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="portfolio-name">Portfolio Name</Label>
              <Input
                id="portfolio-name"
                name="portfolio-name"
                placeholder="My Beautiful Portfolio"
                required
              />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a theme" />
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                  </SelectContent>
                </SelectTrigger>
              </Select>
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button
              type="submit"
              className="cursor-pointer bg-slate-900 hover:bg-slate-800 text-white px-6"
            >
              Create
            </Button>
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="px-6 cursor-pointer"
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
