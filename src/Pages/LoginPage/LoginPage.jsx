import React, { useState } from 'react';
import LoginForm from './LoginModal';
import SignupForm from './SignUpModal';

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-full w-full bg-[url(/images/loginbg.jpg)] bg-cover bg-center flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {isLogin ? <LoginForm setIsLogin={setIsLogin} /> : <SignupForm setIsLogin={setIsLogin} />}
            </div>
        </div>
    );
}




