import { FieldResolver } from "nexus";
import { prisma } from "../server";
import { isAuth } from "../utils/auth";

export const postPlaylistResolver: FieldResolver<
  "Mutation",
  "postPlaylist"
> = async (_, args, { req }) => {
  const { title, posterId, contentIds } = args;

  const auth = isAuth(req);
  if (auth) {
    try {
      const newPlaylist = await prisma.playlist.create({
        data: {
          title,
          posterId,
          contentIds,
        },
      });
      return newPlaylist;
    } catch (err) {
      console.log(err);
      return false;
    }
  } else {
    return false;
  }
};

export const getUsersPlaylistsResolver: FieldResolver<
  "Query",
  "getUsersPlaylists"
> = async (_, args, ___) => {
  const { id } = args;
  return await prisma.playlist.findMany({ where: { id: id } });
};

export const getPlaylistByIdResolver: FieldResolver<
  "Query",
  "getPlaylistById"
> = async (_, args, __) => {
  const { id } = args;
  try {
    return await prisma.playlist.findFirstOrThrow({ where: { id: id } });
  } catch (ex: any) {
    return;
  }
};

export const deletePlaylistResolver: FieldResolver<
  "Mutation",
  "deletePlaylist"
> = async (_, args, { req }) => {
  const { id } = args;

  const auth = isAuth(req);
  console.log(auth);
  if (auth) {
    try {
      await prisma.playlist.delete({ where: { id: id } });
    } catch (err: any) {
      console.error(err.playlist);
    }
  } else {
    return false;
  }
};
