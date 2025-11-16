import { defineConfig } from "drizzle-kit";
import { Resource } from "sst";

export default defineConfig({
  schema: ["./src/lib/schemas/auth.ts"],
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: Resource.NeonDatabaseUrl.url,
  },
  // schemaFilter: ["auth", "calendar", "chef", "link"],
  verbose: true,
  strict: true,
});
