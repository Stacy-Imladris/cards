import {FC} from 'react'
import {PackActions} from './PackActions'
import {PackType} from '../../api/packs-api';

type PackPropsType = {
    pack: PackType
}

export const Pack: FC<PackPropsType> = ({pack}) => {
    return <tr>
        <td>{pack.name}</td>
        <td>{pack.cardsCount}</td>
        <td>{pack.updated}</td>
        <td>{pack.user_name}</td>
        <td>
            <PackActions isMyPacks={pack.private}/>
        </td>
    </tr>
}