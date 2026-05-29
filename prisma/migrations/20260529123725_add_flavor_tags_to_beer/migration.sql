-- AlterTable
ALTER TABLE "beers" ADD COLUMN     "flavor_tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
