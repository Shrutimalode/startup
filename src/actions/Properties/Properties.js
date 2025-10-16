import { GetRequest } from "../../Utils/RequestHandlers";

export const getAllProperties = async () => {
    const urls = [
        '/properties/plot',
        '/properties/farm',
        '/properties/flat',
        '/properties/house'
    ];

    try {
        console.log("Fetching properties from URLs:", urls);
        
        // Fetch data from all URLs, handling both resolved and rejected promises
        const responses = await Promise.allSettled(urls.map(url => {
            console.log("Attempting to fetch:", url);
            return GetRequest(url);
        }));
        
        // Log any errors for debugging
        responses.forEach((response, index) => {
            if (response.status === 'rejected') {
                console.error(`Promise rejected for ${urls[index]}:`, response.reason);
            } else if (!response.value) {
                console.error(`Null response for ${urls[index]}`);
            } else if (response.value.status !== 200) {
                console.error(`Non-200 response for ${urls[index]}:`, response.value);
            }
        });

        // Filter out successful responses and extract their values
        const successfulResponses = responses
            .filter(response => {
                return response.status === 'fulfilled' && 
                       response.value && 
                       response.value.status === 200 && 
                       response.value.data;
            })
            .map(response => {
                console.log("Successful response data:", response.value.data);
                return response.value.data || [];
            });

        // Combine all the successful arrays into one
        const combinedData = successfulResponses.flat();
        console.log("Combined property data:", combinedData);

        return combinedData;
    } catch (error) {
        console.error("Unexpected error fetching property data:", error);
        throw error;
    }
};