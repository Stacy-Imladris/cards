import s from './PackLiastAll.module.css'
import {PacksTable} from "../PacksTable/PacksTable";
import t from '../../common/styles/Themes.module.css';
import {useAppSelector} from "../../bll/store";
import SuperButton from "../../common/super-components/c2-SuperButton/SuperButton";
import SuperInputText from "../../common/super-components/c1-SuperInputText/SuperInputText";
import React, {ChangeEvent, useState} from "react";
import {AlternativeSuperDoubleRange} from "../../common/super-components/c8-SuperDoubleRange/AlternativeSuperDoubleRange";
import SuperRadio from "../../common/super-components/c6-SuperRadio/SuperRadio";
import {useDispatch} from "react-redux";
import {packsActions} from "../../bll/packs-reducer";


export const PackListAll = () => {

    const theme = useAppSelector(state => state.theme.theme)
    const user_id = useAppSelector(state => state.profile.user._id)

    const arr = ['All', 'My']
    const [valueFromArray, setValueFromArray] = useState(arr[0])

    const onChangeOption = (value: string) => {
        setValueFromArray(value)
        if (value === 'All') {
            dispatch(packsActions.setPacksForUser(""))
        } else {
            dispatch(packsActions.setPacksForUser(user_id))
        }
    }

    const dispatch = useDispatch()
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
            <div className={s.superRadio}>
                <div>Snow packs cards</div>
                <div><SuperRadio name={'radio'} options={arr}
                                 value={valueFromArray} onChangeOption={onChangeOption}
                                 className={s.superRadio}/></div>
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
                profilePacks_pagination
                <div>1 2 3 4...</div>
            </div>


        </div>
    )
}