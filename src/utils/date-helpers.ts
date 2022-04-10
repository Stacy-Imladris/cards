export const addZeroToDigit = (digit: number) => digit.toString().length < 2 ? `0${digit}` : `${digit}`

export const getLastUpdatedDate = (serverDate: Date) => {
    const date = new Date(serverDate)

    const day = addZeroToDigit(date.getDate())
    const month = addZeroToDigit(date.getMonth() + 1)
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
}