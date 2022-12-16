import {
  registerResolver,
  getUsersResolver,
  loginResolver,
  getUserResolver,
} from "../resolvers/userResolvers";
import { extendType, list, nonNull, stringArg } from "nexus";
import { objectType } from "nexus";

export const user = objectType({
  name: "user",
  definition(t) {
    t.int("id");
    t.string("username");
    t.string("email");
    t.string("password");
    t.int("tokenVersion");
  },
});

export const LoginResponse = objectType({
  name: "LoginResponse",
  definition(t) {
    t.string("accessToken");
    user;
  },
});

export const register = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("register", {
      type: user,
      args: {
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: registerResolver,
    });
  },
});

export const getUsers = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getUsers", { type: list(user), resolve: getUsersResolver });
  },
});

export const login = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("login", {
      type: LoginResponse,
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: loginResolver,
    });
  },
});

export const getUser = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getUser", { type: user, resolve: getUserResolver });
  },
});

export * from "./user";
