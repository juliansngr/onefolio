import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ContactFormInput({
  data,
  onChange,
  onDelete,
  dragHandle,
  isDragging,
}) {
  const validateInput = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value <= 0 || value > 10 || isNaN(value)) {
      e.target.value = 1;
      toast.error("Please enter a valid number between 1 and 10");
      return false;
    }
    return true;
  };

  return (
    <Card
      className={cn(
        "overflow-hidden p-0",
        isDragging && "opacity-90 scale-98 transition-all duration-100"
      )}
    >
      <div className="flex flex-col gap-6 p-6 md:p-8">
        <div className="flex flex-row items-center justify-between text-center">
          <h1 className="text-2xl font-bold">Contact Form</h1>
          <div className="flex flex-row items-center gap-2">
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={onDelete}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Can't be undone</p>
              </TooltipContent>
            </Tooltip>
            <button {...dragHandle} className="cursor-grab">
              <GripVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p>
              This widget will display a contact form on your portfolio. You can
              view all requests under the menu item "Contact Requests".
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
