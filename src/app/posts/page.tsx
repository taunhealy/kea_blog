import React from "react";
import { getPosts } from "@/api-actions/getPosts";
import PostsGrid from "@/components/PostsGrid";

export default async function PostsPage() {
  const posts = await getPosts();
  const categories = Array.from(
    new Set(posts.flatMap((post: any) => post.categories.map(JSON.stringify)))
  ).map((category: unknown) => JSON.parse(category as string));

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Latest Blog Posts</h1>
      <PostsGrid posts={posts} categories={categories} />
    </div>
  );
}
