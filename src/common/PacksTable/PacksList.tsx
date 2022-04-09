import {FC} from 'react'
import {PackType} from './Table'
import {Pack} from './Pack'

type PackListPropsType = {
    cardPacks: Array<PackType>
}

export const PacksList: FC<PackListPropsType> = ({cardPacks}) => {
    return <>
        {
            cardPacks.map(pack => <Pack key={pack._id} pack={pack}/>)
        }
    </>
}