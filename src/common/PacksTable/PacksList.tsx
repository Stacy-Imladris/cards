import {FC} from 'react'
import {Pack} from './Pack'
import {PackType} from '../../bll/packs-reducer';

type PackListPropsType = {
    cardPacks: PackType[]
}

export const PacksList: FC<PackListPropsType> = ({cardPacks}) => {
    return <>
        {
            cardPacks.map(pack => <Pack key={pack._id} pack={pack}/>)
        }
    </>
}