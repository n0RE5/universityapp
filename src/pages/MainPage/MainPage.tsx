import { useEffect, useState } from "react";
import MigaikService from "../../api/services/MigaikService";
import Calendar from "../../components/Calendar/Calendar";
import PageTitle from "../../components/UI/PageTitle/PageTitle";
import { useFetching } from "../../hooks/useFetching";
import ILesson, { IGetScheduleResponse, ScheduleDays } from "../../types/migaik";
import Schedule from "../../components/Schedule/Schedule";

const MainPage = () => {
    const [currentDate, setCurrentDate] = useState<Date | null>(new Date())
    const [schedule, setSchedule] = useState<IGetScheduleResponse | null>(null)
    const [currentSchedule, setCurrentSchedule] = useState<ILesson[]>([])

    const [fetchSchedule] = useFetching(async() => {
        const response = await MigaikService.getSchedule(currentDate || new Date())
        setSchedule(response.data)
    })

    useEffect(() => {
        fetchSchedule()
    }, [currentDate])

    useEffect(() => {
        if (!schedule || !currentDate) {
            return
        }
        const day = ScheduleDays[currentDate.getDay() as keyof typeof ScheduleDays]
        setCurrentSchedule(schedule.schedule[day] || [])
    }, [schedule, currentDate])

    return (
        <>
            <PageTitle>
                Мероприятия
            </PageTitle>
            <div className="flex flex-col gap-3 mt-5">
                <Calendar date={currentDate} onChange={setCurrentDate} />
                <div className="flex justify-between gap-2">
                    <div className='bg-[#FEFEFE] text-[#333] py-[9.5px] w-full rounded-full text-center dark:bg-[#222] dark:text-white'>
                        События
                    </div>
                    <div className='bg-[#333] text-[#FEFEFE] py-[9.5px] w-full rounded-full text-center dark:bg-[#FEFEFE] dark:text-[#222]'>
                        Расписание
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <Schedule schedule={currentSchedule} />
            </div>
        </>
    );
}

export default MainPage;