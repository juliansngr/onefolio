import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { Trash2, GripVertical } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function TextAndIconsInput({
  data,
  onChange,
  onDelete,
  dragHandle,
  isDragging,
}) {
  const [previewUrls, setPreviewUrls] = useState([
    data.files[0],
    data.files[1],
    data.files[2],
  ]);

  const handleImageChange = (index, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newPreviewUrl = URL.createObjectURL(file);
    setPreviewUrls((prev) => {
      if (prev[index]) URL.revokeObjectURL(prev[index]);
      const updatedUrls = [...prev];
      updatedUrls[index] = newPreviewUrl;
      return updatedUrls;
    });
  };

  return (
    <Card
      className={cn(
        "overflow-hidden p-0",
        isDragging && "opacity-80 scale-98 transition-all duration-100"
      )}
    >
      <div className="flex flex-col gap-6 p-6 md:p-8">
        <div className="flex flex-row items-center justify-between text-center">
          <h1 className="text-2xl font-bold">Text and Icons</h1>
          <div className="flex flex-row items-center gap-2">
            <Button variant="outline" onClick={onDelete}>
              <Trash2 className="w-4 h-4" />
            </Button>
            <button {...dragHandle} className="cursor-grab">
              <GripVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="description">Line of text</Label>
          <Input
            id="description"
            type="text"
            name="description"
            placeholder={"I'm currently working on..."}
            defaultValue={data.description}
            required
            onChange={(e) => onChange({ ...data, description: e.target.value })}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="textAndIcons-1">Text and Icons</Label>
          <div className="flex flex-row gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <Input
                  id={`textAndIcons-${i}`}
                  type="file"
                  name={`textAndIcons-${i}`}
                  accept="image/*"
                  required
                  onChange={(e) => {
                    handleImageChange(i, e);
                    const newFileData = [...(data.fileData || [])];
                    newFileData[i] = { index: i, file: e.target.files[0] };

                    onChange({ ...data, fileData: newFileData });
                  }}
                />
                {previewUrls[i] && (
                  <Image
                    src={previewUrls[i]}
                    alt="Preview"
                    width={60}
                    height={60}
                    className="object-cover rounded-3xl w-25 h-25"
                  />
                )}
                <Label htmlFor="link">Link</Label>
                <Input
                  id="link"
                  type="text"
                  name="link"
                  placeholder={"https://www.onefol.io"}
                  defaultValue={data.iconData[i]?.link}
                  required
                  onChange={(e) => {
                    const newIconData = [...(data.iconData || [])];

                    newIconData[i] = {
                      ...newIconData[i],
                      link: e.target.value,
                    };

                    onChange({
                      ...data,
                      iconData: newIconData,
                    });
                  }}
                />
                <Label htmlFor="tooltip">Tooltip</Label>
                <Input
                  id="tooltip"
                  type="text"
                  name="tooltip"
                  placeholder={"onefol.io | portfolio manager"}
                  defaultValue={data.iconData[i]?.tooltip}
                  required
                  onChange={(e) => {
                    const newIconData = [...(data.iconData || [])];

                    newIconData[i] = {
                      ...newIconData[i],
                      tooltip: e.target.value,
                    };

                    onChange({
                      ...data,
                      iconData: newIconData,
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
