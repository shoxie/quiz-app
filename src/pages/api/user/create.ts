// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return;
  const { body } = req;
  try {
    const data = await prisma.user.create({
      data: { ...body },
    });
    res.status(200).json(data);
  } catch (err) {
    console.log("err", err);
    res.status(500).send(err);
  }
}
