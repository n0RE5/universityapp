import SettingsIcon from '../../assets/icons/settings.svg?react'
import PathIcon from '../../assets/icons/path.svg?react'
import CalendarIcon from '../../assets/icons/calendar.svg?react'
import { Link, useLocation } from 'react-router-dom'
import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app'
import { useCallback, useState } from 'react'

const Menu = () => {
    const [haptic] = useHapticFeedback()
    const location = useLocation()
    const [menu] = useState([
        {
            href: '/main',
            icon: CalendarIcon
        },
        {
            href: '/settings',
            icon: SettingsIcon
        },
        {
            href: '/contacts',
            icon: PathIcon
        }
    ])

    const hightlight = useCallback((href: string) => {
        return location.pathname.substring(0, href.length) === href
    }, [location])

    const handleClick = useCallback(() => {
        haptic('light')
    }, [])

    return (
        <div className='w-full'>
            <div className='w-full flex justify-between px-[66px] pb-[38px] pt-[21px] border-t border-[#BDC5CD] dark:border-[#444444] dark:bg-[#222222]'>
                {menu.map((item, index) =>
                    <Link onClick={handleClick} to={item.href} key={index}>
                        <item.icon className={`text-[#BDBDBD] focus:text-[#333333] hover:text-[#333333] dark:text-[#444444] dark:focus:text-[#FEFEFE] dark:hover:text-[#FEFEFE] transition ${hightlight(item.href) ? '!text-[#333] dark:!text-white' : ''}`}/>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Menu;