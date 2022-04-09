import {PacksList} from './PacksList'
import {getPacks, PackType} from '../../bll/packs-reducer';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../bll/store';
import {useEffect} from 'react';

export const PacksTable = () => {
    const packs = useAppSelector(state => state.packs.packs)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPacks())
    }, [dispatch])

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
            __v: 0,
            deckCover: null,
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
            __v: 0,
            deckCover: null,
        },
    ]

    return <>
        <button onClick={() => dispatch(getPacks())}>getPacks</button>
        <table>
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
            <PacksList cardPacks={packs}/>
            </tbody>
        </table>
    </>
}