import { Hono } from "hono";
import { UrlService, ClickEntity } from "../db";
import { generateShortCode, isValidUrl, formatUrl } from "../utils";

const app = new Hono();

// Create a new short URL - TODO: Add SST Auth middleware
app.post("/", async (c) => {
  // TODO: Replace with SST Auth user extraction
  const user = { sub: "temp-user-id" };
  const body = await c.req.json();
  
  const { originalUrl, customSlug, expiresAt } = body;

  if (!originalUrl || !isValidUrl(originalUrl)) {
    return c.json({ error: "Invalid URL" }, 400);
  }

  let shortCode = customSlug || generateShortCode(6);

  // Check if shortCode already exists
  try {
    const existing = await UrlService.entities.url.get({ shortCode }).go();
    if (existing.data) {
      if (customSlug) {
        return c.json({ error: "Custom slug already exists" }, 409);
      }
      // Generate a longer code if random one conflicts
      shortCode = generateShortCode(8);
    }
  } catch {
    // URL doesn't exist, which is what we want
  }

  try {
    const result = await UrlService.entities.url.create({
      shortCode,
      originalUrl,
      userId: user.sub,
      customSlug: !!customSlug,
      expiresAt,
    }).go();

    return c.json({
      shortCode,
      shortUrl: formatUrl(shortCode),
      originalUrl,
      clicks: 0,
      createdAt: result.data.createdAt,
    }, 201);
  } catch (error) {
    return c.json({ error: "Failed to create URL" }, 500);
  }
});

// Get user's URLs - TODO: Add SST Auth middleware
app.get("/", async (c) => {
  // TODO: Replace with SST Auth user extraction
  const user = { sub: "temp-user-id" };
  const limit = parseInt(c.req.query("limit") || "10");
  const cursor = c.req.query("cursor");

  try {
    const result = await UrlService.entities.url.query
      .byUser({ userId: user.sub })
      .go({
        limit,
        cursor: cursor ? JSON.parse(cursor) : undefined,
      });

    const urls = result.data.map((url) => ({
      shortCode: url.shortCode,
      shortUrl: formatUrl(url.shortCode),
      originalUrl: url.originalUrl,
      clicks: url.clicks,
      isActive: url.isActive,
      createdAt: url.createdAt,
      expiresAt: url.expiresAt,
    }));

    return c.json({
      urls,
      cursor: result.cursor ? JSON.stringify(result.cursor) : null,
    });
  } catch (error) {
    return c.json({ error: "Failed to fetch URLs" }, 500);
  }
});

// Get specific URL (owner gets full details, others get limited info) - TODO: Add SST Auth middleware
app.get("/:shortCode", async (c) => {
  const shortCode = c.req.param("shortCode");
  // TODO: Replace with SST Auth user extraction (optional)
  const user = null;

  try {
    const result = await UrlService.entities.url.get({ shortCode }).go();
    
    if (!result.data) {
      return c.json({ error: "URL not found" }, 404);
    }

    const url = result.data;
    const isOwner = user && url.userId === user.sub;

    // If user is the owner, return full details
    if (isOwner) {
      return c.json({
        shortCode: url.shortCode,
        shortUrl: formatUrl(url.shortCode),
        originalUrl: url.originalUrl,
        clicks: url.clicks,
        isActive: url.isActive,
        createdAt: url.createdAt,
        expiresAt: url.expiresAt,
        customSlug: url.customSlug,
      });
    }

    // For non-owners, return limited public info (only if URL is active)
    if (!url.isActive) {
      return c.json({ error: "URL not found" }, 404);
    }

    return c.json({
      shortCode: url.shortCode,
      shortUrl: formatUrl(url.shortCode),
      isActive: url.isActive,
      createdAt: url.createdAt,
    });
  } catch (error) {
    return c.json({ error: "URL not found" }, 404);
  }
});

// Update URL - TODO: Add SST Auth middleware
app.put("/:shortCode", async (c) => {
  const shortCode = c.req.param("shortCode");
  // TODO: Replace with SST Auth user extraction
  const user = { sub: "temp-user-id" };
  const body = await c.req.json();
  
  const { originalUrl, isActive } = body;

  try {
    // Check if URL exists and belongs to user
    const existing = await UrlService.entities.url.get({ shortCode }).go();
    
    if (!existing.data) {
      return c.json({ error: "URL not found" }, 404);
    }

    if (existing.data.userId !== user.sub) {
      return c.json({ error: "Unauthorized" }, 403);
    }

    const updateData: any = {};
    
    if (originalUrl) {
      if (!isValidUrl(originalUrl)) {
        return c.json({ error: "Invalid URL" }, 400);
      }
      updateData.originalUrl = originalUrl;
    }

    if (typeof isActive === "boolean") {
      updateData.isActive = isActive;
    }

    await UrlService.entities.url.update({ shortCode }).set(updateData).go();

    return c.json({ message: "URL updated successfully" });
  } catch (error) {
    return c.json({ error: "Failed to update URL" }, 500);
  }
});

// Delete URL (also deletes associated click events) - TODO: Add SST Auth middleware
app.delete("/:shortCode", async (c) => {
  const shortCode = c.req.param("shortCode");
  // TODO: Replace with SST Auth user extraction
  const user = { sub: "temp-user-id" };

  try {
    // Check if URL exists and belongs to user
    const existing = await UrlService.entities.url.get({ shortCode }).go();
    
    if (!existing.data) {
      return c.json({ error: "URL not found" }, 404);
    }

    if (existing.data.userId !== user.sub) {
      return c.json({ error: "Unauthorized" }, 403);
    }

    // Delete URL and associated click events
    await Promise.all([
      UrlService.entities.url.delete({ shortCode }).go(),
      // Note: In a real app, you'd want to clean up click events too
      // This could be done with a batch delete or background job
    ]);

    return c.json({ 
      message: "URL deleted successfully",
      shortCode: existing.data.shortCode
    });
  } catch (error) {
    return c.json({ error: "Failed to delete URL" }, 500);
  }
});

export default app;