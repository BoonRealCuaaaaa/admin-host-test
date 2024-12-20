import TemplateImage from "@src/assets/svgs/template-icon.svg";

const InfoPanel = () => {
   return (
      <>
         <div className="border flex flex-col box-border rounded-lg shadow-sm pt-4 items-start">
            <img src={TemplateImage} className="mx-10 text-3xl m-3 mb-4 h-12 " />
            <h2 className="text-lg font-medium px-10 mb-2">Customize AI response: Template</h2>
            <p className="max-w-sm px-10 mb-2">
               Design your own plain-text templates to customize how the AI behaves and responds. These templates make
               it easy to define specific instructions, tone, or context for various tasks, allowing you to adapt the AI
               to your unique needs and streamline your workflow.
            </p>
            <a href="" className="underline underline-offset-4 decoration-dotted px-10 text-blue-700 mb-10">
               Learn how to make AI template
            </a>
         </div>
      </>
   );
};

export default InfoPanel;
