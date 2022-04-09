import {useDispatch} from 'react-redux';

import s from './Paginator.module.css';
import {useAppSelector} from '../../bll/store';
import {getPagesForRender} from '../../utils/page-helper';
import {packsActions} from '../../bll/packs-reducer';

export const Paginator = () => {
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const currentPage = useAppSelector(state => state.packs.params.page)
    const pageCount = useAppSelector(state => state.packs.pageCount)

    const dispatch = useDispatch()

    const pagesCount = Math.ceil(cardPacksTotalCount / pageCount)

    const pages = []
    for (let i = 1; i <= pagesCount; i += 1) {
        pages.push(i)
    }

    const pagesForRender = getPagesForRender(pages, currentPage, pagesCount)

    const onPageChanged = (page: number) => {
        dispatch(packsActions.setCurrentPage(page))
    }

    return (
        <div className={s.paginatorContainer}>
            <div className={s.container}>
                <div>
                    {currentPage > 3 && (
                        <>
                            <button
                                onClick={() => onPageChanged(currentPage - 1)}>Previous
                            </button>
                            <button className={currentPage === 1 ? s.selectedPage : ''}
                                    onClick={() => onPageChanged(1)}> 1
                            </button>
                            <span>...</span>
                        </>
                    )}
                </div>
                <div>
                    {pagesForRender.map(p => (
                        <button className={currentPage === p ? s.selectedPage : ''}
                                onClick={() => onPageChanged(p)} key={p}> {p} </button>))}
                </div>
                <div>
                    {currentPage < pages.length - 2 && (
                        <>
                            <span>...</span>
                            <button
                                className={currentPage === pages.length ? s.selectedPage : ''}
                                onClick={() => onPageChanged(pages.length)}> {pages.length} </button>
                            <button onClick={() => onPageChanged(currentPage + 1)}>Next
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}