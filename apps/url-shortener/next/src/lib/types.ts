export interface CreateUrlRequest {
  originalUrl: string;
  customSlug?: string;
  expiresAt?: string;
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

export interface ApiError {
  error: string;
}