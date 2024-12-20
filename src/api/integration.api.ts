import request from "@src/utils/requests";

export const getIntegrationApi = (assistantId: string) => {
   return request.get(`/integation-platforms?assistantId=${assistantId}`);
};

export const createIntegrationApi = ({data, assistantId}) => {
   return request.post("/integation-platforms", { ...data, assistantId: assistantId });
};

export const updateIntegrationApi = ({ id, data }) => {
   return request.patch(`/integation-platforms/${id}`, data);
};
