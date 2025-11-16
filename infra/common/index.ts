export const startCommon = async () => {
  await import("./secrets");
  // await import("./dynamo");
  await import("./email");
  // await import("./router");
  await import("./dev");
  await import("./setup");
};
