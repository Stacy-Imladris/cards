import React from 'react'
import s from './Preloader.module.css'

export const AppPreloader = () => {
    return <div className={s.app_progress}>
        <div className={s.progress}>
            <div></div>
        </div>
    </div>
}