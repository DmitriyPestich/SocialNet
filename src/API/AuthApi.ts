import {LoginFormType} from "../components/Login/LoginForm";
import {instance, ResultCodesEnum, ResultCodesForCapthaEnum, ResponseType} from "./api";

type MeResponseDataType = {
    id: number,
    email: string,
    login: string
}
type LoginResponseDataType = {
    userId: number
}

export const authAPI = {
    Me() {
        return instance.get<ResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data)
    },
    login(formData: LoginFormType) {
        return instance.post<ResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodesForCapthaEnum>>(`auth/login`, {...formData}).then(res => res.data)
    },
    logout() {
        return instance.delete<ResponseType<{}, ResultCodesEnum | ResultCodesForCapthaEnum>>(`auth/login`).then(res => res.data)
    }
};