import { PostRequest } from "../../Utils/RequestHandlers"

export const bookService = async (data) => {
    const url = '/servicebooking'
    const bookResponse = await PostRequest(url, data);
    return bookResponse;
}