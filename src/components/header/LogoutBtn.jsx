import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'


function LogoutBtn() {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  
  const logoutHandler = async () => {
    setIsLoading(true)
    try {
      await authService.logout()
      dispatch(logout())
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      className='relative group px-2 py-2 text-sm font-medium text-red-600 bg-white rounded-xl transition-all duration-300 hover:bg-red-50 hover:text-red-700 hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none '
      onClick={logoutHandler}
      disabled={isLoading}
    >
      <span className='flex items-center justify-center space-x-2'>
        {isLoading ? (
          <>
            <div className='w-4 h-4  rounded-full animate-spin'></div>
            <span>Logging out...</span>
          </>
        ) : (
          <>
            <svg 
              className='w-4 h-4 transition-transform duration-300 group-hover:rotate-12' 
              fill='none' 
              stroke='currentColor' 
              viewBox='0 0 24 24'
            >
              <path 
                strokeLinecap='round' 
                strokeLinejoin='round' 
                strokeWidth={2} 
                d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' 
              />
            </svg>
            <span>Logout</span>
          </>
        )}
      </span>
      
      {/* Subtle gradient overlay on hover
      <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300'></div> */}
    </button>
  )
}

export default LogoutBtn