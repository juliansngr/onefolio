import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage({ className, ...props }) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-6">
            <div className="flex flex-col gap-6 items-center justify-center">
              <h1 className="text-2xl font-bold">Success!</h1>
              <p className="text-muted-foreground text-balance text-center">
                Your account has been created successfully. Check your email for
                verification.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
