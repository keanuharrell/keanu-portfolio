import { auth } from "@/lib/auth";
import { defineMiddleware } from "astro:middleware";

const PUBLIC_ROUTES = ["/", "/api/contact"];

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((route) => {
    // Exact match
    if (pathname === route) return true;
    // Wildcard match (e.g., "/api/*")
    if (route.endsWith("/*") && pathname.startsWith(route.slice(0, -2))) {
      return true;
    }
    return false;
  });
}

export const onRequest = defineMiddleware(async (context, next) => {
  if (isPublicRoute(context.url.pathname)) {
    context.locals.user = null;
    context.locals.session = null;
    return next();
  }

  const isAuthed = await auth.api.getSession({
    headers: context.request.headers,
  });

  if (isAuthed) {
    context.locals.user = isAuthed.user;
    context.locals.session = isAuthed.session;
  } else {
    context.locals.user = null;
    context.locals.session = null;
  }

  return next();
});
