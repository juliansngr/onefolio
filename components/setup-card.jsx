import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { setUsername } from "@/app/setup/actions";

export default function SetupCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Setup</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <Input type="text" name="username" />
          <Button type="submit" formAction={setUsername}>
            Set Username
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
