import { StyleCategory } from "@prisma/client";
import { prisma } from "../lib/client";
import styles from "../data/styles.json";
async function main() {
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.style.deleteMany();

  await prisma.user.deleteMany();
  await prisma.style.createMany({
    data: styles.map(({ category, slug, ...style }) => ({
      ...style,
      subcategoryId: parseInt(style.subcategoryId, 10),
      category: StyleCategory[category.toLowerCase() as StyleCategory],
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
