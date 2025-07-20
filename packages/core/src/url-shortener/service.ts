import { createUrlService } from "./entities";
import { generateShortCode, isValidUrl, formatUrl } from "./utils";
import type { User } from "../auth/subjects";

export interface CreateUrlRequest {
  originalUrl: string;
  customSlug?: string;
  expiresAt?: string;
}

export interface UpdateUrlRequest {
  originalUrl?: string;
  isActive?: boolean;
}

export interface UrlResponse {
  shortCode: string;
  shortUrl: string;
  originalUrl: string;
  clicks: number;
  isActive: boolean;
  createdAt: string;
  expiresAt?: string;
  customSlug?: boolean;
}

export interface ListUrlsResponse {
  urls: UrlResponse[];
  cursor?: string;
}

export class UrlShortenerService {
  private service: ReturnType<typeof createUrlService>;
  private baseUrl?: string;

  constructor(tableName: string, baseUrl?: string) {
    this.service = createUrlService(tableName);
    this.baseUrl = baseUrl;
  }

  async createUrl(user: User, data: CreateUrlRequest): Promise<UrlResponse> {
    const { originalUrl, customSlug, expiresAt } = data;

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

    const result = await this.service.entities.url.create({
      shortCode,
      originalUrl,
      userId: user.userID,
      customSlug: !!customSlug,
      expiresAt,
    }).go();

    return {
      shortCode,
      shortUrl: formatUrl(shortCode, this.baseUrl),
      originalUrl,
      clicks: 0,
      isActive: true,
      createdAt: result.data.createdAt,
      expiresAt,
      customSlug: !!customSlug,
    };
  }

  async getUserUrls(userId: string, limit = 10, cursor?: string): Promise<ListUrlsResponse> {
    const result = await this.service.entities.url.query
      .byUser({ userId })
      .go({
        limit,
        cursor: cursor ? JSON.parse(cursor) : undefined,
      });

    const urls = result.data.map((url) => ({
      shortCode: url.shortCode,
      shortUrl: formatUrl(url.shortCode, this.baseUrl),
      originalUrl: url.originalUrl,
      clicks: url.clicks,
      isActive: url.isActive,
      createdAt: url.createdAt,
      expiresAt: url.expiresAt,
      customSlug: url.customSlug,
    }));

    return {
      urls,
      cursor: result.cursor ? JSON.stringify(result.cursor) : undefined,
    };
  }

  async getUrl(shortCode: string, userId?: string): Promise<UrlResponse | null> {
    try {
      const result = await this.service.entities.url.get({ shortCode }).go();
      
      if (!result.data) {
        return null;
      }

      const url = result.data;
      const isOwner = userId && url.userId === userId;

      // If user is not the owner and URL is not active, return null
      if (!isOwner && !url.isActive) {
        return null;
      }

      return {
        shortCode: url.shortCode,
        shortUrl: formatUrl(url.shortCode, this.baseUrl),
        originalUrl: url.originalUrl,
        clicks: url.clicks,
        isActive: url.isActive,
        createdAt: url.createdAt,
        expiresAt: url.expiresAt,
        customSlug: url.customSlug,
      };
    } catch {
      return null;
    }
  }

  async updateUrl(shortCode: string, userId: string, data: UpdateUrlRequest): Promise<void> {
    // Check if URL exists and belongs to user
    const existing = await this.service.entities.url.get({ shortCode }).go();
    
    if (!existing.data) {
      throw new Error("URL not found");
    }

    if (existing.data.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const updateData: any = {};
    
    if (data.originalUrl) {
      if (!isValidUrl(data.originalUrl)) {
        throw new Error("Invalid URL");
      }
      updateData.originalUrl = data.originalUrl;
    }

    if (typeof data.isActive === "boolean") {
      updateData.isActive = data.isActive;
    }

    await this.service.entities.url.update({ shortCode }).set(updateData).go();
  }

  async deleteUrl(shortCode: string, userId: string): Promise<void> {
    // Check if URL exists and belongs to user
    const existing = await this.service.entities.url.get({ shortCode }).go();
    
    if (!existing.data) {
      throw new Error("URL not found");
    }

    if (existing.data.userId !== userId) {
      throw new Error("Unauthorized");
    }

    // Delete URL and associated click events
    await this.service.entities.url.delete({ shortCode }).go();
    // Note: In a real app, you'd want to clean up click events too
  }

  async recordClick(shortCode: string, metadata: {
    userAgent?: string;
    referer?: string;
    ip?: string;
    country?: string;
  }): Promise<void> {
    const timestamp = new Date().toISOString();
    
    // Record the click
    await this.service.entities.click.create({
      shortCode,
      timestamp,
      ...metadata,
    }).go();

    // Increment click count
    await this.service.entities.url.update({ shortCode })
      .add({ clicks: 1 })
      .go();
  }
}