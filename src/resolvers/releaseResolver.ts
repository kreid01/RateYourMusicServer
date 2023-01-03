import { FieldResolver } from "nexus";
import { prisma } from "../server";
import { isAuth } from "../utils/auth";

export const postReleaseResolver: FieldResolver<
  "Mutation",
  "postRelease"
> = async (_, args, { req, res }) => {
  const { cover, artistId, type, title, language, tracks, genres, released } =
    args;

  const auth = isAuth(req);
  if (auth) {
    try {
      const newRelease = await prisma.release.create({
        data: {
          artistId,
          type,
          title,
          rating: 0,
          ratingCount: 0,
          language,
          genres,
          tracks,
          cover,
          released,
        },
      });
      return newRelease;
    } catch (err) {
      console.log(err);
      return false;
    }
  } else {
    return false;
  }
};

export const getAllReleasesResolver: FieldResolver<
  "Query",
  "getAllReleases"
> = async (_, __, ___) => {
  return await prisma.release.findMany();
};

export const getReleaseByIdResolver: FieldResolver<
  "Query",
  "getReleaseById"
> = async (_, args, __) => {
  const { id } = args;
  try {
    return await prisma.release.findFirstOrThrow({ where: { id: id } });
  } catch (ex: any) {
    return;
  }
};

export const deleteReleaseResolver: FieldResolver<
  "Mutation",
  "deleteRelease"
> = async (_, args, __) => {
  const { id } = args;
  try {
    await prisma.release.delete({ where: { id: id } });
  } catch (ex: any) {
    console.error(ex.Message);
  }
};

export const searchReleasesResolver: FieldResolver<
  "Query",
  "searchReleases"
> = async (_, args, __) => {
  const { search } = args;
  try {
    const releases = await prisma.release.findMany();
    return await releases
      .filter((release) =>
        release.title.toLowerCase().includes(search.toLowerCase())
      )
      .splice(0, 5);
  } catch (err: any) {
    console.log(err);
  }
};

export const updateReleaseResolver: FieldResolver<
  "Mutation",
  "updateReviewById"
> = async (_, args, __) => {
  const {
    id,
    rating,
    ratingCount,
    type,
    title,
    language,
    genres,
    tracks,
    cover,
    released,
  } = args;
  try {
    await prisma.release.update({
      where: { id: id },
      data: {
        rating,
        ratingCount,
        type,
        title,
        language,
        genres,
        tracks,
        cover,
        released,
      },
    });
  } catch (ex: any) {
    console.error(ex.Message);
  }
};
