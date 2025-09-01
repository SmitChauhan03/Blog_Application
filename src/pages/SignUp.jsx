import React from 'react'
import { SignUp as SignupComponent } from '../components'

function Signup() {
  return (
    <div className='min-h-screen  relative overflow-hidden'>
      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(147,51,234,0.05),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.05),transparent_50%)]'></div>
      </div>

      {/* Main content */}
      <div className='relative z-10 flex flex-col min-h-screen'>
        {/* Header section with branding */}
        <div className='pt-8'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center'>
              <div className=''>
                <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-4'>
                  <span className='bg-gradient-to-r from-blue-800 via-gray-700 to-pink-900 bg-clip-text text-transparent'>
                    Blog-Draft
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
    </div>
  )
}

export default Signup