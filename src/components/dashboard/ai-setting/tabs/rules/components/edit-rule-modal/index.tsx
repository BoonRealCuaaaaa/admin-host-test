import * as Dialog from "@radix-ui/react-dialog";
import { ChangeEvent, useEffect, useState } from "react";
import { PencilSquare, XLg } from "react-bootstrap-icons";
import { Separator } from "@src/components/shared/separator";
import { Button } from "@src/components/shared/button";

export interface EditRuleModalProps {
  content?: string;
  afterSave: (content: string) => void;
}

export default function EditRuleModal({
  content = "",
  afterSave,
}: EditRuleModalProps) {
  const [newContent, setNewContent] = useState(content);
  const [open, onOpenChange] = useState(false);

  useEffect(() => {
    if (content !== newContent) {
      setNewContent(content);
    }
  }, [content, newContent]);

  const MAX_LENGTH = 255;
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <div className="flex flex-row cursor-pointer">
          <button className="m-2">
            <PencilSquare className="text-base" />
          </button>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal aria-modal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-70 z-10" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] z-10">
          <Dialog.Title className="mb-2 text-base font-medium flex justify-between items-center">
            <p>Edit rule</p>
            <Dialog.Close asChild>
              <button>
                <XLg />
              </button>
            </Dialog.Close>
          </Dialog.Title>
          <Separator className="w-full" />
          <fieldset className="mb-5 mt-4 text-sm leading-normal flex flex-col">
            <textarea
              className="w-full h-20 border rounded-lg bg-gray-50 border-gray-300 p-2"
              placeholder="Write your rule here"
              value={newContent}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                if (newContent.length < MAX_LENGTH) {
                  setNewContent(event.target.value);
                }
              }}
            />
            <p className="text-sm text-jarvis-text ml-auto">{newContent.length}/{MAX_LENGTH}</p>
          </fieldset>
          <div className="flex justify-end gap-[25px]">
            <Dialog.Close asChild>
              <Button variant="secondary" size="medium">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button
                variant="primary"
                size="medium"
                className="w-16"
                onClick={() => afterSave(newContent)}
              >
                Save
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
