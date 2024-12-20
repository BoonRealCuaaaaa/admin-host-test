import DashboardTabs from "@src/components/dashboard/ai-setting/tabs"


const DashboardPage = () => {
   return (
      <>
         <div className="flex flex-col mx-10 gap-y-5">
            <DashboardTabs />
         </div>
      </>
   );
};

export default DashboardPage;
