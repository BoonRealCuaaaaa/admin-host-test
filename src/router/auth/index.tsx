import LoginPage from "@src/pages/login"
import { Route, Routes } from "react-router-dom"

const AuthRoutes = () =>{
    return (
        <Routes>
            <Route index  element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />}/>
        </Routes>
    )
}

export default AuthRoutes