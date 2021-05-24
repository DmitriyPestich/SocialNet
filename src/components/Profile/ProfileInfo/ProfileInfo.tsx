import React, {ChangeEvent, FC} from "react";
import s from './ProfileInfo.module.css';
import userProfilePhoto from '../../../assets/images/userProfile.jpg';
import ProfileStatusHook from "./ProfileStatus/ProfileStatusHook";
import Preloader from "../../common/Preloader/Preloader";
import ProfileData from "./ProfileData";
import ProfileDataForm from "./ProfileDataForm";
import {ProfileType} from "../../../types/types";

type PostType = {
    profile: ProfileType | null,
    status: string | null,
    savePhoto: (file: File) => void,
    blocked: boolean,
    isOwner: boolean,
    updateProfileStatus: (status: string) => void,
    saveProfileData: (file: any) => void,
    profileDataSuccess: boolean,
    setProfileDataSuccess: (payload: boolean) => void,
}

const ProfileInfo: FC<PostType> = ({
    profile,
    status,
    savePhoto,
    blocked,
    isOwner,
    updateProfileStatus,
    saveProfileData,
    profileDataSuccess,
    setProfileDataSuccess,
}) => {

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    };
    const onSubmit = (formData: ProfileType) => {
        saveProfileData(formData);
    };

    return (
        <div>
            <div className={s.bg_content}>
                <img
                    src='https://sites.google.com/site/prirodanasevseegooglgfgf/_/rsrc/1463456237313/home/priroda_gory_nebo_ozero_oblaka_81150_1920x1080.jpg'/>
            </div>
            <div className={s.description_block}>
                <div className={s.user_info}>
                    <div>
                        <h1>{profile?.fullName}</h1>
                        <img src={profile?.photos.large || userProfilePhoto}/>
                        {isOwner ? <div>
                            <form>
                                <input disabled={blocked} type="file" onChange={onMainPhotoSelected}/>
                            </form>
                            {blocked ? <Preloader/> : ''}
                            <ProfileStatusHook status={status} updateProfileStatus={updateProfileStatus}/>
                        </div> : ''
                        }
                    </div>
                    <div className={s.profile_data}>
                        {profileDataSuccess ?
                            <ProfileData profile={profile}/> :
                            <ProfileDataForm onSubmit={onSubmit} profile={profile} initialValues={profile}/>
                        }
                        {isOwner && profileDataSuccess ? <button onClick={() => {setProfileDataSuccess(false)}}>Change</button> : ''}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ProfileInfo;
