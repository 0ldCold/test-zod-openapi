import { Zodios, makeErrors, makeApi, makeEndpoint, mergeApis, makeCrudApi } from "@zodios/core";
import z from "zod";

const errors = makeErrors([
  {
    status: "default",
    schema: z.object({
      error: z.object({
        code: z.number(),
        message: z.string()
      })
    })
  }
]);

const user = z.object({
  id: z.number(),
  name: z.string(),
  age: z.number().positive(),
  email: z.string().email()
});

const indexUsers = makeEndpoint({
  method: "get",
  path: "/users",
  alias: "getUsers",
  response: z.array(user)
});

const usersApi = makeApi([
  indexUsers,
  {
    method: "get",
    path: "/users/:id",
    alias: "getUser",
    response: user,
    errors
  },
  {
    method: "post",
    path: "/users",
    alias: "createUser",
    parameters: [
      {
        name: "user",
        type: "Body",
        schema: user.omit({ id: true })
      }
    ],
    response: user,
    errors
  }
]);

const api = mergeApis({
  "/users": usersApi
});

const apiClient = new Zodios("/api", api, {
  validate: "none"
});

const apiRun = async () => {
  // get all users
  const users = await apiClient.getUsers();
  // get user by id
  const user = await apiClient.getUser({ params: { id: 1 } });
  // create user
  const newUser = await apiClient.createUser({ name: "", age: 20, email: "jodn@doe.com" });
};
