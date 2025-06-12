import SetupCard from "@/components/setup-card";
import ErrorToast from "./ErrorToast";
import { Toaster } from "@/components/ui/sonner";

export default async function SetupPage({ searchParams }) {
  const { error } = await searchParams;
  console.log(error);

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-lg">
        <SetupCard />
        {error && <ErrorToast error={error} />}
      </div>
    </div>
  );
}
