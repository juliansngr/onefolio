import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  GripVertical,
  Linkedin,
  Github,
  Globe,
  Twitter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import Image from "next/image";

export default function HeroInput({
  data,
  onChange,
  onDelete,
  dragHandle,
  isDragging,
}) {
  const [previewUrl, setPreviewUrl] = useState(data.files[0]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(newPreviewUrl);
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
          <h1 className="text-2xl font-bold">Hero Section</h1>
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
            <Label htmlFor="title">Job title</Label>
            <Input
              id="title"
              type="text"
              name="title"
              placeholder={"Full Stack Developer"}
              defaultValue={data.title}
              required
              onChange={(e) => onChange({ ...data, title: e.target.value })}
            />
          </div>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="description">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            placeholder="I'm a 24 years old Full Stack Developer with additional expertise in Graphic Design, SEO and Marketing."
            defaultValue={data.bio}
            onChange={(e) => onChange({ ...data, bio: e.target.value })}
          />
        </div>
        <div className="flex flex-row gap-3 w-full">
          <div className="flex flex-col gap-3 w-1/3">
            <Label htmlFor="email">Location</Label>
            <Input
              id="location"
              type="text"
              name="location"
              placeholder={"Berlin, Germany"}
              defaultValue={data.location}
              required
              onChange={(e) => onChange({ ...data, location: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-3 w-1/3">
            <Label htmlFor="email">Mail address</Label>
            <Input
              id="email"
              type="text"
              name="email"
              placeholder={"michael@example.com"}
              defaultValue={data.email}
              required
              onChange={(e) => onChange({ ...data, email: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-3 w-1/3">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="text"
              name="phone"
              placeholder={"+49 123 456 789"}
              defaultValue={data.phone}
              required
              onChange={(e) => onChange({ ...data, phone: e.target.value })}
            />
          </div>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="name">Profile picture</Label>
          <Input
            id="profilePicture"
            type="file"
            name="profilePicture"
            accept="image/*"
            required
            onChange={(e) => {
              handleImageChange(e);
              onChange({
                ...data,
                fileData: [{ index: 0, file: e.target.files[0] }],
              });
            }}
          />
          {previewUrl && (
            <Image
              src={previewUrl}
              alt="Preview"
              width={60}
              height={60}
              className="object-cover rounded-3xl w-25 h-25"
            />
          )}
        </div>
        <div className="flex flex-row gap-3 w-full">
          <div className="flex flex-col gap-3 w-1/2">
            <Label htmlFor="email">
              <Github className="w-4 h-4" />
              GitHub
            </Label>
            <Input
              id="email"
              type="text"
              name="email"
              placeholder={"https://github.com/michaelscott"}
              defaultValue={
                data.social.find((item) => item.platform === "GitHub")?.url
              }
              required
              onChange={(e) =>
                onChange({
                  ...data,
                  social: data.social.map((item) =>
                    item.platform === "GitHub"
                      ? { ...item, url: e.target.value }
                      : item
                  ),
                })
              }
            />
          </div>
          <div className="flex flex-col gap-3 w-1/2">
            <Label htmlFor="linkedin">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </Label>
            <Input
              id="linkedin"
              type="text"
              name="linkedin"
              placeholder={"https://www.linkedin.com/in/michaelscott"}
              defaultValue={
                data.social.find((item) => item.platform === "LinkedIn")?.url
              }
              required
              onChange={(e) =>
                onChange({
                  ...data,
                  social: data.social.map((item) =>
                    item.platform === "LinkedIn"
                      ? { ...item, url: e.target.value }
                      : item
                  ),
                })
              }
            />
          </div>
        </div>
        <div className="flex flex-row gap-3 w-full">
          <div className="flex flex-col gap-3 w-1/2">
            <Label htmlFor="x">
              <Twitter className="w-4 h-4" />
              Twitter / X
            </Label>
            <Input
              id="x"
              type="text"
              name="x"
              placeholder={"https://x.com/michaelscott"}
              defaultValue={
                data.social.find((item) => item.platform === "X")?.url
              }
              required
              onChange={(e) =>
                onChange({
                  ...data,
                  social: data.social.map((item) =>
                    item.platform === "X"
                      ? { ...item, url: e.target.value }
                      : item
                  ),
                })
              }
            />
          </div>
          <div className="flex flex-col gap-3 w-1/2">
            <Label htmlFor="website">
              <Globe className="w-4 h-4" />
              Website
            </Label>
            <Input
              id="website"
              type="text"
              name="website"
              placeholder={"https://michaelscott.com"}
              defaultValue={
                data.social.find((item) => item.platform === "Website")?.url
              }
              required
              onChange={(e) =>
                onChange({
                  ...data,
                  social: data.social.map((item) =>
                    item.platform === "Website"
                      ? { ...item, url: e.target.value }
                      : item
                  ),
                })
              }
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
