import { db } from "@/server/lib/drizzle/db";
import * as schema from "@/server/lib/drizzle/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { magicLink } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),
  emailAndPassword: { enabled: false },
  disabledPaths: ["/sign-up/email", "/sign-in/email", "/forget-password", "/reset-password"],
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        console.log(`[magic-link] to: ${email}\n${url}`);
      },
    }),
    nextCookies(),
  ],
});
