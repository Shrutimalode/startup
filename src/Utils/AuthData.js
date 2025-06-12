export const getUser = () => {
    const user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    }
    return null;
};

export const isAuthenticated = () => {
    return !!getUser();
};

export const setRedirectAfterLogin = (path) => {
    sessionStorage.setItem('redirectAfterLogin', path);
};

export const getRedirectAfterLogin = () => {
    const path = sessionStorage.getItem('redirectAfterLogin');
    sessionStorage.removeItem('redirectAfterLogin'); // Clear it after getting
    return path || '/';
};