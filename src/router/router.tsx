import { Navigate, RouteObject } from "react-router-dom"
import MainPage from "../pages/MainPage/MainPage"
import SettingsPage from "../pages/SettingsPage/SettingsPage"

export const public_routes: RouteObject[] = [
    {
        path: '/main',
        element: <MainPage/>,
        
    },
    {
        path: '/settings',
        element: <SettingsPage/>,
        
    },
    {
        path: '/contacts',
        element: <MainPage/>,
        
    },
    {
        path: '*',
        element: <Navigate to={`/main`} />
    }
] 