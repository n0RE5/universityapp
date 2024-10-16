import { useWebApp } from '@vkruglikov/react-telegram-web-app'
import { useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { public_routes } from './router/router'
import Layout from './components/layouts/Layout/Layout'

const App = () => {
    const tg = useWebApp()

    useEffect(() => {
        tg.disableVerticalSwipes()
        tg.expand()
    }, [])

    return (
        <>
            <HashRouter>
                <Routes>
                    {public_routes.map((route, index) =>
                        <Route key={index} element={<Layout>{route.element}</Layout>} path={route.path} />
                    )}
                </Routes>
            </HashRouter>
        </>
    );
}

export default App;