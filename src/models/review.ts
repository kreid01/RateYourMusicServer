import { extendType, intArg, list, nonNull, stringArg } from "nexus";
import { objectType } from "nexus";
import {
  deleteReviewResolver,
  getAllReviewResolver,
  getReviewByIdResolver,
  postReviewResolver,
  updateReviewResolver,
} from "../resolvers/reviewResolvers";

export const review = objectType({
  name: "review",
  definition(t) {
    t.int("id");
    t.int("posterId");
    t.int("releaseId");
    t.string("postDate");
    t.string("title");
    t.string("description");
    t.int("rating");
  },
});

export const postReview = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("postReview", {
      type: review,
      args: {
        posterId: nonNull(intArg()),
        releaseId: nonNull(intArg()),
        title: nonNull(stringArg()),
        description: nonNull(stringArg()),
        rating: nonNull(intArg()),
      },
      resolve: postReviewResolver,
    });
  },
});

export const getAllReviews = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getReviews", {
      type: list(review),
      resolve: getAllReviewResolver,
    });
  },
});

export const getReviewById = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getReviewById", { type: review, resolve: getReviewByIdResolver });
  },
});

export const getReleaseReviews = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getReleaseReviews", {
      args: { id: nonNull(intArg()) },
      type: review,
      resolve: getReviewByIdResolver,
    });
  },
});

export const deleteReview = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("deleteReview", {
      type: review,
      resolve: deleteReviewResolver,
    });
  },
});

export const updateReview = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("updateReview", {
      type: review,
      args: {
        title: nonNull(stringArg()),
        description: nonNull(stringArg()),
        rating: nonNull(intArg()),
      },
      resolve: updateReviewResolver,
    });
  },
});

export * from "./review";
