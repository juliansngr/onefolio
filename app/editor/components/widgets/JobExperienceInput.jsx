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

export default function JobExperienceInput({
  data,
  onChange,
  onDelete,
  dragHandle,
  isDragging,
}) {
  const addJob = () => {
    onChange({
      ...data,
      jobData: [
        ...data.jobData,
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
          location: "",
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
          <h1 className="text-2xl font-bold">Job Experience</h1>
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
          <Label htmlFor="description">Public Section Title</Label>
          <Input
            id="description"
            type="text"
            name="title"
            placeholder={"My past jobs"}
            defaultValue={data.title}
            required
            onChange={(e) => onChange({ ...data, title: e.target.value })}
          />
        </div>

        <div className="grid gap-3">
          {data.jobData.map((job, index) => {
            return (
              <>
                <p className="text-md font-bold">Entry #{index + 1}</p>
                <div className="flex flex-row gap-3">
                  <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor="jobPosition">Position</Label>
                    <Input
                      id="jobPosition"
                      placeholder="Software Engineer"
                      defaultValue={job.position}
                      onChange={(e) => {
                        const newJobData = [...(data.jobData || [])];

                        newJobData[index] = {
                          ...newJobData[index],
                          position: e.target.value,
                        };

                        onChange({
                          ...data,
                          jobData: newJobData,
                        });
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor="jobCompany">Company</Label>
                    <Input
                      id="jobCompany"
                      placeholder="onfol.io Inc."
                      defaultValue={job.company}
                      onChange={(e) => {
                        const newJobData = [...(data.jobData || [])];

                        newJobData[index] = {
                          ...newJobData[index],
                          company: e.target.value,
                        };

                        onChange({
                          ...data,
                          jobData: newJobData,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-3">
                  <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor="jobDescription">Job Description</Label>
                    <Textarea
                      id="jobDescription"
                      className="h-full"
                      placeholder="Led development of scalable web applications using React and Node.js. Improved application performance by 40% and mentored junior developers."
                      defaultValue={job.description}
                      onChange={(e) => {
                        const newJobData = [...(data.jobData || [])];

                        newJobData[index] = {
                          ...newJobData[index],
                          description: e.target.value,
                        };

                        onChange({
                          ...data,
                          jobData: newJobData,
                        });
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        type="month"
                        defaultValue={job.startDate}
                        onChange={(e) => {
                          const newJobData = [...(data.jobData || [])];

                          newJobData[index] = {
                            ...newJobData[index],
                            startDate: e.target.value,
                          };

                          onChange({
                            ...data,
                            jobData: newJobData,
                          });
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        type="month"
                        defaultValue={job.endDate}
                        onChange={(e) => {
                          const newJobData = [...(data.jobData || [])];

                          newJobData[index] = {
                            ...newJobData[index],
                            endDate: e.target.value,
                          };

                          onChange({
                            ...data,
                            jobData: newJobData,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-row gap-3">
                  <div className="flex flex-col gap-2 w-1/2">
                    <Label htmlFor="jobLocation">Location</Label>
                    <Input
                      id="jobLocation"
                      placeholder="Berlin, Germany"
                      defaultValue={job.location}
                      onChange={(e) => {
                        const newJobData = [...(data.jobData || [])];

                        newJobData[index] = {
                          ...newJobData[index],
                          location: e.target.value,
                        };

                        onChange({
                          ...data,
                          jobData: newJobData,
                        });
                      }}
                    />
                  </div>
                </div>
              </>
            );
          })}
          <Button variant="outline" onClick={addJob}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
