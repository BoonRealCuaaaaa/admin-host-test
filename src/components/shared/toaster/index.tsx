import { useToast } from "@src/hooks/use-toast";
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "./primitive-toast/index";

export function Toaster() {
   const { toasts } = useToast();

   return (
      <ToastProvider>
         {toasts.map(function ({ id, title, description, action, ...props }) {
            return (
               <Toast key={id} {...props}>
                  <div className="flex flex-col space-y-4">
                     {title && <ToastTitle>{title}</ToastTitle>}
                     {description && <ToastDescription>{description}</ToastDescription>}
                  </div>
                  {action}
               </Toast>
            );
         })}
         <ToastViewport />
      </ToastProvider>
   );
}
