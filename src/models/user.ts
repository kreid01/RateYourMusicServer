import {
  registerResolver,
  getUsersResolver,
  loginResolver,
  getUserResolver,
  deleteUserResolver,
  getUserByIdResolver,
} from "../resolvers/userResolvers";
import { extendType, intArg, list, nonNull, stringArg } from "nexus";
import { objectType } from "nexus";

export const user = objectType({
  name: "user",
  definition(t) {
    t.int("id");
    t.string("username");
    t.string("email");
    t.string("password");
  },
});

export const LoginResponse = objectType({
  name: "LoginResponse",
  definition(t) {
    t.string("accessToken");
    t.string("refreshToken");
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

export const getUserById = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getUserById", {
      args: { id: nonNull(intArg()) },
      type: user,
      resolve: getUserByIdResolver,
    });
  },
});

export const deleteUser = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("deleteUser", { type: user, resolve: deleteUserResolver });
  },
});

export * from "./user";
