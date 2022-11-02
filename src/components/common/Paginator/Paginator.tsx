import s from "../../Users/Users.module.css";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index";
import cn from "classnames";


type PropsType = {
    totalCount: number,
    amountUsersOnPage: number,
    currentPage?: number,
    onChangePage: (page: number) => void,
    step?: number,
    visiblePages?: number,
}

let Paginator: React.FC<PropsType> = ({totalCount, amountUsersOnPage, currentPage = 1, onChangePage, step = 10, visiblePages = 4}) => {

    let pagesCount = Math.ceil(totalCount / amountUsersOnPage);

    const [firstPage, setFirstPage] = useState<number>(1);
    const [lastPage, setlastPage] = useState<number>(visiblePages);

    let pages = [] as Array<number>;

    for (let i = firstPage; i <= lastPage; i++) {
        pages.push(i);
    }

    const decreasePage = () => {
        firstPage - step >= 1 ? setFirstPage(firstPage - step) : setFirstPage(1);
        lastPage - step >= visiblePages ? setlastPage(lastPage - step) : setlastPage(visiblePages);
    };

    const increasePage = () => {
        firstPage + step <= pagesCount - visiblePages ? setFirstPage(firstPage + step) : setFirstPage(pagesCount - visiblePages);
        lastPage + step <= pagesCount ? setlastPage(lastPage + step) : setlastPage(pagesCount);
    };

    return (
        <div className={s.navigation}>
            { firstPage !== 1 && <button onClick={decreasePage}><FontAwesomeIcon icon={["fas", "angle-double-left"]} /></button>}
            {pages.map((p) => {
                let classNames = cn(s.page, currentPage === p ? s.selectedPage : '');
                return <span className={classNames}
                             onClick={() => {
                                 onChangePage(p)
                             }}
                             key={p}
                >{p}</span>
            })}
            { lastPage !== pagesCount && <button onClick={increasePage}><FontAwesomeIcon icon={["fas", "angle-double-right"]} /></button>}
        </div>
    );
};

export default Paginator;
