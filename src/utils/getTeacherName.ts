import ILesson from "../types/migaik";

export default function getTeacherName(teachers: ILesson['teachers']) {
    if (!teachers.length) {
        return ''
    }
    const teacher = teachers[0]
    const lastName = teacher.lastName
    const firstName = teacher.firstName?.length ? `${teacher.firstName[0]}.`: ''
    const middleName = teacher.patronymic?.length ? `${teacher.patronymic[0]}.`: ''
    return `${lastName} ${firstName} ${middleName}`
}