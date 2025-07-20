import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";
import { issuer } from "@openauthjs/openauth";
import { CodeProvider } from "@openauthjs/openauth/provider/code";
import { GoogleOidcProvider } from "@openauthjs/openauth/provider/google";
import { GithubProvider } from "@openauthjs/openauth/provider/github";
import { handle } from "hono/aws-lambda";
import { Resource } from "sst";
import { subjects } from "./subjects";
import { z } from "zod";

const ses = new SESv2Client({});

export const handler = handle(
  issuer({
    subjects,
    providers: {
      email: CodeProvider({
        async request(req, state, form, error) {
          const params = new URLSearchParams();
          if (error) {
            params.set("error", error.type);
          }
          
          const frontendUrl = process.env.AUTH_FRONTEND_URL || "http://localhost:3000";
          
          if (state.type === "start") {
            return Response.redirect(
              `${frontendUrl}/auth/email?${params.toString()}`,
              302,
            );
          }

          if (state.type === "code") {
            return Response.redirect(
              `${frontendUrl}/auth/code?${params.toString()}`,
              302,
            );
          }

          return new Response("ok");
        },
        async sendCode(claims, code) {
          const email = z.string().email().parse(claims.email);
          const cmd = new SendEmailCommand({
            Destination: {
              ToAddresses: [email],
            },
            FromEmailAddress: `URL Shortener <noreply@${Resource.Email?.sender || "localhost"}>`,
            Content: {
              Simple: {
                Body: {
                  Html: {
                    Data: `
                      <h2>Your verification code</h2>
                      <p>Use this code to sign in to your URL Shortener account:</p>
                      <div style="font-family: monospace; font-size: 24px; font-weight: bold; background: #f0f0f0; padding: 10px; border-radius: 5px; display: inline-block;">${code}</div>
                      <p>This code will expire in 10 minutes.</p>
                    `,
                  },
                  Text: {
                    Data: `Your verification code for URL Shortener is: ${code}\n\nThis code will expire in 10 minutes.`,
                  },
                },
                Subject: {
                  Data: `URL Shortener - Verification Code: ${code}`,
                },
              },
            },
          });
          await ses.send(cmd);
        },
      }),
      google: GoogleOidcProvider({
        clientID: Resource.GoogleClientId?.value || "",
        scopes: ["openid", "email", "profile"],
      }),
      github: GithubProvider({
        clientId: Resource.GithubClientId?.value || "",
        scopes: ["user:email"],
      }),
    },
    async success(ctx, response) {
      let email: string | undefined;
      let name: string | undefined;
      let picture: string | undefined;

      if (response.provider === "email") {
        email = response.claims.email;
      }

      if (response.provider === "google" && response.id.email_verified) {
        email = response.id.email as string;
        name = response.id.name as string;
        picture = response.id.picture as string;
      }

      if (response.provider === "github") {
        email = response.id.email as string;
        name = response.id.name as string;
        picture = response.id.avatar_url as string;
      }

      if (!email) {
        throw new Error("No email found in authentication response");
      }

      // Here you could add database logic to create/find user
      // For now, we'll just return the user info
      const userID = `user_${Buffer.from(email).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, 12)}`;

      return ctx.subject("user", userID, {
        userID,
        email,
        name,
        picture,
      });
    },
    async allow(input) {
      const url = new URL(input.redirectURI);
      
      // Get allowed domains from environment (set in infra)
      const allowedDomains = JSON.parse(
        process.env.ALLOWED_REDIRECT_DOMAINS || '["localhost", "127.0.0.1"]'
      );
      
      return allowedDomains.some((domain: string) => 
        url.hostname === domain || url.hostname.endsWith(`.${domain}`)
      );
    },
  }),
);