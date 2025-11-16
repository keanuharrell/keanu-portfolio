import { neon } from "../main/neon";

export const _ = new sst.x.DevCommand("EmailDevCommand", {
  dev: {
    autostart: false,
    directory: "packages/email",
    command: "bun dev",
  },
});

export const _2 = new sst.x.DevCommand("StudioDrizzle", {
  dev: {
    autostart: false,
    command: "bun run db:studio",
    directory: "packages/db",
  },
  link: [neon.neonLink],
});
