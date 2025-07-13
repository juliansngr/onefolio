import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { Trash2, GripVertical, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function FeaturedProjectsInput({
  data,
  onChange,
  onDelete,
  dragHandle,
  isDragging,
}) {
  console.log(data);

  const addProject = () => {
    onChange({
      ...data,
      projects: [
        ...data.projects,
        {
          title: "",
          description: "",
          liveUrl: "",
          githubUrl: "",
          technologies: [],
        },
      ],
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
          <h1 className="text-2xl font-bold">Featured Projects</h1>
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
          <Label htmlFor="sectionTitle">Title</Label>
          <Input
            id="sectionTitle"
            type="text"
            name="sectionTitle"
            placeholder={"My projects"}
            defaultValue={data.sectionTitle}
            required
            onChange={(e) => onChange({ ...data, title: e.target.value })}
          />
        </div>

        <div className="grid gap-3">
          {data.projects.map((project, index) => {
            return (
              <>
                <p className="text-md font-bold">Entry #{index + 1}</p>
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
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="projectTechnologies">Technologies</Label>
                      <Input
                        type="text"
                        defaultValue={project.technologies}
                        onChange={(e) => {
                          const newProjectData = [...(data.projects || [])];

                          newProjectData[index] = {
                            ...newProjectData[index],
                            technologies: e.target.value,
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
                  </div>
                </div>

                <div className="flex flex-row gap-3">
                  <div className="flex flex-col gap-2 w-1/2">
                    <Label htmlFor="projectGithubUrl">Github URL</Label>
                    <Input
                      id="projectGithubUrl"
                      placeholder="https://github.com/example"
                      defaultValue={project.githubUrl}
                      onChange={(e) => {
                        const newProjectData = [...(data.projects || [])];

                        newProjectData[index] = {
                          ...newProjectData[index],
                          githubUrl: e.target.value,
                        };

                        onChange({
                          ...data,
                          projects: newProjectData,
                        });
                      }}
                    />
                  </div>
                </div>
              </>
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
