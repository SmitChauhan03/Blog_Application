import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import appwriteService from '../../appwrite/config'
import {Button, Input, RTE, Select} from ".."

function PostForm({ post }) {

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value.trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";

    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);



    return (
        <div className="min-h-screen  py-8">
    <div className=" max-w-7xl md:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Header */}
        <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-700 to-purple-800 bg-clip-text text-transparent">
                {post ? 'Edit Post' : 'Create New Post'}
            </h1>
            <p className="mt-2 text-gray-600">
                {post ? 'Update your existing post with new content.' : 'Share your thoughts with the world.'}
            </p>
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content - Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Content Card */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 relative overflow-hidden">                        
                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900">Content Details</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="group">
                                    <Input
                                        label="Post Title"
                                        placeholder="Enter an engaging title"
                                        className="transition-all duration-200 focus:scale-[1.02] focus:shadow-lg"
                                        {...register("title", { required: true })}
                                    />
                                </div>
                                <div className="group">
                                    <Input
                                        label="URL Slug"
                                        placeholder="auto-generated-slug"
                                        className="transition-all duration-200 focus:scale-[1.02] focus:shadow-lg"
                                        {...register("slug", { required: true })}
                                        onInput={(e) => {
                                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                                        }}
                                    />
                                    <p className="mt-1 text-xs text-gray-500">The URL slug will be auto-generated from your title</p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <RTE 
                                    label="Post Content" 
                                    name="content" 
                                    control={control} 
                                    defaultValue={getValues("content")} 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar - Right Column */}
                <div className="space-y-6">
                    {/* Featured Image Card */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 relative overflow-hidden">
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full opacity-10 blur-xl"></div>
                        
                        <div className="relative z-10">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Featured Image</h3>
                            </div>

                            <div className="space-y-4">
                                <Input
                                    label="Upload Image"
                                    type="file"
                                    className="transition-all duration-200 focus:scale-[1.02]"
                                    accept="image/png, image/jpg, image/jpeg, image/gif"
                                    {...register("image", { required: !post })}
                                />
                                
                                {post && (
                                    <div className="group relative">
                                        <div className="relative rounded-xl overflow-hidden shadow-md">
                                            <img
                                                src={appwriteService.getFilePreview(post.featuredImage)}
                                                alt={post.title}
                                                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                        <p className="mt-2 text-sm text-gray-600 text-center">Current featured image</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Publishing Options Card */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 relative overflow-hidden">
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-10 blur-xl"></div>
                        
                        <div className="relative z-10">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Publishing Options</h3>
                            </div>

                            <div className="space-y-6">
                                <Select
                                    options={["active", "inactive"]}
                                    label="Post Status"
                                    className="transition-all duration-200 focus:scale-[1.02]"
                                    {...register("status", { required: true })}
                                />
                                
                                <div className="pt-4 border-t border-gray-200">
                                    <Button 
                                        type="submit" 
                                        variant={post ? "primary" : "primary"}
                                        className="w-full relative group overflow-hidden"
                                        size="lg"
                                    >
                                        <span className="flex items-center justify-center">
                                            {post ? (
                                                <>
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                    </svg>
                                                    Update Post
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    Publish Post
                                                </>
                                            )}
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tips Card */}
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                        <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Writing Tips</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Use clear, engaging headlines</li>
                                    <li>• Add relevant images to break up text</li>
                                    <li>• Keep paragraphs short and readable</li>
                                    <li>• Preview before publishing</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
    );
}

export default PostForm