import type { Context } from "hono";
import type { User } from "@portfolio/types";

export interface AuthMiddlewareConfig {
  required?: boolean;
}

export function authMiddleware(config: AuthMiddlewareConfig = { required: true }) {
  return async (c: Context, next: () => Promise<void>) => {
    const authHeader = c.req.header("Authorization");
    
    if (!authHeader) {
      if (config.required) {
        return c.json({ error: "Authorization header missing" }, 401);
      }
      await next();
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      if (config.required) {
        return c.json({ error: "Bearer token missing" }, 401);
      }
      await next();
      return;
    }

    try {
      // TODO: Implement proper JWT verification when needed
      // For now, we'll create a dummy user for development
      const user: User = {
        id: "temp-user-id",
        email: "dev@keanu.dev",
        name: "Development User",
        picture: "",
      };
      
      c.set("user", user);
      c.set("token", token);
      await next();
    } catch (error) {
      console.error("Token verification failed:", error);
      if (config.required) {
        return c.json({ error: "Invalid token" }, 401);
      }
      await next();
    }
  };
}

export function requireAuth() {
  return authMiddleware({ required: true });
}

export function optionalAuth() {
  return authMiddleware({ required: false });
}

export function getUser(c: Context): User | null {
  return c.get("user") || null;
}

export function requireUser(c: Context): User {
  const user = getUser(c);
  if (!user) {
    throw new Error("User not authenticated");
  }
  return user;
}