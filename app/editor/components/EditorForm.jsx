"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProfileHeaderInput from "./widgets/ProfileHeaderInput";
import TextAndIconsInput from "./widgets/TextAndIconsInput";
import SaveButton from "./SaveButton";
import { createClient } from "@/lib/supabase/browserClient";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { getDataScheme } from "@/lib/editorFunctions";

export default function EditorForm({ widgets, user }) {
  const [widgetData, setWidgetData] = useState(widgets);
  const [isSaving, setIsSaving] = useState(false);
  const supabase = createClient();

  const addWidget = (type) => {
    setWidgetData((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        user_id: user.id,
        type,
        content: getDataScheme(type),
        position: prev.length + 1,
      },
    ]);
  };

  const deleteWidget = async (id) => {
    const updatedWidgets = widgetData.filter((widget) => widget.id !== id);

    const reOrdered = updatedWidgets.map((widget, index) => ({
      ...widget,
      position: index + 1,
    }));

    setWidgetData(reOrdered);

    const { error: deleteError } = await supabase
      .from("widgets")
      .delete()
      .eq("id", id);

    if (deleteError) {
      toast.error("Error deleting widget");
      return;
    }

    for (const widget of reOrdered) {
      const { error: updateError } = await supabase
        .from("widgets")
        .update({ position: widget.position })
        .eq("id", widget.id);

      if (updateError) {
        toast.error("Error updating widget positions");
      }
    }

    toast.success("Widget deleted and positions updated");
  };

  const updateWidgetContent = (index, content) => {
    setWidgetData((prev) =>
      prev.map((widget, i) => (i === index ? { ...widget, content } : widget))
    );
  };

  const convertImageToWebP = async (file) => {
    const img = await createImageBitmap(file);
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/webp");
    });
  };

  const uploadFile = async (file) => {
    const webpFile = await convertImageToWebP(file);

    const { data, error } = await supabase.storage
      .from("images")
      .upload(user.id + "/" + crypto.randomUUID(), webpFile);

    if (error) {
      console.error("Upload error:", error);
      return null;
    }

    const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/images/${data.path}`;

    return publicUrl ?? null;
  };

  const saveWidgets = async () => {
    setIsSaving(true);
    for (const widget of widgetData) {
      let paths = widget.content.files ?? [];

      if (widget.content.fileData?.length > 0) {
        for (const file of widget.content.fileData) {
          if (!file) continue;
          const index = file.index;
          const path = await uploadFile(file.file);
          if (path) {
            paths[index] = path;
          }
        }
      }

      const cleanContent = structuredClone(widget.content);
      delete cleanContent.fileData;

      const { error } = await supabase.from("widgets").upsert({
        id: widget.id,
        user_id: widget.user_id,
        type: widget.type,
        content: {
          ...cleanContent,
          files: paths,
        },
        position: widget.position,
        created_at: widget.created_at,
      });

      if (error) {
        toast.error("Error saving widgets");
      } else {
        toast.success("Widgets saved successfully");
      }
    }
    setIsSaving(false);
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10 flex-1">
      <div className="w-full max-w-sm md:max-w-6xl ">
        <div className="grid grid-cols-[25%_75%] gap-4">
          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              onClick={() => addWidget("profile-header")}
            >
              Add Profile Header
            </Button>
            <Button
              variant="outline"
              onClick={() => addWidget("text-and-icons")}
            >
              Add Text and Icons
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            {widgetData.map((widget, index) => {
              switch (widget.type) {
                case "profile-header":
                  return (
                    <ProfileHeaderInput
                      data={widget.content}
                      key={widget.id}
                      onChange={(content) =>
                        updateWidgetContent(index, content)
                      }
                      onDelete={() => deleteWidget(widget.id)}
                    />
                  );
                case "text-and-icons":
                  return (
                    <TextAndIconsInput
                      data={widget.content}
                      key={widget.id}
                      onChange={(content) =>
                        updateWidgetContent(index, content)
                      }
                      onDelete={() => deleteWidget(widget.id)}
                    />
                  );
              }
            })}
            <SaveButton onClick={saveWidgets} isSaving={isSaving} />
          </div>
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}
