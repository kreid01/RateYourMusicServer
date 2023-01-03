import {
  booleanArg,
  extendType,
  intArg,
  list,
  nonNull,
  stringArg,
} from "nexus";
import { objectType } from "nexus";
import {
  deleteChannelResolver,
  getAllChannelsResolver,
  getChannelByIdResolver,
  postChannelResolver,
  updateChannelResolver,
} from "../resolvers/channelResolver";

export const channel = objectType({
  name: "channel",
  definition(t) {
    t.int("id");
    t.string("title");
    t.int("releaseId");
  },
});

export const postChannel = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("postChannel", {
      type: channel,
      args: {
        title: nonNull(stringArg()),
        releaseId: nonNull(intArg()),
      },
      resolve: postChannelResolver,
    });
  },
});

export const getAllChannels = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getAllChannels", {
      type: list(channel),
      resolve: getAllChannelsResolver,
    });
  },
});

export const getChannelById = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getChannelById", {
      type: channel,
      args: { id: nonNull(intArg()) },
      resolve: getChannelByIdResolver,
    });
  },
});

export const updateChannel = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("updateChannel", {
      type: channel,
      args: {
        open: nonNull(list(booleanArg())),
      },
      resolve: updateChannelResolver,
    });
  },
});

export const deleteChannel = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("deleteChannel", { type: channel, resolve: deleteChannelResolver });
  },
});
export * from "./channel";
