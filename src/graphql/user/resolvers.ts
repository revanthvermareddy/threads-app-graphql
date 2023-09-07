import { prismaClient } from "../../lib/db";
import UserService, {
  CreateUserPayload,
  GetUserTokenPayload,
} from "../../services/user";

const queries = {
  getUserById: async (_: any, { id }: { id: string }) => {
    const user = await UserService.getUserById(id);
    return user;
  },
  getUserToken: async (_: any, payload: GetUserTokenPayload) => {
    const token = await UserService.getUserToken(payload);
    return token;
  },
  getCurrentLoggedInUser: async (_: any, parameters: any, context: any) => {
    if (context && context.user) {
      const id = context.user.id;
      const user = await UserService.getUserById(id);
      return user;
    }
    throw new Error("I don't know who you are");
  },
};

const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const newUser = await UserService.createUser(payload);
    return newUser.id;
  },
};

export const resolvers = { queries, mutations };
