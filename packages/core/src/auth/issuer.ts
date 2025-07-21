import { handle } from "hono/aws-lambda"
import { issuer } from "@openauthjs/openauth"
import { CodeUI } from "@openauthjs/openauth/ui/code"
import { CodeProvider } from "@openauthjs/openauth/provider/code"
import { subjects } from "./subjects"
import { GoogleOidcProvider } from "@openauthjs/openauth/provider/google"
import { Resource } from "sst"
import { GithubProvider } from "@openauthjs/openauth/provider/github"
import { User } from "./service"
import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses"
import { z } from "zod"

const sesClient = new SESClient({
  region: "eu-west-3",
})

const app = issuer({
  subjects,
  providers: {
    email: CodeProvider(
      CodeUI({
        sendCode: async (claims, code) => {
          const email = z.string().email().parse(claims.email);
          await sesClient.send(new SendEmailCommand({
            Source: `Keanu <auth@${Resource.SharedEmail.sender}>`,
            Destination: {
              ToAddresses: [email],
            },
            Message: {
              Subject: { Data: `Keanu Pin Code ${code}` },
              Body: { 
                Text: { Data: `Your code is ${code}` },
                Html: { Data: `<p>Your code is <strong>${code}</strong></p>` },
              },
            },
          }));
        },
      }),
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
  success: async (ctx, response) => {
    let email: string | undefined;
    if (response.provider === "email") {
      email = response.claims.email;
    }

    if (response.provider === "google" && response.id.email_verified) {
      console.log(response)
      email = response.id.email as string;
    }

    if (response.provider === "github") {
      console.log(response)
    }

    if (!email) throw new Error("No email found");

    let user = await User.getByEmail(email);
    if (!user) {
      user = await User.create(email);
    }

    return ctx.subject("user", {
      id: user?.id,
      email,
      name: user.name,
      picture: user.pictureUrl,
    })
  },
})


export const handler = handle(app)