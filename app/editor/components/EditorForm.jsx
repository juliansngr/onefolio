"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProfileHeaderInput from "./widgets/ProfileHeaderInput";
import SaveButton from "./SaveButton";
import { createClient } from "@/lib/supabase/browserClient";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export default function EditorForm({ widgets, user }) {
  const [widgetData, setWidgetData] = useState(widgets);
  const supabase = createClient();

  const addWidget = (type) => {
    setWidgetData((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        user_id: user.id,
        type,
        content: {},
        position: prev.length + 1,
      },
    ]);
    console.log(widgetData);
  };

  const deleteWidget = async (id) => {
    setWidgetData((prev) => prev.filter((widget) => widget.id !== id));
    const { data, error } = await supabase
      .from("widgets")
      .delete()
      .eq("id", id);
    if (data) {
      toast.success("Widget deleted successfully");
    }
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
    console.log(widgetData);
    for (const widget of widgetData) {
      let paths = [];

      if (widget.content.fileData) {
        for (const file of widget.content.fileData) {
          const path = await uploadFile(file);
          if (path) {
            paths.push(path);
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
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10 flex-1">
      <div className="w-full max-w-sm md:max-w-3xl ">
        <div className="grid grid-cols-[25%_75%] gap-4">
          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              onClick={() => addWidget("profile-header")}
            >
              Add Profile Header
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
              }
            })}
            <SaveButton onClick={saveWidgets} />
          </div>
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}
