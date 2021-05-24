import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {
    follow, uploadUsers,
    unfollow
} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getAmountUsersOnPage,
    getCurrentPage,
    getFollowingProccess,
    getIsFetching,
    getTotalCount,
    getUsers
} from "../../redux/users-selector";
import {UsersType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    users: Array<UsersType>,
    currentPage: number,
    amountUsersOnPage: number,
    isFetching: boolean,
    totalCount: number,
    followingProccess: Array<number>,
    isAuth: boolean
}
type MapDispatchPropsType = {
    uploadUsers: (currentPage: number, amountUsersOnPage: number) => void,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
}
type OwnPropsType = {

}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;
class UsersContainer extends PureComponent<PropsType> {

    componentDidMount() {
        if (this.props.users.length === 0) {
            this.props.uploadUsers(this.props.currentPage, this.props.amountUsersOnPage)
        }
    }

    onChangePage = (page: number) => {
        let pageSize: number = this.props.amountUsersOnPage;
        this.props.uploadUsers(page, pageSize)
    };

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> :
                <Users
                    users={this.props.users}
                    totalCount={this.props.totalCount}
                    amountUsersOnPage={this.props.amountUsersOnPage}
                    currentPage={this.props.currentPage}
                    onChangePage={this.onChangePage.bind(this)}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    followingProccess={this.props.followingProccess}
                    isAuth={this.props.isAuth}
                />
            }
        </>
    }

}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        currentPage: getCurrentPage(state),
        amountUsersOnPage: getAmountUsersOnPage(state),
        totalCount: getTotalCount(state),
        isFetching: getIsFetching(state),
        followingProccess: getFollowingProccess(state),
        isAuth: state.auth.isAuth,
    }
};

export default compose(
    //<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {follow, unfollow, uploadUsers})
)(UsersContainer);



