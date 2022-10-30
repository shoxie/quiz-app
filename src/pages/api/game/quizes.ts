// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return;
  try {
    const data = await prisma.game.findMany({
      include: {
        _count: {
          select: { quizes: true },
        },
        category: {
          select: {
            title: true
          }
        }
      },
    });
    res.status(200).json(data);
  } catch (err) {
    console.log("err", err);
    res.status(500).send(err);
  }
}
