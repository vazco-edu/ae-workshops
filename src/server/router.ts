import { healthCheck } from "@/server/routes/health-check";

export const router = {
  health: healthCheck,
};
