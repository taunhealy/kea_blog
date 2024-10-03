/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToPost" DROP CONSTRAINT "_CategoryToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToPost" DROP CONSTRAINT "_CategoryToPost_B_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "_CategoryToPost";

-- CreateTable
CREATE TABLE "Music" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "spotifyUrl" TEXT NOT NULL,

    CONSTRAINT "Music_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToMusic" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Music_slug_key" ON "Music"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToMusic_AB_unique" ON "_CategoryToMusic"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToMusic_B_index" ON "_CategoryToMusic"("B");

-- AddForeignKey
ALTER TABLE "Music" ADD CONSTRAINT "Music_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToMusic" ADD CONSTRAINT "_CategoryToMusic_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToMusic" ADD CONSTRAINT "_CategoryToMusic_B_fkey" FOREIGN KEY ("B") REFERENCES "Music"("id") ON DELETE CASCADE ON UPDATE CASCADE;
