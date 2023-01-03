import { FieldResolver } from "nexus";
import { prisma } from "../server";
import { isAuth } from "../utils/auth";

export const postArtistResolver: FieldResolver<
  "Mutation",
  "postArtist"
> = async (_, args, { req }) => {
  const { name, born, relatedArtists, genres, type } = args;
  const auth = isAuth(req);
  if (auth) {
    try {
      const newArtist = await prisma.artist.create({
        data: {
          name,
          born,
          relatedArtists,
          genres,
          type,
        },
      });
      return newArtist;
    } catch (err) {
      console.log(err);
      return false;
    }
  } else {
    return false;
  }
};

export const getAllArtistsResolver: FieldResolver<
  "Query",
  "getAllArtists"
> = async (_, __, ___) => {
  return await prisma.artist.findMany();
};

export const getArtistByIdResolver: FieldResolver<
  "Query",
  "getArtistById"
> = async (_, args, __) => {
  const { id } = args;
  try {
    return await prisma.artist.findFirstOrThrow({ where: { id: id } });
  } catch (ex: any) {
    return;
  }
};

export const searchArtistsResolver: FieldResolver<
  "Query",
  "searchArtists"
> = async (_, args, __) => {
  const { search } = args;
  try {
    const artists = await prisma.artist.findMany();
    return await artists
      .filter((artist) =>
        artist.name.toLowerCase().includes(search.toLowerCase())
      )
      .splice(0, 5);
  } catch (err: any) {
    console.log(err);
  }
};

export const deleteArtistResolver: FieldResolver<
  "Mutation",
  "deleteArtist"
> = async (_, args, __) => {
  const { id } = args;
  try {
    await prisma.artist.delete({ where: { id: id } });
  } catch (ex: any) {
    console.error(ex.Message);
  }
};

export const updateArtistResolver: FieldResolver<
  "Mutation",
  "updateArtistById"
> = async (_, args, __) => {
  const { id, name, relatedArtists, genres } = args;
  try {
    await prisma.artist.update({
      where: { id: id },
      data: {
        name,
        relatedArtists,
        genres,
      },
    });
  } catch (ex: any) {
    console.error(ex.Message);
  }
};
