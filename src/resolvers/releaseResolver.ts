import { FieldResolver } from "nexus";
import { prisma } from "../server";

export const postReleaseResolver: FieldResolver<
  "Mutation",
  "postRelease"
> = async (_, args, __) => {
  const { cover, artistId, type, title, language, tracks, genres, recorded } =
    args;
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
        recorded,
      },
    });
    return newRelease;
  } catch (err) {
    console.log(err);
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
  console.log("run");
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
    recorded,
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
        recorded,
      },
    });
  } catch (ex: any) {
    console.error(ex.Message);
  }
};
