import JarvisLogo from "@src/assets/svgs/jarvis-logo-without-text.svg";
import Crown from "@src/assets/svgs/crown.svg";
import { Button } from "@components/shared/button";
import { Avatar, Badge } from "antd";
import { ArrowUp, PatchCheckFill } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";
import { Separator } from "@components/shared/separator";
import { isCancel } from "node_modules/axios/index.d.cts";

const Header = () => {
   return (
      <div className="flex justify-center px-10 pt-3 pb-2 border-b border-separator">
         <div className="flex flex-row items-center justify-between max-w-content w-full">
            <div className="flex flex-row items-center">
               <img src={JarvisLogo} alt="Jarvis Logo" className="h-8" />
               <h1 className="ml-2 font-bold text-xl/5 text-primary-700">Jarvis Helpdesk</h1>
               <div className="ml-20 flex flex-row space-x-6 items-center">
               <NavLink
                        to="/dashboard/knowledge-base"
                        className={({ isActive }) =>
                           isActive ? "text-primary-500 underline underline-offset-[0.5rem] text-[13px]/[14px]" : "text-[13px]/[14px] text-gray-800"
                        }>
                        Knowledge
                     </NavLink>
                     <NavLink
                        to="/dashboard/ai-setting"
                        className={({ isActive }) =>
                           isActive ? "text-primary-500 font-semibold underline underline-offset-[0.5rem] text-[13px]/[14px]" : "text-[13px]/[14px] text-gray-800"
                        }>
                        AI Settings
                     </NavLink>
               </div>
            </div>
            <div className="flex flex-row items-center justify-around gap-x-6">
               <div className="flex flex-row items-center gap-x-[14px]">
                  <div className="flex flex-row items-center gap-x-1.5">
                     <img src={Crown} alt="Crown" className="size-3" />
                     <p className="text-xs/3 font-medium">FREE</p>
                  </div>
                  <Button variant="primary">
                     Upgrade
                     <ArrowUp />
                  </Button>
               </div>
               <Separator orientation="vertical" className="h-5" />
               <Badge count={<PatchCheckFill className="text-blue-500" />} offset={[-5, 5]}>
                  <Avatar
                     className="size-[34px]"
                     style={{ backgroundColor: "#ffffff", border: "2px solid #DBDFE9" }}
                     icon={<div className="text-black font-semibold">S</div>}
                  />
               </Badge>
            </div>
         </div>
      </div>
   );
};

export default Header;
