import {
  registerResolver,
  getUsersResolver,
  loginResolver,
  getUserResolver,
} from "../resolvers/userResolvers";
import { extendType, intArg, list, nonNull, stringArg } from "nexus";
import { objectType } from "nexus";
import {
  deleteArtistResolver,
  getAllArtistsResolver,
  getArtistByIdResolver,
  postArtistResolver,
  searchArtistsResolver,
  updateArtistResolver,
} from "../resolvers/artistResolver";

export const artist = objectType({
  name: "artist",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("born");
    t.list.string("relatedArtists");
    t.list.string("genres");
    t.string("type");
  },
});

export const postArtist = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("postArtist", {
      type: artist,
      args: {
        name: nonNull(stringArg()),
        born: nonNull(stringArg()),
        relatedArtists: nonNull(list(stringArg())),
        genres: nonNull(list(stringArg())),
        type: nonNull(stringArg()),
      },
      resolve: postArtistResolver,
    });
  },
});

export const getAllArtists = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getAllArtists", {
      type: list(artist),
      resolve: getAllArtistsResolver,
    });
  },
});

export const getArtistById = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getArtistById", {
      type: artist,
      args: { id: nonNull(intArg()) },
      resolve: getArtistByIdResolver,
    });
  },
});

export const searchArtists = extendType({
  type: "Query",
  definition: (t) => {
    t.field("searchArtists", {
      type: list(artist),
      args: { search: nonNull(stringArg()) },
      resolve: searchArtistsResolver,
    });
  },
});

export const updateArtist = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("updateArtist", {
      type: artist,
      args: {
        name: nonNull(stringArg()),
        relatedArtists: nonNull(list(stringArg())),
        genres: nonNull(list(stringArg())),
      },
      resolve: updateArtistResolver,
    });
  },
});

export const deleteArtist = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("deleteArtist", { type: artist, resolve: deleteArtistResolver });
  },
});
export * from "./user";
