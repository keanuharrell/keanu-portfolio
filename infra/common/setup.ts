import { neon } from "../main/neon";
import { redis } from "../main/redis";
import { secrets } from "./secrets";

new sst.x.DevCommand("GenerateAuthSchemas", {
  dev: {
    command: "bun better-auth:generate",
    directory: "packages/portfolio",
    autostart: false,
  },
  link: [
    neon.neonLink,
    redis,
    secrets.googleClientId,
    secrets.googleClientSecret,
    secrets.betterAuthSecret,
  ],
});

new sst.x.DevCommand("GenerateDatabase", {
  dev: {
    command: "bun run db:generate",
    directory: "packages/portfolio",
    autostart: false,
  },
  link: [neon.neonLink],
});

new sst.x.DevCommand("MigrateDatabase", {
  dev: {
    command: "bun run db:migrate",
    directory: "packages/portfolio",
    autostart: false,
  },
  link: [neon.neonLink],
});

if (!$dev) {
  const migrator = new sst.aws.Function("DatabaseMigration", {
    handler: "packages/functions/src/db/migrate.handler",
    timeout: "5 minutes",
    link: [neon.neonLink, secrets.betterAuthSecret],
    copyFiles: [
      {
        from: "packages/portfolio/migrations",
        to: "migrations",
      },
    ],
  });

  new aws.lambda.Invocation("DatabaseMigratorInvocation", {
    input: Date.now().toString(),
    functionName: migrator.name,
  });
}
