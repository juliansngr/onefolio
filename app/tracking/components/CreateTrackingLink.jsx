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
import { createTrackingLink } from "./actions";
import { Plus, Copy, CheckCircle, Link as LinkIcon } from "lucide-react";
import { useTransition, useState, useRef, useEffect } from "react";
import { toast } from "sonner";

export function CreateTrackingLink({ isPro }) {
  const [isPending, startTransition] = useTransition();
  const [createdTrackingLink, setCreatedTrackingLink] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (formData) => {
    if (!isPro) {
      toast.error("Upgrade to Pro to create tracking links.");
      return;
    }
    startTransition(async () => {
      const result = await createTrackingLink(formData);

      // Handle error response from server action
      if (result && result.error) {
        toast.error(result.error);
        return;
      }

      // Handle successful response
      if (result && typeof result === "string") {
        setCreatedTrackingLink(result);
      }
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(createdTrackingLink);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const inputRef = useRef(null);
  useEffect(() => {
    if (createdTrackingLink && inputRef.current) {
      inputRef.current.select();
    }
  }, [createdTrackingLink]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          setCreatedTrackingLink(null);
          setCopied(false);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-6 shadow-lg hover:shadow-xl transition-all duration-200 group"
          disabled={!isPro}
        >
          <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-200" />
          Create Tracking Link
        </Button>
      </DialogTrigger>
      {!createdTrackingLink && (
        <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-slate-200">
          <DialogHeader className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl flex items-center justify-center">
                <LinkIcon className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold text-slate-900">
                  Create Tracking Link
                </DialogTitle>
                <DialogDescription className="text-slate-600 mt-1">
                  Create a new tracking link to monitor portfolio visits.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <form action={handleSubmit} className="flex flex-col gap-6 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="tracking-link-recipient"
                  className="text-sm font-medium text-slate-700"
                >
                  Recipient
                </Label>
                <Input
                  id="tracking-link-recipient"
                  name="tracking-link-recipient"
                  placeholder="Company Inc."
                  required
                  className="border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
                />
                <p className="text-xs text-slate-500">
                  Enter the name or company you're sharing this link with
                </p>
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
                disabled={isPending}
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-6 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                {isPending ? "Creating..." : "Create Link"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      )}
      {createdTrackingLink && (
        <DialogContent className="sm:max-w-lg bg-white/95 backdrop-blur-sm border-slate-200">
          <DialogHeader className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold text-slate-900">
                  Tracking Link Created!
                </DialogTitle>
                <DialogDescription className="text-slate-600 mt-1">
                  Your tracking link is ready to share. Copy it to start
                  monitoring visits.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="bg-gradient-to-br from-slate-50/80 to-white/80 p-4 rounded-lg border border-slate-200/60">
              <Label className="text-sm font-medium text-slate-700 mb-2 block">
                Your tracking link:
              </Label>
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={createdTrackingLink}
                  readOnly
                  className="flex-1 font-mono text-sm border-slate-200"
                />
                <Button
                  onClick={handleCopy}
                  className={`${
                    copied
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  } text-white transition-all duration-200`}
                >
                  {copied ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button
                type="button"
                className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white"
                onClick={() => setCreatedTrackingLink(null)}
              >
                Done
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
