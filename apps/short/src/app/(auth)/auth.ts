import { Resource } from "sst"
import { createClient } from "@openauthjs/openauth/client"
import { cookies as getCookies } from "next/headers"

export const client = createClient({
  clientID: "short",
  issuer: Resource.SharedAuth.url
})

export async function setTokens(access: string, refresh: string) {
  const cookies = await getCookies()
  const isProduction = process.env.NODE_ENV === 'production'

  cookies.set({
    name: "access_token",
    value: access,
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    path: "/",
    maxAge: 3600, // 1 hour instead of 400 days
  })
  cookies.set({
    name: "refresh_token",
    value: refresh,
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    path: "/",
    maxAge: 604800, // 7 days instead of 400 days
  })
}