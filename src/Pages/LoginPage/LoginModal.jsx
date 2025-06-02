import { mutate } from "swr";
import { login } from "../../actions/LoginPage/LoginPage";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginForm({ setIsLogin }) {
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
        }

    }
    return (
        <div className="glass card">
            <form onSubmit={handleSubmit} className="fieldset shadow-lg rounded-box w-xs p-4">
                <legend className="fieldset-legend">Login</legend>

                <label className="label">Email</label>
                <input value={email} required onChange={handleEmail} type="email" className="input validator !bg-base-content !text-base-100 focus-within:outline-none focus-withnin:border-none" placeholder="Email" />

                <label className="label">Password</label>
                <input value={password} required onChange={handlePassword} type="password" className="input validator !bg-base-content !text-base-100 focus-within:outline-none focus-withnin:border-none" placeholder="Password" />

                <button type='submit' className="btn btn-primary  mt-4">Login</button>

                <div className="w-full flex flex-col gap-2 items-center justify-center mt-4">
                    <span className=' font-bold'>Don't Have an Account</span>
                    <button onClick={() => setIsLogin(false)} type='button' className='btn btn-xs btn-outlint'>Sign Up</button>
                </div>
            </form>
        </div>
    );
}