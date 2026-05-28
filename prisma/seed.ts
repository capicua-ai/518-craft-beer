import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set");

const adapter = new PrismaPg({ connectionString });
const db = new PrismaClient({ adapter });

async function main() {
  // Site settings (singleton — upsert by first record)
  await db.siteSettings.upsert({
    where: { id: "00000000-0000-0000-0000-000000000001" },
    create: {
      id: "00000000-0000-0000-0000-000000000001",
      hero_headline: "TWO NEW BEERS",
      hero_subheadline:
        "Fresh from Troy, NY. Brewed with community in every can.",
      footer_address: "200 Broadway, Troy, NY",
      footer_website: "518craft.com",
      footer_instagram: "@518craft",
    },
    update: {},
  });

  // Beer 1 — Farmers Market After Party
  await db.beer.upsert({
    where: { id: "00000000-0000-0000-0000-000000000010" },
    create: {
      id: "00000000-0000-0000-0000-000000000010",
      name: "FARMERS MARKET AFTER PARTY",
      style: "PILSNER",
      abv: "5.0%",
      size_oz: 12,
      description:
        "Throughout the year, local growers and makers gather in Troy, NY to sell their goods at the Downtown Troy Farmers Market bringing thousands of visitors with totes in their hands and community in their hearts. Drink up!",
      label_image_url: null,
      accent_color: "#C97D1A",
      bg_color: "#1C0800",
      display_order: 1,
    },
    update: {},
  });

  // Beer 2 — Troy Night Out
  await db.beer.upsert({
    where: { id: "00000000-0000-0000-0000-000000000011" },
    create: {
      id: "00000000-0000-0000-0000-000000000011",
      name: "TROY NIGHT OUT",
      style: "HAZY IPA",
      abv: "6.2%",
      size_oz: 12,
      description:
        "Each final Friday of the month, as the evening creeps over the Collar City, a rush of live music, excitement and friendship pours through the streets downtown. That's where TNO Hazy IPA made its first appearance so that now you can enjoy it any night, any where!",
      label_image_url: null,
      accent_color: "#FF7B00",
      bg_color: "#0D0020",
      display_order: 2,
    },
    update: {},
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
