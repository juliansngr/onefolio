import DefaultPortfolio from "@/components/templates/DefaultPortfolio/DefaultPortfolio";
import defaultData from "@/data/defaultData.json";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      {/* <DefaultPortfolio data={defaultData} /> */}

      <Link href="/auth/login">
        <Button className="cursor-pointer">Login</Button>
      </Link>
      <Link href="/auth/sign-up">
        <Button className="cursor-pointer">Signup</Button>
      </Link>
    </>
  );
}
