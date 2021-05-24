import React, {FC} from 'react';
import s from './Dialogues.module.css';
import DialoguesItem from './DialogsItem/DialoguesItem';
import MessagesItem from './MessagesItem/MessagesItem';
import DialogForm from "./DialogForm";
import {DialogsType, MessaguesType} from "../../redux/dialog-reducer";

type PropsType = {
    dialogs: Array<DialogsType>,
    messagues: Array<MessaguesType>,
    addDialogMessage: (messageText: string) => void
}

export type NewMessageFormValuesType = {
    newMessageBody: string
}

let Dialogues: FC<PropsType> = (props) => {

    let dialogs = props.dialogs.map((dialog: DialogsType) => <DialoguesItem id={dialog.id} name={dialog.name} key={dialog.id}/>);
    let messagues = props.messagues.map((message: MessaguesType) => <MessagesItem message={message.message} key={message.id}/>);

    let onSubmit = (value: any) => {
        props.addDialogMessage(value.newMessageBody)
    };

    return (
        <div className={s.dialogues}>
            <div className={s.dialogues_item}>
                {dialogs}
            </div>
            <div className={s.container}>
                <div className={s.messages}>
                    {messagues}
                </div>
                <DialogForm onSubmit={onSubmit}
                />
            </div>
        </div>
    );
}

export default Dialogues;
