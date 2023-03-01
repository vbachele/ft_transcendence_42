/*
  Warnings:

  - Added the required column `createAt` to the `Lobby` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lobby" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL;
