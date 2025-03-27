"use server";
import { prisma } from "@/lib/client";
import { HopNoteSchema, HopSchema, parseHop } from "@/schemas/hopSchema";
import { redirect } from "next/navigation";
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
  //const { id, userEmail, userId, hopId, slug, sensoryPanel } = data;
  const {
    //uid,
    sensoryPanel,
    //sensoryPanelId,
    //date,
    hopId,
    lot,
    batch,
    comments,
    year,
    producer,
    slug,
    userId,
    notes,
    userEmail,
    //...rest
  } = data;

  const panel = await prisma.hopSensoryPanel.create({
    data: {
      userId,
      notes,
      //userEmail,
      user: { connect: { email: userEmail } },
      aromas: {
        connect: (sensoryPanel.aromaIds ?? []).map((id) => ({ id })), // [{id}]//{ id: { in: sensoryPanel.aromas.map(({ id }) => id) } },
      },
      hop: { connect: { slug } },
      ...Object.keys(sensoryPanel).reduce((acc, k) => {
        if (k === "notes") {
          acc.notes = sensoryPanel.notes;
          return acc;
        }

        if (k === "aromaIds") return acc;
        if (k === "id") return acc;
        acc[k] = sensoryPanel[k] / 1;
        return acc;
      }, {} as any),
    },
  });
  //const data = parseHop(hop);
  const res = await prisma.hopNote.create({
    data: {
      userEmail,
      userId,
      hopId,
      slug,
      comments,
      lot,
      year,
      batch,
      producer,
      sensoryPanelId: panel.id,
      //hop: { connect: { slug } },
      //sensoryPanel: {
      //create: { userId, hop: { connect: { slug } } },
      //connect: { id: panel.id },
      //},
    },
    include: {
      sensoryPanel: true,
      hop: true,
    },
  });
  //redirect(`/ingredients/hops/${res.hop.slug}/sensory`);
  redirect(`/admin/sensory/hops/${res.hop.slug}`);
};
export const updateHopNote = async (data: HopNoteSchema) => {
  //const valid = validateSchema(formData, noteSchema);
  //if (!valid.success) return valid;
  //console.log(valid.data);
  const {
    uid,
    sensoryPanel,
    sensoryPanelId,
    //date,
    lot,
    batch,
    comments,
    year,
    producer,
    slug,
    userId,
    userEmail,
    ...rest
  } = data;
  if (!sensoryPanel.id) return;
  const es = await prisma.hopSensoryPanel.update({
    where: { id: sensoryPanelId! },
    include: { user: true },
    data: {
      ...rest,
      slug,
      userId,
      userEmail,
      aromas: {
        connect: (sensoryPanel.aromaIds ?? []).map((id) => ({ id })), // [{id}]//{ id: { in: sensoryPanel.aromas.map(({ id }) => id) } },
      },

      //user: { connect: { email: userEmail } },
      //...sensoryPanel,
      ...Object.keys(sensoryPanel).reduce((acc, k) => {
        //if (typeof sensoryPanel[k] === "string") {
        //acc[k] = sensoryPanel[k];
        //return acc;
        //}
        if (k === "notes") {
          acc.notes = sensoryPanel.notes;
          return acc;
        }
        if (k === "aromaIds") return acc;
        if (k === "id") return acc;
        acc[k] = sensoryPanel[k] / 1;
        return acc;
      }, {} as any),
    },
  });
  const res = await prisma.hopNote.update({
    where: { uid },
    data: {
      ...rest,
      batch,
      lot,
      comments,
      year,
      producer,
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
  redirect(`/admin/sensory/hops/${res.hop.slug}`);
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
    where: { id: data.id! },
    data: hop,
  });
  redirect(`/ingredients/hops/${res.slug}`);
};
