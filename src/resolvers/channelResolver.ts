import { FieldResolver } from "nexus";
import { prisma } from "../server";

export const postChannelResolver: FieldResolver<
  "Mutation",
  "postChannel"
> = async (_, args, __) => {
  const { title, releaseId } = args;

  try {
    const newChannel = await prisma.channel.create({
      data: {
        title,
        releaseId,
        open: true,
      },
    });
    return newChannel;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getAllChannelsResolver: FieldResolver<
  "Query",
  "getAllChannels"
> = async (_, __, ___) => {
  return await prisma.channel.findMany();
};

export const getChannelByIdResolver: FieldResolver<
  "Query",
  "getChannelById"
> = async (_, args, __) => {
  const { id } = args;
  try {
    return await prisma.channel.findFirstOrThrow({ where: { id: id } });
  } catch (ex: any) {
    return;
  }
};

export const deleteChannelResolver: FieldResolver<
  "Mutation",
  "deleteChannel"
> = async (_, args, __) => {
  const { id } = args;
  try {
    await prisma.channel.delete({ where: { id: id } });
  } catch (ex: any) {
    console.error(ex.Message);
  }
};

export const updateChannelResolver: FieldResolver<
  "Mutation",
  "updateChannelById"
> = async (_, args, __) => {
  const { id, open } = args;
  try {
    await prisma.channel.update({
      where: { id: id },
      data: { open: open },
    });
  } catch (err: any) {
    console.error(err.Message);
  }
};
