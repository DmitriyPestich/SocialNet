import axios from "axios";

export const instance = axios.create ({
    withCredentials : true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "959a3060-e5b6-443f-8c8f-0f7b28df380e"
    }
});

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodesForCapthaEnum {
    Error = 10
}

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D,
    resultCode: RC,
    messages: Array<string>
}

