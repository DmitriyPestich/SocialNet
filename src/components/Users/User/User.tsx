import React, {FC} from 'react';
import s from '../Users.module.css';
import userPhoto from '../../../assets/images/user.png';
import {NavLink} from "react-router-dom";
import {UsersType} from "../../../types/types";


type PropsType = {
    dataUser: UsersType,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    followingProccess: Array<number>,
    isAuth: boolean
}
let User: FC<PropsType> = ({dataUser: {photos, id, followed, name, status},
                  followingProccess, follow, unfollow, isAuth}) => {
    return (
        <div className={s.user}>
            <div>
                <NavLink to={'/profile/' + id}>
                    <img src={photos.small != null ? photos.small : userPhoto}/>
                </NavLink>
                {isAuth ?
                    <div>
                        {
                            followed
                                ? <button disabled={followingProccess.some((ids) => ids === id)} onClick={() => {
                                    unfollow(id)
                                }}>Unfollow</button>
                                :
                                <button disabled={followingProccess.some((ids) => ids === id)} onClick={() => {
                                    follow(id)
                                }}>Follow</button>
                        }
                    </div>
                    : ''
                }
            </div>
            <div>
                <div>
                    <h2 className={s.full_name}>{name}</h2>
                    <span className={s.description}>{status}</span>
                </div>
                <div className={s.location}>
                    <div className={s.country}>
                        {"props.location.country"}
                    </div>
                    <div className={s.city}>
                        {"props.location.city"}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;
