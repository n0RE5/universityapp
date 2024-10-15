import { createBrowserRouter, RouteObject } from "react-router-dom"
import MainPage from "../pages/MainPage/MainPage"
import Layout from "../components/layouts/Layout/Layout"

export const routes: RouteObject[] = [
    {
        path: '/main',
        element: <Layout><MainPage/></Layout>,
        
    },
    {
        path: '*',
        element: <Layout><MainPage/></Layout>,
    }
] 

const router = createBrowserRouter(routes)

export default router