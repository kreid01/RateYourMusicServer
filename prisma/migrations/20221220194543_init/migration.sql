-- CreateTable
CREATE TABLE "review" (
    "id" SERIAL NOT NULL,
    "posterId" INTEGER NOT NULL,
    "releaseId" INTEGER NOT NULL,
    "postDate" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "release" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "artistId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "recorded" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "ratingCount" INTEGER NOT NULL,
    "genres" TEXT[],
    "descriptors" TEXT[],
    "language" TEXT NOT NULL,
    "tracks" TEXT[],

    CONSTRAINT "release_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artist" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "born" TEXT NOT NULL,
    "aliases" TEXT NOT NULL,
    "followers" INTEGER NOT NULL,
    "genres" TEXT[],

    CONSTRAINT "artist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "release"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "release" ADD CONSTRAINT "release_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
