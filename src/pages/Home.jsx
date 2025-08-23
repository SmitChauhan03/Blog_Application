import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        setLoading(true)
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
        .catch((err) => setError("Failed to load posts..."))
        .finally(()=> setLoading(false))
    }, [])

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen ">
                <div className="relative z-10 pt-24 pb-16">
                    <Container>
                        <div className="text-center">
                            <div className="flex justify-center mb-8">
                                <div className="relative">
                                    <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                                Loading amazing content...
                            </h1>
                            <p className="text-gray-600">Please wait while we fetch the latest posts for you</p>
                        </div>
                    </Container>
                </div>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
                <Container>
                    <div className="text-center max-w-md mx-auto">
                        <div className="mb-8">
                            <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h1>
                            <p className="text-lg text-gray-600 mb-6">{error}</p>
                            <button 
                                onClick={() => window.location.reload()}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    // Empty state
    if (posts.length === 0) {
        return (
            <div className="min-h-screen ">
                {/* Hero Section */}
                <div className="relative overflow-hidden">                    
                    <div className="relative z-10 pt-35 pb-16">
                        <Container>
                            <div className="text-center max-w-4xl mx-auto">
                                {!authStatus ? (
                                    // Not logged in
                                    <>
                                        <div className="mb-12">
                                            <h1 className="text-5xl md:text-6xl font-bold mb-6">
                                                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                                    Welcome to
                                                </span>
                                                <br />
                                                <span className=" text-white bg-clip-text">
                                                    Our Blog
                                                </span>
                                            </h1>
                                            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                                                Discover amazing stories, insights, and ideas from our community of writers. Join us to unlock exclusive content and connect with like-minded individuals.
                                            </p>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                                            <a 
                                                href="/login"
                                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-blue-700 hover:to-purple-700"
                                            >
                                                Sign In to Read Posts
                                            </a>
                                            <a 
                                                href="/signup"
                                                className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105"
                                            >
                                                Join Our Community
                                            </a>
                                        </div>
                                    </>
                                ) : (
                                    // Logged in but no posts
                                    <>
                                        <div className="mb-12">
                                            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                                                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                            </div>
                                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                                    Ready to get started?
                                                </span>
                                            </h1>
                                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                                There are no posts yet, but you can be the first to create amazing content and share your ideas with the world.
                                            </p>
                                        </div>

                                        <div className="mb-16">
                                            <a 
                                                href="/add-post"
                                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-blue-700 hover:to-purple-700 inline-flex items-center space-x-2"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                                <span>Create Your First Post</span>
                                            </a>
                                        </div>
                                    </>
                                )}
                            </div>
                        </Container>
                    </div>
                </div>
            </div>
        )
    }

    // Posts display
    return (
        <div className="min-h-screen ">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
                {/* Background decoration */}
                <div className='absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl'></div>
                <div className='absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl'></div>
                
                <div className="relative z-10 py-5">
                    <Container>
                        <div className="text-center text-white">
                            <p className="text-xl font-bold text-blue-100 max-w-2xl mx-auto">
                                Discover amazing content from our community of writers and creators
                            </p>
                        </div>
                    </Container>
                </div>
            </div>

            {/* Posts Grid */}
            <div className="py-16 relative">
                <Container>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {posts.map((post) => (
                            <div key={post.$id} className="transform hover:scale-105 transition-transform duration-300">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>

                    {/* Load more section */}
                    {posts.length > 0 && (
                        <div className="text-center mt-16">
                            <button className="px-8 py-3 border-2 border-gray-300 text-white font-semibold rounded-xl hover:bg-gray-900 hover:border-gray-400 transition-all duration-300 transform hover:scale-105">
                                Load More Posts
                            </button>
                        </div>
                    )}
                </Container>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                .animate-reverse {
                    animation-direction: reverse;
                }
                .animation-delay-1000 {
                    animation-delay: 1s;
                }
            `}</style>
        </div>
    )
}

export default Home