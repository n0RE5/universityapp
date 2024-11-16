import { Navigate, RouteObject } from "react-router-dom"
import MainPage from "../pages/MainPage/MainPage"
import SettingsPage from "../pages/SettingsPage/SettingsPage"
import ContactsPage from "../pages/ContactsPage/ContactsPage"

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
        element: <ContactsPage/>,
        
    },
    {
        path: '*',
        element: <Navigate to={`/main`} />
    }
] 