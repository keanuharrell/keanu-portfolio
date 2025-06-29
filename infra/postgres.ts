import { vpc } from "./network";
import { isPermanent, isDev } from "./stage";

export const postgres = new sst.aws.Aurora("Postgres", {
  vpc,
  engine: "postgres",
  scaling: isPermanent
    ? undefined
    : {
        min: "0 ACU",
        max: "1 ACU",
      },
});

new sst.x.DevCommand("Studio", {
  link: [postgres],
  dev: {
    command: "bun pg studio",
    directory: "packages/core",
    autostart: true,
  },
});

const migrator = new sst.aws.Function("DatabaseMigrator", {
  handler: "packages/backend/src/function/migrator.handler",
  link: [postgres],
  vpc,
  copyFiles: [
    {
      from: "packages/core/migrations-pg",
      to: "./migrations-pg",
    },
  ],
});

if (!isDev) {
  new aws.lambda.Invocation("DatabaseMigratorInvocation", {
    input: Date.now().toString(),
    functionName: migrator.name,
  });
}
