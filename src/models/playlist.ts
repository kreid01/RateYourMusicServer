import {
  deletePlaylistResolver,
  getPlaylistByIdResolver,
  getUsersPlaylistsResolver,
  postPlaylistResolver,
} from "./../resolvers/playlistResolver";
import { extendType, intArg, list, nonNull, stringArg } from "nexus";
import { objectType } from "nexus";

export const playlist = objectType({
  name: "playlist",
  definition(t) {
    t.int("id");
    t.int("posterId");
    t.list.int("contentIds");
    t.string("title");
  },
});

export const postPlaylist = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("postPlaylist", {
      type: playlist,
      args: {
        posterId: nonNull(intArg()),
        contentIds: list(nonNull(intArg())),
        title: nonNull(stringArg()),
      },
      resolve: postPlaylistResolver,
    });
  },
});

export const getUsersPlaylists = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getUserPlaylists", {
      type: list(playlist),
      args: { id: nonNull(intArg()) },
      resolve: getUsersPlaylistsResolver,
    });
  },
});

export const getPlaylistById = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getPlaylistById", {
      type: playlist,
      args: { id: nonNull(intArg()) },
      resolve: getPlaylistByIdResolver,
    });
  },
});

export const deletePlaylist = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("deletePlaylist", {
      args: { id: nonNull(intArg()) },
      type: playlist,
      resolve: deletePlaylistResolver,
    });
  },
});
export * from "./playlist";
