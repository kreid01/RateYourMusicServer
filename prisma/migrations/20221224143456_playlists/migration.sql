/*
  Warnings:

  - You are about to drop the column `artistId` on the `artist` table. All the data in the column will be lost.
  - You are about to drop the column `descriptors` on the `release` table. All the data in the column will be lost.
  - You are about to drop the column `recorded` on the `release` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `tokenVersion` on the `user` table. All the data in the column will be lost.
  - Added the required column `cover` to the `release` table without a default value. This is not possible if the table is not empty.
  - Added the required column `released` to the `release` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_userId_fkey";

-- AlterTable
ALTER TABLE "artist" DROP COLUMN "artistId";

-- AlterTable
ALTER TABLE "release" DROP COLUMN "descriptors",
DROP COLUMN "recorded",
ADD COLUMN     "cover" TEXT NOT NULL,
ADD COLUMN     "released" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "review" DROP COLUMN "userId",
ALTER COLUMN "postDate" SET DATA TYPE TEXT,
ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "tokenVersion";

-- CreateTable
CREATE TABLE "playlist" (
    "id" SERIAL NOT NULL,
    "posterId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "contentIds" INTEGER[],

    CONSTRAINT "playlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_playlistTorelease" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_playlistTorelease_AB_unique" ON "_playlistTorelease"("A", "B");

-- CreateIndex
CREATE INDEX "_playlistTorelease_B_index" ON "_playlistTorelease"("B");

-- AddForeignKey
ALTER TABLE "playlist" ADD CONSTRAINT "playlist_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_playlistTorelease" ADD CONSTRAINT "_playlistTorelease_A_fkey" FOREIGN KEY ("A") REFERENCES "playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_playlistTorelease" ADD CONSTRAINT "_playlistTorelease_B_fkey" FOREIGN KEY ("B") REFERENCES "release"("id") ON DELETE CASCADE ON UPDATE CASCADE;
