import React, {FC} from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import ProfileForm from "./ProfileForm";
import {PostType} from "../../../types/types";

type PropsType = {
    postData: Array<PostType>,
    addPost: (message: string) => void
}

const MyPosts: FC<PropsType> = (props) => {

    let postElements = props.postData.map( postElem =>
        <Post message={postElem.message}
              CountLike={postElem.CountLike}
              id={postElem.id}
              key={postElem.id}
        />);

    let onSubmit = (value: PostType) => {
        props.addPost(value.message)
    };

    return (
        <div className={s.container}>
            <h3 className={s.title}>My posts</h3>
            <ProfileForm onSubmit={onSubmit}/>
            {postElements}
        </div>
    );
}

export default MyPosts;
