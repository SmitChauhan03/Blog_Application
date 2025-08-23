import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div className="py-10">
      <Container>
        <div className="max-w-7xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6">
          <PostForm />
        </div>
      </Container>
    </div>
  );
}

export default AddPost;
