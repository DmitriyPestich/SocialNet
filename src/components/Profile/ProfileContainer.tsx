import React from 'react';
import {connect} from "react-redux";
import Profile from "./Profile";
import {
    addPost,
    getProfileStatus,
    getUserProfile,
    updateProfileStatus,
    savePhoto,
    saveProfileData, setProfileDataSuccess,
} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import Preloader from "../common/Preloader/Preloader";
import {AppStateType} from "../../redux/redux-store";
import {PostType, ProfileType} from "../../types/types";
import {RouteComponentProps} from "react-router";

type MapStatePropsType = {
    postData: Array<PostType>,
    profile: ProfileType | null,
    curentUserId: number | null,
    status: string,
    isAuth: boolean,
    blocked: boolean,
    loading: boolean,
    profileDataSuccess: boolean,
}
type MapDispatchPropsType = {
    addPost: (message: string) => void,
    getUserProfile: (userId: number) => void,
    getProfileStatus: (userId: number) => void,
    updateProfileStatus: (status: string) => void,
    savePhoto: (file: any) => void,
    saveProfileData: (profile: ProfileType) => void,
    setProfileDataSuccess: (payload: boolean) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<any>;

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.curentUserId;
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getUserProfile(userId);
        this.props.getProfileStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: MapStatePropsType & RouteComponentProps<any>) {
        if (!this.props.isAuth) {
            this.props.history.push("/login")
        }
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        if (this.props.loading) {
            return <Preloader/>
        } else {
            return (
                <Profile {...this.props}
                         isOwner={!this.props.match.params.userId}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateProfileStatus={this.props.updateProfileStatus}
                         savePhoto={this.props.savePhoto}/>
            );
        }
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        postData: state.profilePage.post,
        profile: state.profilePage.profile,
        curentUserId: state.auth.userId,
        status: state.profilePage.status,
        isAuth: state.auth.isAuth,
        blocked: state.profilePage.blocked,
        loading: state.profilePage.loading,
        profileDataSuccess: state.profilePage.profileDataSuccess,
    }
};

export default compose(
    withRouter,
    connect<MapStatePropsType, MapDispatchPropsType, RouteComponentProps<any>, AppStateType>(
        mapStateToProps, {
            addPost,
            getUserProfile,
            getProfileStatus,
            updateProfileStatus,
            savePhoto,
            saveProfileData,
            setProfileDataSuccess
        })
)(ProfileContainer);

