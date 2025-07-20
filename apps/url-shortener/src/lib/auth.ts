import { createClient } from "@openauthjs/openauth/client";

// Client OpenAuth configuré pour SST
export const client = createClient({
  issuer: process.env.NEXT_PUBLIC_AUTH_URL!,
});

export type User = {
  id: string;
  email: string;
  name?: string;
  picture?: string;
};

// Types pour les états d'authentification
export type AuthState = 
  | { type: "loading" }
  | { type: "unauthenticated" }
  | { type: "authenticated"; user: User; token: string }
  | { type: "error"; error: string };