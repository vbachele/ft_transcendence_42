-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT DEFAULT '',
    "user42Name" TEXT,
    "email" TEXT DEFAULT '',
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
    "otp_enabled" BOOLEAN DEFAULT false,
    "otp_verified" BOOLEAN DEFAULT false,
    "otp_validated" BOOLEAN DEFAULT false,
    "otp_ascii" TEXT DEFAULT '',
    "otp_hex" TEXT DEFAULT '',
    "otp_base32" TEXT DEFAULT '',
    "otp_auth_url" TEXT DEFAULT '',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lobby" (
    "id" TEXT NOT NULL,
    "adminId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "maxClients" INTEGER,

    CONSTRAINT "Lobby_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" SERIAL NOT NULL,
    "api" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_api_key" ON "Achievement"("api");

-- AddForeignKey
ALTER TABLE "Lobby" ADD CONSTRAINT "Lobby_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
