"use client";

import React from "react";
import { useDeletePost } from "@/api-actions/deletePost";

const DeleteButton = ({ slug }: { slug: string }) => {
  const { mutate: deletePost, isPending } = useDeletePost();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      deletePost(slug);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="border px-4 py-2 text-black hover:underline"
    >
      {isPending ? "Deleting..." : "Delete Post"}
    </button>
  );
};

export default DeleteButton;
