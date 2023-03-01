-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "user42Name" TEXT,
    "email" TEXT NOT NULL,
    "image" TEXT DEFAULT 'https://res.cloudinary.com/djdxw1y13/image/upload/v1676390380/Transcendence/default-avatar_hsktjo.png',
    "coalition" TEXT DEFAULT 'Federation',
    "status" TEXT DEFAULT 'offline',
    "games" INTEGER DEFAULT 0,
    "wins" INTEGER DEFAULT 0,
    "ratio" DOUBLE PRECISION DEFAULT 0,
    "achievements" TEXT[],
    "score" INTEGER DEFAULT 0,
    "accessToken" TEXT NOT NULL DEFAULT 'noToken',
    "refreshToken" TEXT DEFAULT 'noRefreshToken',
    "isRegistered" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
