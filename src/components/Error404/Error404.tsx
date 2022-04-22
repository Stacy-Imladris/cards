import s from './Error404.module.css'
import t from '../../common/styles/Themes.module.css'
import {NavLink} from 'react-router-dom'
import {SuperButton} from '../../common/super-components/c2-SuperButton/SuperButton'
import {selectTheme} from '../../store/selectors';
import {useState} from 'react';
import {PATH} from '../../enums/paths';
import {useAppSelector} from '../../store/store';
import {getRandom} from '../../utils/getRandom';

export const Error404 = () => {
    const [height, setHeight] = useState<number>(0)
    const [width, setWidth] = useState<number>(0)
    const [opacity, setOpacity] = useState<number>(1)
    const [position, setPosition] = useState<'static' | 'absolute'>('static')

    const theme = useAppSelector(selectTheme)

    const onMouseEnterButtonLeave = () => {
        setPosition('absolute')
        setHeight(getRandom(0, 300))
        setWidth(getRandom(0, 300))
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
                <div>In case you decide to leave this awesome application, press button:</div>
                <div style={{top, left, opacity, position}} className={s.joke}>
                    <SuperButton onMouseEnter={onMouseEnterButtonLeave}
                                 onMouseLeave={onMouseLeaveButtonAppear}
                                 onClick={onClickShowMessage}>Leave</SuperButton>
                </div>
            </div>
        </div>
    )
}