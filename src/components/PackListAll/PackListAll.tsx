import s from './PackLiastAll.module.css'
import {PacksTable} from "../PacksTable/PacksTable";
import t from '../../common/styles/Themes.module.css';
import {useAppSelector} from "../../bll/store";
import SuperButton from "../../common/super-components/c2-SuperButton/SuperButton";
import SuperInputText from "../../common/super-components/c1-SuperInputText/SuperInputText";
import {useState} from "react";
import {AlternativeSuperDoubleRange} from "../../common/super-components/c8-SuperDoubleRange/AlternativeSuperDoubleRange";
import {Paginator} from '../Paginator/Paginator';

export const PackListAll = () => {
    const theme = useAppSelector(state => state.theme.theme)

    const [value1Range, setValue1] = useState(0)
    const [value2Range, setValue2] = useState(200)

    const changeValue = (value: number) => {
        if (value < value2Range) {
            setValue1(value)
        }
    }

    const changeTwoValue = (value: [number, number] | number[]) => {
        setValue1(value[0])
        setValue2(value[1])
    }


    return (
        <div className={`${s.profileWrapper} ${s.container} ${t[theme + '-text']}`}>
            <p>Snow packs cards</p>
            <div className={s.buttons}>
                <button>My</button>
                <button>All</button>
            </div>
            <div>
                <p>Number of cards</p>
                <div className={s.input}>
                    <span className={`${s.num} ${t[theme + '-text']}`}>{value1Range}</span>
                    <AlternativeSuperDoubleRange value={[value1Range, value2Range]} onChangeRange={changeTwoValue}/>
                    <span className={`${s.num} ${t[theme + '-text']}`}>{value2Range}</span>
                </div>
            </div>
            <div>
                <SuperInputText/>
            </div>
            <div>
                <SuperButton>Add new pack</SuperButton>
            </div>
            <div className={s.packsTable}>
                <PacksTable/>
            </div>
            <div className={s.profilePacks_pagination}>
                <Paginator/>
            </div>
        </div>
    )
}