import Header from "@src/components/dashboard/header"
import { Outlet } from "react-router-dom"

const DashboardLayout = () => {
    return (
        <div className="flex flex-col gap-y-5">
            <header>
                <Header />
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default DashboardLayout