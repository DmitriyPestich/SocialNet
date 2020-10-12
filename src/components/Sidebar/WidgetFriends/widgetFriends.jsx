import React from 'react';
import s from './widgetFriends.module.css';
import Friend from "./Friend/Friend"

function Friends(props) {

    let friends = props.state.friends.map(friend => <Friend name={friend.name}/>);

    return (
         <div className={s.friends_container}>
             <h3 className={s.title}>Friends</h3>
             <div className={s.friends_item}>
                 {friends}
             </div>
         </div>
    );
}

export default Friends;
