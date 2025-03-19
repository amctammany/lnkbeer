"use server";
import { prisma } from "@/lib/client";
import slugify from "@/lib/slugify";
import { validateSchema } from "@/lib/validateSchema";
import { HopNoteSchema, HopSchema, parseHop } from "@/schemas/hopSchema";
import { HopInput } from "@/types/ingredient";
import { HopUsage } from "@prisma/client";
import { connect, sensitiveHeaders } from "http2";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";

const removeSchema = zfd.formData({
  id: zfd.text(),
});
export async function removeHop(formData: FormData) {
  const { id } = removeSchema.parse(formData);
  await prisma.hop.delete({
    where: { id },
  });
  redirect("/recipes");
}
export const createHopNote = async (data: HopNoteSchema) => {
  //const valid = validateSchema(formData, noteSchema);
  //console.log(valid);
  //if (!valid.success) return valid;
  //const f = validateSchema(formData, schema);
  //const d = schema.parse(formData);
  const { id, userEmail, hopId, slug, sensoryPanel } = data;
  const panel = await prisma.hopSensoryPanel.create({
    data: {
      user: { connect: { email: userEmail } },
      aromas: {
        connect: (sensoryPanel.aromaIds ?? []).map((id) => ({ id })), // [{id}]//{ id: { in: sensoryPanel.aromas.map(({ id }) => id) } },
      },
      hop: { connect: { slug } },
      ...Object.keys(sensoryPanel).reduce((acc, k) => {
        if (k === "aromaIds") return acc;
        if (k === "id") return acc;
        acc[k] = sensoryPanel[k] / 10;
        return acc;
      }, {}),
    },
  });
  //const data = parseHop(hop);
  const res = await prisma.hopNote.create({
    data: {
      userEmail,
      hopId,
      slug,
      sensoryPanelId: panel.id,
      //hop: { connect: { id: hopId } },
      //sensoryPanel: {
      //connect: { id: panel.id },
      //},
    },
    include: {
      sensoryPanel: { include: { aromas: true } },
      hop: true,
    },
  });
  redirect(`/ingredients/hops/${res.hop.slug}/sensory`);
};
export const updateHopNote = async (data: HopNoteSchema) => {
  //const valid = validateSchema(formData, noteSchema);
  //if (!valid.success) return valid;
  //console.log(valid.data);
  const { id, uid, sensoryPanel, slug, userEmail, ...rest } = data;
  if (!sensoryPanel.id) return;
  const es = await prisma.hopSensoryPanel.update({
    where: { id: sensoryPanel?.id },
    include: { user: true },
    data: {
      ...rest,
      slug,
      userEmail,
      aromas: {
        connect: (sensoryPanel.aromaIds ?? []).map((id) => ({ id })), // [{id}]//{ id: { in: sensoryPanel.aromas.map(({ id }) => id) } },
      },

      //user: { connect: { email: userEmail } },
      //...sensoryPanel,
      ...Object.keys(sensoryPanel).reduce((acc, k) => {
        if (typeof sensoryPanel[k] === "string") {
          acc[k] = sensoryPanel[k];
          return acc;
        }
        if (k === "notes") {
          acc.notes = sensoryPanel.notes;
          return acc;
        }
        if (k === "aromaIds") return acc;
        if (k === "id") return acc;
        acc[k] = sensoryPanel[k] / 10;
        return acc;
      }, {} as any),
    },
  });
  console.log(es);
  const res = await prisma.hopNote.update({
    where: { id: { hopId: data.hopId, userEmail } },
    data: {
      ...rest,
      sensoryPanel: {
        connect: { id: es.id },
        //update: { where: { id: sensoryPanel?.id }, data: sensoryPanel },
      },
    },
    include: {
      hop: { select: { slug: true } },
      sensoryPanel: { include: { aromas: true } },
    },
  });
  redirect(`/ingredients/hops/${res.hop.slug}/sensory`);
};
export const createHop = async (data: HopSchema) => {
  //const valid = validateSchema(formData, schema);
  //if (!valid.success) return valid;
  //const f = validateSchema(formData, schema);
  //const d = schema.parse(formData);
  //const hop = data;
  const hop = parseHop(data);
  const res = await prisma.hop.create({
    data: hop,
  });
  redirect(`/ingredients/hops/${res.slug}`);
};
export const updateHop = async (data: HopSchema) => {
  //const valid = validateSchema(formData, schema);
  //if (!valid.success) return valid;
  //const hop = valid.data;
  const hop = parseHop(data);
  const res = await prisma.hop.update({
    where: { id: data.id },
    data: hop,
  });
  redirect(`/ingredients/hops/${res.slug}`);
};
