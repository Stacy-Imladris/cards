import {KEYS} from '../enums/localstorageKeys';

export const loadValue = () => {
    try {
        const resultAsString = localStorage.getItem(KEYS.THEME)
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
        localStorage.setItem(KEYS.THEME, JSON.stringify(theme))
    } catch {}
}
