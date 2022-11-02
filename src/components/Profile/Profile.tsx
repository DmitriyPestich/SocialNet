import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPosts";
import {PostType, ProfileType} from '../../types/types';

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => void
    postData: Array<PostType>
    addPost: (message: string) => void
    profileDataSuccess: boolean
    setProfileDataSuccess: (payload: boolean) => void
}

const Profile:React.FC<PropsType> = (props) => {
    return (
        <div>
            <ProfileInfo savePhoto={props.savePhoto}
                         isOwner={props.isOwner}
                         profile={props.profile}
                         status={props.status}
                         saveProfile={props.saveProfile}
                         updateStatus={props.updateStatus}
                         profileDataSuccess={props.profileDataSuccess}
                         setProfileDataSuccess={props.setProfileDataSuccess}
            />
            <MyPosts postData={props.postData} addPost={props.addPost}/>
        </div>
    )
}

export default Profile;
