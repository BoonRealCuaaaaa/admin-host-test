import { CheckCircle } from "react-bootstrap-icons";
import { ToastClose } from "../primitive-toast";

const SuccessToastDescription = (props) => {
   return (
      <>
         <div className="flex justify-between">
            <div className="flex items-center space-x-2">
               <CheckCircle className="text-green-600  size-7 font-medium" />
               <div className="text-sm font-medium">{props.content}</div>
            </div>
            <ToastClose />
         </div>
      </>
   );
};

export default SuccessToastDescription;
