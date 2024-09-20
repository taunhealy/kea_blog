import React from "react";
import { getPosts } from "@/actions/getPosts";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Latest Blog Posts</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: any) => (
          <Card key={post.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{post.subheading}</p>
            </CardContent>
            <CardFooter className="mt-auto">
              <div className="flex w-full items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  {formatDate(post.date)}
                </span>
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-blue-500 hover:underline"
                >
                  Read more
                </Link>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
