import { useCloudStorage, useInitData, useWebApp } from '@vkruglikov/react-telegram-web-app'
import { useEffect, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { public_routes } from './router/router'
import Layout from './components/layouts/Layout/Layout'
import { useAppSelector } from './hooks/useAppSelector'
import Loader from './components/UI/Loader/Loader'
import { useAppDispatch } from './hooks/useAppDispatch'
import { fetchInit, fetchMe } from './store/actions/authActions'
import { useFetching } from './hooks/useFetching'

const App = () => {
    const tg = useWebApp()
    const cloudStorage = useCloudStorage()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [, initData] = useInitData()
    const { isAuth } = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()

    const [fetchTheme] = useFetching(async() => {
        const theme = await cloudStorage.getItem('theme')
        localStorage.setItem('theme', theme || 'dark')
    })

    useEffect(() => {
        setIsLoading(true)
        dispatch(fetchInit({
            initData: initData || ""
        })).then(async () => {
            dispatch(fetchMe())
            await fetchTheme()
        }).finally(() => {
            setIsLoading(false)
        })
    }, [])

    useEffect(() => {
        tg.disableVerticalSwipes()
        tg.expand()
    }, [])
    
    useEffect(() => {
        document.documentElement.classList.toggle('dark', localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))
    }, [])

    if (isLoading) {
        return (
            <div className='w-full flex items-center justify-center flex-1 flex-col'>
                <Loader />
            </div>
        )
    }

    if (!isAuth && !isLoading) {
        return (
            <div className='w-full text-center flex items-center justify-center flex-1 flex-col text-black dark:text-white'>
                Ошибка авторизации
            </div>
        )
    }

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