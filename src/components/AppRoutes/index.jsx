import { HashRouter, Route, Routes } from "react-router";
import Home from "@/pages/Home";
import DefaultLayout from "@/layouts/DefaultLayout";
import TaskList from "@/pages/TaskList";
import NewTask from "@/pages/NewTask";
import EditTask from "@/pages/EditTask";

const AppRoutes = () => {


    return (
        <HashRouter>
            <Routes>
                <Route element={<DefaultLayout />}>
                    <Route index path="/" element={<Home />} />
                    <Route path="/tasks" element={<TaskList />} />
                    <Route path="/new-task" element={<NewTask />} />
                    <Route path="/:id/edit" element={<EditTask />} />
                </Route>
            </Routes>
        </HashRouter>
    )
};

export default AppRoutes;
