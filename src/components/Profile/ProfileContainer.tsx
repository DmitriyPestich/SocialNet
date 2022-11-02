import React from 'react';
import {connect} from "react-redux";
import Profile from "./Profile";
import {
    getProfileStatus,
    getUserProfile,
    updateProfileStatus,
    savePhoto,
    saveProfileData,
    actions,
} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import Preloader from "../common/Preloader/Preloader";
import {AppStateType} from "../../redux/redux-store";
import {PostType, ProfileType} from "../../types/types";
import {RouteComponentProps} from "react-router";
import MyPosts from "./MyPosts/MyPosts";

type MapStatePropsType = {
    postData: Array<PostType>
    profile: ProfileType | null
    status: string
    isAuth: boolean
    blocked: boolean
    loading: boolean
    profileDataSuccess: boolean
    curentUserId: number | null
}
// postData: Array<PostType>
// profile: ProfileType | null
// status: string

//     isOwner: boolean
// savePhoto: (file: File) => void
//     saveProfile: (profile: ProfileType) => Promise<any>

// addPost: (message: string) => void    profileDataSuccess: state.profilePage.profileDataSuccess,
// updateStatus: (status: string) => void

type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getProfileStatus: (userId: number) => void
    updateProfileStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfileData: (profile: ProfileType) => void
    addPost: (message: string) => void
    setProfileDataSuccess: (payload: boolean) => void
}
// getUserProfile,
//     getProfileStatus,
//     updateProfileStatus,
//     savePhoto,
//     saveProfileData,
//     addPost: actions.addPost

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
                <Profile isOwner={!this.props.match.params.userId}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateProfileStatus}
                         savePhoto={this.props.savePhoto}
                         saveProfile={this.props.saveProfileData}
                         postData={this.props.postData}
                         addPost={this.props.addPost}
                         profileDataSuccess={this.props.profileDataSuccess}
                         setProfileDataSuccess={this.props.setProfileDataSuccess}
                />
            );
        }
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        postData: state.profilePage.post,
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        isAuth: state.auth.isAuth,
        blocked: state.profilePage.blocked,
        loading: state.profilePage.loading,
        profileDataSuccess: state.profilePage.profileDataSuccess,
        curentUserId: state.auth.userId
    }
};

export default compose(
    withRouter,
    connect<MapStatePropsType, MapDispatchPropsType, RouteComponentProps<any>, AppStateType>(
        mapStateToProps, {
            getUserProfile,
            getProfileStatus,
            updateProfileStatus,
            savePhoto,
            saveProfileData,
            setProfileDataSuccess: actions.setProfileDataSuccess,
            addPost: actions.addPost
        })
)(ProfileContainer);



