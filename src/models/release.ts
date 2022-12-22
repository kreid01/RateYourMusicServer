import { extendType, intArg, list, nonNull, stringArg } from "nexus";
import { objectType } from "nexus";
import {
  deleteReleaseResolver,
  getAllReleasesResolver,
  getReleaseByIdResolver,
  postReleaseResolver,
  updateReleaseResolver,
} from "../resolvers/releaseResolver";

export const release = objectType({
  name: "release",
  definition(t) {
    t.int("id");
    t.string("type");
    t.int("artistId");
    t.string("title");
    t.string("recorded");
    t.int("ratingCount");
    t.int("rating");
    t.string("language");
    t.string("recorded");
    t.list.string("genres");
    t.list.string("tracks");
    t.string("cover");
  },
});

export const postRelease = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("postRelease", {
      type: release,
      args: {
        artistId: nonNull(intArg()),
        type: nonNull(stringArg()),
        title: nonNull(stringArg()),
        recorded: nonNull(stringArg()),
        language: nonNull(stringArg()),
        genres: nonNull(list(stringArg())),
        tracks: nonNull(list(stringArg())),
        cover: nonNull(stringArg()),
      },
      resolve: postReleaseResolver,
    });
  },
});

export const getAllReleases = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getAllReleases", {
      type: list(release),
      resolve: getAllReleasesResolver,
    });
  },
});

export const getReleasebyId = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getReleaseById", {
      type: release,
      args: { id: nonNull(intArg()) },
      resolve: getReleaseByIdResolver,
    });
  },
});

export const deleteRelease = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("deleteRelease", {
      type: release,
      resolve: deleteReleaseResolver,
    });
  },
});

export const updateRelease = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("updateRelease", {
      type: release,
      args: {
        id: nonNull(intArg()),
        ratingCount: nonNull(intArg()),
        rating: nonNull(intArg()),
        type: nonNull(stringArg()),
        title: nonNull(stringArg()),
        recorded: nonNull(stringArg()),
        language: nonNull(stringArg()),
        genres: nonNull(list(stringArg())),
        tracks: nonNull(list(stringArg())),
        cover: nonNull(stringArg()),
      },
      resolve: updateReleaseResolver,
    });
  },
});

export * from "./release";
