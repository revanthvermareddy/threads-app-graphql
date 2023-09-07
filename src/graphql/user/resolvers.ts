import { prismaClient } from "../../lib/db";
import UserService, {
  CreateUserPayload,
  GetUserTokenPayload,
} from "../../services/user";

const queries = {
  getUserById: async (_: any, { id }: { id: string }) => {
    const user = await prismaClient.user.findFirstOrThrow({
      where: { id: id },
    });
    return user;
  },
  getUserToken: async (_: any, payload: GetUserTokenPayload) => {
    const token = await UserService.getUserToken(payload);
    return token;
  },
};

const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const newUser = await UserService.createUser(payload);
    return newUser.id;
  },
};

export const resolvers = { queries, mutations };
