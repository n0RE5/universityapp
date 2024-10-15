export default function parseLessonDate(date_str: string, start_time: string) {
    return date_str.split('T')[0] + 'T' + start_time + 'Z'
}