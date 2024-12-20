import { HddStack } from "react-bootstrap-icons";

export default function RuleCard() {
  return (
    <div className="basis-1/3 border px-8 py-7 flex flex-col box-border rounded-lg shadow-sm gap-y-5">
      <HddStack className="text-2xl" />
      <div className="gap-y-3">
        <h2 className="text-base font-medium mb-2">
          Strict AI behavior with Rules
        </h2>
        <p className="max-w-sm text-sm text-[#78829D]">
          Set guidelines to control how the AI responds, tailor the AI's output
          to fit particular needs, preferences, or contexts.
        </p>
      </div>
      <p className=" text-sm text-blue-700">Learn more about Rule &gt;</p>
    </div>
  );
}
