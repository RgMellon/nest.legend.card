/*
  Warnings:

  - You are about to drop the column `logo` on the `players` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `players` table. All the data in the column will be lost.
  - Added the required column `nationality` to the `players` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nick_name` to the `players` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `players` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `players` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "players" DROP COLUMN "logo",
DROP COLUMN "name",
ADD COLUMN     "nationality" TEXT NOT NULL,
ADD COLUMN     "nick_name" TEXT NOT NULL,
ADD COLUMN     "photo" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL;
