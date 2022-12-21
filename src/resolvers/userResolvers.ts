import { sendRefreshToken, createRefreshToken } from "../utils/auth";
import { compare, hash } from "bcryptjs";
import { verify } from "jsonwebtoken";
import { FieldResolver } from "nexus";
import { prisma } from "../server";
import { createAccessToken } from "../utils/auth";
import "dotenv/config";

export const registerResolver: FieldResolver<"Mutation", "register"> = async (
  _,
  args,
  __
) => {
  const { username, email, password } = args;
  const hashedPassword = await hash(password, 12);
  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    return newUser;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getUsersResolver: FieldResolver<"Query", "getUsers"> = async (
  _,
  __,
  ___
) => {
  return await prisma.user.findMany();
};

export const loginResolver: FieldResolver<"Mutation", "login"> = async (
  _,
  args,
  { res }
) => {
  const { email, password } = args;
  const user = await prisma.user.findFirstOrThrow({ where: { email } });

  if (!user) {
    return "could not find user";
  }

  const valid = await compare(password, user.password);

  if (!valid) {
    return "bad password";
  }
  sendRefreshToken(res, createRefreshToken(user));

  return {
    accessToken: createAccessToken(user),
  };
};

export const getUserResolver: FieldResolver<"Query", "getUser"> = async (
  _,
  __,
  { req }
) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return null;
  }

  try {
    const token = authorization.split(" ")[1];
    const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    return await prisma.user.findFirstOrThrow({
      where: { id: payload.userId },
    });
  } catch (err) {
    console.log(err);
    return null;
  }
};
