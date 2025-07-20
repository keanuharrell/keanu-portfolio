import { Hono } from "hono";
import { UrlService, ClickEntity } from "../db";

const app = new Hono();

// Handle redirects
app.get("/:shortCode", async (c) => {
  const shortCode = c.req.param("shortCode");

  try {
    const result = await UrlService.entities.url.get({ shortCode }).go();
    
    if (!result.data) {
      return c.json({ error: "URL not found" }, 404);
    }

    const url = result.data;

    // Check if URL is active
    if (!url.isActive) {
      return c.json({ error: "URL is inactive" }, 404);
    }

    // Check if URL has expired
    if (url.expiresAt && new Date(url.expiresAt) < new Date()) {
      return c.json({ error: "URL has expired" }, 410);
    }

    // Track the click asynchronously
    const now = new Date();
    const timestamp = now.toISOString();
    
    // Don't await this to keep redirect fast
    Promise.all([
      // Increment click count
      UrlService.entities.url.update({ shortCode })
        .add({ clicks: 1 })
        .set({ updatedAt: timestamp })
        .go(),
      
      // Record click event
      ClickEntity.create({
        shortCode,
        timestamp: `${now.toISOString()}#${now.getTime()}`,
        userAgent: c.req.header("User-Agent"),
        referer: c.req.header("Referer"),
        ip: c.req.header("X-Forwarded-For") || c.req.header("X-Real-IP"),
        country: c.req.header("CF-IPCountry"), // Cloudflare header
      }).go(),
    ]).catch(error => {
      console.error("Error tracking click:", error);
    });

    // Fast redirect
    return c.redirect(url.originalUrl, 302);
  } catch (error) {
    console.error("Redirect error:", error);
    return c.json({ error: "URL not found" }, 404);
  }
});

export default app;