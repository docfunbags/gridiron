import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

type SanityImageSource = Parameters<ReturnType<typeof createImageUrlBuilder>['image']>[0];

const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET || 'production';

if (!projectId) {
  throw new Error(
    'Missing SANITY_PROJECT_ID. Set it in .env locally and in the Cloudflare Pages env vars.',
  );
}

export const sanity = createClient({
  projectId,
  dataset,
  // Build-time fetch — prefer freshness over the CDN's ~60s cache
  useCdn: false,
  apiVersion: '2024-01-01',
});

const builder = createImageUrlBuilder({ projectId, dataset });

export function img(source: SanityImageSource) {
  return builder.image(source).auto('format').fit('max');
}
