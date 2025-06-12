import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { setUsername } from "@/app/setup/actions";
import { Label } from "./ui/label";

export default function SetupCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Almost done...</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              Now just pick a unique username. This will be used to identify
              your portfolio and will be displayed in the URL.
            </p>
            <p className="text-sm text-muted-foreground">
              e.g. https://onefol.io/u/
              <span className="font-bold">username</span>
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Username</Label>
            <Input type="text" name="username" required />
          </div>
          <Button
            type="submit"
            formAction={setUsername}
            className="cursor-pointer"
          >
            Set Username
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
