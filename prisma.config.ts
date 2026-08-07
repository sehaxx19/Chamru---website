// Prisma 7 moved connection configuration out of schema.prisma and into this file.
// See: https://pris.ly/d/config-datasource
import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Load .env then .env.local (Next.js convention), matching how the app itself
// resolves environment variables.
config({ path: ".env" });
config({ path: ".env.local", override: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
