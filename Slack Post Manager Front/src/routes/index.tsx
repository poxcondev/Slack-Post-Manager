import { Routes, Route } from 'react-router-dom';
// Layout Import  
import { MainPage } from "../layout/MainPage";
// Page Imports  
import { Main } from "../pages/Main";
import { Settings } from "../pages/Settings";
// MUI Icons Imports  
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import SearchIcon from "@mui/icons-material/Search";

// routes  
const routes = [
    {
        type: "collapse",
        name: "Post List",
        key: "main",
        path: "/main",
        icon: <DynamicFeedIcon />,
        element: <Main />,
        noCollapse: true,
        protected: false
    },
    {
        type: "collapse",
        name: "Settings",
        key: "settings",
        path: "/settings",
        icon: <SearchIcon />,
        element: <Settings />,
        noCollapse: true,
        protected: false
    }
];

export default routes;

export const renderRoutes = () => (
    <Routes>
        <Route path="/" element={<MainPage />}>
            <Route index element={<Main />} />
            {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
            ))}
        </Route>
    </Routes>
);  
