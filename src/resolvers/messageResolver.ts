import { FieldResolver } from "nexus";
import { prisma } from "../server";
import { isAuth } from "../utils/auth";

export const postMessageResolver: FieldResolver<
  "Mutation",
  "postMessage"
> = async (_, args, { req }) => {
  const { channelId, posterId, content } = args;

  const auth = isAuth(req);

  if (auth) {
    try {
      const newMessage = await prisma.message.create({
        data: {
          channelId,
          posterId,
          content,
          postDate: new Date(Date.now()).toString(),
        },
      });
      return newMessage;
    } catch (err) {
      console.log(err);
      return false;
    }
  } else {
    return false;
  }
};

export const getChatMessagesResolver: FieldResolver<
  "Query",
  "getChatMessages"
> = async (_, args, ___) => {
  const { id } = args;
  return await prisma.message.findMany({ where: { channelId: id } });
};

export const getMessageByIdResolver: FieldResolver<
  "Query",
  "getMessageById"
> = async (_, args, __) => {
  const { id } = args;
  try {
    return await prisma.message.findFirstOrThrow({ where: { id: id } });
  } catch (ex: any) {
    return;
  }
};

export const deleteMessageResolver: FieldResolver<
  "Mutation",
  "deleteMessage"
> = async (_, args, { req }) => {
  const { id } = args;

  const auth = isAuth(req);
  console.log(auth);
  if (auth) {
    try {
      await prisma.message.delete({ where: { id: id } });
    } catch (err: any) {
      console.error(err.Message);
    }
  } else {
    return false;
  }
};
