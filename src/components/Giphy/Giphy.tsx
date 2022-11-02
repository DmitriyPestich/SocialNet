import React, {FC, ChangeEvent} from 'react';

type PropsType = {
    blocked: boolean
    saveGiphy: (file: File) => void
}

const Giphy: FC<PropsType> = (props) => {

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            props.saveGiphy(e.target.files[0])
        }
    };
    return (
        <form>
            <input type="file" onChange={onMainPhotoSelected}/>
        </form>
    )
};

export default Giphy;

