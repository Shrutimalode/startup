import axios from "axios"
import { getUser } from "./AuthData";
import { apiurl } from "./Contants";

export const GetRequest = async (url)=>{
    try{
        const res = await axios.get(apiurl + url);
        return res;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

export const PostRequest = async (url, data)=>{
    try{
        const res = await axios.post(apiurl + url, data);
        return res;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

export const AuthPostRequest = async (url, params)=> {
    try {
        const user = getUser;
        if (!user) return null;
        const id = user.id;
        params = {
            ...params,
            userId: id
        }
        const res = await axios.post(apiurl + url, params);
        return res;
    } catch (err) {
        console.log(err);
        return null;
    }
}