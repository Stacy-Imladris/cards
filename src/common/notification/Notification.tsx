import s from './Notification.module.css'
import c from "../styles/Container.module.css";
import t from "../styles/Themes.module.css";
import {useAppSelector} from "../../bll/store";
import {selectTheme} from "../../selectors/selectors";

type NotificationPropsType = {
    text: string
}

export const Notification =(props: NotificationPropsType)=> {
    const theme = useAppSelector(selectTheme)
    return (
        <div className={t[theme + '-text']}>
            <div className={s.notification}>{props.text}</div>
        </div>
    )
}