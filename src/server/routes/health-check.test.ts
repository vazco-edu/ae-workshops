import { healthCheck } from "@/server/routes/health-check";
import { createProcedureClient } from "@orpc/server";
import { describe, expect, it } from "vitest";

const callHealthCheck = createProcedureClient(healthCheck);

describe("healthCheck", () => {
  it("returns ok status", async () => {
    await expect(callHealthCheck({})).resolves.toEqual({ status: "ok" });
  });
});
