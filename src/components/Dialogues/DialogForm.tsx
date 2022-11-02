import React, {FC} from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {compose} from "redux";
import s from "./Dialogues.module.css";
import {createField, GetStringKeys, Textarea} from "../common/CreacteField/CreateField";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {NewMessageFormValuesType} from "./Dialogues";

const maxLength100 = maxLengthCreator(100);
type NewMessageFormValuesKeysType = GetStringKeys<NewMessageFormValuesType>

const DialogForm: FC<InjectedFormProps<NewMessageFormValuesType>> = (props) => {
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

export default compose(reduxForm<NewMessageFormValuesType, {}>({form: 'dialogMessage'}))(DialogForm);


