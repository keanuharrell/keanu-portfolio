"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { LogIn, Mail, Github } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export function LoginButton() {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const { login, loginWithGoogle, loginWithGitHub, state } = useAuth();

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
      setOpen(false);
    } else {
      login(); // Login sans email prérempli
      setOpen(false);
    }
  };

  const handleSocialLogin = (provider: "google" | "github") => {
    if (provider === "google") {
      loginWithGoogle();
    } else {
      loginWithGitHub();
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" disabled={state.type === "loading"}>
          <LogIn className="h-4 w-4 mr-2" />
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign in to URL Shortener</DialogTitle>
          <DialogDescription>
            Choose your preferred sign-in method
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {state.type === "error" && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive">{state.error}</p>
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-3">
            <Input
              type="email"
              placeholder="Enter your email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={state.type === "loading"}
            />
            <Button 
              type="submit" 
              className="w-full" 
              disabled={state.type === "loading"}
            >
              <Mail className="h-4 w-4 mr-2" />
              Continue with Email
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialLogin("google")}
              disabled={state.type === "loading"}
            >
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialLogin("github")}
              disabled={state.type === "loading"}
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}