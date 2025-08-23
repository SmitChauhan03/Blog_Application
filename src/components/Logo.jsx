import React from 'react'

function Logo({width = '100px', className = ""}) {
  // Convert width to appropriate classes or use inline style
  const getWidthClass = (width) => {
    const widthMap = {
      '40px': 'w-10',
      '50px': 'w-12',
      '60px': 'w-14',
      '70px': 'w-16',
      '100px': 'w-24'
    }
    return widthMap[width] || `w-24`
  }

  return (
    <div 
      className={`${getWidthClass(width)} h-auto flex items-center justify-center ${className}`}
      style={!['40px', '50px', '60px', '70px', '100px'].includes(width) ? { width } : {}}
    >
      <div className="relative flex items-center justify-center">
        {/* Modern geometric logo design */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-full aspect-square rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 p-1 shadow-lg">
            {/* Inner circle */}
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center relative overflow-hidden">
              {/* Logo symbol - abstract geometric shape */}
              <div className="relative w-3/5 h-3/5 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg transform rotate-12 shadow-inner"></div>
                <div className="absolute inset-1 bg-gradient-to-tl from-indigo-600 to-blue-500 rounded-md transform -rotate-12"></div>
                <div className="relative z-10 text-white font-bold text-xs flex items-center justify-center">
                  L
                </div>
              </div>
              
              {/* Subtle inner shadow for depth */}
              <div className="absolute inset-0 rounded-full shadow-inner opacity-20"></div>
            </div>
          </div>
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-20 blur-sm scale-110 -z-10"></div>
        </div>
      </div>
    </div>
  )
}

export default Logo