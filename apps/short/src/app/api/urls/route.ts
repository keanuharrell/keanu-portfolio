import { NextRequest } from "next/server";
import { UrlShortenerService } from "@portfolio/core/short";

export async function POST(request: NextRequest) {
  try {
    const { originalUrl, customSlug } = await request.json();

    if (!originalUrl) {
      return Response.json({ error: "Original URL is required" }, { status: 400 });
    }

    // Get base URL from current request
    const url = new URL(request.url);
    const baseUrl = `${url.protocol}//${url.host}`;
    
    const urlService = new UrlShortenerService(baseUrl);
    const result = await urlService.createUrl({
      originalUrl,
      customSlug,
    });

    return Response.json(result);
  } catch (error) {
    console.error("Error creating URL:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}