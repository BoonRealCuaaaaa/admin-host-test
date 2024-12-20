import GeneralTab from "./general";
import TemplateTab from "./templates";
import RuleTab from "./rules";
import IntegrationsTab from "./integrations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/shared/tabs";
import { Toaster } from "@src/components/shared/toaster";
import { Button } from "@src/components/shared/button";
import { Book } from "react-bootstrap-icons";

const DashboardTabs = () => {
   return (
      <div className="flex justify-center w-full mb-10">
         <Tabs defaultValue="general" className="flex-1 max-w-content">
            <TabsList className="flex flex-row">
               <TabsTrigger value="general">General</TabsTrigger>
               <TabsTrigger value="templates">Templates</TabsTrigger>
               <TabsTrigger value="rules">Rules</TabsTrigger>
               <TabsTrigger value="integrations">Integrations</TabsTrigger>
               <div className="flex-1 flex justify-end">
                  <Button variant="light">
                     <Book />
                     Guides
                  </Button>
               </div>
            </TabsList>
            <TabsContent value="general">
               <GeneralTab />
            </TabsContent>
            <TabsContent value="templates">
               <TemplateTab />
            </TabsContent>
            <TabsContent value="rules">
               <RuleTab />
            </TabsContent>
            <TabsContent value="integrations">
               <IntegrationsTab />
            </TabsContent>
         </Tabs>
         <Toaster />
      </div>
   );
};

export default DashboardTabs;
