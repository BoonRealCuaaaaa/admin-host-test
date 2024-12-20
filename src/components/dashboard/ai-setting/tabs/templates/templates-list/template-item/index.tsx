import * as RadioGroup from "@radix-ui/react-radio-group";

import { PencilSquare, Trash, XLg } from "react-bootstrap-icons";

import * as Form from "@radix-ui/react-form";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { activeTemplateApi, deleteTemplateApi, updateTemplateApi } from "@src/api/template.api";
import { useToast } from "@src/hooks/use-toast";
import SuccessToastDescription from "@src/components/shared/toaster/success-toast-description";
import { Separator } from "@src/components/shared/separator";
import { Button } from "@src/components/shared/button";
import { useAppStore } from "@src/store";
import { RadioGroupCardSeparateItem } from "@src/components/shared/radio-group/card-separate"
import { Label, Description, LabelGroup } from "@src/components/shared/label";
import { EditTemplateForm } from "../../edit-template-form";

import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogMainContent,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@src/components/shared/alert-dialog"

const TemplateItem = ({ name, description, template, id, isActive, selected, setSelected, refetchTemplates }) => {
   const { register, handleSubmit, watch } = useForm({
      defaultValues: { name, description, template },
   });
   const { toast } = useToast();
   const assistant = useAppStore((state) => state.workspace);
   const { mutate: update } = useMutation({
      mutationFn: updateTemplateApi,
      onSuccess: () => {
         refetchTemplates();
         setSelected(null);
         toast({
            variant: "success",
            description: <SuccessToastDescription content="Update template successfully" />,
         });
      },
   });

   const { mutate: activeTemplate } = useMutation({
      mutationFn: activeTemplateApi,
      onSuccess: () => {
         refetchTemplates();
         toast({
            variant: "success",
            description: <SuccessToastDescription content="Update template successfully" />,
         });
      },
   });

   const { mutate: deleteTemplate } = useMutation({
      mutationFn: deleteTemplateApi,
      onSuccess: () => {
         refetchTemplates();
         setSelected(null);
         toast({
            variant: "success",
            description: <SuccessToastDescription content="Delete template successfully" />,
         });
      },
   });

   const onSubmit = (data) => {
      console.log("HERE");
      console.log(data);
      const updatedTemplate = {
         name: data.name,
         description: data.description,
         template: data.template,
      };
      update({ id: id, data: updatedTemplate });
   };

   return selected !== id ? (
      <RadioGroupCardSeparateItem
         value={id}
         checked={isActive}
         onClick={() => {
            activeTemplate({ id: id, assistantId: assistant.id });
         }}>
         <LabelGroup className="flex-1">
            <Label>{name}</Label>
            <Description>{description}</Description>
         </LabelGroup>
         <div className="flex gap-x-0.5">
            <Button variant="ghost" size="icon" onClick={() => setSelected(id)}>
               <PencilSquare />
            </Button>
            <AlertDialog>
               <AlertDialogTrigger>
                  <Button variant="ghost" size="icon">
                     <Trash />
                  </Button>
               </AlertDialogTrigger>
               <AlertDialogContent>
                  <AlertDialogHeader>
                     <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogMainContent>
                  Are you sure to delete template Email template?
                  </AlertDialogMainContent>
                  <AlertDialogFooter>
                     <AlertDialogCancel>
                        <Button size="medium">Cancel</Button>
                     </AlertDialogCancel>
                     <AlertDialogAction>
                        <Button variant="danger" size="medium" onClick={() => deleteTemplate(id)}>Delete</Button>
                     </AlertDialogAction>
                  </AlertDialogFooter>
               </AlertDialogContent>
            </AlertDialog>
         </div>
      </RadioGroupCardSeparateItem>
      // <>
      //    <div className="flex items-center space-x-2 border shadow-sm p-4 justify-between rounded-xl">
      //       <div className="flex space-x-3 items-center">
      //             <RadioGroup.Item
      //                className="w-8 h-8 rounded-full border shadow-sm data-[state=checked]:bg-blue-500 "
      //                value={id}
      //                checked={isActive}
      //                onClick={() => {
      //                   console.log("HEHE")
      //                   activeTemplate({ id: id, assistantId: assistant.id });
      //                }}>
      //                <RadioGroup.Indicator className=" flex items-center justify-center after:block after:size-4 after:rounded-full after:bg-white" />
      //             </RadioGroup.Item>

      //          <div className="">
      //             <h2 className="text-base font-semibold">{name}</h2>
      //             <p className="text-jarvis-text">{description}</p>
      //          </div>
      //       </div>
      //       <div className="flex space-x-3">
      //          <button
      //             className=""
      //             onClick={() => {
      //                setSelected(id);
      //             }}>
      //             <PencilSquare className="text-2xl text-gray-500" />
      //          </button>
      //          <AlertDialog.Root>
      //             <AlertDialog.Trigger asChild>
      //                <div className="flex flex-row">
      //                   <button className="m-2">
      //                      <Trash className="text-2xl" />
      //                   </button>
      //                </div>
      //             </AlertDialog.Trigger>
      //             <AlertDialog.Portal>
      //                <AlertDialog.Overlay className="fixed inset-0 bg-black opacity-70 z-10" />
      //                <AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white z-10 ">
      //                   <AlertDialog.Title className="mb-2 text-base font-medium flex justify-between items-center pt-4 pl-5 pr-4">
      //                      <span>Delete Template</span>
      //                      <AlertDialog.Cancel asChild>
      //                         <button>
      //                            <XLg />
      //                         </button>
      //                      </AlertDialog.Cancel>
      //                   </AlertDialog.Title>
      //                   <Separator className="w-full" />
      //                   <AlertDialog.Description
      //                      className=" text-sm leading-normal flex flex-col space-y-5 p-4 pl-6"
      //                      asChild>
      //                      <div>
      //                         <span className="text-gray-700 ">
      //                            Are you sure to delete template
      //                            <span className="font-semibold text-black">{" " + name}</span>?
      //                         </span>
      //                         <span className="text-red-500 font-normal">
      //                            WARNING:{" "}
      //                            <span className="text-gray-700 font-normal">This action cannot be undone.</span>
      //                         </span>
      //                      </div>
      //                   </AlertDialog.Description>
      //                   <Separator />
      //                   <div className="flex justify-end space-x-5 pb-4 pr-4 pt-4">
      //                      <AlertDialog.Cancel asChild>
      //                         <Button variant="secondary" size="default">
      //                            Cancel
      //                         </Button>
      //                      </AlertDialog.Cancel>
      //                      <AlertDialog.Action asChild>
      //                         <Button
      //                            variant="danger"
      //                            size="default"
      //                            onClick={() => {
      //                               deleteTemplate(id);
      //                            }}>
      //                            Delete
      //                         </Button>
      //                      </AlertDialog.Action>
      //                   </div>
      //                </AlertDialog.Content>
      //             </AlertDialog.Portal>
      //          </AlertDialog.Root>
      //       </div>
      //    </div>
      // </>
   ) : (
      // <div className={`border rounded-lg my-4 p-4 shadow-sm`}>
      //    <Form.Root className="w-full flex flex-col space-y-2" onSubmit={handleSubmit(onSubmit)}>
      //       <Form.Field name="template-name">
      //          <Form.Label className="text-base font-medium leading-8 ">Name</Form.Label>
      //          <Form.Control asChild>
      //             <input
      //                className="h-9 w-full inline-flex justify-center items-center px-2 border border-gray-300  leading-none rounded-lg"
      //                type="text"
      //                required
      //                placeholder="Template name..."
      //                value={watch("name")}
      //                {...register("name")}
      //                maxLength={255}
      //             />
      //          </Form.Control>
      //          <div className="flex justify-between my-1">
      //             <Form.Message className="text-red-500 text-sm" match="valueMissing">
      //                Cannot be empty
      //             </Form.Message>
      //             <p className="text-sm text-jarvis-text ml-auto">{`${watch("name").length}/255`}</p>
      //          </div>
      //       </Form.Field>
      //       <Form.Field name="template-description">
      //          <Form.Label className="text-base font-medium leading-8 ">Description</Form.Label>
      //          <Form.Control asChild>
      //             <input
      //                className="h-9 w-full inline-flex justify-center items-center px-2 border border-gray-300 rounded-lg leading-none  "
      //                type="text"
      //                required
      //                value={watch("description")}
      //                {...register("description")}
      //                maxLength={255}
      //             />
      //          </Form.Control>
      //          <div className="flex justify-between my-1">
      //             <Form.Message className="text-red-500 text-sm" match="valueMissing">
      //                Cannot be empty
      //             </Form.Message>
      //             <p className="text-sm text-jarvis-text ml-auto">{`${watch("description").length}/255`}</p>
      //          </div>
      //       </Form.Field>
      //       <Form.Field name="template-content">
      //          <Form.Label className="text-base font-medium leading-8">Template</Form.Label>
      //          <Form.Control asChild>
      //             <textarea
      //                value={watch("template")}
      //                className=" border border-gray-300 inline-flex  h-40 w-full resize-none appearance-none items-center justify-center rounded-lg  p-2.5 text-[15px] leading-none outline-none focus:shadow-[0_0_0_2px_black]"
      //                required
      //                placeholder="Write your template here..."
      //                {...register("template")}
      //                maxLength={255}
      //             />
      //          </Form.Control>
      //          <div className="flex justify-between my-1">
      //             <Form.Message className="text-red-500 text-sm" match="valueMissing">
      //                Cannot be empty
      //             </Form.Message>
      //             <div className="text-sm text-jarvis-text ml-auto">{`${watch("template").length}/255`}</div>
      //          </div>
      //       </Form.Field>
      //       <div className="flex space-x-4 justify-end">
      //          <Button
      //             variant="secondary"
      //             className="h-8 bg-gray-100 text-jarvis-text  rounded-lg"
      //             onClick={() => {
      //                setSelected(null);
      //             }}>
      //             Cancel
      //          </Button>
      //          <Form.Submit asChild>
      //             <Button variant="default" className="h-8" type="submit">
      //                Edit template
      //             </Button>
      //          </Form.Submit>
      //       </div>
      //    </Form.Root>
      // </div>
      <EditTemplateForm onSubmit={(data) => onSubmit(data)} name={watch("name")} description={watch("description")} template={watch("template")} />
   );
};

export default TemplateItem;
