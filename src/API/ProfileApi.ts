import {PhotosType, ProfileType} from "../types/types";
import {instance, ResponseType} from "./api";

export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
            .then(response => {
                return response.data;
            })
    },
    getProfileStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(response => {
                return response.data;
            })
    },
    updateProfileStatus(status: string) {
        return instance.put<ResponseType>(`profile/status/`, {status: status})
            .then(response => {
                return response.data;
            })
    },
    updateProfilePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put<ResponseType<PhotosType>>(`/profile/photo`, formData)
            .then(response => {
                return response.data;
            })
    },
    updateProfileData(profile: ProfileType) {
        return instance.put<ResponseType>(`profile`, profile)
            .then(response => {
                return response.data;
            })
    }
};