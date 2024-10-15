import React from 'react'

interface PageTitleProps {
    children: React.ReactNode
}

const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
    return (
        <div className='w-full pt-3 pb-2 text-center text-lg font-bold text-black dark:text-white'>
            {children}
        </div>
    );
}

export default PageTitle;