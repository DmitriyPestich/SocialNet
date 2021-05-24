import React from 'react';
import { InjectedFormProps, reduxForm} from "redux-form";
import {compose} from "redux";
import {createField, Input, GetStringKeys} from "../../common/CreacteField/CreateField";
import s from "../../common/CreacteField/FormsControls.module.css";
import {ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType | null,
    initialValues: any;
}

type ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: React.FC<PropsType & InjectedFormProps<ProfileType, PropsType>> = ({profile, ...props}) => {

    const socLinks = Object.keys(profile ? profile.contacts : '').map((key) => (
        <div key={key}>
            <b>{key}</b>
            {createField(key, "contacts." + key, [], Input)}
        </div>
    ));

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <div>
                    <b>Full name</b>
                    {createField<ProfileTypeKeys>("Full name", 'fullName', [], Input)}
                </div>
                <div>
                    <b>About me</b>
                    {createField<ProfileTypeKeys>("About me", 'aboutMe', [], Input)}
                </div>

                <div>
                    <b>Looking for a job</b>
                    {createField<ProfileTypeKeys>("Looking for a job", 'lookingForAJob', [], Input, {type: 'checkbox'})}
                </div>
                <div>
                    <b>Looking for a job description</b>
                    {createField<ProfileTypeKeys>("Looking for a job description", 'lookingForAJobDescription', [], Input)}
                </div>
                {socLinks}
            </div>
            { props.error &&
                <div className={s.error}>{props.error}</div>
            }
            <button>Put</button>
        </form>
    )
};

export default compose(reduxForm<ProfileType, PropsType>({form: 'profileInfo', enableReinitialize : true}))(ProfileDataForm);


