import React, {FC} from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {Redirect} from "react-router";
import {createField, GetStringKeys, Input} from "../common/CreacteField/CreateField";
import {required} from "../../utils/validators/validators";
import s from "../common/CreacteField/FormsControls.module.css";
import {compose} from "redux";

type PropsType = {
    blocked: boolean,
    isAuth: boolean,
    captcha: string | null,
    logout: () => void
}
export type LoginFormType = {
    password: string | null,
    email: string | null,
    captcha: string | null,
    rememberMe: boolean
}
type ProfileTypeKeys = GetStringKeys<LoginFormType>

const LoginForm: FC<PropsType & InjectedFormProps<LoginFormType, PropsType>> = (props) => {

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <>
            <form onSubmit={props.handleSubmit}>
                <div>
                    {createField<ProfileTypeKeys>("Email", 'email', [required], Input)}
                </div>
                <div>
                    {createField<ProfileTypeKeys>("Password", 'password', [required], Input)}
                </div>
                <div>
                    {createField<ProfileTypeKeys>("", 'rememberMe', [], Input, {type: "checkbox"})}
                </div>
                <div>
                    {!props.isAuth ?
                        <button disabled={props.blocked}>Login</button>
                        :
                        <button disabled={props.blocked}
                                onClick={props.logout}
                        >Logout</button>
                    }
                </div>
                { props.captcha &&
                <div>
                    <img src={props.captcha}/>
                    {createField<ProfileTypeKeys>("", 'captcha', [], Input)}
                </div>
                }
                { props.error &&
                <div className={s.error}>{props.error}</div>
                }
                {props.blocked ? <div>Loading...</div> : ''}
            </form>
        </>
    )
};

export default compose(reduxForm<LoginFormType, PropsType>({form: 'login'}))(LoginForm);