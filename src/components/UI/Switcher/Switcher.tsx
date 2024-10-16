import React from 'react'

interface SwitcherProps {
    checked: boolean,
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>
}

const Switcher: React.FC<SwitcherProps> = ({ checked, setIsChecked }) => {
    return (
        <div onClick={() => setIsChecked(prev => !prev)} className={`switcher ${checked ? 'switcher-active' : ''}`}>
            <div className={`switcher_thumbler ${checked ? 'switcher_thumbler-active' : ''}`}/>
        </div>
    );
}

export default Switcher;