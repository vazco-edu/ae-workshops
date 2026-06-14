import { os } from "@orpc/server";
import { z } from "zod";

const inputSchema = z.object({}).default({});
const outputSchema = z.object({ status: z.literal("ok") });

export const healthCheck = os
  .input(inputSchema)
  .output(outputSchema)
  .handler(() => {
    return { status: "ok" };
  });
