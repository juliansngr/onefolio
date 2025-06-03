import DefaultPortfolio from "@/components/templates/DefaultPortfolio/DefaultPortfolio";
import defaultData from "@/data/defaultData.json";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <DefaultPortfolio data={defaultData} />
      <Button onClick={redirect("/auth/login")}>Login</Button>
    </>
  );
}
