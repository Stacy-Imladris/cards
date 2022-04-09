import {FC} from 'react'
import {addZeroToDigit} from '../../utils/helpers'
import {PackActions} from './PackActions'
import {packType} from './Table'

type PackListPropsType = {
    cardPacks: Array<packType>
}

export const PacksList: FC<PackListPropsType> = ({cardPacks}) => {
    return <>
        {
            cardPacks.map(pack => {

                    const day = addZeroToDigit(pack.updated.getDay())
                    const month = addZeroToDigit(pack.updated.getMonth())
                    const year = pack.updated.getFullYear()

                    const lastUpdated = `${day}.${month}.${year}`

                    return <tr key={pack._id}>

                        <td>{pack.name}</td>
                        <td>{pack.cardsCount}</td>
                        <td>{lastUpdated}</td>
                        <td>{pack.user_name}</td>

                        <td>
                            <PackActions key={pack._id} isMyPacks={pack.private}/>
                        </td>
                    </tr>
                }
            )}

    </>
}