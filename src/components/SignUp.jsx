import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index'


function SignUp() {

    const navigate = useNavigate();
    const [error, setError] = useState("")
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center w-full p-4">
            <div className='mx-auto w-full max-w-md'>
                {/* Main form container */}
                <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 relative overflow-hidden'>
                    {/* Decorative background elements */}
                    <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none'></div>
                    <div className='absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full opacity-10 blur-xl'></div>
                    <div className='absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-full opacity-10 blur-xl'></div>

                    {/* Content */}
                    <div className='relative z-10'>
                        {/* Header text */}
                        <div className='text-center mb-8'>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent leading-tight">
                                Create your account
                            </h2>
                            <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    className="font-semibold text-purple-600 hover:text-purple-700 transition-colors duration-200 hover:underline underline-offset-2"
                                >
                                    Sign in here
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
                        <form onSubmit={handleSubmit(create)} className='space-y-6'>
                            <div className='space-y-5'>
                                <div className='group'>
                                    <Input
                                        label="Full Name"
                                        placeholder="Enter your full name"
                                        className="transition-all duration-200 focus:scale-[1.02] focus:shadow-lg"
                                        {...register("name", {
                                            required: true,
                                        })}
                                    />
                                </div>

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
                                        placeholder="Create a strong password"
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
                                    className="w-full relative overflow-hidden group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    <span className='relative z-10 flex items-center justify-center'>
                                        Create Account
                                        <svg className='w-4 h-4 ml-2 transition-transform group-hover:translate-x-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                                        </svg>
                                    </span>

                                    {/* Button shine effect */}
                                    <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out'></div>
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp