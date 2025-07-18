"use client";

import { useState } from "react";

import ProfileHeaderInput from "./widgets/ProfileHeaderInput";
import TextAndIconsInput from "./widgets/TextAndIconsInput";
import JobExperienceInput from "./widgets/JobExperienceInput";
import SpacerInput from "./widgets/SpacerInput";
import ContactFormInput from "./widgets/ContactFormInput";
import HeaderInput from "./widgets/HeaderInput";
import HeroInput from "./widgets/HeroInput";
import TagsInput from "./widgets/TagsInput";
import FeaturedProjectsInput from "./widgets/FeaturedProjectsInput";
import ExperienceInput from "./widgets/ExperienceInput";

import SaveButton from "./SaveButton";
import { createClient } from "@/lib/supabase/browserClient";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { getIcon, getImageSettings } from "@/lib/editorFunctions";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Plus } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { updateMainPortfolio } from "./actions";

export default function EditorForm({
  widgets,
  user,
  portfolioId,
  portfolioTheme,
  widgetList,
  isMainPortfolio: isMain,
}) {
  const [widgetData, setWidgetData] = useState(widgets);
  const [isSaving, setIsSaving] = useState(false);
  const [isMainPortfolio, setIsMainPortfolio] = useState(isMain);
  const supabase = createClient();

  const addWidget = (type, data_scheme) => {
    setWidgetData((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        user_id: user.id,
        type,
        content: data_scheme,
        position: prev.length + 1,
        portfolio_id: portfolioId,
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

  const convertImageToWebP = async (
    file,
    aspectW,
    aspectH,
    targetW,
    targetH
  ) => {
    const img = await createImageBitmap(file);
    const origW = img.width;
    const origH = img.height;

    // Berechne Original- und gewünschtes Ratio
    const origRatio = origW / origH;
    const desiredRatio = aspectW / aspectH;

    // Crop-Größe bestimmen
    let cropW, cropH;
    if (origRatio > desiredRatio) {
      // Bild ist zu breit → seitlich abschneiden
      cropH = origH;
      cropW = Math.round(origH * desiredRatio);
    } else {
      // Bild ist zu hoch → oben/unten abschneiden
      cropW = origW;
      cropH = Math.round(origW / desiredRatio);
    }
    const cropX = Math.round((origW - cropW) / 2);
    const cropY = Math.round((origH - cropH) / 2);

    // Canvas in Ziel­größe anlegen
    const canvas = document.createElement("canvas");
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext("2d");

    // drawImage(SourceCrop → Ziel-Skalierung)
    ctx.drawImage(
      img,
      cropX,
      cropY,
      cropW,
      cropH, // Ausschnitt aus Original
      0,
      0,
      targetW,
      targetH // Ziel-Größe im Canvas
    );

    // Gib WebP-Blob zurück
    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/webp");
    });
  };

  const uploadFile = async (file, widgetType) => {
    const {
      aspectW = 1,
      aspectH = 1,
      targetW = null,
      targetH = null,
    } = getImageSettings(widgetType) || {};

    const webpFile = await convertImageToWebP(
      file,
      aspectW,
      aspectH,
      targetW,
      targetH
    );

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

          const oldUrl = paths[index];
          if (oldUrl) {
            try {
              const url = new URL(oldUrl);
              const parts = url.pathname.split("/images/");
              const bucketPath = parts[1];

              const { error: deleteError } = await supabase.storage
                .from("images")
                .remove([bucketPath]);

              if (deleteError) {
                console.warn("Could not delete old image:", deleteError);
              }
            } catch (e) {
              console.warn("Error parsing old URL:", oldUrl, e);
            }
          }

          const path = await uploadFile(file.file, widget.type);
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
        portfolio_id: widget.portfolio_id,
      });

      const { error: updateError } = await supabase
        .from("portfolios")
        .update({
          updated_at: new Date().toISOString(),
        })
        .eq("id", widget.portfolio_id);

      if (error) {
        toast.error("Error saving widgets");
      } else {
        toast.success("Widgets saved successfully");
      }
    }
    setIsSaving(false);
  };

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    const draggedWidget = widgetData.find(
      (widget) => widget.id === draggableId
    );

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const updatedWidgets = widgetData.filter(
      (widget) => widget.id !== draggedWidget.id
    );

    updatedWidgets.splice(destination.index, 0, draggedWidget);

    const reOrdered = updatedWidgets.map((widget, index) => ({
      ...widget,
      position: index + 1,
    }));

    setWidgetData(reOrdered);
  };

  const handleMainPortfolioChange = async () => {
    const { error } = await updateMainPortfolio(portfolioId);
    if (error) {
      toast.error(`Error: ${error}`);
    } else {
      toast.success("Main portfolio updated");
      setIsMainPortfolio(!isMainPortfolio);
    }
  };

  const widgetComponentMap = {
    "about-me": ProfileHeaderInput,
    "text-and-icons": TextAndIconsInput,
    "job-experience": JobExperienceInput,
    spacer: SpacerInput,
    "contact-form": ContactFormInput,
    header: HeaderInput,
    hero: HeroInput,
    tags: TagsInput,
    "featured-projects": FeaturedProjectsInput,
    experience: ExperienceInput,
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="bg-muted min-h-svh p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-6xl mx-auto">
          <div className="grid grid-cols-[30%_70%] gap-4 items-start">
            <div className="flex flex-col gap-4 sticky top-6">
              <div className="p-6 border-b border-gray-200">
                <h1 className="text-xl font-semibold text-gray-900">
                  Portfolio Editor
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Add widgets to build your portfolio
                </p>
              </div>
              <div className="px-6 pb-6 border-b border-gray-200">
                <h1 className="text-xl font-semibold text-gray-900">
                  Settings
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-gray-600">Main portfolio</p>
                  <Switch
                    className="cursor-pointer relative"
                    checked={isMainPortfolio}
                    onCheckedChange={handleMainPortfolioChange}
                  />
                </div>
              </div>
              {widgetList.map((template) => (
                <Card
                  className="cursor-pointer hover:shadow-md transition-shadow p-0"
                  key={template.type}
                  onClick={() => addWidget(template.type, template.data_scheme)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        {getIcon(template.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{template.name}</h4>
                        <p className="text-xs text-gray-600 mt-1">
                          {template.description}
                        </p>
                      </div>
                      <Plus className="w-4 h-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
              <div className="flex flex-col gap-2">
                <SaveButton onClick={saveWidgets} isSaving={isSaving} />
                <Button
                  variant="outline"
                  className="w-full py-6 cursor-pointer"
                  onClick={() => redirect("/editor")}
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Overview
                </Button>
              </div>
            </div>

            {/* Editor Area */}

            <Droppable droppableId="widget-drop-area">
              {(provided) => (
                <div
                  className="flex flex-col gap-4"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {widgetData.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Plus className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Start building your portfolio
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Add widgets from the sidebar to create your
                          professional portfolio
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {widgetData.map((widget, index) => {
                        const Component = widgetComponentMap[widget.type];
                        if (!Component) return null;

                        return (
                          <Draggable
                            draggableId={widget.id}
                            index={index}
                            key={widget.id}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Component
                                  data={widget.content}
                                  onChange={(content) =>
                                    updateWidgetContent(index, content)
                                  }
                                  onDelete={() => deleteWidget(widget.id)}
                                  dragHandle={provided.dragHandleProps}
                                  isDragging={snapshot.isDragging}
                                />
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                    </>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
        <Toaster position="top-center" richColors />
      </div>
    </DragDropContext>
  );
}
