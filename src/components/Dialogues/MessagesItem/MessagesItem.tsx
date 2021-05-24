import React, {FC} from 'react';
import s from '../Dialogues.module.css';

type PropsType = {
    message: string
}

let MessagesItem: FC<PropsType> = (props) => {
    return (
        <div className={s.message}><p>{props.message}</p></div>
    );
}

export default MessagesItem;
