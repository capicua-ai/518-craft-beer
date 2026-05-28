-- CreateTable
CREATE TABLE "site_settings" (
    "id" TEXT NOT NULL,
    "hero_headline" TEXT NOT NULL,
    "hero_subheadline" TEXT NOT NULL,
    "footer_address" TEXT NOT NULL,
    "footer_website" TEXT NOT NULL,
    "footer_instagram" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "style" TEXT NOT NULL,
    "abv" TEXT NOT NULL,
    "size_oz" INTEGER NOT NULL DEFAULT 12,
    "description" TEXT NOT NULL,
    "label_image_url" TEXT,
    "accent_color" TEXT NOT NULL DEFAULT '#C97D1A',
    "bg_color" TEXT NOT NULL DEFAULT '#1A0800',
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "beers_pkey" PRIMARY KEY ("id")
);
