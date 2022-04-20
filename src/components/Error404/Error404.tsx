import s from './Error404.module.css'
import t from '../../common/styles/Themes.module.css'
import {NavLink} from 'react-router-dom'
import {SuperButton} from '../../common/super-components/c2-SuperButton/SuperButton'
import {useAppSelector} from '../../bll/store'
import {selectTheme} from '../../selectors/selectors';
import {useState} from 'react';
import {PATH} from '../../enums/paths';

export const Error404 = () => {
    const [height, setHeight] = useState<number>(-120)
    const [width, setWidth] = useState<number>(-260)
    const [opacity, setOpacity] = useState<number>(1)

    const theme = useAppSelector(selectTheme)

    const random = (min: number, max: number) => Math.floor(min + Math.random() * (max - min + 1))

    const onMouseEnterButtonLeave = () => {
        setHeight(random(0, 300))
        setWidth(random(0, 300))
        setOpacity(0)
    }

    const onMouseLeaveButtonAppear = () => {
        setOpacity(1)
    }

    const onClickShowMessage = () => {
        alert('Probably, you wanted to click on the Profile and missed it? (◕‿◕)')
    }

    let top = `calc(50vh - ${height}px)`
    let left = `calc(50vw - ${width}px)`

    return (
        <div className={`${s.container} ${t[theme + '-text']}`}>
            <div className={`${s.error} ${t[theme + '-text']}`}>404</div>
            <div className={`${s.text} ${t[theme + '-text']}`}>Page not found!</div>
            <div className={`${s.textNav} ${t[theme + '-text']}`}>
                Maybe, you want to see your
                <NavLink to={PATH.PROFILE} className={s.nav}> Profile</NavLink> page?
            </div>
            <div className={`${s.lastLine} ${t[theme + '-text']}`}>
                In case you decide to leave this awesome application, press button:
                <div style={{left, top, opacity}} className={s.joke}>
                    <SuperButton onMouseEnter={onMouseEnterButtonLeave}
                                 onMouseLeave={onMouseLeaveButtonAppear}
                                 onClick={onClickShowMessage}>Leave</SuperButton>
                </div>
            </div>
        </div>
    )
}