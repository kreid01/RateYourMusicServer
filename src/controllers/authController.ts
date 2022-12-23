import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";
import { createAccessToken, createRefreshToken } from "./../utils/auth";
import express from "express";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (req: any, res: any) => {
  const { token } = req.body;

  if (!token) {
    return res.send({ ok: false, accessToken: "", refreshToken: "" });
  }
  let payload: any = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
  } catch (err) {
    console.log(err);
    return res.send({ ok: false, accessToken: "", refreshToken: "" });
  }

  const user = await prisma.user.findFirst({ where: { id: payload.userId } });

  if (!user) {
    return res.send({ ok: false, accessToken: "", refreshToken: "" });
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ ok: false, accessToken: "", refreshToken: "" });
  }

  return res.send({
    ok: true,
    accessToken: createAccessToken(user),
    refreshToken: createRefreshToken(user),
  });
});

export const authController = router;
