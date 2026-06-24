import { GENERATED_LAB_PREVIEWS } from "./lab-previews.generated";

/**
 * Manual overrides take precedence over generated mappings.
 * Preview assets live under public/previews/ as root-relative URLs.
 */
const MANUAL_LAB_PREVIEWS: Record<string, string> = {
  // Example:
  // "powers-of-two-2048": "/previews/custom-override.webm",
};

export const LAB_PREVIEWS: Record<string, string> = {
  ...GENERATED_LAB_PREVIEWS,
  ...MANUAL_LAB_PREVIEWS,
};

export function getLabPreviewUrl(slug: string): string | undefined {
  return LAB_PREVIEWS[slug];
}
