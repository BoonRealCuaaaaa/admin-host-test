import request from "@src/utils/requests";

export const loginApi = async (data) => {
   return request.post("/auth/login", data);
};

export const getContextUser = async () => {
   return request.get("/auth/me");
};
