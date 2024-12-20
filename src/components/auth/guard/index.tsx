
import { getToken } from "@src/utils/auth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthGuard = () => {
   const isAuthenticated = getToken();
   const navigate = useNavigate();

   useEffect(() => {
      if (isAuthenticated == null || isAuthenticated === "") {
         navigate("/auth/login");
      } else {
         navigate("/dashboard/ai-setting");
      }
   }, [isAuthenticated, navigate]);

   return <Outlet />;
};

export default AuthGuard;
