import {FC} from 'react'
import {PackActions} from './PackActions'
import {PackType} from '../../bll/packs-reducer';

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
            <PackActions key={pack._id} isMyPacks={pack.private}/>
        </td>
    </tr>

}