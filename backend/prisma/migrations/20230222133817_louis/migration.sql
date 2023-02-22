-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT DEFAULT '',
ALTER COLUMN "refreshToken" DROP NOT NULL;
