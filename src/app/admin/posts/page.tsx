"use client";

import React from "react";
import Link from "next/link";
import DeleteButton from "@/components/ui/DeleteButton";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/api-actions/getPosts";

const PostsPage = () => {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  console.log("Posts data:", posts); // Keep this for debugging
  console.log("Error:", error); // Keep this for debugging

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error: {error instanceof Error ? error.message : "An error occurred"}
      </div>
    );
  if (!posts || posts.length === 0) return <div>No posts found.</div>;

  return (
    <div>
      <h1>Posts</h1>
      <Link href="/admin/posts/create-post">
        <button className="mb-4 rounded bg-blue-500 px-4 py-2 text-white">
          Create Post
        </button>
      </Link>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Subheading</th>
            <th className="border px-4 py-2">Categories</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post: any) => (
            <tr key={post.id}>
              <td className="border px-4 py-2">
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  {post.title}
                </Link>
              </td>
              <td className="border px-4 py-2">{post.subheading}</td>
              <td className="border px-4 py-2">
                {post.categories.map((category: any) => (
                  <span
                    key={category.id}
                    className="mr-2 rounded bg-gray-200 px-2 py-1 text-xs"
                  >
                    {category.name}
                  </span>
                ))}
              </td>
              <td className="flex items-center gap-5 border px-4 py-2">
                <DeleteButton slug={post.slug} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostsPage;
