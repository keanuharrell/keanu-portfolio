import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as authSchema from "./schemas/auth";
import { Resource } from "sst";

const schema = {
  ...authSchema,
};

const sql = neon(Resource.NeonDatabaseUrl.url);

export const db = drizzle({ client: sql, schema });
