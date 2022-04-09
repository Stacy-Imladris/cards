import {FC} from 'react'
import {addZeroToDigit} from '../../utils/helpers'
import {PackActions} from './PackActions'
import {PackType} from './Table'

type PackPropsType = {
    pack: PackType
}

export const Pack: FC<PackPropsType> = ({pack}) => {

    const day = addZeroToDigit(pack.updated.getDay())
    const month = addZeroToDigit(pack.updated.getMonth())
    const year = pack.updated.getFullYear()

    const lastUpdated = `${day}.${month}.${year}`

    return <tr>
        <td>{pack.name}</td>
        <td>{pack.cardsCount}</td>
        <td>{lastUpdated}</td>
        <td>{pack.user_name}</td>
        <td>
            <PackActions key={pack._id} isMyPacks={pack.private}/>
        </td>
    </tr>

}