import React from 'react'
import { Logo, LogoutBtn} from '../index'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../container/Container'

function Header() {

    const authStatus = useSelector((state) => state.auth.status)
    // const navigate = useNavigate()

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: 'Login',
            slug: "/login",
            active: !authStatus
        },
        {
            name: 'Signup',
            slug: "/signup",
            active: !authStatus
        },
        {
            name: 'All Posts',
            slug: "/all-posts",
            active: authStatus
        },
        {
            name: 'Add Post',
            slug: "/add-post",
            active: authStatus
        }
    ]

    return (
        <header className='sticky top-0 z-50 backdrop-blur-md  border-b border-gray-200/20 shadow-sm transition-all duration-300'>
            <Container>
                <nav className='flex items-center justify-between py-4'>
                    <div className='flex items-center space-x-3'>
                        <Link to='/' className='group flex items-center space-x-2 transition-transform duration-200 hover:scale-105'>
                            <div className='p-1 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg group-hover:shadow-xl transition-shadow duration-300'>
                                <Logo width='50px' />
                            </div>
                        </Link>
                    </div>
                    
                    <div className='flex items-center space-x-1'>
                        <ul className='flex items-center space-x-1'>
                            {navItems.map((item) =>
                                item.active ? (
                                    <li key={item.name}>
                                        <Link
                                            to={item.slug}
                                            className='relative px-4 py-2.5 text-sm font-medium text-white rounded-xl transition-all duration-300 hover:text-blue-600 hover:bg-blue-50/80 hover:shadow-md hover:scale-105 active:scale-95 group'
                                        >
                                            <span className='relative z-10'>{item.name}</span>
                                            <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300'></div>
                                        </Link>
                                    </li>
                                ) : null
                            )}
                            {authStatus && (
                                <li className='ml-2'>
                                    <div className='p-1 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl'>
                                        <LogoutBtn />
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>
            </Container>
        </header>
    )
}

export default Header