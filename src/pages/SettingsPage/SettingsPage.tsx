import PageTitle from '../../components/UI/PageTitle/PageTitle';
import Switcher from '../../components/UI/Switcher/Switcher';
import MoonIcon from '../../assets/icons/moon.svg?react'
import { useAppSelector } from '../../hooks/useAppSelector';
import Box from '../../components/UI/Box/Box';
import ProfileImage from '../../assets/icons/profilepic.png'
import { useFetching } from '../../hooks/useFetching';
import MigaikService from '../../api/services/MigaikService';
import { useEffect, useState } from 'react';
import { IUniversityGroup } from '../../types/migaik';
import { useCloudStorage, useWebApp } from '@vkruglikov/react-telegram-web-app';
import JoinGroupModal from '../../components/JoinGroupModal/JoinGroupModal';

const SettingsPage = () => {
    const tg = useWebApp()
    const theme = localStorage.getItem('theme')
    const cloudStorage = useCloudStorage()
    const [joinGroupModalActive, setJoinGroupModalActive] = useState<boolean>(false)
    const { firstName, lastName, photoUrl, groupId } = useAppSelector(state => state.authReducer)
    const [group, setGroup] = useState<IUniversityGroup | null>(null)
    const [checked, setChecked] = useState<boolean>(theme === 'dark')

    const handleTelegramRedirect = () => {
        tg.openTelegramLink('https://t.me/miigaik_news')
    }

    const saveTheme = () => {
        const saved = checked ? 'dark' : 'light'
        localStorage.setItem('theme', saved)
        cloudStorage.setItem('theme', saved)
        document.documentElement.classList.toggle('dark', localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))
    }

    const [fetchGroup] = useFetching(async () => {
        if (!groupId) {
            return
        }
        const response = await MigaikService.getGroup(groupId)
        setGroup(response.data)
    })

    useEffect(() => {
        saveTheme()
    }, [checked])

    useEffect(() => {
        fetchGroup()
    }, [groupId])

    return (
        <>
            <PageTitle>
                Настройки
            </PageTitle>
            <Box className='shadow-[0px_0px_5px_#EFEFEF] bg-[#FEFEFE] dark:shadow-none dark:bg-[#222]'>
                <div className='flex'>
                    <div>
                        <div className='overflow-hidden shadow-[0_4px_3px_#EDEDED] dark:shadow-none relative rounded-full flex items-center justify-center w-[100px] h-[100px]'>
                            <div className='absolute w-[98px] h-[99px] mx-auto py-auto rounded-full bg-white'/>
                            <img 
                                src={photoUrl} 
                                onError={({ currentTarget }) => {
                                    currentTarget.src = ProfileImage
                                }} 
                                className='object-contain scale-125 zoom w-full h-full' 
                            />
                        </div>
                    </div>
                    <div className='px-5'>
                        <div className='pt-1 text-lg font-bold'>
                            {firstName} {lastName}
                        </div>
                        <div className='pt-[10px] text-sm text-[#999999] font-bold'>Студент</div>
                        <div className='text-[11px] pt-1 text-[#999999] font-bold'>{group?.name}</div>
                    </div>
                </div>
            </Box>
            <div className='bg-[#FEFEFE] mt-3 text-[#333] flex justify-between items-center py-[10px] pr-3 pl-5 rounded-full dark:text-white dark:bg-[#222]'>
                <div className='flex items-center'>
                    <MoonIcon className='text-[#333] dark:text-white' />
                    <div className='p-[10px] text-sm ml-2'>
                        Темная тема
                    </div>
                </div>
                <div>
                    <Switcher checked={checked} setIsChecked={setChecked} />
                </div>
            </div>
            {!groupId &&
                <button onClick={() => setJoinGroupModalActive(prev => !prev)} className='bg-[#333] hover:bg-[#444] focus:bg-[#444] transition text-white w-full font-bold text-[13px] mt-6 dark:bg-[#FEFEFE] dark:text-black dark:hover:bg-[#E0E0E0] dark:focus:bg-[#E0E0E0] rounded-full text-center py-4'>
                    Вступить в группу
                </button>
            }
            <button 
                onClick={handleTelegramRedirect}
                className='bg-[#828282] hover:bg-[#333] focus:bg-[#333] transition text-white w-full font-bold text-[13px] mt-3 dark:bg-[#323232] dark:text-white dark:hover:bg-[#444] dark:focus:bg-[#444] rounded-full text-center py-4'
            >
                Группа в Telegram
            </button>
            <JoinGroupModal isActive={joinGroupModalActive} setIsActive={setJoinGroupModalActive} />
        </>
    );
}

export default SettingsPage;