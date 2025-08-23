import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true)
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
            setLoading(false)
        })
    }, [])

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
        );
    }

    return (
        <div className='w-full min-h-screen py-8'>
            <Container>
                {posts.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg">
                        No posts available. Be the first to create one!
                    </p>
                ) : (
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    )
}

export default AllPosts