import React, { HTMLProps } from 'react'

interface BoxProps {
    children?: React.ReactNode
    className?: string
}

const Box: React.FC<HTMLProps<HTMLDivElement> & BoxProps> = (props) => {
    return (
        <div {...props} className={`py-[21px] px-[26px] w-full rounded-[40px] ${props.className}`}>
            {props.children}
        </div>
    );
}

export default Box;