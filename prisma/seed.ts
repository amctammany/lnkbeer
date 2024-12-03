import slugify from "slugify";
import { HopUsage, StyleCategory } from "@prisma/client";
import { prisma } from "../lib/client";
import styles from "../data/styles.json";
import hops from "../data/hops.json";
console.log(hops);
async function main() {
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.style.deleteMany();

  await prisma.user.deleteMany();
  await prisma.hop.deleteMany();
  await prisma.style.createMany({
    data: styles.map(({ category, ...style }) => ({
      ...style,
      subcategoryId: parseInt(style.subcategoryId, 10),
      category: StyleCategory[category.toLowerCase() as StyleCategory],
    })),
  });
  await prisma.hop.createMany({
    data: hops.map(({ aromas, usage, flavorMap, ...hop }: any) => ({
      flavor: aromas,
      ...hop,

      slug: slugify(hop.name, { lower: true }),
      usage: HopUsage[usage?.toLowerCase() as HopUsage] || HopUsage.dual,
    })),
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
