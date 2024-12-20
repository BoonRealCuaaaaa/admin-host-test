import { IWorkspaceSettings } from "@src/interfaces/setting";
import request from "@src/utils/requests";

export const getAssistantSettings = (assistantId: string) => {
   return request.get(`/assistants/${assistantId}`);
};

export const updateAssistantSettings = ({ updatedWorkspace, assistantId }: { updatedWorkspace: IWorkspaceSettings; assistantId: string }) => {
   return request.patch(`/assistants/${assistantId}`, updatedWorkspace);
};
