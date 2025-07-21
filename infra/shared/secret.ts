export const secret = {
  // Google (kept for future SST Auth integration)
  googleClientId: new sst.Secret("GoogleClientId"),
  googleClientSecret: new sst.Secret("GoogleClientSecret"),
  // Github (kept for future SST Auth integration)
  githubClientId: new sst.Secret("GithubClientId"),
  githubClientSecret: new sst.Secret("GithubClientSecret"),
}
