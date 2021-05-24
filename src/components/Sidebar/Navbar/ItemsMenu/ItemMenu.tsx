import React, {FC} from 'react';
import s from './ItemMenu.module.css';
import {NavLink} from "react-router-dom";

type PropsType = {
    url: string
    title: string
}

const Navbar:FC<PropsType> = ({title, url}) => {
    return (
        <div className={s.item}>
            <NavLink to={url} activeClassName={s.active}>{title}</NavLink>
        </div>
    );
}

export default Navbar;
