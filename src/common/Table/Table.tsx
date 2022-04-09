import {PacksList} from './PacksList'

export const Table = () => {

    const cardPacks: Array<PackType> = [
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
        <PacksList cardPacks={cardPacks}/>
        </tbody>
    </table>
}

export type PackType = {
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



