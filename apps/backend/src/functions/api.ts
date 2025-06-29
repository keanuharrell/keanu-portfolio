import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";

const app = new Hono()
  .use(cors())
  .use(logger())
  .use(async (c, next) => {
    c.header("Cache-Control", "no-store");
    return next();
  })
  .onError((error, c) => {
    if (error instanceof HTTPException) {
      return error.getResponse();
    }
    if (error instanceof ZodError) {
      const e = error.errors[0];
      if (e) {
        return c.json({ error: e.message }, 400);
      }
    }
    return c.json({ error: error.message }, 500);
  })
  .get("/", async (c) => {
    return c.json({ message: "Keanu Portfolio API" });
  })
  .get("/health", async (c) => {
    return c.json({ status: "healthy", timestamp: new Date().toISOString() });
  })
  .get("/projects", async (c) => {
    // Template endpoint for projects
    const projects = [
      {
        id: "1",
        title: "Portfolio Website",
        description: "A modern portfolio built with React and TypeScript",
        technologies: ["React", "TypeScript", "Tailwind CSS", "SST"],
        github: "https://github.com/username/portfolio",
        demo: "https://portfolio.example.com",
        featured: true
      },
      {
        id: "2", 
        title: "Example Project",
        description: "Description of another project",
        technologies: ["Node.js", "PostgreSQL", "AWS"],
        github: "https://github.com/username/project",
        demo: null,
        featured: false
      }
    ];
    
    return c.json({ projects });
  })
  .get("/experience", async (c) => {
    // Template endpoint for experience
    const experience = [
      {
        id: "1",
        company: "Company Name",
        position: "Full Stack Developer",
        startDate: "2023-01-01",
        endDate: null,
        description: "Developed and maintained web applications using modern technologies.",
        technologies: ["React", "Node.js", "PostgreSQL", "AWS"]
      }
    ];
    
    return c.json({ experience });
  })
  .post("/contact", async (c) => {
    // Template endpoint for contact form
    const body = await c.req.json();
    
    // Here you would typically validate the input and send an email
    // For now, just return a success message
    console.log("Contact form submission:", body);
    
    return c.json({ 
      success: true, 
      message: "Thank you for your message! I'll get back to you soon." 
    });
  });

export const handler = handle(app);