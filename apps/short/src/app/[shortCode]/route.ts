import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { UrlShortenerService } from "@portfolio/core/short";

const urlService = new UrlShortenerService();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  try {
    const { shortCode } = await params;
    const originalUrl = await urlService.redirectUrl(shortCode);
    redirect(originalUrl);
  } catch (error) {
    // Next.js redirect() throws a special error - let it pass through
    if (error && typeof error === 'object' && 'digest' in error && 
        typeof error.digest === 'string' && error.digest.includes('NEXT_REDIRECT')) {
      throw error;
    }
    
    console.error("Error redirecting:", error);
    return Response.json({ error: "URL not found" }, { status: 404 });
  }
}