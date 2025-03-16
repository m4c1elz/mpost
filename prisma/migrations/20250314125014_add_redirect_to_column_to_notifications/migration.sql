/*
  Warnings:

  - Added the required column `redirect_to` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "redirect_to" TEXT NOT NULL;
