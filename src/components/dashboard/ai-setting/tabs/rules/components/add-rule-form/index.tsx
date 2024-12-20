import { Button } from "@src/components/shared/button";

export interface AddRuleFormProps {
    ruleInput: string;
    setRuleInput: (newRule: string) => void;
    onAddRule: () => void;
}

export default function AddRuleForm({ruleInput, setRuleInput, onAddRule} : AddRuleFormProps) {
  return (
    <div className="text-lg font-semibold basis-3/4 box-border ">
      <h2 className="border-x border-t px-7 py-4 rounded-t-lg shadow-sm text-base font-semibold">
        Add New Rule
      </h2>
      <div className="border-x border-b shadow-sm rounded-b-lg px-7 py-5 flex flex-col">
        <textarea
          className="w-full h-20 border rounded-md bg-gray-50 border-gray-300 p-2 text-sm font-sans font-normal outline-none"
          placeholder="Write your rule here..."
          value={ruleInput}
          onChange={(e) => setRuleInput(e.target.value)}
          maxLength={255}
        />
        <p className="text-xs text-jarvis-text mt-2 self-end font-normal">{`${ruleInput.length}/255`}</p>
        <Button
          variant="primary"
          size="medium"
          disabled={ruleInput.length === 0}
          className="self-end h-9 w-20 mt-4 mb-2 text-xs"
          onClick={onAddRule}
        >
          Add Rule
        </Button>
      </div>
    </div>
  );
}
