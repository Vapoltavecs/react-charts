export const findMinMax = (numbers: number[]):{max: number, min: number} => {
    const max = Math.max(...numbers)
    const min = Math.min(...numbers)
    return {min, max}
}