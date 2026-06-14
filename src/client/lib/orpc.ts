import { router } from "@/server/router";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createORPCReactQueryUtils } from "@orpc/react-query";
import type { RouterClient } from "@orpc/server";

const link = new RPCLink({
  url: `${typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"}/rpc`,
  headers: async () => {
    if (typeof window !== "undefined") return {};

    const { headers } = await import("next/headers");
    return await headers();
  },
});

export const orpcClient = createORPCClient<RouterClient<typeof router>>(link);

export const orpc = createORPCReactQueryUtils(orpcClient);
