const upstashRedis = new upstash.RedisDatabase("Redis", {
  databaseName: "UpstashRedis" + $app.stage,
  region: "global",
  primaryRegion: "eu-central-1",
  tls: true,
});

export const redis = new sst.Linkable("RedisLink", {
  properties: {
    url: $interpolate`https://${upstashRedis.endpoint}`,
    token: upstashRedis.restToken,
  },
});
