import type { CreateUrlRequest, UrlResponse, ListUrlsResponse, ApiError } from './types';

class ApiClient {
  private baseURL: string;

  constructor() {
    // Use relative URLs for Next.js API routes
    this.baseURL = '/api';
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    // Get access token from localStorage (OpenAuth convention)
    const token = typeof window !== 'undefined' ? localStorage.getItem('openauth.token') : null;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({
        error: 'Network error',
      }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async createUrl(data: CreateUrlRequest): Promise<UrlResponse> {
    return this.request<UrlResponse>('/urls', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getUrls(limit = 10, cursor?: string): Promise<ListUrlsResponse> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      ...(cursor && { cursor }),
    });

    return this.request<ListUrlsResponse>(`/urls?${params}`);
  }

  async getUrl(shortCode: string): Promise<UrlResponse> {
    return this.request<UrlResponse>(`/urls/${shortCode}`);
  }

  async updateUrl(
    shortCode: string,
    data: { originalUrl?: string; isActive?: boolean }
  ): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/urls/${shortCode}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteUrl(shortCode: string): Promise<{ message: string; shortCode: string }> {
    return this.request<{ message: string; shortCode: string }>(`/urls/${shortCode}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();