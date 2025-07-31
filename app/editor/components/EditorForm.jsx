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
import ReviewsInput from "./widgets/ReviewsInput";

import SaveButton from "./SaveButton";
import { createClient } from "@/lib/supabase/browserClient";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { getIcon, getImageSettings } from "@/lib/editorFunctions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Settings, Layout, Grip } from "lucide-react";
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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
    reviews: ReviewsInput,
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => redirect("/editor")}
                  className="text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Overview
                </Button>
                <div className="h-6 w-px bg-slate-300" />
                <div>
                  <h1 className="text-lg font-semibold text-slate-900">
                    Portfolio Editor
                  </h1>
                  <p className="text-sm text-slate-500">
                    Create your professional portfolio
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Settings className="w-4 h-4" />
                  <span>Main Portfolio</span>
                  <Switch
                    checked={isMainPortfolio}
                    onCheckedChange={handleMainPortfolioChange}
                    className="data-[state=checked]:bg-emerald-600"
                  />
                </div>
                <div className="h-6 w-px bg-slate-300" />
                <SaveButton onClick={saveWidgets} isSaving={isSaving} />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-3 mb-8 lg:mb-0">
              <div className="sticky top-24 space-y-6">
                {/* Widget Library */}
                <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg shadow-slate-200/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-900">
                      <Layout className="w-5 h-5 text-indigo-600" />
                      Widget Library
                    </CardTitle>
                    <p className="text-sm text-slate-600">
                      Drag & drop widgets into your editor
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3 px-4">
                    {widgetList.map((template) => (
                      <Card
                        key={template.type}
                        className="group cursor-pointer hover:shadow-md hover:shadow-indigo-200/30 transition-all duration-200 hover:scale-[1.02] border-slate-200/60 bg-white/80 py-0"
                        onClick={() =>
                          addWidget(template.type, template.data_scheme)
                        }
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl group-hover:from-indigo-100 group-hover:to-indigo-200 transition-colors">
                              {getIcon(template.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm text-slate-900 truncate">
                                {template.name}
                              </h4>
                              <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                                {template.description}
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                                <Plus className="w-4 h-4 text-indigo-600" />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Editor Area */}
            <div className="lg:col-span-9">
              <Droppable droppableId="widget-drop-area">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[600px] rounded-2xl border-2 border-dashed transition-all duration-200 ${
                      snapshot.isDraggingOver
                        ? "border-indigo-400 bg-indigo-50/50"
                        : "border-slate-300/60 bg-white/40"
                    }`}
                  >
                    {widgetData.length === 0 ? (
                      <div className="flex items-center justify-center h-96">
                        <div className="text-center max-w-md mx-auto px-4">
                          <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Layout className="w-10 h-10 text-indigo-600" />
                          </div>
                          <h3 className="text-xl font-semibold text-slate-900 mb-3">
                            Start building your portfolio
                          </h3>
                          <p className="text-slate-600 mb-6 leading-relaxed">
                            Add widgets from the sidebar to create your
                            professional portfolio. You can arrange them with
                            drag & drop.
                          </p>
                          <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                            <Grip className="w-4 h-4" />
                            <span>Drag & Drop enabled</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 space-y-4">
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
                                  className={`transform transition-all duration-200 ${
                                    snapshot.isDragging
                                      ? "rotate-3 scale-105 shadow-2xl shadow-indigo-200/40"
                                      : "hover:shadow-lg hover:shadow-slate-200/60"
                                  }`}
                                >
                                  <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200/60 overflow-hidden">
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
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </div>

        <Toaster
          position="top-center"
          richColors
          expand={true}
          closeButton={true}
        />
      </div>
    </DragDropContext>
  );
}
