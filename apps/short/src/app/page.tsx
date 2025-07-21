"use client";

import React, { useState } from "react";
import { UrlForm } from "@/components/url-form";
import type { UrlResponse } from "@portfolio/core/short";

export default function Home() {
  const [createdUrls, setCreatedUrls] = useState<UrlResponse[]>([]);

  const handleUrlCreated = (url: UrlResponse) => {
    setCreatedUrls(prev => [url, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  LinkShort
                </h1>
              </div>
              <p className="text-xl text-gray-600 font-medium">Transform your long URLs into powerful short links</p>
            </div>

            {/* Main Content */}
            <div className="space-y-8">
              <UrlForm onUrlCreated={handleUrlCreated} />
              
              {/* Created URLs List */}
              {createdUrls.length > 0 && (
                <div className="bg-white/80 backdrop-blur-sm border-violet-100 shadow-lg shadow-violet-500/10 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recently Created</h3>
                  <div className="space-y-3">
                    {createdUrls.slice(0, 5).map((url) => (
                      <div key={url.shortCode} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex-1 min-w-0">
                          <div className="font-mono text-sm text-violet-600 truncate">{url.shortUrl}</div>
                          <div className="text-xs text-gray-500 truncate">→ {url.originalUrl}</div>
                        </div>
                        <button 
                          onClick={() => navigator.clipboard.writeText(url.shortUrl)}
                          className="ml-4 p-2 text-gray-400 hover:text-violet-600 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}