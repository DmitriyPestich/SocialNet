import React, {FC} from 'react';
import s from '../Dialogues.module.css';
import {NavLink} from "react-router-dom";
import {DialogsType, MessaguesType} from "../../../redux/dialog-reducer";

type PropsType = {
    id: number,
    name: string
}

let DialoguesItem: FC<PropsType> = (props) => {
    let path = "/dialogs/" + props.id;
    return (
        <div className={s.dialog}>
            <img className={s.avatar} src="https://99px.ru/sstorage/56/2019/09/mid_324597_239159.jpg"/>
            <NavLink to={path}>{props.name}</NavLink>
        </div>

    );
}

export default DialoguesItem;
