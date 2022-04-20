import {useCallback, useEffect, useState} from 'react';
import s from './Scroll.module.css'
import {SuperButton} from '../super-components/c2-SuperButton/SuperButton';

export const Scroll = () => {
    const [show, setShow] = useState(false);

    const handleScroll = useCallback(() => {
        if (window.scrollY > 100) setShow(true);
        else setShow(false);
    }, [])

    const scrollFunction = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    }, []);

    return <>
        {show && <SuperButton className={s.scroll} onClick={scrollFunction}>⃤</SuperButton>}
    </>
}