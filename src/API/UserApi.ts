import {instance, ResponseType, ResultCodesEnum} from "./api";
import {UsersType} from "../types/types";

export type UploadUsersResponseType = {
    items: Array<UsersType>,
    totalCount: ResultCodesEnum,
    error: string
}

export const usersAPI = {
    uploadUsers(currentPage = 1, amountUsersOnPage = 5){
        return instance.get<UploadUsersResponseType>(`users?page=${currentPage}&count=${amountUsersOnPage}`)
            .then( response => {
                return response.data;
            })
    },
    subscribe(userId: number, subscribe: boolean){
        if (subscribe){
            return instance.post<ResponseType>(`follow/${userId}`)
                .then( response => {
                    return response.data;
                })
        } else {
            return instance.delete<ResponseType>(`follow/${userId}`)
                .then( response => {
                    return response.data;
                })
        }

    }
};