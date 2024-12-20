import { getToken } from "./auth";
import axios, { AxiosRequestConfig, AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";

const instance = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
});

const requestAuthInterceptor = (req: AxiosRequestConfig): InternalAxiosRequestConfig => {
   const token = getToken();

   if (token) {
      return {
         ...req,
         headers: {
            ...req.headers,
            Authorization: `Bearer ${token}`,
         } as AxiosRequestHeaders,
      };
   }

   return req as InternalAxiosRequestConfig;
};

instance.interceptors.request.use(requestAuthInterceptor)

export default instance;
