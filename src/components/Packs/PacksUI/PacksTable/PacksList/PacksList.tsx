import {memo} from 'react'
import {Pack} from './Pack/Pack/Pack'
import {PackType} from 'components/Packs/PacksAPI/packs-api';

type Props = {
    cardPacks: PackType[]
}

export const PacksList = memo(({cardPacks}: Props) =>
    <>{cardPacks.map(pack => <Pack key={pack._id} pack={pack}/>)}</>)