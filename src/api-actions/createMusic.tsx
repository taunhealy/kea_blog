"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getServerAuth } from "@/api-actions/getServerAuth";
import { revalidatePath } from "next/cache";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subheading: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  quote: z.string().optional(),
  tags: z.array(z.string()).optional(), // Updated to expect an array of strings
});

export async function createMusic(formData: FormData) {
  const { user } = await getServerAuth();

  if (!user) {
    return { success: false, error: "User not authenticated" };
  }

  const musicData = {
    title: formData.get("title") as string,
    artist: formData.get("artist") as string,
    content: formData.get("content") as string,
    // ... (update other fields as needed)
  };

  try {
    let slug = musicData.title.toLowerCase().replace(/\s+/g, "-");
    let existingTrack = await prisma.music.findUnique({ where: { slug } });
    let counter = 1;

    while (existingTrack) {
      slug = `${slug}-${counter}`;
      existingTrack = await prisma.music.findUnique({ where: { slug } });
      counter++;
    }

    const newTrack = await prisma.music.create({
      data: {
        ...musicData,
        user: { connect: { id: user.id } },
        slug,
        categories: {
          connect: musicData.categories.map((id) => ({ id })),
        },
      },
    });

    revalidatePath("/music");

    return { success: true, slug: newTrack.slug };
  } catch (error) {
    console.error("Error creating music:", error);
    return { success: false, error: "Failed to create music" };
  }
}