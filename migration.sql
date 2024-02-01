-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Auth" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "numberPhone" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Elegibilidad" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ingresosPromedio" TEXT NOT NULL,
    "archivoElegilidad" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Identidad" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cedula" INTEGER NOT NULL,
    "archivoCedula" TEXT NOT NULL,
    "archivoHolding" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_email_key" ON "Auth"("email");

