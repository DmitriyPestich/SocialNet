import React, {FC} from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {PostType, ProfileType} from "../../types/types";


type PropsType = {
    postData: Array<PostType>,
    profile: ProfileType | null,
    curentUserId:  number | null,
    status: string | null,
    isAuth: boolean,
    blocked: boolean,
    loading: boolean,
    profileDataSuccess: boolean,
    addPost: (message: string) => void,
    getUserProfile: (userId: number) => void,
    getProfileStatus: (userId: number) => void,
    updateProfileStatus: (status: string) => void,
    savePhoto: (file: any) => void,
    saveProfileData: (profile: ProfileType) => void,
    setProfileDataSuccess: (payload: boolean) => void,
    isOwner: boolean
}

let Profile: FC<PropsType> = (props) => {
        return (
            <div className={s.main_content}>
                <ProfileInfo {...props}/>
                <MyPosts
                    postData={props.postData}
                    addPost={props.addPost}
                />
            </div>
        );
}

export default Profile;
