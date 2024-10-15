export default function getLessonTime(time: string): string {
    const splitted = time.split(':')
    if (splitted.length !== 3) {
        return '00:00'
    }
    return `${splitted[0]}:${splitted[1]}`
}