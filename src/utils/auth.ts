import { Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { user } from "@prisma/client";
import "dotenv/config";

export interface MyContext {
  req: Request;
  res: Response;
  payload?: { userId: string };
}

export const isAuth = (req: any) => {
  const authorization = req.headers["authorization"];

  if (!authorization) {
    throw new Error("not authenticated");
  }

  try {
    const token = authorization.split(" ")[1];
    if (verify(token, process.env.ACCESS_TOKEN_SECRET!)) return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const createAccessToken = (user: user) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (user: user) => {
  return sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
};
