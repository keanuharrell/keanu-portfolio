import { betterAuth } from "better-auth";
import { Resource } from "sst";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { redis } from "./redis";

export const auth = betterAuth({
  secret: Resource.BetterAuthSecret.value,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  secondaryStorage: {
    get: async (key: string) => {
      await redis.get(key);
    },
    set: async (key: string, value: string, ttl?: number) => {
      if (!ttl) {
        await redis.set(key, value);
      } else {
        await redis.set(key, value, {
          ex: ttl,
        });
      }
    },
    delete: async (key: string) => {
      await redis.del(key);
    },
  },
  socialProviders: {
    google: {
      clientId: Resource.GoogleClientId.value,
      clientSecret: Resource.GoogleClientSecret.value,
    },
  },
});
