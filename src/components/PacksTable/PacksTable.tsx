import {PacksList} from './PacksList'
import {getPacks} from '../../bll/packs-reducer';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../bll/store';
import {useEffect} from 'react';

export const PacksTable = () => {
    const packs = useAppSelector(state => state.packs.packs)
    const currentPage = useAppSelector(state => state.packs.params.page)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPacks())
    }, [dispatch, currentPage])

    return <>
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