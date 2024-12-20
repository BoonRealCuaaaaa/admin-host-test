import DashboardPage from "@src/pages/dashboard/ai-setting"
import { Navigate, Route, Routes } from "react-router-dom"

const DashboardRoutes = ()=>{
    return (
        <Routes>
            <Route index element={<Navigate to="ai-setting" />} />
            <Route path="ai-setting"  element={<DashboardPage />} />
        </Routes>
    )
}

export default DashboardRoutes