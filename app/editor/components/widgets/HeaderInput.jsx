import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function HeaderInput({
  data,
  onChange,
  onDelete,
  dragHandle,
  isDragging,
}) {
  return (
    <Card
      className={cn(
        "overflow-hidden p-0",
        isDragging && "opacity-90 scale-98 transition-all duration-100"
      )}
    >
      <div className="flex flex-col gap-6 p-6 md:p-8">
        <div className="flex flex-row items-center justify-between text-center">
          <h1 className="text-2xl font-bold">Header</h1>
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
        <div className="flex flex-row gap-3 w-full">
          <div className="flex flex-col gap-3 w-1/2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder={"Michael Scott"}
              defaultValue={data.name}
              required
              onChange={(e) => onChange({ ...data, name: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-3 w-1/2">
            <Label htmlFor="mail">Mail address</Label>
            <Input
              id="mail"
              type="text"
              name="mail"
              placeholder={"michael@example.com"}
              defaultValue={data.mail}
              required
              onChange={(e) => onChange({ ...data, mail: e.target.value })}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
