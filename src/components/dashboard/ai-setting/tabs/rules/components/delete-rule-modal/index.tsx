import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "@src/components/shared/button";
import { Separator } from "@src/components/shared/separator";
import { Trash3, XLg } from "react-bootstrap-icons";

export interface DeleteRuleModalProps {
    ruleId: string;
    content?: string;
    afterDelete: (ruleId: string) => void;
}

export default function DeleteRuleModal({ruleId, content, afterDelete}: DeleteRuleModalProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <div className="flex flex-row">
          <button className="m-2">
            <Trash3 className="text-lg" />
          </button>
        </div>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black opacity-70 z-10" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white z-10 ">
          <AlertDialog.Title className="mb-2 text-base font-medium flex justify-between items-center pt-4 pl-5 pr-4">
            <p>Delete Rule</p>
            <AlertDialog.Cancel asChild>
              <button>
                <XLg />
              </button>
            </AlertDialog.Cancel>
          </AlertDialog.Title>
          <Separator className="w-full" />
          <AlertDialog.Description
            className=" text-sm leading-normal flex flex-col space-y-5 p-4 pl-6"
            asChild
          >
            <div>
              <p className="text-gray-700 ">
                Are you sure to delete this{" "}
                <span className="font-semibold text-black">Rule</span>?
              </p>
              <div className="border rounded-lg bg-gray-200 p-3  font-normal">
                {content}
              </div>
              <p className="text-red-500 font-normal">
                WARNING:{" "}
                <span className="text-gray-700 font-normal">
                  This action cannot be undone.
                </span>
              </p>
            </div>
          </AlertDialog.Description>
          <Separator />
          <div className="flex justify-end space-x-5 pb-4 pr-4 pt-4">
            <AlertDialog.Cancel asChild>
              <Button variant="secondary" size="medium">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button
                variant="danger"
                size="medium"
                onClick={() => afterDelete(ruleId)}
              >
                Delete
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
