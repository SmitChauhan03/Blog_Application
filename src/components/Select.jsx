import React, {useId} from 'react'

function Select({
    options,
    label,
    className = "",
    placeholder = "Select an option...",
    error,
    disabled = false,
    size = "md",
    ...props
}, ref) {
    const id = useId()
    
    // Size variants
    const sizeClasses = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-3 text-base", 
        lg: "px-5 py-4 text-lg"
    }
    
    return (
        <div className='w-full'>
            {label && (
                <label 
                    htmlFor={id} 
                    className='block text-sm font-medium text-gray-700 mb-2 transition-colors duration-200'
                >
                    {label}
                </label>
            )}
            
            <div className='relative'>
                <select
                    {...props}
                    id={id}
                    ref={ref}
                    disabled={disabled}
                    className={`
                        ${sizeClasses[size]} rounded-xl bg-white text-gray-900 
                        border-2 border-gray-200 w-full appearance-none
                        transition-all duration-300 ease-in-out
                        focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                        hover:border-gray-300 hover:shadow-md
                        disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-200
                        ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}
                        ${className}
                    `}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options?.map((option) => {
                        // Handle both string options and object options
                        const value = typeof option === 'object' ? option.value : option
                        const label = typeof option === 'object' ? option.label : option
                        
                        return (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        )
                    })}
                </select>
                
                {/* Custom dropdown arrow */}
                <div className='absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none'>
                    <svg 
                        className={`w-5 h-5 transition-colors duration-200 ${
                            disabled ? 'text-gray-400' : error ? 'text-red-400' : 'text-gray-600'
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M19 9l-7 7-7-7" 
                        />
                    </svg>
                </div>
                
                {/* Focus ring enhancement */}
                <div className='absolute inset-0 rounded-xl pointer-events-none transition-all duration-300 opacity-0 focus-within:opacity-100 bg-gradient-to-r from-blue-500/10 to-purple-500/10'></div>
            </div>
            
            {/* Error message */}
            {error && (
                <div className="mt-2 flex items-center space-x-2">
                    <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}
            
            {/* Helper text for better UX */}
            {!error && options?.length === 0 && (
                <p className="mt-2 text-sm text-gray-500">No options available</p>
            )}
        </div>
    )
}

export default React.forwardRef(Select)