import { PostRequest } from "../../Utils/RequestHandlers"

export const bookProperty = async (data) => {
    const url = '/createbooking'
    const bookResponse = await PostRequest(url, data);
    return bookResponse;
}