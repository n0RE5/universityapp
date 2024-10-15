import { useEffect, useState } from "react";
import MigaikService from "../../api/services/MigaikService";
import Calendar from "../../components/Calendar/Calendar";
import PageTitle from "../../components/UI/PageTitle/PageTitle";
import { useFetching } from "../../hooks/useFetching";
import ILesson, { IGetScheduleResponse, IUniversityGroup, ScheduleDays } from "../../types/migaik";
import Schedule from "../../components/Schedule/Schedule";
import SearchIcon from '../../assets/icons/searchSvg.svg?react'
import FilterIcon from '../../assets/icons/filterSvg.svg?react'
import GroupSelect from "../../components/GroupSelect/GroupSelect";
import { useCloudStorage } from "@vkruglikov/react-telegram-web-app";
import { IB_2B_ID } from "../../utils/consts";
import Loader from "../../components/UI/Loader/Loader";

const MainPage = () => {
    const { getItem, setItem } = useCloudStorage()
    const [currentDate, setCurrentDate] = useState<Date | null>(new Date())
    const [schedule, setSchedule] = useState<IGetScheduleResponse | null>(null)
    const [currentSchedule, setCurrentSchedule] = useState<ILesson[]>([])
    const [groupId, setGroupId] = useState<string>('')
    const [groups, setGroups] = useState<IUniversityGroup[]>([])

    const handleGroupChange = (id: string) => {
        setGroupId(id)
        setItem('latest_group_id', id)
    }

    const [fetchGroupId] = useFetching(async () => {
        const id = await getItem('latest_group_id')
        setGroupId(id || IB_2B_ID)
    })

    const [fetchSchedule, isScheduleLoading] = useFetching(async() => {
        const response = await MigaikService.getSchedule(groupId, currentDate || new Date())
        const day = ScheduleDays[currentDate?.getDay() as keyof typeof ScheduleDays || 0]
        setCurrentSchedule(response.data.schedule[day] || [])
        setSchedule(response.data)
    })

    const [fetchGroups] = useFetching(async() => {
        const response = await MigaikService.searchGroup()
        setGroups(response.data)
    })

    useEffect(() => {
        fetchGroupId()
        fetchGroups()
    }, [])

    useEffect(() => {
        if (!groupId) {
            return
        }
        fetchSchedule()
    }, [currentDate, groupId])

    return (
        <>
            <PageTitle>
                Мероприятия
            </PageTitle>
            <div className="flex flex-col mt-5">
                <Calendar date={currentDate} onChange={setCurrentDate} />
                <div className="mt-3 flex">
                    <div className="mr-5 w-full">
                        <GroupSelect 
                            currentGroupId={groupId} 
                            currentGroupName={schedule?.groupName || ''} 
                            onChange={handleGroupChange}
                            groups={groups}
                        />
                    </div>
                    <div className="flex gap-[15px]">
                        <div className="h-10 w-10 flex items-center hover:cursor-pointer rounded-full justify-center transition bg-[#FEFEFE] shadow-[0_0_3px_#EDEDED] text-[#333] hover:bg-[#E0E0E0] focus:bg-[#E0E0E0] dark:text-white dark:bg-[#222] dark:shadow-none dark:hover:bg-[#333] dark:focus:bg-[#333]">
                            <SearchIcon />
                        </div>
                        <div className="h-10 w-10 flex items-center hover:cursor-pointer rounded-full justify-center transition bg-[#FEFEFE] shadow-[0_0_3px_#EDEDED] text-[#333] hover:bg-[#E0E0E0] focus:bg-[#E0E0E0] dark:text-white dark:bg-[#222] dark:shadow-none dark:hover:bg-[#333] dark:focus:bg-[#333]">
                            <FilterIcon />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between gap-2 mt-3">
                    <div className='bg-[#FEFEFE] shadow-[0_0_3px_#EDEDED] hover:cursor-pointer transition text-[#333] py-[9.5px] w-full rounded-full text-center hover:bg-[#E0E0E0] focus:bg-[#E0E0E0] dark:bg-[#222] dark:text-white dark:shadow-none dark:hover:bg-[#333] dark:focus:bg-[#333]'>
                        События
                    </div>
                    <div className='bg-[#333] shadow-[0_0_3px_#333] hover:cursor-pointer transition text-[#FEFEFE] py-[9.5px] w-full rounded-full text-center hover:bg-[#444] focus:bg-[#E0E0E0] dark:bg-[#FEFEFE] dark:shadow-none dark:text-[#222] dark:hover:bg-[#E0E0E0] dark:focus:bg-[#E0E0E0]'>
                        Расписание
                    </div>
                </div>
            </div>
            <div className="mt-4">
                {(isScheduleLoading && !currentSchedule.length) &&
                    <div className="w-full flex items-center justify-center">
                        <Loader />
                    </div>
                }
                {(!isScheduleLoading && !currentSchedule.length) &&
                    <div className='w-full text-center font-bold'>
                        Похоже, в этот день нет занятий
                    </div>
                }
                {!!currentSchedule.length &&
                    <Schedule schedule={currentSchedule} />
                }
            </div>
        </>
    );
}

export default MainPage;