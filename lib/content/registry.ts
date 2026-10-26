import { audiences, type Audience } from "@/data/audiences";
import { services, type Service } from "@/data/services";

export function getService(slug: string): Service {
  const service = services.find((item) => item.slug === slug);
  if (!service) throw new Error(`Unknown service slug: ${slug}`);
  return service;
}

export function getAudience(slug: string): Audience {
  const audience = audiences.find((item) => item.slug === slug);
  if (!audience) throw new Error(`Unknown audience slug: ${slug}`);
  return audience;
}

export function serviceHref(slug: string): string {
  return `/services/${slug}/`;
}

export function audienceHref(slug: string): string {
  return `/audiences/${slug}/`;
}
