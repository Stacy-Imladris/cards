import {FC} from 'react'
import {PackActions} from './PackActions'
import {PackType} from '../../bll/packs-reducer';
import {useAppSelector} from '../../bll/store'

type PackPropsType = {
    pack: PackType
}

export const Pack: FC<PackPropsType> = ({pack}) => {
    const userId = useAppSelector(state => state.profile.user._id)
    return <tr>
        <td>{pack.name}</td>
        <td>{pack.cardsCount}</td>
        <td>{pack.updated}</td>
        <td>{pack.user_name}</td>
        <td>
            <PackActions key={pack._id} isMyPacks={pack.user_id === userId}/>
            {/*<PackActions key={pack._id} isMyPacks={true}/>*/}
        </td>
    </tr>

}