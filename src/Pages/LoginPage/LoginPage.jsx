import React, { useState } from 'react';
import LoginForm from './LoginModal';
import SignupForm from './SignUpModal';

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen bg-[url(/src/assets/loginbg.jpg)] bg-cover flex items-center justify-center px-4">
            {isLogin ? <LoginForm setIsLogin={setIsLogin} /> : <SignupForm setIsLogin={setIsLogin} />}
        </div>
    );
}




