import ILesson from "../types/migaik";

export default function parseLessonDate(lesson: ILesson): Date {
    const [hours, minutes, seconds] = lesson.lessonStartTime.split(':').map(i => Number(i))
    const date = new Date(lesson.lessonDate)
    date.setHours(hours || 0)
    date.setMinutes(minutes || 0)
    date.setSeconds(seconds || 0)
    return date
}