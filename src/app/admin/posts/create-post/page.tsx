"use client"; // Ensure this component is a client component

import React from "react";
import { createPost } from "@/actions/createPost"; // Import the createPost action
import { Input, Textarea } from "shadcn-react"; // Adjust the import based on your setup
import { useRouter } from "next/navigation"; // Import useRouter for client-side routing

export default function CreatePostPage() {
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await createPost(formData);

    if (result.success) {
      router.push(`/admin/posts/${result.slug}`); // Add leading slash to make path absolute
    } else {
      // Handle error (e.g., show error message)
      console.error(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input name="title" placeholder="Title" required />
      <Input name="subheading" placeholder="Subheading" />
      <Textarea name="content" placeholder="Content" required />
      <Input name="quote" placeholder="Quote" />
      <Input name="tags" placeholder="Tags (comma separated)" />
      <button type="submit">Create Post</button>
    </form>
  );
}
