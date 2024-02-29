/*
  Warnings:

  - Added the required column `rate_id` to the `players` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "players" ADD COLUMN "rate_id" TEXT NOT NULL DEFAULT '0';



-- CreateTable
CREATE TABLE "stages" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "stage_init_date" TIMESTAMP(3) NOT NULL,
    "stage_end_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "stages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rates" (
    "id" TEXT NOT NULL,
    "rate" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "stage_id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,

    CONSTRAINT "rates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rates" ADD CONSTRAINT "rates_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
