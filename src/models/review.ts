import { extendType, intArg, list, nonNull, stringArg } from "nexus";
import { objectType } from "nexus";
import {
  getAllReviewResolver,
  getReviewByIdResolver,
  postReviewResolver,
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

export const register = extendType({
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

export const getUsers = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getReviews", {
      type: list(review),
      resolve: getAllReviewResolver,
    });
  },
});

export const getReview = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getReviewById", { type: review, resolve: getReviewByIdResolver });
  },
});

export * from "./review";
