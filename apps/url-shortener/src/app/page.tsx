import { auth, login, logout } from "./(auth)/actions";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link2, QrCode, BarChart3, Copy, ExternalLink, LogIn, LogOut, User, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCreateUrl } from "@/hooks/useUrls";
import { LoginButton } from "@/components/login-button";

export default async function HomePage() {
  const { subjects } = await auth()
  
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [result, setResult] = useState<{ shortUrl: string; shortCode: string } | null>(null);
  
  const createUrlMutation = useCreateUrl();

  const handleShorten = async () => {
    if (!url) return;

    try {
      const response = await createUrlMutation.mutateAsync({
        originalUrl: url,
        ...(customSlug && { customSlug }),
      });
      
      setResult({
        shortUrl: response.shortUrl,
        shortCode: response.shortCode,
      });
      toast.success("URL shortened successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to shorten URL");
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.shortUrl);
      toast.success("Copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Link2 className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold">URL Shortener</h1>
            </div>
            <div className="flex items-center space-x-4">
              {state.type === "loading" ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Loading...</span>
                </div>
              ) : state.type === "authenticated" ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{state.user.name || state.user.email}</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <LoginButton />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Shorten URLs with Style
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create short, memorable links with detailed analytics and QR codes.
            Built for performance with Go and modern web technologies.
          </p>
        </motion.div>

        {/* URL Shortener Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8 mb-8">
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="url"
                  placeholder="Enter your long URL here..."
                  value={url}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleShorten()}
                />
                <Button
                  onClick={handleShorten}
                  disabled={!url || createUrlMutation.isPending || state.type !== "authenticated"}
                  className="px-8"
                >
                  {createUrlMutation.isPending ? "Shortening..." : "Shorten"}
                </Button>
              </div>
              
              <Input
                type="text"
                placeholder="Custom slug (optional)"
                value={customSlug}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomSlug(e.target.value)}
                className="sm:max-w-sm"
              />
            </div>

            {state.type !== "authenticated" && (
              <div className="bg-muted/50 rounded-lg p-4 border border-border/60 text-center">
                <p className="text-sm text-muted-foreground">
                  Please login to create short URLs
                </p>
              </div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-muted/50 rounded-lg p-4 border border-border/60"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground mb-1">
                      Your shortened URL:
                    </p>
                    <p className="text-lg font-mono truncate text-primary">
                      {result.shortUrl}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={result.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <Card className="p-6 text-center">
            <div className="mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Real-time Analytics</h3>
            <p className="text-muted-foreground">
              Track clicks, locations, and devices with detailed analytics
              dashboard.
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <QrCode className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">QR Code Generation</h3>
            <p className="text-muted-foreground">
              Automatically generate QR codes for easy sharing and mobile
              access.
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Link2 className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Custom Slugs</h3>
            <p className="text-muted-foreground">
              Create memorable custom short URLs that match your brand.
            </p>
          </Card>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <h3 className="text-lg font-semibold mb-4">
            Built with modern technology
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary">Hono</Badge>
            <Badge variant="secondary">Next.js</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">TanStack Query</Badge>
            <Badge variant="secondary">ElectroDB</Badge>
            <Badge variant="secondary">DynamoDB</Badge>
            <Badge variant="secondary">AWS Lambda</Badge>
            <Badge variant="secondary">SST</Badge>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-muted-foreground">
            <p>© 2024 Keanu Harrell. Part of the portfolio project.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
