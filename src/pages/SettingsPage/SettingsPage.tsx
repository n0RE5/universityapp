import PageTitle from '../../components/UI/PageTitle/PageTitle';
import Switcher from '../../components/UI/Switcher/Switcher';
import MoonIcon from '../../assets/icons/moon.svg?react'

const SettingsPage = () => {

    return (
        <>
            <PageTitle>
                Настройки
            </PageTitle>
            <div className='bg-[#FEFEFE] text-[#333] flex justify-between items-center py-[10px] pr-3 pl-5 rounded-full dark:text-white dark:bg-[#222]'>
                <div className='flex items-center'>
                    <MoonIcon className='text-[#333] dark:text-white' />
                    <div className='p-[10px] text-sm ml-2'>
                        Темная тема
                    </div>
                </div>
                <div>
                    <Switcher checked={true} setIsChecked={() => {}} />
                </div>
            </div>
        </>
    );
}

export default SettingsPage;