import React, {useState} from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

type AlternativeSuperDoubleRangePropsType = {
    onChangeRange?: (value: [number, number] | number[]) => void
    value?: [number, number]
}

export const AlternativeSuperDoubleRange: React.FC<AlternativeSuperDoubleRangePropsType> = ({
                                                                                                onChangeRange,
                                                                                                value,
                                                                                                ...restProps
                                                                                            }) => {

    const [range, setRange] = useState<number[]>(value ? value : [0, 100]);

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
                value={value ? value : range}
                onChange={handleChange}
                valueLabelDisplay="auto"
                sx={{color: 'success.main'}}
                {...restProps}/>
        </Box>
    )
}