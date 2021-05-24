import React, {FC} from 'react';
import s from './Post.module.css';
import {PostType} from "../../../../types/types";

const Post: FC<PostType> = (props) => {
    return (
        <div className={s.post}>
            <div className={s.avatar}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTAlBE22hhq5xbZOK5a7R57FtiyqrbCgxGqBw&usqp=CAU"/>
            </div>
            <div className={s.item}>{props.message}</div>
            <div className={s.like}>like {props.CountLike}</div>
        </div>
    );
}

export default Post;
