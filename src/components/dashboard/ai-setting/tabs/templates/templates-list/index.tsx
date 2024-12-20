import Switch from "@src/components/shared/switch";
import { PlusCircle } from "react-bootstrap-icons";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Form from "@radix-ui/react-form";
import TemplateItem from "./template-item";
import { useState } from "react";
import { Button } from "@src/components/shared/button";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { XLg } from "react-bootstrap-icons";
import { Separator } from "@components/shared/separator";
import { useAppStore } from "@src/store";
import { updateAssistantSettings } from "@src/api/setting.api";
import { IWorkspaceSettings } from "@src/interfaces/setting";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addTemplateApi, getTemplatesApi } from "@src/api/template.api";
import Loader from "@src/components/shared/loader";
import { useToast } from "@src/hooks/use-toast";
import SuccessToastDescription from "@src/components/shared/toaster/success-toast-description";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@src/components/shared/card";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogMainContent,
   DialogTitle,
   DialogTrigger,
} from "@src/components/shared/dialog"
import { Input } from "@src/components/shared/input";
import { AddTemplateForm } from "../add-template-form";

const TemplateList = () => {
   const [selected, setSelected] = useState(null);
   const settings = useAppStore((state) => state.workspace);
   const setWorkspace = useAppStore((state) => state.setWorkspace);
   const [openForm, setOpenForm] = useState(false);
   const assitant = useAppStore((state) => state.workspace);
   const { toast } = useToast();
   const { register, handleSubmit, watch, reset } = useForm();
   const assistant = useAppStore((state) => state.workspace);
   const [isDialogOpen, setIsDialogOpen] = useState(false);


   const { mutate: createTemplate } = useMutation({
      mutationFn: addTemplateApi,
      onSuccess: () => {
         refetchTemplates();
         setOpenForm(false);
         reset();
         toast({
            variant: "success",
            description: <SuccessToastDescription content="Create new template successfully" />,
         });
      },
   });

   const {
      data: templates,
      isLoading: isLoadingTemplate,
      refetch: refetchTemplates,
   } = useQuery({
      queryKey: ["templates"],
      queryFn: () => {
         return getTemplatesApi(assistant.id);
      },
   });

   const onCreateTemplateSubmit = async  (data) => {
      const templateData = {
         name: data["name"],
         description: data["description"],
         template: data["template"],
      };

      try {
         await createTemplate({ data: templateData, assistantId: assistant.id });
         setIsDialogOpen(false);
      }
      catch (error) {
         console.error("Failed to create template:", error);
      }
      
   };

   // if (isLoadingTemplate) return <Loader size={60} className="mx-auto mt-10" />;

   return (
      // <>
      //    <div className={`basis-${ratio} box-border`}>
      //       <div className="flex flex-row border-x border rounded-t-lg shadow-sm justify-between p-4">
      //          <div className="flex flex-row items-center space-x-3">
      //             <h2 className="text-lg font-semibold">AI Template</h2>
      //             <p className="text-sm text-gray-400 flex items-center">
      //                <Switch
      //                   checked={settings?.enableTemplate}
      //                   className="mx-2 "
      //                   onCheckedChange={(value) => {
      //                      const newSettings: IWorkspaceSettings = { ...settings, enableTemplate: value };
      //                      updateAssistantSettings({ updatedWorkspace: newSettings, assistantId: assitant.id });
      //                      setWorkspace(newSettings);
      //                   }}
      //                />
      //             </p>
      //          </div>

      //          <div className="flex flex-row space-x-4 items-center">
      //             <AlertDialog.Root open={openForm} onOpenChange={setOpenForm}>
      //                <AlertDialog.Trigger asChild>
      //                   <div className="flex flex-row">
      //                      <Button
      //                         variant="default"
      //                         size="sm"
      //                         className="px-4 py-1 font-normal"
      //                         onClick={() => {
      //                            setSelected(null);
      //                         }}>
      //                         <PlusCircle />
      //                         {`Add new ${templates?.data.length}/5`}
      //                      </Button>
      //                   </div>
      //                </AlertDialog.Trigger>
      //                <AlertDialog.Portal>
      //                   <AlertDialog.Overlay className="fixed inset-0 bg-black opacity-70 z-10" />
      //                   <AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] z-10">
      //                      <AlertDialog.Title className="mb-2 text-base font-medium flex justify-between items-center">
      //                         <p>Create new Template</p>
      //                         <AlertDialog.Cancel asChild>
      //                            <button>
      //                               <XLg />
      //                            </button>
      //                         </AlertDialog.Cancel>
      //                      </AlertDialog.Title>
      //                      <Separator className="w-full" />
      //                      <AlertDialog.Description className="mb-5 mt-4 text-sm leading-normal flex flex-col" asChild>
      //                         <Form.Root
      //                            className="w-full flex flex-col space-y-2"
      //                            onSubmit={handleSubmit(onCreateTemplateSubmit)}>
      //                            <Form.Field name="template-name">
      //                               <Form.Label className="text-base font-medium leading-8 ">Name</Form.Label>
      //                               <Form.Control asChild>
      //                                  <input
      //                                     className="h-9 w-full inline-flex justify-center items-center px-2 border border-gray-300  leading-none rounded-lg "
      //                                     type="text"
      //                                     required
      //                                     placeholder="Template name..."
      //                                     maxLength={255}
      //                                     {...register("template-name", { required: true, maxLength: 255 })}
      //                                  />
      //                               </Form.Control>
      //                               <div className="flex justify-between my-1">
      //                                  <Form.Message className="text-red-500 text-sm" match="valueMissing">
      //                                     Cannot be empty
      //                                  </Form.Message>
      //                                  <span className="text-sm text-jarvis-text ml-auto">
      //                                     {watch("template-name") != undefined
      //                                        ? `${watch("template-name").length}/255`
      //                                        : "0/255"}
      //                                  </span>
      //                               </div>
      //                            </Form.Field>
      //                            <Form.Field name="template-description">
      //                               <Form.Label className="text-base font-medium leading-8 ">Description</Form.Label>
      //                               <Form.Control asChild>
      //                                  <input
      //                                     className="h-9 w-full inline-flex justify-center items-center px-2 border border-gray-300 rounded-lg leading-none  "
      //                                     type="text"
      //                                     required
      //                                     placeholder="What is this template use for..."
      //                                     {...register("template-description", { required: true })}
      //                                  />
      //                               </Form.Control>
      //                               <div className="flex justify-between my-1">
      //                                  <Form.Message className="text-red-500 text-sm" match="valueMissing">
      //                                     Cannot be empty
      //                                  </Form.Message>
      //                                  <p className="text-sm text-jarvis-text ml-auto">
      //                                     {" "}
      //                                     {watch("template-description") != undefined
      //                                        ? `${watch("template-description").length}/255`
      //                                        : "0/255"}
      //                                  </p>
      //                               </div>
      //                            </Form.Field>
      //                            <Form.Field name="template-template">
      //                               <Form.Label className="text-base font-medium leading-8 ">Template</Form.Label>
      //                               <Form.Control asChild>
      //                                  <textarea
      //                                     className=" border border-gray-300 inline-flex  h-40 w-full resize-none appearance-none items-center justify-center rounded-lg  p-2.5 text-[15px] leading-none outline-none focus:shadow-[0_0_0_2px_black]"
      //                                     required
      //                                     placeholder="Write your template here..."
      //                                     {...register("template-template", { required: true })}
      //                                  />
      //                               </Form.Control>
      //                               <div className="flex justify-between my-1">
      //                                  <Form.Message className="text-red-500 text-sm" match="valueMissing">
      //                                     Cannot be empty
      //                                  </Form.Message>
      //                                  <div className="text-sm text-jarvis-text ml-auto">
      //                                     {" "}
      //                                     {watch("template-template") != undefined
      //                                        ? `${watch("template-template").length}/255`
      //                                        : "0/255"}
      //                                  </div>
      //                               </div>
      //                            </Form.Field>
      //                            <div className="flex space-x-4 ">
      //                               <Form.Submit asChild>
      //                                  <Button variant="default" className="h-10 w-full">
      //                                     Create new template
      //                                  </Button>
      //                               </Form.Submit>
      //                            </div>
      //                         </Form.Root>
      //                      </AlertDialog.Description>
      //                   </AlertDialog.Content>
      //                </AlertDialog.Portal>
      //             </AlertDialog.Root>
      //          </div>
      //       </div>
      //       <div className="border-x border-b shadow-sm rounded-b-lg p-4 flex flex-col box-border">
      //          <RadioGroup.Root className="flex flex-col space-y-5" defaultValue="1" aria-label="View density">
      //             {templates?.data
      //                .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      //                .map((template) => (
      //                   <TemplateItem
      //                      key={template.id}
      //                      name={template.name}
      //                      description={template.description}
      //                      template={template.template}
      //                      id={template.id}
      //                      isActive={template.isActive}
      //                      selected={selected}
      //                      setSelected={(value) => {
      //                         setSelected(value);
      //                      }}
      //                      refetchTemplates={refetchTemplates}
      //                   />
      //                ))}
      //          </RadioGroup.Root>
      //          {/* Form */}
      //       </div>
      //    </div>
      // </>
      <div className="flex flex-col gap-y-[30px]">
         <Card>
            <CardHeader className="justify-between">
               <div className="flex flex-row gap-x-2">
                  <CardTitle>AI Templates</CardTitle>
                  <Switch
                     checked={settings?.enableTemplate}
                     onCheckedChange={(value) => {
                        const newSettings: IWorkspaceSettings = { ...settings, enableTemplate: value };
                        updateAssistantSettings({ updatedWorkspace: newSettings, assistantId: assitant.id });
                        setWorkspace(newSettings);
                     }}
                  />
               </div>
               <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
                  <DialogTrigger>
                     <Button variant={"primary"} >
                        <PlusCircle />
                        Add new
                     </Button>
                  </DialogTrigger>
                  <DialogContent>
                     <AddTemplateForm onSubmitCallback={(data) => onCreateTemplateSubmit(data)} />
                  </DialogContent>
               </Dialog>
            </CardHeader>
            <CardContent>
               <RadioGroup.Root className="flex flex-col space-y-5" defaultValue="1" aria-label="View density">
                  {templates?.data
                     .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                     .map((template) => (
                        <TemplateItem
                           key={template.id}
                           name={template.name}
                           description={template.description}
                           template={template.template}
                           id={template.id}
                           isActive={template.isActive}
                           selected={selected}
                           setSelected={(value) => {
                              setSelected(value);
                           }}
                           refetchTemplates={refetchTemplates}
                        />
                     ))}
               </RadioGroup.Root>
            </CardContent>
         </Card>
      </div>
   );
};

export default TemplateList;
