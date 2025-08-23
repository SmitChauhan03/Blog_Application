import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="min-h-screen py-12">
            <Container>
                {/* Featured Image Container */}
                <div className="w-full flex justify-center mb-8 relative">
                    <div className="relative h-[200px] w-full max-w-5xl bg-white rounded-2xl p-3 shadow-xl border border-gray-100 group overflow-hidden">
                        
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-auto rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-[1.02]"
                        />

                        {/* Author Actions */}
                        {isAuthor && (
                            <div className="absolute right-5 top-5 flex space-x-1">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button 
                                        bgColor="bg-green-500" 
                                        className="mr-3 px-6 py-2.5 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-green-600 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        <span>Edit</span>
                                    </Button>
                                </Link>
                                <Button 
                                    bgColor="bg-red-500" 
                                    onClick={deletePost}
                                    className="px-6 py-2.5 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-red-600 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    <span>Delete</span>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Post Title */}
                <div className="w-full mb-8">
                    <div className="max-w-4xl mx-auto backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
                        <h1 className="text-2xl md:text-2xl font-bold text-white bg-clip-text leading-tight">
                            {post.title}
                        </h1>
                    </div>
                </div>

                {/* Post Content */}
                <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
                    <div className="browser-css prose prose-lg max-w-none text-black leading-relaxed">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        
        </div>
    ) : null;
}