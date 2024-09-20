"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAuth } from "@/actions/getAuth";
import { revalidatePath } from "next/cache";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subheading: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  quote: z.string().optional(),
  tags: z.array(z.string()).optional(), // Updated to expect an array of strings
});

export async function createPost(formData: FormData) {
  const { user } = await getAuth();

  if (!user) {
    return { success: false, error: "User not authenticated" };
  }

  const postData = {
    title: formData.get("title") as string,
    subheading: formData.get("subheading") as string,
    content: formData.get("content") as string,
    quote: formData.get("quote") as string,
    tags: (formData.get("tags") as string).split(",").map((tag) => tag.trim()), // This creates an array of strings
  };

  try {
    console.log("Post data before parsing:", postData); // Debugging line
    postSchema.parse(postData);

    let slug = postData.title.toLowerCase().replace(/\s+/g, "-");
    let existingPost = await prisma.post.findUnique({ where: { slug } });
    let counter = 1;

    while (existingPost) {
      slug = `${slug}-${counter}`;
      existingPost = await prisma.post.findUnique({ where: { slug } });
      counter++;
    }

    await prisma.post.create({
      data: {
        ...postData,
        user: { connect: { id: user.id } },
        slug,
      },
    });

    revalidatePath("/posts");

    return { success: true, slug };
  } catch (error) {
    console.error("Error creating post:", error);
    return { success: false, error: "Failed to create post" };
  }
}
