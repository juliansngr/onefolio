import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { Trash2, GripVertical, Plus, Upload } from "lucide-react";

import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

export default function ExperienceInput({
  data,
  onChange,
  onDelete,
  dragHandle,
  isDragging,
}) {
  const [previewUrls, setPreviewUrls] = useState(data.files);

  const addProject = () => {
    onChange({
      ...data,
      projects: [
        ...data.projects,
        {
          icon: "",
          color: "",
          company: "",
          endDate: "",
          location: "",
          position: "",
          startDate: "",
          description: "",
        },
      ],
    });
  };

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

  const deleteProject = (index) => {
    const newProjectData = [...(data.projects || [])];
    newProjectData.splice(index, 1);

    onChange({
      ...data,
      projects: newProjectData,
    });
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
          <h1 className="text-2xl font-bold">Experience</h1>
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
        <div className="grid gap-3">
          <Label htmlFor="sectionTitle">Section Title</Label>
          <Input
            id="sectionTitle"
            type="text"
            name="sectionTitle"
            placeholder={"Experience "}
            defaultValue={data.title}
            required
            onChange={(e) => onChange({ ...data, title: e.target.value })}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="sectionDescription">Section Description</Label>
          <Input
            id="sectionDescription"
            type="text"
            name="sectionDescription"
            placeholder={"Some cool stuff I've built"}
            defaultValue={data.description}
            required
            onChange={(e) => onChange({ ...data, description: e.target.value })}
          />
        </div>
        <hr className="my-4" />
        <div className="grid gap-10">
          {data.experience.map((experience, index) => {
            return (
              <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center justify-between text-center">
                  <p className="text-lg font-bold">Experience #{index + 1}</p>
                  <Button
                    variant="secondary"
                    className="cursor-pointer hover:bg-red-500 hover:text-white"
                    onClick={() => deleteProject(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-row gap-3">
                  <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor="projectTitle">Title</Label>
                    <Input
                      id="projectTitle"
                      placeholder="Project Title"
                      defaultValue={project.title}
                      onChange={(e) => {
                        const newProjectData = [...(data.projects || [])];

                        newProjectData[index] = {
                          ...newProjectData[index],
                          title: e.target.value,
                        };

                        onChange({
                          ...data,
                          projects: newProjectData,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-3">
                  <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor="projectDescription">Description</Label>
                    <Textarea
                      id="projectDescription"
                      className="h-full"
                      placeholder="Led development of scalable web applications using React and Node.js. Improved application performance by 40% and mentored junior developers."
                      defaultValue={project.description}
                      onChange={(e) => {
                        const newProjectData = [...(data.projects || [])];

                        newProjectData[index] = {
                          ...newProjectData[index],
                          description: e.target.value,
                        };

                        onChange({
                          ...data,
                          projects: newProjectData,
                        });
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="projectImage">Image</Label>

                    <div className="grid gap-3">
                      {previewUrls[index] ? (
                        <Label
                          htmlFor={`projectImage-${index}`}
                          className="w-48 h-32 flex items-center justify-center border-1 border-gray-300 hover:border-gray-400 hover:bg-gray-100 text-gray-300 rounded-lg cursor-pointer overflow-hidden"
                        >
                          <Image
                            src={previewUrls[index]}
                            alt="Preview"
                            width={100}
                            height={100}
                            className="object-cover w-48 h-32 "
                          />
                        </Label>
                      ) : (
                        <Label
                          htmlFor={`projectImage-${index}`}
                          className="w-48 h-32 border-1 border-gray-300 hover:border-gray-400 hover:bg-gray-100 text-gray-300 rounded-lg cursor-pointer flex items-center justify-center"
                        >
                          <Upload className="w-8 h-8" />
                        </Label>
                      )}

                      <Input
                        id={`projectImage-${index}`}
                        type="file"
                        name={`projectImage-${index}`}
                        accept="image/*"
                        style={{ display: "none" }}
                        required
                        onChange={(e) => {
                          handleImageChange(index, e);
                          const newFileData = [...(data.fileData || [])];
                          newFileData[index] = {
                            index: index,
                            file: e.target.files[0],
                          };

                          onChange({ ...data, fileData: newFileData });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-row gap-3">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="projectTechnologies">Technologies</Label>
                    <Input
                      type="text"
                      placeholder="Photoshop, HTML, CSS"
                      defaultValue={project.technologies}
                      onChange={(e) => {
                        const newProjectData = [...(data.projects || [])];

                        newProjectData[index] = {
                          ...newProjectData[index],
                          technologies: e.target.value
                            .split(",")
                            .map((t) => t.trim()),
                        };

                        onChange({
                          ...data,
                          projects: newProjectData,
                        });
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="projectLiveUrl">Live URL</Label>
                    <Input
                      type="text"
                      defaultValue={project.liveUrl}
                      onChange={(e) => {
                        const newProjectData = [...(data.projects || [])];

                        newProjectData[index] = {
                          ...newProjectData[index],
                          liveUrl: e.target.value,
                        };

                        onChange({
                          ...data,
                          projects: newProjectData,
                        });
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-1/2">
                    <Label htmlFor="projectAdditionalUrl">Additional URL</Label>
                    <Input
                      id="projectAdditionalUrl"
                      placeholder="https://example.com"
                      defaultValue={project.additionalUrl}
                      onChange={(e) => {
                        const newProjectData = [...(data.projects || [])];

                        newProjectData[index] = {
                          ...newProjectData[index],
                          additionalUrl: e.target.value,
                        };

                        onChange({
                          ...data,
                          projects: newProjectData,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <Button variant="outline" onClick={addProject}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
