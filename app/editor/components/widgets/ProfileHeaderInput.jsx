import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function ProfileHeaderInput({ data, onChange, onDelete }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="flex flex-col gap-6 p-6 md:p-8">
        <div className="flex flex-row items-center justify-between text-center">
          <h1 className="text-2xl font-bold">Profile Header</h1>
          <Button variant="outline" onClick={onDelete}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="name">Display name</Label>
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
        <div className="grid gap-3">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="I'm a 24 years old Full Stack Developer with additional expertise in Graphic Design, SEO and Marketing."
            defaultValue={data.description}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="name">Profile picture</Label>
          <Input
            id="profilePicture"
            type="file"
            name="profilePicture"
            accept="image/*"
            required
            onChange={(e) =>
              onChange({
                ...data,
                fileData: [{ index: 0, file: e.target.files[0] }],
              })
            }
          />
        </div>
      </div>
    </Card>
  );
}
