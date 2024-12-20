import Switch from "@components/shared/switch";
import { ArrowDownShort, Check2 } from "react-bootstrap-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { updateAssistantSettings } from "@src/api/setting.api";
import { useAppStore } from "@src/store";
import { IWorkspaceSettings } from "@src/interfaces/setting";
import { getContextUser } from "@src/api/auth.api";
import { useEffect } from "react";
import {
   Card,
   CardContentSettings,
   CardHeader,
   CardTitle,
} from "@src/components/shared/card";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@src/components/shared/select"
import { RadioGroupCard, RadioGroupCardItem } from "@src/components/shared/radio-group/card"
import { Label, Description, LabelGroup } from "@src/components/shared/label";
import { Badge } from "@src/components/shared/badge";

const GeneralTab = () => {
   const assitant = useAppStore((state) => state.workspace);
   const { data: aiSettings, refetch: refetchSettings } = useQuery({
      queryKey: ["settings"],
      queryFn: getContextUser
   });

   const settings: IWorkspaceSettings = aiSettings?.data;

   const setWorkspace = useAppStore((state: { setWorkspace: (settings) => void }) => state.setWorkspace);
   const { mutate: updateSetting } = useMutation({
      mutationFn: updateAssistantSettings,
      onSuccess: () => {
         refetchSettings();
      },
   });



   const onUpdateSetting = (key: keyof IWorkspaceSettings, value: string | boolean) => {
      updateSetting({ updatedWorkspace: { ...settings, [key]: value }, assistantId: assitant.id });
   };

   useEffect(() => {
      if (aiSettings) {
         setWorkspace(aiSettings.data);
      }
   }, [aiSettings, setWorkspace]);

   return (
      <div className="flex flex-col gap-y-[30px]">
         <Card>
            <CardHeader>
               <CardTitle>AI Tone</CardTitle>
            </CardHeader>
            <RadioGroupCard value={settings?.toneOfAI} onValueChange={(value) => {
               onUpdateSetting("toneOfAI", value);
            }}>
               <RadioGroupCardItem value="professional" id='professional'>
                  <Label>Professional</Label>
                  <Description>
                     Responses are formal, concise, and focused on clarity. Ideal for business or corporate settings, where accuracy and neutrality are key.
                  </Description>
               </RadioGroupCardItem>
               <RadioGroupCardItem value="friendly" id='friendly'>
                  <Label>Friendly</Label>
                  <Description>
                     Conversational and approachable, this tone uses casual language to create a warm and engaging experience, perfect for customer support or social interactions.
                  </Description>
               </RadioGroupCardItem>
               <RadioGroupCardItem value="enthusiastic" id='enthusiastic'>
                  <Label>Enthusiastic</Label>
                  <Description>
                     Upbeat, energetic, and positive. Suitable for engaging audiences, creating excitement, or energizing responses.
                  </Description>
               </RadioGroupCardItem>
            </RadioGroupCard>
         </Card>

         <Card>
            {/* AI Language */}
            <CardContentSettings>
               <LabelGroup>
                  <Label>
                     AI Language
                  </Label>
                  <Description>
                     Set the primary language for generated response
                  </Description>
               </LabelGroup>
               <Select value={settings?.language}
                  onValueChange={(value) => {
                     onUpdateSetting("language", value);
                  }}>
                  <SelectTrigger className="w-[180px]">
                     <SelectValue placeholder="Select language..." />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="English">English</SelectItem>
                     <SelectItem value="Vietnamese">Vietnamese</SelectItem>
                     <SelectItem value="France">France</SelectItem>
                  </SelectContent>
               </Select>
            </CardContentSettings>
            <CardContentSettings>
               <LabelGroup>
                  <Label>
                     Include References
                  </Label>
                  <Description>
                     Add source links and references at the end of the AI's responses.
                     <div className="mt-2.5">
                        <span className="font-semibold">E.g:</span>
                        <Badge className="ml-1.5">Source:【Your_Document_In_Knowledge_Base.pdf】</Badge>
                     </div>
                  </Description>

               </LabelGroup>
               <Switch checked={settings?.includeReference}
                  onCheckedChange={(checked) => {
                     onUpdateSetting("includeReference", checked);
                  }} />
            </CardContentSettings>
            <CardContentSettings>
               <LabelGroup>
                  <Label>
                     Auto response
                  </Label>
                  <Description>
                     Automatically draft a response when entering this site or receiving a new message from client.
                  </Description>
               </LabelGroup>
               <Switch
                  checked={settings?.autoResponse}
                  onCheckedChange={(checked) => {
                     onUpdateSetting("autoResponse", checked);
                  }}
               />
            </CardContentSettings>
         </Card>
      </div >
   );
};

export default GeneralTab;
