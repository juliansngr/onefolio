import { Button } from "@/components/ui/button";
import { subscribeToPro } from "./actions";

export default function SubscribeButton() {
  return (
    <form action={subscribeToPro}>
      <Button
        className="w-full bg-purple-600 hover:bg-purple-700 cursor-pointer"
        type="submit"
      >
        Upgrade Now
      </Button>
    </form>
  );
}
