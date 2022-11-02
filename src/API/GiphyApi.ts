import axios from "axios";

type UploadGiphyResponseType = {
    data: {
        id: number
    },
    meta: {
        msg: string,
        status: number
    }
}

export const giphyAPI = {
    uploadGiphy(giphy: File) {
        const formData = new FormData();
        const config = {
            headers: {'content-type': 'multipart/form-data'}
        };
        formData.append('file', giphy);
        return axios.post<UploadGiphyResponseType>('https://upload.giphy.com/v1/gifs?api_key=maEZr8ZDQVygYlN5czuJLpUabiwZoEMS', formData, config)
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.log(error);
            });
    },
};