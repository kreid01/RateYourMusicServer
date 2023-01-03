import {
  deleteMessageResolver,
  getChatMessagesResolver,
  getMessageByIdResolver,
  postMessageResolver,
} from "./../resolvers/messageResolver";
import { extendType, intArg, list, nonNull, stringArg } from "nexus";
import { objectType } from "nexus";

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

export const getMessageById = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getMessageById", {
      type: message,
      args: { id: nonNull(intArg()) },
      resolve: getMessageByIdResolver,
    });
  },
});

export const deleteMessage = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("deleteMessage", {
      args: { id: nonNull(intArg()) },
      type: message,
      resolve: deleteMessageResolver,
    });
  },
});
export * from "./message";
