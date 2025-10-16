import { GetRequest } from "../../Utils/RequestHandlers";

export const getAllProperties = async () => {
    const urls = [
        '/properties/plot',
        '/properties/farm',
        '/properties/flat',
        '/properties/house'
    ];

    try {
        // Fetch data from all URLs, handling both resolved and rejected promises
        const responses = await Promise.allSettled(urls.map(url => GetRequest(url)));
        
        // Log any errors for debugging
        responses.forEach((response, index) => {
            if (response.status === 'rejected' || !response.value) {
                console.error(`Failed to fetch ${urls[index]}:`, response.reason || response.value);
            }
        });

        // Filter out successful responses and extract their values
        const successfulResponses = responses
            .filter(response => response.status === 'fulfilled' && response.value && response.value.data)
            .map(response => response.value.data || []);

        // Combine all the successful arrays into one
        const combinedData = successfulResponses.flat();

        return combinedData;
    } catch (error) {
        console.error("Unexpected error fetching property data:", error);
        throw error;
    }
};