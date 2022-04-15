import s from './Notification.module.css'
import t from "../styles/Themes.module.css";
import {useAppSelector} from "../../bll/store";
import {selectTheme} from "../../selectors/selectors";

type NotificationPropsType = {
    text: string
}

export const Notification =({text}: NotificationPropsType)=> {
    const theme = useAppSelector(selectTheme)

    if (text === 'you are not authorized /ᐠ-ꞈ-ᐟ\\') return <></>

    return (
        <div className={t[theme + '-text']}>
            <div className={s.notification}>{text}</div>
        </div>
    )
}