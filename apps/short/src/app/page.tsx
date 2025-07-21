"use client";

import React, { useState } from "react";
import { UrlForm } from "@/components/url-form";
import type { UrlResponse } from "@portfolio/core/short";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Link2 } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const [createdUrls, setCreatedUrls] = useState<UrlResponse[]>([]);

  const handleUrlCreated = (url: UrlResponse) => {
    setCreatedUrls(prev => [url, ...prev]);
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center animate-float">
                <Link2 className="w-9 h-9 text-white" />
              </div>
            </div>
            <h1 className="text-6xl font-bold mb-4">
              <span className="text-gradient">ksh.link</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your long URLs into powerful short links with analytics and custom aliases
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <Card className="p-8 backdrop-blur-custom bg-card/50">
              <UrlForm onUrlCreated={handleUrlCreated} />
            </Card>
            
            {/* Created URLs List */}
            {createdUrls.length > 0 && (
              <Card className="p-8 backdrop-blur-custom bg-card/50">
                <h3 className="text-2xl font-semibold mb-6">Recently Created</h3>
                <div className="space-y-4">
                  {createdUrls.slice(0, 5).map((url) => (
                    <div key={url.shortCode} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg transition-all hover:bg-secondary/70">
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="font-mono text-sm font-medium text-gradient truncate">
                          {url.shortUrl}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          → {url.originalUrl}
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => copyToClipboard(url.shortUrl)}
                        className="ml-4 hover:bg-primary/10"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <Card className="p-6 backdrop-blur-custom bg-card/50">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Real-time Analytics</h3>
                <p className="text-muted-foreground">Track clicks, geographic data, and referrers in real-time</p>
              </Card>

              <Card className="p-6 backdrop-blur-custom bg-card/50">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
                <p className="text-muted-foreground">Your data is encrypted and protected with enterprise-grade security</p>
              </Card>

              <Card className="p-6 backdrop-blur-custom bg-card/50">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground">Optimized infrastructure for instant redirects worldwide</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}