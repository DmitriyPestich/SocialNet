import React, {ChangeEvent, FC} from 'react';

type PropsType = {
    saveGiphy: (file: any) => void,
    blocked: boolean
}

export let Giphy: FC<PropsType> = ({saveGiphy, blocked}) => {

    const onDownloadGiphy = (e: any) => {
        if (e.target.files && e.target.files.length) {
            saveGiphy(e.target.files[0]);
            console.log(e.target.files[0])
        }
    };

  return (
      <div>
          <h1>Giphy</h1>
          <form>
              <input disabled={blocked} type="file" onChange={onDownloadGiphy}/>
          </form>
      </div>
  );
}


