import User from "./User/User";
import s from "./Users.module.css";
import React, {FC} from "react";
import Paginator from "../common/Paginator/Paginator";
import {UsersType} from "../../types/types";

type PropsType = {
    totalCount: number,
    amountUsersOnPage: number,
    currentPage: number,
    onChangePage: (page: number) => void
    users: Array<UsersType>
    subscribeUser: (userId: number, subscribe: boolean) => void,
    followingProccess: Array<number>,
    isAuth: boolean
}
let Users: FC<PropsType> = (props) => {
    let users = props.users.map((user: UsersType) =>
        <User dataUser={user}
              {...props}
        />);

    return (
        <div>
            <Paginator totalCount={props.totalCount}
                       amountUsersOnPage={props.amountUsersOnPage}
                       currentPage={props.currentPage}
                       onChangePage={props.onChangePage}
                       step={10}
                       visiblePages={5}
            />
            <div className={s.users_container}>
                {users}
            </div>
        </div>
    );
};

export default Users;
