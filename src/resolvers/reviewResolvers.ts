import { FieldResolver } from "nexus";
import { prisma } from "../server";

export const postReviewResolver: FieldResolver<
  "Mutation",
  "postReview"
> = async (_, args, __) => {
  const { posterId, releaseId, title, description, rating } = args;

  const reviews = await prisma.review.findMany({
    where: { releaseId: releaseId },
  });
  const ratingCount = reviews.length + 1;
  const average =
    ((await reviews.reduce((acc, review) => {
      console.log(review.rating);
      return acc + review.rating;
    }, 0)) +
      rating) /
    (reviews.length + 1);

  try {
    const newReview = await prisma.review.create({
      data: {
        posterId,
        releaseId,
        title,
        description,
        rating,
        postDate: new Date().getTime().toString(),
      },
    });
    await prisma.release.update({
      where: { id: releaseId },
      data: { rating: average, ratingCount: ratingCount },
    });
    return newReview;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getAllReviewResolver: FieldResolver<
  "Query",
  "getAllReviews"
> = async (_, __, ___) => {
  return await prisma.review.findMany();
};

export const getReviewByIdResolver: FieldResolver<
  "Query",
  "getReviewById"
> = async (_, args, __) => {
  const { id } = args;
  try {
    return await prisma.review.findFirstOrThrow({ where: { id: id } });
  } catch (ex: any) {
    return;
  }
};

export const getReleaseReviewsResolver: FieldResolver<
  "Query",
  "getReleaseReviews"
> = async (_, args, __) => {
  const { id } = args;
  try {
    return await prisma.review.findMany({ where: { releaseId: id } });
  } catch (ex: any) {
    return;
  }
};

export const deleteReviewResolver: FieldResolver<
  "Mutation",
  "deleteReview"
> = async (_, args, __) => {
  const { id } = args;
  try {
    await prisma.review.delete({ where: { id: id } });
  } catch (ex: any) {
    console.error(ex.Message);
  }
};

export const updateReviewResolver: FieldResolver<
  "Mutation",
  "updateReviewById"
> = async (_, args, __) => {
  const { id, title, description, rating } = args;
  try {
    await prisma.review.update({
      where: { id: id },
      data: {
        title,
        description,
        rating,
      },
    });
  } catch (ex: any) {
    console.error(ex.Message);
  }
};
