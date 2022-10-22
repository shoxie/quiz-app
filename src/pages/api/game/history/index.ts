// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await prisma.gameHistory.findMany({
      include: {
        game: {
          select: {
            title: true,
            category: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json(data);
  } catch (err) {
    console.log("err", err);
    res.status(500).send(err);
  }
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { totalPoint, gameId, startDate } = req.body;
  try {
    const data = await prisma.gameHistory.create({
      data: {
        isFinished: true,
        totalPoint: totalPoint as any,
        gameId: gameId  as any,
        startDate: startDate as any,
      },
    });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      GET(req, res);
      break;
    case "POST":
      POST(req, res);
      break;
  }
  if (req.method !== "GET") return;
}
