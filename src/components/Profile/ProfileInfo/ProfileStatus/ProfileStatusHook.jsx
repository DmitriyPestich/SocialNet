import React, {useEffect, useState} from "react";

function ProfileStatusHook(props) {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(
        () => {
            setStatus(props.status)
        },
        [props.status],
    );

    const activateEditMode = () => {
        setEditMode(true)
    };

    const onChangeValue = (e) => {
        setStatus(e.currentTarget.value)
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateProfileStatus(status)
    };

    return (

        <div>
            {!editMode &&
            <div>
                {props.status ?
                    <span onDoubleClick={activateEditMode}>{props.status}</span> :
                    <span onDoubleClick={activateEditMode}>-------</span>
                }
            </div>
            }
            {editMode &&
            <div>
                <input autoFocus={true} onBlur={deactivateEditMode} onChange={onChangeValue} type="text"
                       value={status}/>
            </div>
            }
        </div>
    );
}

export default ProfileStatusHook;
