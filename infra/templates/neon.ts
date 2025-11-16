import { secrets } from "../common/secrets";

export const createOrGetNeonBranch = () => {
  let endpoint: neon.Endpoint;
  if ($app.stage === "production") {
    endpoint = neon.Endpoint.get("NeonEndpoint", "ep-blue-paper-ag2ct3ra");
  } else {
    const branch = new neon.Branch("NeonBranch", {
      projectId: secrets.neonProjectId.value,
      name: $app.stage,
    });

    endpoint = new neon.Endpoint("NeonEndpoint", {
      projectId: secrets.neonProjectId.value,
      branchId: branch.id,
      type: "read_write",
    });
  }

  const DATABASE_URL = $interpolate`postgresql://neondb_owner:${secrets.neonPassword.value}@${endpoint.host}/neondb?sslmode=require&channel_binding=require`;
  const neonLink = new sst.Linkable("NeonDatabaseUrl", {
    properties: {
      url: DATABASE_URL,
    },
  });

  return { neonLink };
};
