import { PostRequest } from "../../Utils/RequestHandlers"

export const uploadImage = async (data) => {
    const url = '/upload-image'
    const imageData = await PostRequest(url, data);
    return imageData;
}