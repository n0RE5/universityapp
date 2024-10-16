import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom"
import MainPage from "../pages/MainPage/MainPage"
import Layout from "../components/layouts/Layout/Layout"

export const routes: RouteObject[] = [
    {
        path: '/main',
        element: <Layout><MainPage/></Layout>,
        
    },
    {
        path: '/settings',
        element: <Layout><MainPage/></Layout>,
        
    },
    {
        path: '/contacts',
        element: <Layout><MainPage/></Layout>,
        
    },
    {
        path: '*',
        element: <Navigate to={`/main`} />
    }
] 

const router = createBrowserRouter(routes)

export default router