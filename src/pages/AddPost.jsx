import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div className="py-10">
      <Container>
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Create New Post</h1>
          <PostForm />
        </div>
      </Container>
    </div>
  );
}

export default AddPost;
