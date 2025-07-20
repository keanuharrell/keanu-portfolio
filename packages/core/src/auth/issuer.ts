import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";
import { issuer } from "@openauthjs/openauth";
import { CodeProvider } from "@openauthjs/openauth/provider/code";
import { GoogleOidcProvider } from "@openauthjs/openauth/provider/google";
import { GithubProvider } from "@openauthjs/openauth/provider/github";
import { handle } from "hono/aws-lambda";
import { Resource } from "sst";
import { subjects } from "./subjects";
import { CodeUI } from "@openauthjs/openauth/ui/code";
import { DynamoStorage } from "@openauthjs/openauth/storage/dynamo"


const ses = new SESv2Client({});

const storage = DynamoStorage({
  table: "auth-keanuharrell",
});

export const handler = handle(
  issuer({
    storage,
    subjects,
    providers: {
      email: CodeProvider(
        CodeUI({
          sendCode: async (claims, code) => {
            console.log(claims.email, code);
          }
        })
      ),
      google: GoogleOidcProvider({
        clientID: Resource.GoogleClientId.value,
        scopes: ["openid", "email", "profile"],
      }),
      github: GithubProvider({
        clientID: Resource.GithubClientId.value,
        clientSecret: Resource.GithubClientSecret.value,
        scopes: ["email", "profile"],
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
        // GitHub provider returns user info in different format
        email = (response as any).userinfo?.email as string;
        name = (response as any).userinfo?.name as string;
        picture = (response as any).userinfo?.avatar_url as string;
      }

      if (!email) {
        throw new Error("No email found in authentication response");
      }

      // Here you could add database logic to create/find user
      // For now, we'll just return the user info
      const userID = `user_${Buffer.from(email).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, 12)}`;

      return ctx.subject("user", {
        userID,
        email,
        name,
        picture,
      });
    },
    // async allow(input) {
    //   const url = new URL(input.redirectURI);
      
    //   // Get allowed domains from environment (set in infra)
    //   const allowedDomains = JSON.parse(
    //     process.env.ALLOWED_REDIRECT_DOMAINS || '["localhost", "127.0.0.1"]'
    //   );
      
    //   return allowedDomains.some((domain: string) => 
    //     url.hostname === domain || url.hostname.endsWith(`.${domain}`)
    //   );
    // },
  }),
);