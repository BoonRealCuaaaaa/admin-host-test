import { Button } from "@src/components/shared/button";
import Switch from "@src/components/shared/switch";
import { useState } from "react";

import { BoxArrowUpRight, Gear } from "react-bootstrap-icons";

const PlatformCard = (props) => {
   const [isEnable, setIsEnable] = useState(props.isEnable);
   const onButtonClick = () => {
      props.onSettingClick(props.platformName);
   };

   return (
      <div className="relative min-w-[240px] w-[240px] flex flex-col border border-gray-200 rounded-xl">
         <BoxArrowUpRight className="text-gray-500 text-lg-4 absolute top-4 right-4" />
         <div className="p-[30px] flex flex-col gap-y-5 border-b border-gray-200">
            <img src={props.icon} className="size-[46px]" />
            <span className="text-[16px]/[16px] font-medium">
               {props.platformName}
            </span>
         </div>
         <div className="px-4 py-[14px] flex items-center justify-between">
            <Button onClick={onButtonClick}>
               <Gear className="text-gray-500" />
               Setting
            </Button>
            <Switch
               checked={isEnable}
               onCheckedChange={() => {
                  props.onUpdateIntegration({ id: props.id, data: { isEnable: !props.isEnable } });
                  setIsEnable(!isEnable);
               }}
            />
         </div>
      </div>
   );
};

export default PlatformCard;
