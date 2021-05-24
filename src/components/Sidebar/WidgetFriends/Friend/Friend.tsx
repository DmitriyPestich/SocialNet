import React, {FC} from 'react';
import s from '../widgetFriends.module.css';

type PropsType = {
    name: string
}

const Friend: FC<PropsType> = ({name}) => {
    return (
        <div className={s.friend}>
            <img className={s.avatar} src="https://99px.ru/sstorage/56/2019/09/mid_324597_239159.jpg"/>
            <h5 className={s.name}>{name}</h5>
        </div>
    );
}

export default Friend;