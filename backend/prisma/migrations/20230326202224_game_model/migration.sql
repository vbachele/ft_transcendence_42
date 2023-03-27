/*
  Warnings:

  - You are about to drop the `Match` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Match";

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "finishedAt" TIMESTAMP(3) NOT NULL,
    "leftPlayerName" TEXT NOT NULL,
    "rightPlayerName" TEXT NOT NULL,
    "leftScore" INTEGER NOT NULL,
    "rightScore" INTEGER NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_leftPlayerName_fkey" FOREIGN KEY ("leftPlayerName") REFERENCES "User"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_rightPlayerName_fkey" FOREIGN KEY ("rightPlayerName") REFERENCES "User"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
