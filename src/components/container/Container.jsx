import React from 'react'

function Container({children, className = "", size = "default"}) {
  // Size variants for different use cases
  const sizeClasses = {
    sm: 'max-w-3xl',
    default: 'max-w-7xl', 
    lg: 'max-w-full',
    content: 'max-w-4xl'
  }

  return (
    <div className={`w-full ${sizeClasses[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export default Container