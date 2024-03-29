import React from "react";
import s from './ProfileInfo.module.css';
import {compose} from "redux";
import {createField, GetStringKeys, Input, Textarea} from "../../common/CreacteField/CreateField";
import {InjectedFormProps, reduxForm} from "redux-form";
import style from "../../common/CreacteField/FormsControls.module.css";
import {ProfileType} from '../../../types/types';

type PropsType = {
    profile: ProfileType
}
type ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        <div><button>save</button></div>
        {error && <div className={style.formSummaryError}>
            {error}
        </div>
        }
        <div>
            <b>Full name</b>: {createField<ProfileTypeKeys>("Full name", "fullName", [], Input)}
        </div>
        <div>
            <b>Looking for a job</b>: { createField<ProfileTypeKeys>("", "lookingForAJob", [], Input, {type: "checkbox"} )}
        </div>

        <div>
            <b>My professional skills</b>:
            { createField<ProfileTypeKeys>("My professional skills", "lookingForAJobDescription", [], Textarea  )}
        </div>


        <div>
            <b>About me</b>:
            { createField<ProfileTypeKeys>("About me", "aboutMe", [], Textarea  )}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <div key={key} className={s.contact}>
                {/* todo: create some solution for embedded objects */}
                <b>{key}: {createField(key, "contacts." + key, [], Input)}</b>
            </div>
        })}
        </div>
        { error &&
        <div className={s.error}>{error}</div>
        }
    </form>
}

export default compose(reduxForm<ProfileType, PropsType>({form: 'profileInfo', enableReinitialize : true}))(ProfileDataForm);
