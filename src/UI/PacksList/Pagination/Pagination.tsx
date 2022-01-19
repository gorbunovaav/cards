import React, {useEffect, useState} from 'react';
import s from './Paginations.module.scss'
import Select from './Select';

export const Pagination: React.FC<PropsType> = (props) => {

    let pagesCount = Math.ceil(props.cardPacksTotalCount / props.pageCount); // count of ALL pages, before the paginator
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const portionSize = 5; // Hom much pagination buttons to show
    const portionCount = Math.ceil(pagesCount / portionSize) // how much total pagination buttons

    const [portion, setPortion] = useState(1)
    const leftNumber = (portion - 1) * portionSize + 1
    const rightNumber = portion * portionSize

    const onFirstPageClick = () => {
        props.currentPageHandler(1)
        setPortion(1)
    }

    const onLastPageClick = () => {
        props.currentPageHandler(pagesCount)
        setPortion(portionCount)
    }

    const arrowClicked = false;

    useEffect(() => {
        props.currentPageHandler(leftNumber)
    }, [arrowClicked])

    return (
        <div className={s.pagination}>
            {portion === 1 &&
                <>
                    <button className={`${s.btn} ${s.btnLeft} ${s.btnFake}`}>&lt;</button>
                </>
            }
            {portion > 1 &&
                <>
                    <button className={`${s.btn} ${s.btnLeft}`} onClick={() => {
                        props.currentPageHandler((portionSize * (portion - 2)) + 1)
                        setPortion(portion - 1)
                    }}>&lt;</button>
                    <div className={s.item} onClick={onFirstPageClick}>1</div> {/*first page click*/}
                    <div className={s.points}>...</div>
                </>}

            {pages
                .filter((p) => p ? p >= leftNumber && p <= rightNumber : '')
                .map(q => {
                    return <div
                        key={q}
                        className={`${s.item} ${props.page === q ? s.select : ''}`}
                        onClick={() => {
                            props.currentPageHandler(q)
                        }}>
                        {q}
                    </div>
                })}
            {portion !== portionCount &&
                <>
                    <div className={s.points}>...</div>
                    <div className={s.item} onClick={onLastPageClick}>{pagesCount}</div> {/*last page click*/}
                </>
            }
            {portionCount > portion &&
                <button className={`${s.btn} ${s.btnRight}`} onClick={() => {
                    setPortion( portion + 1)
                    props.currentPageHandler(portionSize * portion + 1)
                }}>&gt;</button>}
            <div className={s.selectBlock}>
                <span className={s.label1}>Show</span>
                <Select
                    options={props.superSelect.arr}
                    value={props.superSelect.valueForSsSr}
                    onChangeOption={props.superSelect.onChangeOption}
                    onClick={props.onClickSelectHandler}
                    className={`${s.select} ${s.superSelect}`}
                />
                <span className={s.label2}>Cards per Page</span>
            </div>


        </div>
    )
}

type PropsType = {
    cardPacksTotalCount: number
    pageCount: number
    onClickSelectHandler: () => void
    superSelect: {
        valueForSsSr: string
        onChangeOption: React.Dispatch<React.SetStateAction<string>>
        arr: Array<string>
    }
    page: number
    currentPageHandler(page: number): void
}