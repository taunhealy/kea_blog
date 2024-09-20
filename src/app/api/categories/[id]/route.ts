import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuth } from "@/api-actions/getAuth";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { user } = await getAuth();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = parseInt(params.id);
  const { name } = await request.json();

  try {
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name },
    });
    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Error updating category" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { user } = await getAuth();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = parseInt(params.id);

  try {
    await prisma.category.delete({ where: { id } });
    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Error deleting category" },
      { status: 500 },
    );
  }
}
