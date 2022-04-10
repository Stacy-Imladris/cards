import {PacksList} from './PacksList'
import {getPacks} from '../../bll/packs-reducer'
import {useDispatch} from 'react-redux'
import {useAppSelector} from '../../bll/store'
import {useEffect, useState} from 'react'
import s from './PacksTable.module.css'

export const PacksTable = () => {
    const packs = useAppSelector(state => state.packs.packs)
    const packName = useAppSelector(state => state.packs.params.packName)
    const packUser_id = useAppSelector(state => state.packs.params.user_id)

    const [sortName, setSortName] = useState<boolean>(true)
    const [sortCards, setSortCards] = useState<boolean>(false)
    const [sortUpdate, setSortUpdate] = useState<boolean>(false)
    const [sortCreated, setSortCreated] = useState<boolean>(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPacks())
    }, [dispatch, packName, packUser_id])

    const sortStyleName = sortName ? `${s.triangle}` : `${s.triangle_up}`
    const sortStyleCards = sortCards ? `${s.triangle}` : `${s.triangle_up}`
    const sortStyleUpdate = sortUpdate ? `${s.triangle}` : `${s.triangle_up}`
    const sortStyleCreated = sortCreated ? `${s.triangle}` : `${s.triangle_up}`

    return <>
        <table className={s.table}>
            <thead>
            <tr>
                <th className={s.th}>
                    <span>Name</span>
                    <span className={sortStyleName} onClick={() => setSortName(sortName => !sortName)}></span>
                </th>
                <th className={s.th}>
                    <span>Cards</span>
                    <span className={sortStyleCards} onClick={() => setSortCards(sortCards => !sortCards)}></span>
                </th>
                <th className={s.th}>
                    <span>Last Updated</span>
                    <span className={sortStyleUpdate} onClick={() => setSortUpdate(sortUpdate => !sortUpdate)}></span>
                </th>
                <th className={s.th}>
                    <span>Created by</span>
                    <span className={sortStyleCreated} onClick={() => setSortCreated(sortCreated => !sortCreated)}></span>
                </th>
                <th className={s.th}>
                    <span>Actions</span>
                </th>
            </tr>
            </thead>

            <tbody>
            <PacksList cardPacks={packs}/>
            </tbody>
        </table>
    </>
}