import { PostRequest } from "../../Utils/RequestHandlers"

export const addProperty = async (data) => {
    const url = '/addproperty'
    try {
        console.log("Sending request to:", url, "with data:", data);
        const propertyData = await PostRequest(url, data);
        console.log("Received response:", propertyData);
        return propertyData;
    } catch (error) {
        console.error("Error in addProperty:", error);
        console.error("Error response:", error.response);
        console.error("Error data:", error.response?.data);
        throw error;
    }
}