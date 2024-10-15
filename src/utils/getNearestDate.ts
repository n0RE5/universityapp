export default function getNearestDate( startDate: Date, data: Date[]) {
    const startTime: number = +startDate;
    let nearestDate: number | undefined
    let nearestDiff = Infinity;
    for(let i = 0, n = data.length;  i < n;  ++i ) {
        const diff = +data[i] - startTime;
        if( diff > 0  &&  diff < nearestDiff ) {
            nearestDiff = diff;
            nearestDate = i;
        }
    }
    return nearestDate === undefined ? -1 : nearestDate;
}
