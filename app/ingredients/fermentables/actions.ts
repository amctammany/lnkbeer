"use server";
//import { FermentableUsage } from "@prisma/client";
import { prisma } from "@/lib/client";
import slugify from "@/lib/slugify";
import { FermentableInput } from "@/types/ingredient";
import { redirect } from "next/navigation";

export const createFermentable = async (data: FermentableInput) => {
  //const valid = validateSchema(formData, schema);
  //if (!valid.success) return valid;
  //const { data } = valid;
  const res = await prisma.fermentable.create({
    data: {
      ...data,
      slug: slugify(data.name, { lower: true }),
    },
  });
  redirect(`/ingredients/fermentables/${res.slug}`);
};

export const updateFermentable = async (data: FermentableInput) => {
  //const valid = validateSchema(formData, schema);
  //if (!valid.success) return { ...valid, data: undefined };
  //const { data } = valid;
  const res = await prisma.fermentable.update({
    where: { id: data.id },
    data: {
      ...data,
      slug: slugify(data.name, { lower: true }),
    },
  });
  redirect(`/ingredients/fermentables/${res.slug}`);
};
