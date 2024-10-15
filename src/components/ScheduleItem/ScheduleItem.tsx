import React from 'react'
import Box from '../UI/Box/Box';
import ILesson from '../../types/migaik';
import getLessonTime from '../../utils/getLessonTime';
import getTeacherName from '../../utils/getTeacherName';
import getLessonTypeStr from '../../utils/getLessonTypeStr';

interface ScheduleItemProps {
    lesson: ILesson
    highlighted?: boolean
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({ lesson, highlighted=false }) => {
    return (
        <Box className={highlighted
            ? 'bg-[#D01F36] shadow-[0px_0px_5px_#D01F36]'
            : 'shadow-[0px_0px_5px_#EFEFEF] bg-[#FEFEFE] dark:shadow-[0px_0px_5px_#222222] dark:bg-[#222]'
        }>
            <div className='flex'>
                <div className='flex flex-col w-[70%]'>
                    <div className={`text-base font-bold mb-[10px] text-black dark:text-white ${highlighted ? '!text-[#FEFEFE]' : ''}`}>
                        {lesson.disciplineName} {getLessonTypeStr(lesson.lessonType)}
                    </div>
                    <div className={`text-sm text-[#4F4F4F] mb-1 dark:text-[#EBEBEB] ${highlighted ? '!text-[#FEFEFE]' : ''}`}>
                        {getTeacherName(lesson.teachers)}
                    </div>
                    <div className={`text-[11px] text-[#828282] dark:text-[#828282] ${highlighted ? '!text-[#E0E0E0]' : ''}`}>
                        {lesson.classroomName} ({lesson.classroomBuilding}, {lesson.classroomFloor} этаж)
                    </div>
                </div>
                <div className='flex flex-col w-[30%]'>
                    <div className={`text-base self-end text-end font-bold text-[#333] dark:text-white {highlighted ? 'text-[#FEFEFE]' : ''}`}>
                        {getLessonTime(lesson.lessonStartTime)}
                    </div>
                </div>
            </div>
        </Box>
    );
}

export default ScheduleItem;