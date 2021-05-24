import React, {FC} from "react";
import {ProfileType} from "../../../types/types";

type ProfileDataPropsType = {
    profile: ProfileType | null
}

const ProfileData: FC<ProfileDataPropsType> = ({profile, ...props}) => {

    const socLinks = Object.entries(profile ? profile.contacts : '').map(([key, val]) => (
        <div key={key}>
            {<span>{key} : {val}</span>}
        </div>
    ));

    return (
    <div>
        { socLinks }
        <p>{profile?.aboutMe}</p>
        <h3>Ищешь работу?</h3>
        <p>{profile?.lookingForAJob ? 'Да' : 'Нет'}</p>
        <p>{profile?.lookingForAJobDescription ? profile?.lookingForAJobDescription : ''}</p>
    </div>
    );
}

export default ProfileData;
