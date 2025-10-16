import axios from "axios"
import { getUser } from "./AuthData";
import { apiurl } from "./Contants";

export const GetRequest = async (url)=>{
    try{
        console.log("Making GET request to:", apiurl + url);
        const res = await axios.get(apiurl + url);
        console.log("GET response for", url, ":", res);
        return res;
    }
    catch(err){
        console.error("GET request failed for", url, ":", err.response || err);
        return null;
    }
}

export const PostRequest = async (url, data)=>{
    try{
        console.log("Making POST request to:", apiurl + url, "with data:", data);
        const res = await axios.post(apiurl + url, data);
        console.log("POST response for", url, ":", res);
        return res;
    }
    catch(err){
        console.error("POST request failed for", url, "with data:", data);
        console.error("Error details:", err.response || err);
        throw err;
    }
}

export const AuthPostRequest = async (url, params)=> {
    try {
        const user = getUser(); // Fixed: Added parentheses to actually call the function
        if (!user) return null;
        const id = user.id;
        params = {
            ...params,
            userId: id
        }
        console.log("Making authenticated POST request to:", apiurl + url, "with data:", params);
        const res = await axios.post(apiurl + url, params);
        console.log("Auth POST response for", url, ":", res);
        return res;
    } catch (err) {
        console.error("Auth POST request failed for", url, "with data:", params);
        console.error("Error details:", err.response || err);
        throw err;
    }
}