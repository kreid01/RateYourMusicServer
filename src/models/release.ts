import { extendType, intArg, list, nonNull, stringArg } from "nexus";
import { objectType } from "nexus";
import {
  getAllReviewResolver,
  getReviewByIdResolver,
  postReviewResolver,
} from "../resolvers/reviewResolvers";

export const review = objectType({
  name: "release",
  definition(t) {
    t.int("id");
    t.string("type");
    t.int("artistId");
    t.string("title");
    t.string("recorded");
    t.int("ratingCount");
    t.int("rating");
    t.string("lanuage");
    t.list.string("genres");
    t.list.string("tracks");
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
