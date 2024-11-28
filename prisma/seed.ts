import { prisma } from "../lib/client";
async function main() {
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();

  await prisma.user.deleteMany();
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
