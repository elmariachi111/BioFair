import { CreatePlainCrowdsaleForm } from "@/components/crowdsales/CreatePlainCrowdsaleForm";

export default function Create() {
  return (
    <div className="flex flex-col ">
      <div className="prose mb-4">
        <h1>Create Plain Sale</h1>
      </div>
      <CreatePlainCrowdsaleForm />
    </div>
  );
}
