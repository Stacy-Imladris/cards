export const addZeroToDigit = (digit: number) => digit.toString().length < 2 && `0${digit}`

export const getLastUpdatedDate = (date: Date) => {
    const day = addZeroToDigit(date.getDate())
    const month = addZeroToDigit(date.getMonth())
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
}