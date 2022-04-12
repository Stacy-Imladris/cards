import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {CardsList} from './CardsList';
import s from './CardsTable.module.css'
import {useAppSelector} from '../../../bll/store';
import {getCards} from '../../../bll/cards-reducer';

export const CardsTable = () => {
    //const [sortField, setSortField] = useState<SortValuesType>('updated')
    //const [sortValue, setSortValue] = useState<SortOrderType>('1')

    const cards = useAppSelector(state => state.cards.cards)
    const cardQuestion = useAppSelector(state => state.cards.params.cardQuestion)
    const cardAnswer = useAppSelector(state => state.cards.params.cardAnswer)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCards())
    }, [dispatch, cardQuestion, cardAnswer])

    /*const changeSortField = (fieldToSort: SortValuesType) => {
        setSortField(fieldToSort)
        setSortValuesToStore(dispatch, sortValue, fieldToSort)
    }

    const changeSortOrder = () => {
        const sort = sortValue === '0' ? '1' : '0'
        setSortValue(sort)
        setSortValuesToStore(dispatch, sort, sortField)
    }*/

    //const triangle = sortValue === '0' ? '▼' : '▲'
    const triangle = '▲'

    return <>
        <table className={s.table}>
            <thead className={s.headers}>
            <tr>
                <th className={s.question}>
                    {/*<span onClick={() => changeSortField('name')}>
                        Question <span className={s.triangle}>{sortField === 'name' && <span onClick={changeSortOrder}>{triangle}</span>}</span>
                    </span>*/}
                    <span>
                        Question
                    </span>
                </th>
                <th className={s.answer}>
                    {/*<span onClick={() => changeSortField('cardsCount')}>*/}
                    {/*    Answer <span className={s.triangle}>{sortField === 'cardsCount' && <span onClick={changeSortOrder}>{triangle}</span>}</span>*/}
                    {/*</span>*/}
                    <span>
                        Answer
                    </span>
                </th>
                <th className={s.updated}>
                    {/*<span onClick={() => changeSortField('updated')}>
                        Updated <span className={s.triangle}>{sortField === 'updated' && <span onClick={changeSortOrder}>{triangle}</span>}</span>
                    </span>*/}
                    <span>
                        Updated
                    </span>
                </th>
                <th className={s.grade}>
                    {/*<span onClick={() => changeSortField('user_name')}>
                        Grade <span className={s.triangle}>{sortField === 'user_name' && <span onClick={changeSortOrder}>{triangle}</span>}</span>
                    </span>*/}
                    <span>
                        Grade
                    </span>
                </th>
            </tr>
            </thead>
            <tbody>
            <CardsList cards={cards}/>
            </tbody>
        </table>
    </>
}