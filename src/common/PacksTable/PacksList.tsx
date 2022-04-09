import {FC} from 'react'
import {PackActions} from './PackActions'
import {PackType} from '../../bll/packs-reducer';

type PackListPropsType = {
    cardPacks: Array<PackType>
}

export const PacksList: FC<PackListPropsType> = ({cardPacks}) => {
    return <>
        {
            cardPacks.map(pack => {
                    return <tr key={pack._id}>

                        <td>{pack.name}</td>
                        <td>{pack.cardsCount}</td>
                        <td>{pack.updated}</td>
                        <td>{pack.user_name}</td>

                        <td>
                            <PackActions key={pack._id} isMyPacks={pack.private}/>
                        </td>
                    </tr>
                }
            )}

    </>
}