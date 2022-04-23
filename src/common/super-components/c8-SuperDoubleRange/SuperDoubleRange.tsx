import {FC, memo, useState} from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

type SuperDoubleRangePropsType = {
    onChangeRange?: (value: [number, number] | number[]) => void
    value?: [number, number]
    min: number
    max: number
}

export const SuperDoubleRange: FC<SuperDoubleRangePropsType> = memo(({
                                                                         onChangeRange,
                                                                         value, min, max,
                                                                         ...restProps
                                                                     }) => {

    const [range, setRange] = useState<number[]>(value ? value : [min, max]);

    const handleChange = (event: Event, newRange: number | number[]) => {
        setRange(newRange as number[]);
        onChangeCallback(newRange as number[])
    }

    const onChangeCallback = (arr: number[]) => {
        onChangeRange && onChangeRange(arr)
    }


    return (
        <Box sx={{width: 130, display: 'inline-block', margin: '0 10px 0 10px'}}>
            <Slider
                getAriaLabel={() => 'My range'}
                value={range}
                onChange={handleChange}
                valueLabelDisplay="auto"
                sx={{color: 'success.main'}}
                min={min}
                max={max}
                {...restProps}/>
        </Box>
    )
})