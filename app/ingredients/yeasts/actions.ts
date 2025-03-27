"use server";
//import { Yeast, YeastFlocculation, YeastForm, YeastType } from "@prisma/client";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
//import { validateSchema } from "@/lib/validateSchema";
import slugify from "@/lib/slugify";
import { YeastSchema } from "@/schemas/yeastSchema";
//import { FieldValues } from "react-hook-form";
//import { YeastInput } from "@/types/Ingredient";

function parseYeast(data: YeastSchema) {
  const { tempRange, attenuationRange, ...rest } = data;
  return {
    ...rest,
    tempLow: tempRange?.min,
    tempHigh: tempRange?.max,
    attenuationLow: attenuationRange?.min,
    attenuationHigh: attenuationRange?.max,
    slug: slugify(rest.name, { lower: true }),
  };
}
export const createYeast = async (data: YeastSchema) => {
  //console.log(data);
  //const valid = validateSchema(formData, schema);
  //if (!valid.success) return Promise.resolve(valid);
  const yeastData = parseYeast(data);
  const res = await prisma.yeast.create({
    data: yeastData,
  });
  redirect(`/ingredients/yeasts/${res.slug}`);
};

export const updateYeast = async (data: YeastSchema) => {
  //const valid = validateSchema(formData, schema);
  //if (!valid.success) return Promise.resolve(valid);
  const yeastData = parseYeast(data);
  const res = await prisma.yeast.update({
    where: { id: data.id },
    data: yeastData,
  });
  redirect(`/ingredients/yeasts/${res.slug}`);
};
export const removeYeast = async (slug?: string) => {
  if (!slug) return;
  await prisma.yeast.delete({
    where: {
      slug,
    },
  });
  //console.log(res);
  redirect("/profiles/water");
  //revalidatePath(`/profiles/water/${src?.slug}/edit`);
};
