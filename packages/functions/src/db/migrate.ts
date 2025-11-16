import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { neon } from "@neondatabase/serverless";
import { Resource } from "sst";

export async function runMigrations() {
  console.log("Starting database migrations...");

  const sql = neon(Resource.NeonDatabaseUrl.url);
  const db = drizzle(sql);

  try {
    await migrate(db, { migrationsFolder: "./migrations" });
    console.log("✅ Migrations completed successfully");
    return { success: true };
  } catch (error) {
    console.error("❌ Migration failed:", error);
    throw error;
  }
}

// Handler pour Lambda
export const handler = async () => {
  try {
    await runMigrations();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Migrations completed successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Migration failed",
        error: error instanceof Error ? error.message : String(error),
      }),
    };
  }
};
