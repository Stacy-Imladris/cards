import s from './Paginator.module.css';
import {memo} from 'react';
import {SuperSelect} from '../../../common/super-components/c5-SuperSelect/SuperSelect';
import {getPages} from '../../../utils/getPages';

type PaginatorPropsType = {
    onChangeSetAmountOfItems: (amountOfItems: number) => void
    onPageChanged: (page: number) => void
    itemsTotalCount: number
    page: number
    pageCount: number
}

const itemsPerPage = [10, 20, 30]

export const Paginator = memo(({
                                   onChangeSetAmountOfItems,
                                   onPageChanged,
                                   itemsTotalCount,
                                   page,
                                   pageCount
                               }: PaginatorPropsType) => {
    const pagesCount = Math.ceil(itemsTotalCount / pageCount)

    const pages = []
    for (let i = 1; i <= pagesCount; i += 1) {
        pages.push(i)
    }

    const pagesForRender = getPages(pages, page, pagesCount)

    const onClickPageChanged = (page: number) => {
        onPageChanged(page)
    }

    return (
        itemsTotalCount ?
            <div className={s.paginatorContainer}>
                <div className={s.container}>
                    <div className={s.edge}>
                        {page > 3 && pagesCount > 5 && (
                            <>
                                <button onClick={() => onClickPageChanged(page - 1)}>
                                    ◁
                                </button>
                                <button className={page === 1 ? s.selectedPage : ''}
                                        onClick={() => onClickPageChanged(1)}> 1
                                </button>
                                <span>...</span>
                            </>
                        )}
                    </div>
                    <div className={s.center}>
                        {pagesForRender.map(p => (
                            <button className={page === p ? s.selectedPage : ''}
                                    onClick={() => onClickPageChanged(p)}
                                    key={p}> {p} </button>))}
                    </div>
                    <div className={s.edge}>
                        {page < pages.length - 2 && pagesCount > 5 && (
                            <>
                                <span>...</span>
                                <button
                                    className={page === pages.length ? s.selectedPage : ''}
                                    onClick={() => onClickPageChanged(pages.length)}>
                                    {pages.length}
                                </button>
                                <button onClick={() => onClickPageChanged(page + 1)}>
                                    ▷
                                </button>
                            </>
                        )}
                    </div>
                    <div className={s.show}>
                        <span>Show </span>
                        <SuperSelect options={itemsPerPage} value={pageCount}
                                     onChangeOption={onChangeSetAmountOfItems}/>
                    </div>
                </div>
            </div>
            : <div className={s.emptyAnswer}>Nothing was found</div>
    )
})