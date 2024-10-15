import { useWebApp } from '@vkruglikov/react-telegram-web-app'
import React, { useEffect } from 'react'

interface AppProps {
    children: React.ReactNode
}

const App: React.FC<AppProps> = ({ children }) => {
    const tg = useWebApp()

    useEffect(() => {
        tg.disableVerticalSwipes()
    }, [])

    return (
        <>
            {children}
        </>
    );
}

export default App;