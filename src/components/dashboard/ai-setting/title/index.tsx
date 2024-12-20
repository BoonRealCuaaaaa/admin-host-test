import { Button } from "@src/components/shared/button";
import { Book } from "react-bootstrap-icons";

const Title = () => {
   return (
      <>
         <div className="flex flex-row justify-between items-center">
            <div>
               <p className="text-xl font-semibold">AI Settings</p>
               <p className="text-jarvis-text">Customize the AI model to suit your preferences</p>
            </div>
            <Button variant="outline" size="xs" className="font-normal" >
               <Book />
               Docs
            </Button>
         </div>
      </>
   );
};

export default Title;
