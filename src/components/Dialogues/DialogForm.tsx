import React, {FC} from 'react';
import {reduxForm} from "redux-form";
import {compose} from "redux";
import s from "./Dialogues.module.css";
import {createField, Textarea} from "../common/CreacteField/CreateField";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {NewMessageFormValuesType} from "./Dialogues";

const maxLength100 = maxLengthCreator(100);
type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>

type PropsType = {
    handleSubmit: any
}

const DialogForm: FC<PropsType> = (props) => {
    return (
        <div className={s.add_massage}>
            <form onSubmit={props.handleSubmit}>
                <div>
                    {createField<NewMessageFormValuesKeysType>("Enter your message", 'newMessageBody', [required, maxLength100], Textarea)}
                </div>
                <button>Add Message</button>
            </form>
        </div>
    )
};

export default compose(reduxForm({form: 'dialogMessage'}))(DialogForm);


