import {useState} from 'react';
import styles from './Error404.module.css'
import t from 'common/styles/Themes.module.css'
import {NavLink} from 'react-router-dom'
import {SuperButton} from 'common/super-components/c2-SuperButton/SuperButton'
import {selectTheme} from 'store/selectors';
import {PATH} from 'enums/paths';
import {useAppSelector} from 'store/store';
import {getRandom} from 'utils/getRandom';

export const Error404 = () => {
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
    const [opacity, setOpacity] = useState(1)
    const [position, setPosition] = useState<'static' | 'absolute'>('static')

    const theme = useAppSelector(selectTheme)

    const onMouseEnterButtonLeave = () => {
        setPosition('absolute')
        setHeight(getRandom(0, 300))
        setWidth(getRandom(0, 300))
        setOpacity(0)
    }

    const onMouseLeaveButtonAppear = () => setOpacity(1)

    const onClickShowMessage = () => alert('Probably, you wanted to click on the Profile and missed it? (◕‿◕)')

    return (
        <div className={`${styles.container} ${t[theme + '-text']}`}>
            <div className={`${styles.error} ${t[theme + '-text']}`}>404</div>
            <div className={`${styles.text} ${t[theme + '-text']}`}>Page not found!</div>
            <div className={`${styles.textNav} ${t[theme + '-text']}`}>
                Maybe, you want to see your
                <NavLink to={PATH.PROFILE} className={styles.nav}> Profile</NavLink> page?
            </div>
            <div className={`${styles.lastLine} ${t[theme + '-text']}`}>
                <div>In case you decide to leave this awesome application, press button:</div>
                <div style={{top: `calc(50vh - ${height}px)`, left: `calc(50vw - ${width}px)`, opacity, position}}
                     className={styles.joke}>
                    <SuperButton onMouseEnter={onMouseEnterButtonLeave}
                                 onMouseLeave={onMouseLeaveButtonAppear}
                                 onClick={onClickShowMessage}>Leave</SuperButton>
                </div>
            </div>
        </div>
    )
}