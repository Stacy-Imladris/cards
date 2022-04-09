export const loadValue = () => {
    try {
        const resultAsString = localStorage.getItem('theme')
        if (resultAsString === null) {
            return undefined
        }
        return JSON.parse(resultAsString)
    } catch (err) {
        return undefined
    }
}

export const saveState = (theme: string) => {
    try {
        localStorage.setItem('theme', JSON.stringify(theme))
    } catch {}
}
