import axios from "axios";

const instance = axios.create ({
    withCredentials : true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "959a3060-e5b6-443f-8c8f-0f7b28df380e"
    }
});

export const usersAPI = {
    uploadUsers(currentPage = 1, amountUsersOnPage = 5){
        return instance.get(`users?page=${currentPage}&count=${amountUsersOnPage}`)
            .then( response => {
                return response.data;
            })
    },
    follow(userId){
        return instance.post(`follow/${userId}`)
            .then( response => {
                return response.data;
            })
    },
    unfollow(userId){
        return instance.delete(`follow/${userId}`)
            .then( response => {
                return response.data;
            })
    }
};

export const profileAPI = {
    getUserProfile(userId){
       return instance.get(`profile/${userId}`)
    },
    getProfileStatus(userId){
        return instance.get(`profile/status/${userId}`)
    },
    updateProfileStatus(status){
        return instance.put(`profile/status/`, {status: status})
            .then( response => {
                return response.data;
            })
    },
    updateProfilePhoto(photoFile){
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put(`/profile/photo`, formData)
        .then( response => {
            return response.data;
        })
    },
    updateProfileData(profile){
        return instance.put(`profile`, profile)
        .then( response => {
            return response.data;
        })
    }
};

export const authAPI = {
    Me(){
        return instance.get(`auth/me`)
    },
    login(formData){
        return instance.post(`auth/login`, {...formData})
    },
    logout(){
        return instance.delete(`auth/login`)
    }
};

export const securityAPI = {
    captcha(){
        return instance.get(`security/get-captcha-url`)
    },
};

export const giphyAPI = {
    uploadGiphy(giphy){
        console.log(giphy)
        const formData = new FormData();
        formData.append("file", giphy.file);
        formData.append("title", giphy.name);

        return axios.post('https://upload.giphy.com/v1/gifs?api_key=maEZr8ZDQVygYlN5czuJLpUabiwZoEMS', formData)
    },
};
