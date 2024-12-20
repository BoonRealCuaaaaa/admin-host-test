import { HddStack } from "react-bootstrap-icons";
import TemplateList from "./templates-list";
import { InstructionCard, InstructionCardTitle, InstructionCardDescription, InstructionCardContent, InstructionCardLink } from "@src/components/shared/instruction";

const TemplateTab = () => {
   return (
      <>
         <div className="flex flex-row space-x-9 ">
            {/* Add new rule */}
            <div className="flex-1">
               <TemplateList />
            </div>
            <InstructionCard>
               <HddStack className="size-6 text-gray-500" />
               <InstructionCardContent>
                  <InstructionCardTitle>
                  Customize AI response: Template
                  </InstructionCardTitle>
                  <InstructionCardDescription>
                  Design your own plain-text templates to customize how the AI behaves and responds. These templates make it easy to define specific instructions, tone, or context for various tasks, allowing you to adapt the AI to your unique needs and streamline your workflow.
                  </InstructionCardDescription>
               </InstructionCardContent>
               <InstructionCardLink>
               Learn how to make an AI Template
               </InstructionCardLink>
            </InstructionCard>
         </div>
      </>
   );
};

export default TemplateTab;
