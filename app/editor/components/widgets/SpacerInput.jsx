import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

export default function SpacerInput({
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
          <h1 className="text-2xl font-bold">Spacer</h1>
          <div className="flex flex-row items-center gap-2">
            <Button variant="outline" onClick={onDelete}>
              <Trash2 className="w-4 h-4" />
            </Button>
            <button {...dragHandle} className="cursor-grab">
              <GripVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="height">
              Thickness
              <span className="text-xs text-gray-500">(min 1, max 10)</span>
            </Label>
            <Input
              id="height"
              type="number"
              name="height"
              value={data.height}
              required
              onChange={(e) => {
                const isValid = validateInput(e);
                if (isValid) {
                  onChange({ ...data, height: parseInt(e.target.value, 10) });
                }
              }}
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            <Label htmlFor="displayLine">Display line</Label>
            <Checkbox
              id="displayLine"
              checked={data.displayLine}
              onCheckedChange={(checked) =>
                onChange({ ...data, displayLine: checked })
              }
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
