import toast from "react-hot-toast";
import { PostRequest } from "../../Utils/RequestHandlers"

export const signUp = async (userData) => {
    const url = '/register'
    const signUpData = await PostRequest(url, { ...userData, user_type: 'normal' });
    if (signUpData.status === 200) {
        return signUpData.data;
    }
    toast.error(signUpData?.detail || 'User already exists');
    return null;
}

export const login = async (userData) =>{
    const url = '/login'
    const loginData = await PostRequest(url, {...userData , user_type: 'normal'});
    if (loginData?.status === 200) {
        return loginData.data;
    }
    toast.error(loginData?.detail || 'Invalid Credentials',{id : 'login'});
    return null;
}