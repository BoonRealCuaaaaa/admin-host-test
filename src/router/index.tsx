import { Navigate, Route, Routes } from "react-router-dom";
import AuthRoutes from "./auth";
import AuthGuard from "@src/components/auth/guard";
import DashboardRoutes from "./dashboard";
import DashboardLayout from "@src/pages/dashboard";

const AppRouter = () => {
   return (
      <Routes>
         <Route index element={<Navigate to="/dashboard" replace />} />
         <Route path="auth/*" element={<AuthRoutes />} />
         <Route element={<AuthGuard />}>
            <Route element={<DashboardLayout />}>
               <Route path="dashboard/*" element={<DashboardRoutes />} />
            </Route>
         </Route>
      </Routes>
   );
};

export default AppRouter;
