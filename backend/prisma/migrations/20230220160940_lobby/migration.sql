-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "user42Name" TEXT NOT NULL DEFAULT 'No42userName',
    "image" TEXT DEFAULT 'https://res.cloudinary.com/djdxw1y13/image/upload/v1676390380/Transcendence/default-avatar_hsktjo.png',
    "coalition" TEXT DEFAULT 'Federation',
    "status" TEXT DEFAULT 'offline',
    "games" INTEGER DEFAULT 0,
    "wins" INTEGER DEFAULT 0,
    "ratio" DOUBLE PRECISION DEFAULT 0,
    "achievements" TEXT[],
    "score" INTEGER DEFAULT 0,
    "accessToken" TEXT NOT NULL DEFAULT 'noToken',
    "refreshToken" TEXT NOT NULL DEFAULT 'noRefreshToken',
    "isRegistered" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lobby" (
    "id" TEXT NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Lobby_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- AddForeignKey
ALTER TABLE "Lobby" ADD CONSTRAINT "Lobby_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
