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
        <div className="glass card p-6 shadow-xl backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-2xl font-bold text-center mb-6 text-base-content">Sign Up</h2>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-base-content">Email</span>
                    </label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={handleEmail} 
                        required 
                        className="input input-bordered bg-base-200/50 text-base-content" 
                        placeholder="Email" 
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-base-content">Name</span>
                    </label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={handleName} 
                        required 
                        className="input input-bordered bg-base-200/50 text-base-content" 
                        placeholder="Name" 
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-base-content">Phone Number</span>
                    </label>
                    <input 
                        type="text" 
                        value={phone} 
                        onChange={handlePhone} 
                        required 
                        className={`input input-bordered bg-base-200/50 text-base-content ${!isValid && phone ? 'input-error' : ''}`}
                        placeholder="Phone" 
                    />
                    {!isValid && phone && (
                        <label className="label">
                            <span className="label-text-alt text-error">Please enter a valid 10-digit phone number</span>
                        </label>
                    )}
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-base-content">Password</span>
                    </label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={handlePassword} 
                        required 
                        className="input input-bordered bg-base-200/50 text-base-content" 
                        placeholder="Password" 
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-base-content">Confirm Password</span>
                    </label>
                    <input 
                        type="password" 
                        value={cpassword} 
                        onChange={handleCpassword} 
                        required 
                        className="input input-bordered bg-base-200/50 text-base-content" 
                        placeholder="Confirm Password" 
                    />
                </div>

                <button type='submit' className="btn btn-primary w-full mt-6">Sign Up</button>

                <div className="text-center mt-4">
                    <p className="text-base-content mb-2">Already have an Account?</p>
                    <button 
                        onClick={() => setIsLogin(true)} 
                        type='button' 
                        className='btn btn-outline btn-sm'
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}