import { Redis } from "@upstash/redis";
import { Resource } from "sst/resource";

export const redis = new Redis({
  url: Resource.RedisLink.url,
  token: Resource.RedisLink.token,
});
