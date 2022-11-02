import {instance} from "./api";

type CaptchaResponseType = {
    url: string
}

export const securityAPI = {
    captcha() {
        return instance.get<CaptchaResponseType>(`security/get-captcha-url`)
    },
};