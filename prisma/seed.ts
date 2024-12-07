import slugify from "slugify";
import {
  HopUsage,
  StyleCategory,
  YeastFlocculation,
  YeastForm,
  YeastType,
} from "@prisma/client";
import { prisma } from "../lib/client";
import styles from "../data/styles.json";
import hops from "../data/hops.json";
import grains from "../data/grains.json";
import yeasts from "../data/yeasts.json";
async function main() {
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.style.deleteMany();

  await prisma.user.deleteMany();
  await prisma.hopSensoryPanel.deleteMany();
  await prisma.hop.deleteMany();
  await prisma.fermentable.deleteMany();
  await prisma.yeast.deleteMany();
  await prisma.style.createMany({
    data: styles.map(({ category, ...style }) => ({
      ...style,
      subcategoryId: parseInt(style.subcategoryId, 10),
      category: StyleCategory[category.toLowerCase() as StyleCategory],
    })),
  });
  await prisma.yeast.createMany({
    data: yeasts.map(
      ({ type, form, flocculation, temp, attenuation, notes, ...yeast }) => ({
        ...yeast,
        type: YeastType[type as YeastType],
        flocculation:
          YeastFlocculation[
            flocculation?.replace(" ", "") as YeastFlocculation
          ],
        form: YeastForm[form as YeastForm],
        attenuation: attenuation / 100,
        attenuationLow: (attenuation - 2) / 100,
        attenuationHigh: (attenuation + 2) / 100,
        tempLow: temp[0],
        tempHigh: temp[1],
        notes: notes[0],
        usage: notes[1],
      }),
    ),
  });

  await prisma.hop.createMany({
    data: hops.map(({ aromas, usage, flavorMap, ...hop }: any) => ({
      flavor: aromas,
      ...hop,

      slug: slugify(hop.name, { lower: true }),
      usage: HopUsage[usage?.toLowerCase() as HopUsage] || HopUsage.dual,
    })),
  });
  await prisma.fermentable.createMany({
    data: grains.map((grain) => ({
      ...grain,
      slug: slugify(grain.name, { lower: true }),
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
