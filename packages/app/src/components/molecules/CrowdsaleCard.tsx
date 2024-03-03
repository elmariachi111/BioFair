import { Crowdsale } from "@/types";
import { formatEther, formatUnits } from "viem";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Y3QDkdRqUsV
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export const CrowdsaleCard = ({ crowdsale }: { crowdsale: Crowdsale }) => {
  return (
    <div className="card card-compact card-bordered shadow-xl p-4 w-full max-w-md">
      <div className="card-title flex flex-col gap-1 text-left items-start">
        <span className="text-lg m-0">
          Selling {formatUnits(crowdsale.salesAmount, crowdsale.token.decimals)}{" "}
          {crowdsale.token.name} ({crowdsale.token.symbol})
        </span>
        <span className="text-sm">
          Raising{" "}
          {formatUnits(
            crowdsale.fundingGoal,
            crowdsale.biddingToken?.decimals || 18
          )}{" "}
          {crowdsale.biddingToken?.symbol}
        </span>
      </div>
      <div className="card-body">
        <div className="grid gap-2">
          <div className="flex flex-row items-center gap-4">
            <div className="text-sm font-medium w-40">Funding Goal</div>
            <div className="flex flex-row items-center gap-2">
              <span className="font-semibold">
                {formatUnits(
                  crowdsale.fundingGoal,
                  crowdsale.biddingToken?.decimals || 18
                )}{" "}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {crowdsale.biddingToken?.symbol}
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <div className="text-sm font-medium w-40">Bids Placed</div>
            <div className="font-semibold">?</div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <div className="text-sm font-medium w-40">Started By</div>
            <div className="flex flex-row items-center gap-2">
              {/* <div className="avatar w-8 h-8">
                <img alt="Avatar" src="/placeholder-user.jpg" />
              </div> */}
              <div className="flex flex-col leading-tight max-w-10">
                <span className="font-medium"></span>
                <span className="text-sm text-ellipsis  text-gray-500 dark:text-gray-400 w-40 overflow-hidden">
                  {crowdsale.creator}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-full bg-gray-200 h-4 rounded-full">
              <div
                className="bg-gray-900 h-full rounded-full"
                style={{
                  width: "30%",
                }}
              />
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <div className="text-sm font-medium w-40">Amount Raised</div>
            <div className="flex flex-row items-center gap-2">
              <span className="font-semibold">
                {formatUnits(
                  crowdsale.amountRaised,
                  crowdsale.biddingToken?.decimals || 18
                )}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {crowdsale.biddingToken?.symbol}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
