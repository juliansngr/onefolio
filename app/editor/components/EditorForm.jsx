"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProfileHeaderInput from "./widgets/ProfileHeaderInput";
import SaveButton from "./SaveButton";

export default function EditorForm({ widgets, user }) {
  const [widgetData, setWidgetData] = useState(widgets);

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

  const updateWidgetContent = (index, content) => {
    setWidgetData((prev) =>
      prev.map((widget, i) => (i === index ? { ...widget, content } : widget))
    );
  };

  const saveWidgets = async () => {
    console.log(widgetData);
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
                      onChange={(content) =>
                        updateWidgetContent(index, content)
                      }
                    />
                  );
              }
            })}
            <SaveButton onClick={saveWidgets} />
          </div>
        </div>
      </div>
    </div>
  );
}
