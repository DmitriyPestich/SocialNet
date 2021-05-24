import React, {FC} from 'react';
import LoginForm, {LoginFormType} from "./LoginForm";

type PropsType = {
    blocked: boolean,
    isAuth: boolean,
    captcha: string | null,
    login: (formData: LoginFormType) => void,
    logout: () => void
}

const Login: FC<PropsType> = ({blocked, isAuth, captcha, login, logout}) => {
    return (
        <div>
            <h1>Log in</h1>
            <LoginForm
                onSubmit={login}
                blocked={blocked}
                isAuth={isAuth}
                captcha={captcha}
                logout={logout}
            />
        </div>
    );
};

export default Login;

