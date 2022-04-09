import s from './Table.module.css'
import {PackActions} from './PackActions'
import {addZeroToDigit} from '../../utils/helpers'

export const Table = () => {

    const cardPacks: Array<packType> = [
        {
            _id: 'pack_1',
            user_id: '2',
            user_name: 'Peter Petrov',
            private: true,
            name: 'Peter\'s pack',
            path: '',
            grade: 0,
            shots: 0,
            cardsCount: 5,
            type: '',
            rating: 0,
            created: new Date('2020-05-09T15:40:40.339Z'),
            updated: new Date('2022-04-08T15:40:40.339Z'),
            more_id: '',
            __v: 0
        },
        {
            _id: 'pack_2',
            user_id: '2',
            user_name: 'Ivanov Ivan',
            private: false,
            name: 'Peter\'s pack',
            path: '',
            grade: 0,
            shots: 0,
            cardsCount: 7,
            type: '',
            rating: 0,
            created: new Date('2021-09-12T15:40:40.339Z'),
            updated: new Date('2022-03-05T15:40:40.339Z'),
            more_id: '',
            __v: 0
        },
        {
            _id: 'pack_2',
            user_id: '2',
            user_name: 'Ivanov Ivan',
            private: false,
            name: 'Peter\'s pack',
            path: '',
            grade: 0,
            shots: 0,
            cardsCount: 7,
            type: '',
            rating: 0,
            created: new Date('2021-09-12T15:40:40.339Z'),
            updated: new Date('2022-03-05T15:40:40.339Z'),
            more_id: '',
            __v: 0
        },
        {
            _id: 'pack_2',
            user_id: '2',
            user_name: 'Ivanov Ivan',
            private: false,
            name: 'Peter\'s pack',
            path: '',
            grade: 0,
            shots: 0,
            cardsCount: 7,
            type: '',
            rating: 0,
            created: new Date('2021-09-12T15:40:40.339Z'),
            updated: new Date('2022-03-05T15:40:40.339Z'),
            more_id: '',
            __v: 0
        }
    ]

    return <table>
        <thead>
        <tr>
            <th>Name</th>
            <th>Cards</th>
            <th>Last Updated</th>
            <th>Created by</th>
            <th>Actions</th>
        </tr>
        </thead>

        <tbody>
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

                        <td><PackActions key={pack._id} isMyPacks={pack.private}/></td>
                    </tr>
                }
            )}

        </tbody>
    </table>
}

export type packType = {
    _id: string,
    user_id: string,
    user_name: string,
    private: boolean,
    name: string,
    path: string,
    grade: number,
    shots: number,
    cardsCount: number,
    type: string,
    rating: number,
    created: Date,
    updated: Date,
    more_id: string,
    __v: number
}