-- CreateTable
CREATE TABLE "channel" (
    "id" SERIAL NOT NULL,
    "releaseId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "open" BOOLEAN NOT NULL,

    CONSTRAINT "channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message" (
    "id" SERIAL NOT NULL,
    "channelId" INTEGER NOT NULL,
    "posterId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "postDate" TEXT NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "channel" ADD CONSTRAINT "channel_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "release"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
