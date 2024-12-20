import PlatformCard from "./platform-card";
import ZendeskIcon from "@src/assets/svgs/zendesk.svg";
import ZohoDeskIcon from "@src/assets/svgs/zohodesk.svg";
import PancakeIcon from "@src/assets/svgs/pancake.svg";
import { useState } from "react";
import IntegrationSetting from "./integration-setting";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createIntegrationApi, getIntegrationApi, updateIntegrationApi } from "@src/api/integration.api";
import { useToast } from "@src/hooks/use-toast";
import SuccessToastDescription from "@src/components/shared/toaster/success-toast-description";
import { useAppStore } from "@src/store";
import Loader from "@src/components/shared/loader";

const IntegrationsTab = () => {
   const [isOpenSetting, setIsOpenSetting] = useState(false);
   const [selectedPlatform, setSelectedPlatform] = useState(null);
   const assistant = useAppStore((state)=>state.workspace)
   const { toast } = useToast();

   const onSettingClick = (platform) => {
      setIsOpenSetting(true);
      setSelectedPlatform(platform);
   };

   const onBackClick = () => {
      setIsOpenSetting(false);
      setSelectedPlatform(null);
   };

   const { mutate: createIntegration } = useMutation({
      mutationFn: createIntegrationApi,
      onSuccess: () => {
         refetchIntegrations();
         toast({
            variant: "success",
            description: <SuccessToastDescription content="Integrated successfully" />,
         });
      },
   });

   const { mutate: updateIntegration } = useMutation({
      mutationFn: updateIntegrationApi,
      onSuccess: () => {
         refetchIntegrations();
         toast({
            variant: "success",
            description: <SuccessToastDescription content="Update integration settings successfully" />,
         });
      },
   });

   const {
      data: integrations,
      isLoading: isIntegrationsLoading,
      isError: integrationsError,
      refetch: refetchIntegrations,
   } = useQuery({
      queryKey: ["integrations"],
      queryFn: () => getIntegrationApi(assistant.id),
   });

   if (isIntegrationsLoading) return <Loader size={60} className="mx-auto mt-10" />;
   if (integrationsError) return <div>Error...</div>;

   const zendeskData = integrations?.data.find((integration) => integration.type === "Zendesk");
   const zohodeskData = integrations?.data.find((integration) => integration.type === "Zohodesk");
   const pancakeData = integrations?.data.find((integration) => integration.type === "Pancake");

   const selectedData = integrations?.data.find((integration) => integration.type === selectedPlatform);

   return (
      <>
         {isOpenSetting ? (
            <IntegrationSetting
               onBackClick={onBackClick}
               platform={selectedPlatform}
               selectedData={selectedData}
               onCreateIntegration={createIntegration}
               onUpdateIntegration={updateIntegration}
            />
         ) : (
            <div className="flex flex-row gap-[30px]">
               <PlatformCard
                  icon={ZendeskIcon}
                  platformName="Zendesk"
                  onSettingClick={onSettingClick}
                  isEnable={zendeskData != undefined ? zendeskData.isEnable : false}
                  id={zendeskData != undefined ? zendeskData.id : null}
                  onUpdateIntegration={updateIntegration}

               />
               <PlatformCard
                  icon={ZohoDeskIcon}
                  platformName="Zohodesk"
                  onSettingClick={onSettingClick}
                  isEnable={zohodeskData != undefined ? zohodeskData.isEnable : false}
                  id={zohodeskData != undefined ? zohodeskData.id : null}
                  onUpdateIntegration={updateIntegration}
               />
               <PlatformCard
                  icon={PancakeIcon}
                  platformName="Pancake V2"
                  onSettingClick={onSettingClick}
                  id={pancakeData != undefined ? zohodeskData.id : null}
                  isEnable={pancakeData != undefined ? pancakeData.isEnable : false}
                  onUpdateIntegration={updateIntegration}

               />
            </div>
         )}
      </>
   );
};

export default IntegrationsTab;
