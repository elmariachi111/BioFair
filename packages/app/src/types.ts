import { AllCrowdsalesQuery } from "./generated/graphclient";

export type Crowdsale = AllCrowdsalesQuery["crowdSales"][number];
