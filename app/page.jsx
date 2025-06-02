import DefaultPortfolio from "@/components/templates/DefaultPortfolio/DefaultPortfolio";
import defaultData from "@/data/defaultData.json";

import { Button } from "@/components/ui/button";
import { logout } from "@/app/login/actions";

export default function Home() {
  return (
    <>
      <DefaultPortfolio data={defaultData} />
      <Button onClick={logout}>Logout</Button>
    </>
  );
}
