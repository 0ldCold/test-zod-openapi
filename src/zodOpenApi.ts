import {
  OpenAPIRegistry,
  OpenAPIGenerator,
  extendZodWithOpenApi
} from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);
export const registry = new OpenAPIRegistry();

// Register definitions here

export const generator = new OpenAPIGenerator(registry.definitions, "3.0.0");

const $User = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email()
});
const UserSchema = registry.register("User", $User);

registry.registerPath({
  method: "get",
  path: "/users/{id}",
  request: {
    params: z.object({
      id: z.string().openapi({ example: "1212121" })
    })
  },
  responses: {
    200: {
      description: "User data",
      content: {
        "application/json": {
          schema: UserSchema
        }
      }
    }
  }
});
