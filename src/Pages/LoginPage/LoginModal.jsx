import { mutate } from "swr";
import { login } from "../../actions/LoginPage/LoginPage";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { getRedirectAfterLogin } from "../../Utils/AuthData";

export default function LoginForm({ setIsLogin }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.loading("Logging In", { id: 'login' });
        const userData = await login({ email, password });
        if (userData) {
            localStorage.setItem('user', JSON.stringify({ email, id: userData?.user_id }));
            mutate('userAuthData');
            toast.success("Logged In", { id: 'login' });
            setEmail("");
            setPassword("");
            setIsLogin(true);
            
            // Get and navigate to the redirect path if it exists
            const redirectPath = getRedirectAfterLogin();
            navigate(redirectPath);
        }
    }

    return (
        <div className="glass card p-8 shadow-xl backdrop-blur-sm w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-center mb-8 text-base-content">Login</h2>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-base-content font-medium">Email</span>
                    </label>
                    <input 
                        value={email} 
                        required 
                        onChange={handleEmail} 
                        type="email" 
                        className="input input-bordered w-full bg-base-200/50 text-base-content" 
                        placeholder="Enter your email" 
                    />
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-base-content font-medium">Password</span>
                    </label>
                    <input 
                        value={password} 
                        required 
                        onChange={handlePassword} 
                        type="password" 
                        className="input input-bordered w-full bg-base-200/50 text-base-content" 
                        placeholder="Enter your password" 
                    />
                </div>

                <button type='submit' className="btn btn-primary w-full mt-8">Login</button>

                <div className="text-center mt-6">
                    <p className="text-base-content mb-3">Don't Have an Account?</p>
                    <button 
                        onClick={() => setIsLogin(false)} 
                        type='button' 
                        className='btn btn-outline btn-sm'
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
}