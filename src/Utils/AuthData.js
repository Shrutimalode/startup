export const getUser = ()=>{
    const userStr = localStorage.getItem('user');
    if(!userStr) return null;
    return JSON.parse(userStr);
}