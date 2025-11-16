import type { APIRoute } from "astro";
import { Resource } from "sst";

// For testing with GET
export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      message: "Contact API endpoint",
      methods: ["POST"],
      fields: ["name", "email", "message"],
      redis: Resource.RedisLink.url,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
};
