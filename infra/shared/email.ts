import { domain, dns } from "./dns";

export const sharedEmail = new sst.aws.Email("SharedEmail", {
  sender: `${domain}`,
  dns,
});