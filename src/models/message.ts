import {
  deleteMessageResolver,
  getChatMessagesResolver,
  getMessageByIdResolver,
  postMessageResolver,
} from "./../resolvers/messageResolver";
import {
  extendType,
  intArg,
  list,
  nonNull,
  stringArg,
  subscriptionField,
} from "nexus";
import { objectType } from "nexus";
import { prisma } from "../server";

export const message = objectType({
  name: "message",
  definition(t) {
    t.int("id");
    t.int("channelId");
    t.int("posterId");
    t.string("content");
    t.string("postDate");
  },
});

export const newMessageSubscription = subscriptionField("newMessage", {
  type: "message",
  args: {
    channelId: nonNull(
      intArg({
        description: "Id of the channel",
      })
    ),
  },
  description: "Fires anytime a new message is posted for a particular chat",
  subscribe: async (_, { channelId }, context) => {
    return context.prisma.$subscribe
      .message({
        mutation_in: "CREATED",
        node: { channel: { id: channelId } },
      })
      .node();
  },
  resolve: (payload) => payload,
});

export const postmessage = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("postMessage", {
      type: message,
      args: {
        channelId: nonNull(intArg()),
        posterId: nonNull(intArg()),
        content: nonNull(stringArg()),
      },
      resolve: postMessageResolver,
    });
  },
});

export const getChatmessages = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getChatMessages", {
      type: list(message),
      args: { id: nonNull(intArg()) },
      resolve: getChatMessagesResolver,
    });
  },
});

export const getmessageById = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getmessageById", {
      type: message,
      args: { id: nonNull(intArg()) },
      resolve: getMessageByIdResolver,
    });
  },
});

export const deletemessage = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("deletemessage", { type: message, resolve: deleteMessageResolver });
  },
});
export * from "./message";
