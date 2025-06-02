import { PostRequest } from "../../Utils/RequestHandlers"

export const addProperty = async (data) => {
    const url = '/addproperty'
    const propertyData = await PostRequest(url, data);
    return propertyData;
}