import React, { useMemo } from 'react'
import ILesson from '../../types/migaik';
import ScheduleItem from '../ScheduleItem/ScheduleItem';
import getNearestDate from '../../utils/getNearestDate';
import parseLessonDate from '../../utils/parseLessonDate';

interface ScheduleProps {
    schedule: ILesson[]
}

const Schedule: React.FC<ScheduleProps> = ({ schedule }) => {
    const sortedSchedule = useMemo(() => schedule.sort((a, b) => a.lessonOrderNumber - b.lessonOrderNumber), [schedule])

    const hightlight = (lesson: ILesson) => {
        const currentDate = new Date(lesson.lessonDate)
        const scheduleDateArray = schedule.map(i => new Date(parseLessonDate(i.lessonDate, i.lessonStartTime)))
        const hightlightIndex = getNearestDate(currentDate, scheduleDateArray)
        const hightlightedLesson = schedule[hightlightIndex]
        return hightlightedLesson?.lessonStartTime === lesson.lessonStartTime
    }

    return (
        <div className='w-full'>
            <div className='flex flex-col gap-6'>
                {sortedSchedule.map((lesson, index) =>
                    <ScheduleItem
                        key={index}
                        lesson={lesson}
                        highlighted={hightlight(lesson)}
                    />
                )}
            </div>
        </div>
    );
}

export default Schedule;