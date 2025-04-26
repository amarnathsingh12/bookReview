import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleError = (msg) => {
        alert(msg || "Something went wrong!");
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;

        if (!email || !password) {
            return handleError("Email and password are required");
        }

        try {
            const url = `http://localhost:5000/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });

            const result = await response.json();
            const { success, message, jwtToken, name, _id } = result;

            if (success) {
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                localStorage.setItem('loggedInUserId', _id);
                navigate('/');
            } else {
                handleError(message || "Invalid email or password");
            }
        } catch (error) {
            handleError("Failed to login. Please try again later.");
        }
    };


    return (
        <div className='h-[calc(100vh-120px)] flex justify-center items-center '>
            <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-xl font-semibold mb-4'>Please Login</h2>

                <form onSubmit={handleLogin}>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email</label>
                        <input
                            type="email" name="email" onChange={handleChange} value={loginInfo.email} placeholder='Email Address'
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
                        <input
                            type="password" name="password" value={loginInfo.password} onChange={handleChange} placeholder='Password'
                            className='shadow appearance-none border mb-4 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                        />
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none'>Login </button>
                    </div>
                </form>
                <p className='align-baseline font-medium mt-4 text-sm'>Haven't an account? Please <Link to="/register" className='text-blue-500 hover:text-blue-700'>Register</Link></p>

                <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Book Store. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Login