import DatePicker, { registerLocale } from 'react-datepicker';
import Box from '../UI/Box/Box';
import CalendarIcon from '../../assets/icons/calendar2.svg?react'
import { useState } from 'react';
import { MONTH_NAMES } from '../../utils/consts';
import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { ru } from 'date-fns/locale/ru';
registerLocale('ru', ru)

interface CalendarProps {
    date: Date | null
    onChange: (date: Date | null) => void
}

const Calendar: React.FC<CalendarProps> = ({ date, onChange }) => {
    const [haptic] = useHapticFeedback()
    const [fullHeight, setFullHeight] = useState<boolean>(false)
    const dateStr = date?.toISOString().split('T')[0].split('-').reverse().join('.') || ''

    const handleClick = () => {
        haptic('soft')
        setFullHeight(prev => !prev)
    }

    return (
        <div className='relative'>
            <div className='w-full absolute flex items-center top-0 -mt-4 justify-center left-0'>
                <div onClick={handleClick} className='rounded-full hover:cursor-pointer z-30 w-10 h-10 flex items-center justify-center transition shadow-[#333333] bg-[#333333] hover:bg-[#555] focus:bg-[#555] dark:bg-white dark:hover:bg-[#E0E0E0] dark:focus:bg-[#E0E0E0] dark:shadow-none'>
                    <CalendarIcon className='text-white dark:text-black' />
                </div>
            </div>
            <Box className={`shadow-[0px_0px_5px_#EFEFEF] overflow-hidden bg-[#FEFEFE] dark:shadow-none relative dark:bg-[#222] transition-[max-height,_border-width] duration-300 ${fullHeight ? 'max-h-[250px] border-none' : 'max-h-[103px] border-b-[6px] border-transparent'}`}>
                <div className='w-full flex mb-2 justify-between items-center'>
                    <div className='font-bold text-[11px] text-[#4F4F4F] dark:text-white'>
                        {date?.getFullYear()} {MONTH_NAMES[date?.getMonth() || 0]}
                    </div>
                    <div className='font-bold text-[11px] text-[#BDBDBD] dark:text-[#828282]'>
                        {dateStr}
                    </div>
                </div>
                <div className='h-full max-h-full overflow-hidden'>
                    <DatePicker
                        inline
                        locale='ru'
                        fixedHeight
                        popperClassName='mp-datepicker'
                        selected={date}
                        calendarClassName={fullHeight ? 'calendar__active' : 'calendar__hidden'}
                        onChange={onChange}
                    />
                </div>
            </Box>
        </div>
    );
}

export default Calendar;