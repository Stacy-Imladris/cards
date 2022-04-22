import {FC, memo} from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import {selectMaxCardsCount, selectMinCardsCount} from '../../../store/selectors'
import {useAppSelector} from '../../../store/store'

type SuperDoubleRangePropsType = {
    onChangeRange: (value: number[]) => void
    value: number[]
    min: number
    max: number
}

export const SuperDoubleRange: FC<SuperDoubleRangePropsType> = memo(({
                                                                         onChangeRange,
                                                                         value, min, max,
                                                                         ...restProps
                                                                     }) => {
    const value1 = useAppSelector(selectMinCardsCount)
    const value2 = useAppSelector(selectMaxCardsCount)

    const handleChange = (event: Event, newRange: number | number[]) => {
        onChangeRange(newRange as number[])
    }


    return (
        <Box sx={{width: 130, display: 'inline-block', margin: '0 10px 0 10px'}}>
            <Slider
                getAriaLabel={() => 'My range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                sx={{color: 'success.main'}}
                min={value1}
                max={value2}
                {...restProps}/>
        </Box>
    )
})