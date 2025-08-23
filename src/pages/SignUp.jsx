import React from 'react'
import { SignUp as SignupComponent } from '../components'

function Signup() {
  return (
    <div className='min-h-screen  relative overflow-hidden'>
      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {/* Floating orbs */}
        {/* <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full opacity-10 blur-3xl animate-pulse'></div>
        <div className='absolute top-1/3 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10 blur-3xl animate-pulse animation-delay-1000'></div>
        <div className='absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-br from-indigo-400 to-cyan-500 rounded-full opacity-10 blur-3xl animate-pulse animation-delay-2000'></div> */}
        {/* Gradient mesh overlay */}
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(147,51,234,0.05),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.05),transparent_50%)]'></div>
      </div>

      {/* Main content */}
      <div className='relative z-10 flex flex-col min-h-screen'>
        {/* Header section with branding */}
        <div className='pt-8'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center'>
              {/* Welcome message */}
              <div className=''>
                <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-4'>
                  <span className='bg-gradient-to-r from-blue-800 via-gray-700 to-pink-900 bg-clip-text text-transparent'>
                    Blog-Application
                  </span>
                </h1>
                <p className='text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                  Connect, create, and share your amazing ideas with the world.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Signup form section */}
        <div className='flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8'>
          <div className='w-full max-w-md transform hover:scale-105 transition-transform duration-300'>
            <SignupComponent />
          </div>
        </div>

      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce 3s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes spin {
          from { transform: rotate(45deg); }
          to { transform: rotate(405deg); }
        }
        @keyframes bounce {
          0%, 100% { 
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0.8,0,1,1);
          }
          50% { 
            transform: translateY(-25%);
            animation-timing-function: cubic-bezier(0,0,0.2,1);
          }
        }
      `}</style>
    </div>
  )
}

export default Signup