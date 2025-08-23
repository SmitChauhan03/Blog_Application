import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'
import authService from '../appwrite/auth';
import { login as authLogin } from '../store/authSlice';
import {Logo, Input, Button} from './index'

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")
    const [loading , setLoading] = useState(false);

    const login = async (data) => {
        setError("")
        setLoading(true);
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }finally{
            setLoading(false);
        }

    }


    return (
        <div className='min-h-screen flex items-center justify-center w-full p-4'>
    <div className='mx-auto w-full max-w-md'>
        {/* Main form container */}
        <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 relative overflow-hidden'>            
            {/* Content */}
            <div className='relative z-10'>
                {/* Header text */}
                <div className='text-center mb-8'>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
                        Welcome back
                    </h2>
                    <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                        Don't have an account?{' '}
                        <Link
                            to="/signup"
                            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:underline underline-offset-2"
                        >
                            Sign up here
                        </Link>
                    </p>
                </div>

                {/* Error message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-red-600 text-sm text-center flex items-center justify-center">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit(login)} className='space-y-6'>
                    <div className='space-y-5'>
                        <div className='group'>
                            <Input
                                label="Email"
                                placeholder="Enter your email address"
                                type="email"
                                className="transition-all duration-200 focus:scale-[1.02] focus:shadow-lg"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Email address must be a valid address",
                                    }
                                })}
                            />
                        </div>
                        
                        <div className='group'>
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                className="transition-all duration-200 focus:scale-[1.02] focus:shadow-lg"
                                {...register("password", {
                                    required: true,
                                })}
                            />
                        </div>
                    </div>

                    <div className='pt-2'>
                        <Button
                            type="submit"
                            className="w-full relative overflow-hidden group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            disabled={loading}
                        >
                            <span className='relative z-10 flex items-center justify-center'>
                                {loading ? (
                                    <>
                                        <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2'></div>
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign in
                                        <svg className='w-4 h-4 ml-2 transition-transform group-hover:translate-x-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                                        </svg>
                                    </>
                                )}
                            </span>
                            
                            {/* Button shine effect */}
                            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out'></div>
                        </Button>
                    </div>
                </form>

                {/* <div className='mt-6 text-center'>
                    <Link 
                        to="/forgot-password" 
                        className='text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200'
                    >
                        Forgot your password?
                    </Link>
                </div> */}
            </div>
        </div>

        {/* Bottom decoration */}
        <div className='mt-8 text-center'>
            <p className='text-xs text-gray-500'>
                Secure login powered by appwrite
            </p>
        </div>
    </div>
</div>
    )
}

export default Login