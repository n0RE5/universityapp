import { LessonType } from "../types/migaik";

export default function getLessonTypeStr(type: LessonType) {
    switch(type) {
        case 'Лекционные занятия':
            return '(лек)'
        case 'Практические занятия':
            return '(практика)'
        default:
            return ''
    }
}