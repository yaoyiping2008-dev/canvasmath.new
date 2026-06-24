import type { LabModule } from "./labs-data";

export type LabsValidationIssue = {
  severity: "warning" | "error";
  message: string;
  labId?: string;
};

const ENDPOINT_PATTERN = /^(https?:\/\/[^\s]+|\/[^\s]*)$/;

function isValidEndpoint(endpoint: string): boolean {
  return ENDPOINT_PATTERN.test(endpoint.trim());
}

export function validateLabsData(labs: LabModule[]): LabsValidationIssue[] {
  const issues: LabsValidationIssue[] = [];
  const ids = new Map<string, string>();
  const slugs = new Map<string, string>();
  const endpoints = new Map<string, string[]>();

  for (const lab of labs) {
    if (!lab.title?.trim()) {
      issues.push({ severity: "warning", message: "Missing title", labId: lab.id });
    }

    if (!lab.seoDescription?.trim()) {
      issues.push({ severity: "warning", message: "Missing SEO description", labId: lab.id });
    }

    if (!isValidEndpoint(lab.moduleEndpoint)) {
      issues.push({
        severity: "warning",
        message: `Invalid moduleEndpoint format: ${lab.moduleEndpoint}`,
        labId: lab.id,
      });
    }

    if (ids.has(lab.id)) {
      issues.push({
        severity: "warning",
        message: `Duplicate id "${lab.id}" (also used by ${ids.get(lab.id)})`,
        labId: lab.id,
      });
    } else {
      ids.set(lab.id, lab.title);
    }

    if (slugs.has(lab.slug)) {
      issues.push({
        severity: "warning",
        message: `Duplicate slug "${lab.slug}" (also used by ${slugs.get(lab.slug)})`,
        labId: lab.id,
      });
    } else {
      slugs.set(lab.slug, lab.title);
    }

    const endpointOwners = endpoints.get(lab.moduleEndpoint) ?? [];
    endpointOwners.push(lab.id);
    endpoints.set(lab.moduleEndpoint, endpointOwners);
  }

  for (const [endpoint, ownerIds] of endpoints) {
    if (ownerIds.length > 1) {
      issues.push({
        severity: "warning",
        message: `Duplicate moduleEndpoint "${endpoint}" shared by ids: ${ownerIds.join(", ")}`,
      });
    }
  }

  return issues;
}

export function runLabsDataValidation(labs: LabModule[]): void {
  if (!import.meta.env.DEV) return;

  const issues = validateLabsData(labs);
  if (!issues.length) {
    console.info("[labs-data] Validation passed with no issues.");
    return;
  }

  for (const issue of issues) {
    const prefix = `[labs-data] ${issue.severity.toUpperCase()}`;
    if (issue.labId) {
      console.warn(`${prefix} (${issue.labId}): ${issue.message}`);
    } else {
      console.warn(`${prefix}: ${issue.message}`);
    }
  }
}
