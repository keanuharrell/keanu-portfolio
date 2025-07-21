import { UrlService } from "./entities";
import { generateShortCode, isValidUrl, formatUrl } from "./utils";

export interface CreateUrlRequest {
  originalUrl: string;
  customSlug?: string;
}

export interface UrlResponse {
  shortCode: string;
  shortUrl: string;
  originalUrl: string;
}

export class UrlShortenerService {
  private service: typeof UrlService;
  private baseUrl?: string;

  constructor(baseUrl?: string) {
    this.service = UrlService;
    this.baseUrl = baseUrl;
  }

  async createUrl(data: CreateUrlRequest): Promise<UrlResponse> {
    const { originalUrl, customSlug } = data;

    if (!isValidUrl(originalUrl)) {
      throw new Error("Invalid URL");
    }

    let shortCode = customSlug || generateShortCode(6);

    // Check if shortCode already exists
    try {
      const existing = await this.service.entities.url.get({ shortCode }).go();
      if (existing.data) {
        if (customSlug) {
          throw new Error("Custom slug already exists");
        }
        // Generate a longer code if random one conflicts
        shortCode = generateShortCode(8);
      }
    } catch (error) {
      // URL doesn't exist, which is what we want (unless it's a real error)
      if (error instanceof Error && !error.message.includes("not found")) {
        throw error;
      }
    }

    await this.service.entities.url.create({
      shortCode,
      originalUrl,
      customSlug: !!customSlug,
    }).go();

    return {
      shortCode,
      shortUrl: formatUrl(shortCode, this.baseUrl),
      originalUrl,
    };
  }

  async redirectUrl(shortCode: string): Promise<string> {
    try {
      const result = await this.service.entities.url.get({ shortCode }).go();
      
      if (!result.data) {
        throw new Error("URL not found");
      }

      const url = result.data;

      // Record click
      await this.service.entities.click.create({
        shortCode,
        timestamp: new Date().toISOString(),
      }).go();

      // Increment click count
      await this.service.entities.url.update({ shortCode })
        .add({ clicks: 1 })
        .go();

      return url.originalUrl;
    } catch (error) {
      throw new Error("URL not found");
    }
  }
}