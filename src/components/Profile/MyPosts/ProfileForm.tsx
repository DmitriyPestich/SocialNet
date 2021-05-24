import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {compose} from "redux";
import s from "./MyPosts.module.css";
import {createField, Input, GetStringKeys} from "../../common/CreacteField/CreateField";
import {PostType} from "../../../types/types";

type PostTypeKeys = GetStringKeys<PostType>

const ProfileForm: React.FC<InjectedFormProps<PostType, {}>> = (props) => {
    return (
        <div className={s.add_post}>
            <form onSubmit={props.handleSubmit}>
                {createField<PostTypeKeys>("", 'message', [], Input)}
                <button>Add post</button>
            </form>
        </div>
    )
};

export default compose(reduxForm<PostType, {}>({form: 'profile'}))(ProfileForm);


