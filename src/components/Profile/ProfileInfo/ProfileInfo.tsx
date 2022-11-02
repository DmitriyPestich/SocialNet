import React, {ChangeEvent} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusHook";
import userPhoto from "../../../assets/images/user.png";
import ProfileDataForm from "./ProfileDataForm";
import {ContactsType, ProfileType} from '../../../types/types';

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    profileDataSuccess: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => void
    setProfileDataSuccess: (payload: boolean) => void
}

const ProfileInfo: React.FC<PropsType> = ({
                         profile,
                         status,
                         updateStatus,
                         isOwner,
                         savePhoto,
                         saveProfile,
                         profileDataSuccess,
                         setProfileDataSuccess
               }) => {

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData)
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} className={s.mainPhoto}/>
                {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}

                {profileDataSuccess
                    ? <ProfileData setProfileDataSuccess={setProfileDataSuccess} profile={profile} isOwner={isOwner}/>
                    : <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>}

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    setProfileDataSuccess: (payload: boolean) => void
}
const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, setProfileDataSuccess}) => {
    return <div>
        {isOwner && <div>
            <button onClick={() => setProfileDataSuccess(false)}>edit</button>
        </div>}
        <div>
            <b>Full name</b>: {profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {profile.lookingForAJob &&
        <div>
            <b>My professional skills</b>: {profile.lookingForAJobDescription}
        </div>
        }

        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {
            Object
                .keys(profile.contacts)
                .map((key) => {
                    return <Contact key={key} contactTitle={key}
                                    contactValue={profile.contacts[key as keyof ContactsType]}/>
                })}
        </div>
    </div>
}


type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}
const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;
