import React, {ChangeEvent, useState} from 'react'
import s from './Test.module.css'
import SuperButton from '../../common/super-components/c2-SuperButton/SuperButton';
import SuperCheckbox from '../../common/super-components/c3-SuperCheckbox/SuperCheckbox';
import SuperInputText from '../../common/super-components/c1-SuperInputText/SuperInputText';
import SuperEditableSpan from '../../common/super-components/c4-SuperEditableSpan/SuperEditableSpan';
import SuperSelect from '../../common/super-components/c5-SuperSelect/SuperSelect';
import SuperRadio from '../../common/super-components/c6-SuperRadio/SuperRadio';
import {useAppSelector} from '../../bll/store';
import {themeActions, ThemeType} from '../../bll/themeReducer';
import t from '../../common/styles/Themes.module.css';
import SuperRange from '../../common/super-components/c7-SuperRange/SuperRange';
import {SuperDoubleRange} from '../../common/super-components/c8-SuperDoubleRange/SuperDoubleRange';
import {AlternativeSuperDoubleRange} from '../../common/super-components/c8-SuperDoubleRange/AlternativeSuperDoubleRange';
import {useDispatch} from 'react-redux';

export const Test = () => {
    const theme = useAppSelector(state => state.theme.theme)
    const dispatch = useDispatch()

    const [text, setText] = useState<string>('')
    const error = text ? '' : 'error'

    const showAlert = () => {
        if (error) {
            alert('введите текст...')
        } else {
            alert(text)
        }
    }

    const [checked, setChecked] = useState<boolean>(false)
    const testOnChange = (e: ChangeEvent<HTMLInputElement>) => setChecked(e.currentTarget.checked)

    const [value, setValue] = useState<string>('')

    const arr = ['x', 'y', 'z']
    const [valueFromArray, onChangeOption] = useState(arr[0])

    const [value1Range, setValue1] = useState(0)
    const [value2Range, setValue2] = useState(100)

    const changeValue = (value: number) => {
        if (value < value2Range) {
            setValue1(value)
        }
    }

    const changeTwoValue = (value: [number, number] | number[]) => {
        setValue1(value[0])
        setValue2(value[1])
    }

    const themes = ['day', 'night']
    const onChangeCallback = (theme: ThemeType) => {
        dispatch(themeActions.changeTheme(theme))
    }

    return (
        <div className={s.column}>
            <SuperInputText value={text} onChangeText={setText} onEnter={showAlert}
                            error={error} spanClassName={s.testSpanError}/>
            <SuperButton>default</SuperButton>
            <SuperButton disabled>disabled</SuperButton>
            <SuperButton red onClick={showAlert}>delete</SuperButton>
            <SuperCheckbox checked={checked} onChange={testOnChange}/>
            <SuperEditableSpan value={value} onChangeText={setValue}
                spanProps={{children: value ? undefined : 'enter text here...'}}/>
            <SuperSelect options={arr} value={valueFromArray} onChangeOption={onChangeOption}/>
            <SuperRadio name={'radio'} options={arr} value={valueFromArray} onChangeOption={onChangeOption}/>
            <div className={s.input}>
                <span className={`${s.num} ${t[theme + '-text']}`}>{value1Range}</span>
                <SuperRange onChangeRange={changeValue} value={value1Range}/>
            </div>
            <div className={s.input}>
                <span className={`${s.num} ${t[theme + '-text']}`}>{value1Range}</span>
                <SuperDoubleRange value={[value1Range, value2Range]} onChangeRange={changeTwoValue}/>
                <span className={`${s.num} ${t[theme + '-text']}`}>{value2Range}</span>
            </div>
            <div className={s.input}>
                <span className={`${s.num} ${t[theme + '-text']}`}>{value1Range}</span>
                <AlternativeSuperDoubleRange value={[value1Range, value2Range]} onChangeRange={changeTwoValue}/>
                <span className={`${s.num} ${t[theme + '-text']}`}>{value2Range}</span>
            </div>
            <span className={t[theme + '-text']}>
                change theme
            </span>
            <SuperSelect
                options={themes}
                value={theme}
                onChangeOption={onChangeCallback}
            />
        </div>
    )
}