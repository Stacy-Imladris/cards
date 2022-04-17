import {FC, memo} from 'react'
import {Pack} from './Pack/Pack/Pack'
import {PackType} from '../../../PacksAPI/packs-api';

type PackListPropsType = {
    cardPacks: PackType[]
}

export const PacksList: FC<PackListPropsType> = memo(({cardPacks}) => {
    return <>
        {
            cardPacks.map(pack => <Pack key={pack._id} pack={pack}/>)
        }
    </>
})