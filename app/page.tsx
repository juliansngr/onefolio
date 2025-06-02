import DefaultPortfolio from "@/components/templates/DefaultPortfolio/DefaultPortfolio";
import defaultData from "@/data/defaultData.json";

export default function Home() {
  return <DefaultPortfolio data={defaultData} />;
}
