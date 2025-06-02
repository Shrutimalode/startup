import { mutate } from "swr";
import { signUp } from "../../actions/LoginPage/LoginPage";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignupForm({ setIsLogin }) {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [isValid, setIsValid] = useState(true);

    const handleEmail = (e) => setEmail(e.target.value);
    const handleName = (e) => setName(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleCpassword = (e) => setCpassword(e.target.value);

    const handlePhone = (e) => {
        const phone = e.target.value;
        setPhone(phone);
        const phoneRegex = /^\d{10}$/;
        setIsValid(phoneRegex.test(phone));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== cpassword) {
            toast.error("Passwords are not matching", { id: 'signupError' })
            return;
        }
        if (!isValid) {
            toast.error("Phone number is not valid", { id: 'signupError' });
            return;
        }

        const userData = await signUp({ email, phone, name, password });
        if (userData) {
            localStorage.setItem('user', JSON.stringify({ email, id: userData?.user_id }));
            mutate('userAuthData');
            toast.success("User Created Successfully", { id: 'signupSuccess' });
            setEmail("");
            setPhone("");
            setName("");
            setPassword("");
            setCpassword("");
            setIsLogin(true);
            setIsValid(true);
        }

    }

    return (
        <div className="glass card">
            <form onSubmit={handleSubmit} className="fieldset shadow-lg rounded-box w-xs p-4">
                <legend className="fieldset-legend">Sign Up</legend>

                <label className="label">Email</label>
                <input type="email" value={email} onChange={handleEmail} required className="validator input !bg-base-content !text-base-100 focus-within:outline-none focus-withnin:border-none" placeholder="Email" />


                <label className="label">Name</label>
                <input type="text" value={name} onChange={handleName} required className="validator input !bg-base-content !text-base-100 focus-within:outline-none focus-withnin:border-none" placeholder="Name" />

                <label className="label">Phone Number</label>
                <input type="text" value={phone} onChange={handlePhone} required className="validator input !bg-base-content !text-base-100 focus-within:outline-none focus-withnin:border-none" placeholder="Phone" />

                <label className="label">Password</label>
                <input type="password" value={password} onChange={handlePassword} required className="validator input !bg-base-content !text-base-100 focus-within:outline-none focus-withnin:border-none" placeholder="Password" />

                <label className="label">Confirm Password</label>
                <input type="password" value={cpassword} onChange={handleCpassword} required className="validator input !bg-base-content !text-base-100 focus-within:outline-none focus-withnin:border-none" placeholder="Confirm Password" />

                <button type='submit' className="btn btn-primary  mt-4">Sign Up</button>

                <div className="w-full flex flex-col gap-2 items-center justify-center mt-4">
                    <span className=' font-bold'>Already have an Account</span>
                    <button onClick={() => setIsLogin(true)} type='button' className='btn btn-xs btn-outlint'>Login</button>
                </div>
            </form>
        </div>
    );
}