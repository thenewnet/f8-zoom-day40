import { HashRouter, Route, Routes } from "react-router";
import Redux from "@/pages/redux";
import Home from "@/pages/Home";
import DefaultLayout from "@/layouts/DefaultLayout";

const AppRoutes = () => {


    return (
        <HashRouter>
            <Routes>
                <Route element={<DefaultLayout />}>
                    <Route index path="/" element={<Home />} />
                    <Route path="/redux" element={<Redux />} />
                </Route>
            </Routes>
        </HashRouter>
    )
};

export default AppRoutes;
