import React, {FC} from 'react';
import s from './Navbar.module.css';
import ItemMenu from "./ItemsMenu/ItemMenu";
import {ItemMenuType} from "../../../redux/sidebar-reducer";

type PropsType = {
    itemMenu: Array<ItemMenuType>
}

const Navbar: FC<PropsType> = (props) => {
    let itemMenu = props.itemMenu.map((item, idx) => <ItemMenu url={item.url} title={item.title} key={idx}/>);
    return (
        <nav className={s.nav}>
            {itemMenu}
        </nav>
    );
}

export default Navbar;
