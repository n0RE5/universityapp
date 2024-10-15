import React from 'react'
import Menu from '../../Menu/Menu';

interface LayoutProps {
    children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className='w-full h-full flex-1 flex flex-col'>
            <div className='flex-[1_1_auto] overflow-y-auto px-4 pb-8 max-h-[calc(100vh-100px)]'>
                {children}
            </div>
            <div className='flex-[0_0_auto]'>
                <Menu />
            </div>
        </div>
    );
}

export default Layout;