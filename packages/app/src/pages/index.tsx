import { CreatePlainCrowdsaleForm } from "@/components/crowdsales/CreatePlainCrowdsaleForm";
import { CrowdsaleCard } from "@/components/molecules/CrowdsaleCard";
import {
  AllCrowdsalesDocument,
  AllCrowdsalesQuery,
  execute,
} from "@/generated/graphclient";
import { useEffect, useState } from "react";

export default function Home() {
  const [crowdSales, setCrowdSales] = useState<
    AllCrowdsalesQuery["crowdSales"]
  >([]);
  useEffect(() => {
    (async () => {
      const result = await execute(AllCrowdsalesDocument, {});
      setCrowdSales(result.data.crowdSales);
    })();
  });

  return (
    <div className="flex flex-col ">
      <div className="prose mb-4">
        <h1>All CrowdSales</h1>
        <div className="grid gap-4">
          {crowdSales.map((crowdSale) => (
            <CrowdsaleCard key={crowdSale.id} crowdsale={crowdSale} />
          ))}
        </div>
      </div>
    </div>
  );
}
