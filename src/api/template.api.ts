import request from "@src/utils/requests";

export const addTemplateApi = ({data, assistantId}) => {
   return request.post("/response-templates", { ...data, assistantId: assistantId });
};

export const getTemplatesApi = (assistantId) => {
   return request.get(`/response-templates?assistantId=${assistantId}`);
};

export const updateTemplateApi = ({ id, data }) => {
   return request.patch(`/response-templates/${id}`, data);
};

export const deleteTemplateApi = (id) => {
   return request.delete(`/response-templates/${id}`);
};

export const activeTemplateApi = ({ id, assistantId }) => {
   return request.patch(`/response-templates/${id}/activate`, { assistantId, isActive: true });
};
