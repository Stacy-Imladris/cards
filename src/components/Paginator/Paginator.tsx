import s from './Paginator.module.css';
import {getPagesForRender} from '../../utils/page-helper';
import {memo} from 'react';

type PaginatorPropsType = {
    onPageChanged: (page: number) => void
    itemsTotalCount: number
    page: number
    pageCount: number
}

export const Paginator = memo(({onPageChanged, itemsTotalCount, page, pageCount}: PaginatorPropsType) => {
    const pagesCount = Math.ceil(itemsTotalCount / pageCount)

    const pages = []
    for (let i = 1; i <= pagesCount; i += 1) {
        pages.push(i)
    }

    const pagesForRender = getPagesForRender(pages, page, pagesCount)

    const onClickPageChanged = (page: number) => {
        onPageChanged(page)
    }

    return (
        itemsTotalCount ?
            <div className={s.paginatorContainer}>
                <div className={s.container}>
                    <div>
                        {page > 3 && (
                            <>
                                <button
                                    onClick={() => onClickPageChanged(page - 1)}>Previous
                                </button>
                                <button className={page === 1 ? s.selectedPage : ''}
                                        onClick={() => onClickPageChanged(1)}> 1
                                </button>
                                <span>...</span>
                            </>
                        )}
                    </div>
                    <div>
                        {pagesForRender.map(p => (
                            <button className={page === p ? s.selectedPage : ''}
                                    onClick={() => onClickPageChanged(p)}
                                    key={p}> {p} </button>))}
                    </div>
                    <div>
                        {page < pages.length - 2 && (
                            <>
                                <span>...</span>
                                <button
                                    className={page === pages.length ? s.selectedPage : ''}
                                    onClick={() => onClickPageChanged(pages.length)}>
                                    {pages.length}
                                </button>
                                <button onClick={() => onClickPageChanged(page + 1)}>
                                    Next
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            : <div className={s.emptyAnswer}>Nothing was found</div>
    )
})