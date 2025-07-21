import { createSubjects } from "@openauthjs/openauth/subject";
import { z } from "zod";

export const subjects = createSubjects({
  user: z.object({
    id: z.string(),
    email: z.string(),
    name: z.string().optional(),
    picture: z.string().optional(),
  }),
});

export type User = {
  type: "user";
  properties: {
    id: string;
    email: string;
    name?: string;
    picture?: string;
  };
};