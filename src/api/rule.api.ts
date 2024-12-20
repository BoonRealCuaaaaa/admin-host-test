import request from "@src/utils/requests";

export const addRuleApi = ({data, assistantId}) => {
   return request.post("/rules", { ...data, isEnable:true, assistantId: assistantId });
};

export const getRulesApi = (assistantId) => {
   return request.get(`/rules?assistantId=${assistantId}`);
};


export const getRulesWithPaginationApi = async (assistantId, searchParams: URLSearchParams) => {
   searchParams.set('assistantId', assistantId);
   return request.get(`/rules?${searchParams.toString()}`);
};

export const deleteRuleApi = (id) => {
   return request.delete(`/rules/${id}`);
};

export const editRuleApi = ({id, data}) => {
   return request.patch(`/rules/${id}`, data);
};
