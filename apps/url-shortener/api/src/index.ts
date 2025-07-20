import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { handle } from "hono/aws-lambda";

import urlsRouter from "./routes/urls";
import redirectRouter from "./routes/redirect";

const app = new Hono();

// Middleware
app.use("*", cors({
  origin: ["*"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
}));

app.use("*", logger());

// Health check
app.get("/health", (c) => c.json({ status: "ok" }));

// Routes
app.route("/api/urls", urlsRouter);
app.route("/", redirectRouter);

// 404 handler
app.notFound((c) => c.json({ error: "Not found" }, 404));

// Error handler
app.onError((err, c) => {
  console.error("Error:", err);
  return c.json({ error: "Internal server error" }, 500);
});

export const handler = handle(app);
export default app;