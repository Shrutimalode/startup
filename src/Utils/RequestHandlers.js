import axios from "axios"
import { getUser } from "./AuthData";
import { apiurl } from "./Contants";

export const GetRequest = async (url)=>{
    try{
        const res = await axios.get(apiurl + url);
        return res;
    }
    catch(err){
        console.error("GET request failed:", err.response || err);
        return null;
    }
}

export const PostRequest = async (url, data)=>{
    try{
        const res = await axios.post(apiurl + url, data);
        return res;
    }
    catch(err){
        console.error("POST request failed:", err.response || err);
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
        const res = await axios.post(apiurl + url, params);
        return res;
    } catch (err) {
        console.error("Auth POST request failed:", err.response || err);
        throw err;
    }
}