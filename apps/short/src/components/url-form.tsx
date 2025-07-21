"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import type { UrlResponse } from "@portfolio/core/short";

const formSchema = z.object({
  originalUrl: z.string().url("Please enter a valid URL"),
  customSlug: z.string().optional().refine(
    (val) => !val || /^[a-zA-Z0-9_-]+$/.test(val),
    "Custom slug can only contain letters, numbers, hyphens, and underscores"
  ),
});

interface UrlFormProps {
  onUrlCreated: (url: UrlResponse) => void;
}

export function UrlForm({ onUrlCreated }: UrlFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originalUrl: "",
      customSlug: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/urls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalUrl: values.originalUrl,
          customSlug: values.customSlug || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create short URL");
      }

      const url = await response.json();
      onUrlCreated(url);
      
      // Success toast with copy functionality
      toast.success("Short URL created successfully!", {
        description: url.shortUrl,
        action: {
          label: "Copy",
          onClick: () => {
            navigator.clipboard.writeText(url.shortUrl);
            toast.success("Copied to clipboard!");
          },
        },
      });
      
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="originalUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL to shorten</FormLabel>
              <FormControl>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <Input 
                    placeholder="https://your-very-long-url.com/with/many/parameters" 
                    className="pl-10 h-12"
                    {...field} 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customSlug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custom slug (optional)</FormLabel>
              <FormControl>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-muted-foreground text-sm">
                      {process.env.NEXT_PUBLIC_SHORT_URL ? new URL(process.env.NEXT_PUBLIC_SHORT_URL).hostname + '/' : 'ksh.link/'}
                    </span>
                  </div>
                  <Input 
                    placeholder="my-custom-link" 
                    className="pl-20 h-12"
                    {...field} 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && (
          <div className="flex items-center gap-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 p-4 rounded-lg">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span>{error}</span>
          </div>
        )}
        <Button 
          type="submit" 
          disabled={isLoading} 
          className="w-full h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:opacity-90"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Creating short link...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Create Short URL</span>
            </div>
          )}
        </Button>
      </form>
    </Form>
  );
}