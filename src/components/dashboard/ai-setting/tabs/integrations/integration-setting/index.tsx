import Switch from "@src/components/shared/switch";
import ZendeskIcon from "@src/assets/svgs/zendesk.svg";
import ZohoDeskIcon from "@src/assets/svgs/zohodesk.svg";
import PancakeIcon from "@src/assets/svgs/pancake.svg";
import { Button } from "@src/components/shared/button";
import { ArrowLeft } from "react-bootstrap-icons";
import { useState } from "react";
import { useAppStore } from "@src/store";
import { Card, CardHeader, CardContent, CardTitle } from "@src/components/shared/card";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
   Form,
   FormControl,
   FormField,
   FormInput,
   FormCounter,
   FormItem,
   FormLabel,
   FormMessage,
   FormStatus,
   FormDialogContent,
   FormItemHorizontal,
} from "@src/components/shared/form"

const formSchema = z.object({
   domain: z.string().max(100),
})

const IntegrationSetting = (props) => {
   const { platform } = props;
   const assistant = useAppStore((state) => state.workspace);
   let icon = null;

   switch (platform) {
      case "Zendesk":
         icon = ZendeskIcon;
         break;
      case "Zohodesk":
         icon = ZohoDeskIcon;
         break;
      case "Pancake":
         icon = PancakeIcon;
         break;
      default:
         break;
   }

   const data = props.selectedData;
   const initialDomain = data?.domain?.split(`.${platform.toLowerCase()}.com`)[0] || "";
   const [domain, setDomain] = useState(initialDomain);
   const [isEnable, setIsEnable] = useState(data != undefined ? data.isEnable : false);

   // 1. Define your form.
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         domain: domain ?? ""
      },
   })

   const onHandleSaveClick = () => {
      const fullDomain = `${domain}.${platform.toLowerCase()}.com`;

      if (data == undefined) {
         props.onCreateIntegration({
            data: { type: platform, domain: fullDomain, isEnable: true },
            assistantId: assistant.id,
         });
      } else {
         props.onUpdateIntegration({
            id: data.id,
            data: {
               domain: fullDomain,
               isEnable: isEnable,
            },
         });
      }
   };

   return (
      <div className="flex flex-col gap-2">
         <Button variant="ghost" onClick={props.onBackClick} className="w-min">
            <ArrowLeft />
            Back
         </Button>
         <Card className="flex divide-x divide-y-0">
            <div className="p-[30px] flex flex-col gap-y-5 w-[240px] min-w-[240px]">
               <img src={icon} className="size-[46px]" />
               <span className="text-[16px]/[16px] font-medium">
                  {platform}
               </span>
            </div>
            <div className="flex-1 divide-y divide-gray-200">
               <CardHeader className="flex justify-between items-center">
                  <CardTitle>Integration settings</CardTitle>
                  <div className="flex gap-x-2.5 items-center">
                     <span className="text-[13px]/[14px] text-gray-500">{`Enable ${platform} integration`}</span>
                     <Switch
                        disabled={data == undefined ? true : false}
                        checked={isEnable}
                        onCheckedChange={(checked) => setIsEnable(checked)}
                     />
                  </div>
               </CardHeader>
               <CardContent>
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(onHandleSaveClick)} id="edit-template-form" className="flex flex-col gap-y-5">
                        <FormField
                           control={form.control}
                           name="domain"
                           maxLength={50}
                           required
                           render={({ field }) => (
                              <FormItemHorizontal>
                                 <FormLabel>Domain</FormLabel>
                                 <FormControl>
                                       <FormInput placeholder="Your domain..." {...field} />
                                    </FormControl>
                                    <span />
                                    <FormStatus>
                                       <FormMessage />
                                       <FormCounter />
                                    </FormStatus>
                              </FormItemHorizontal>
                           )}
                        />
                        <div className="flex gap-x-2.5 justify-end">
                           <Button type="submit" variant="primary" size="medium">Save</Button>
                        </div>
                     </form>
                  </Form>
               </CardContent>
            </div>
         </Card>
      </div>
   );
};

export default IntegrationSetting;

