import {FC, useEffect, useState} from 'react';
import s from './Scroll.module.css'
import {SuperButton} from "../super-components/c2-SuperButton/SuperButton";


interface IModalUp {
    speed?: number
}

export const Scroll: FC<IModalUp>=({speed = 10})=> {
    const [show, setShow] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 100) setShow(true);
        else setShow(false);
    };

    const scrollFunction = () => {
        const step = window.scrollY / speed;
        let lastState = window.scrollY;

        const innerTimer = setInterval(() => {
            if (lastState < window.scrollY) clearInterval(innerTimer);
            lastState = window.scrollY;

            window.scroll(0, lastState - step);
            if (window.scrollY === 0) clearInterval(innerTimer);
        }, 50);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, []);

    return (<>
            {show &&
            <SuperButton className={s.scroll} onClick={scrollFunction}>
              ⃤
            </SuperButton>}
        </>
    );
}