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
import { Plus } from "lucide-react";
import { useTransition, useState, useRef, useEffect } from "react";

export function CreateTrackingLink() {
  const [isPending, startTransition] = useTransition();
  const [createdTrackingLink, setCreatedTrackingLink] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (formData) => {
    startTransition(async () => {
      const trackingLink = await createTrackingLink(formData);
      setCreatedTrackingLink(trackingLink);
    });
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
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="cursor-pointer bg-slate-900 hover:bg-slate-800 text-white px-6">
          Create New Tracking Link
          <Plus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      {!createdTrackingLink && (
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Tracking Link</DialogTitle>
            <DialogDescription>
              Create a new tracking link to start tracking your online presence.
            </DialogDescription>
          </DialogHeader>
          <form action={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="tracking-link-recipient">Recipient</Label>
                <Input
                  id="tracking-link-recipient"
                  name="tracking-link-recipient"
                  placeholder="Company Inc."
                  required
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <Button
                type="submit"
                className="cursor-pointer bg-slate-900 hover:bg-slate-800 text-white px-6"
              >
                {isPending ? "Creating..." : "Create"}
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
      )}
      {createdTrackingLink && (
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>✅ Tracking Link Created</DialogTitle>
            <DialogDescription>
              Your tracking link has been created. You can now share it with the
              world and be notified when it is opened.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 text-sm flex flex-row gap-2">
            <Input
              ref={inputRef}
              value={createdTrackingLink}
              readOnly
              className="w-full cursor-pointer"
            />
            <Button
              className="cursor-pointer bg-slate-900 hover:bg-slate-800 text-white px-6"
              onClick={() => navigator.clipboard.writeText(createdTrackingLink)}
            >
              Copy
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="px-6 cursor-pointer"
                onClick={() => setCreatedTrackingLink(null)}
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
