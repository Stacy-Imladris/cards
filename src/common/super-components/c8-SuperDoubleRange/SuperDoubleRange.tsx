import React, {useState} from 'react'
import s from './SuperDoubleRange.module.css'

type SuperDoubleRangePropsType = {
    onChangeRange?: (value: [number, number]) => void
    value?: [number, number]
    // min, max, step, disable, ...
}

export const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        onChangeRange, value,
        ...restProps
        // min, max, step, disable, ...
    }
) => {
    const [range, setRange] = useState<[number, number]>(value ? value : [0, 100]);

    const onChangeCallback = (arr: [number, number]) => {
        onChangeRange && onChangeRange(arr)
    }
    const onChange = (val: number, n: number) => {
        if (value) {
            let condition = n === 0 ? val < value[1] : val > value[0]
            if (condition) {
                onChangeCallback(n === 0 ? [val, value[1]] : [value[0], val])
            }
        } else {
            let condition = n === 0 ? val < range[1] : val > range[0]
            if (condition) {
                setRange(n === 0 ? [val, range[1]] : [range[0], val])
            }
        }
    }

    return (
        <>
            <div className={s.container}>
                <input type="range"
                       value={value ? value[0] : range[0]}
                       onChange={(e) => onChange(+e.currentTarget.value, 0)} className={s.slider}
                       {...restProps}/>
                <input type="range"
                       value={value ? value[1] : range[1]}
                       onChange={(e) => onChange(+e.currentTarget.value, 1)} className={s.slider1}
                       {...restProps}/>
            </div>
        </>
    )
}